import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Phone, MapPin, User, MessageSquare, CreditCard, Banknote, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { BRANCH_LOCATIONS, DELIVERY_DISTANCE_BANDS } from '../../data/menuData';
import { CustomerDetails, PaymentMethod, PreparedOrder } from '../../types/restaurant';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const items = useCartStore((s) => s.items);
  const orderType = useCartStore((s) => s.orderType);
  const selectedBranchId = useCartStore((s) => s.selectedBranchId);
  const setSelectedBranchId = useCartStore((s) => s.setSelectedBranchId);
  const getSelectedBranch = useCartStore((s) => s.getSelectedBranch);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const discount = useCartStore((s) => s.getDiscount());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const total = useCartStore((s) => s.getTotal());
  const deliveryDistanceBand = useCartStore((s) => s.deliveryDistanceBand);
  const selectedBranch = getSelectedBranch();

  // Form states
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [preparedOrder, setPreparedOrder] = useState<PreparedOrder | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customer.name.trim()) errs.name = 'Please provide your full name';
    if (!customer.phone.trim()) {
      errs.phone = 'Mobile number is required for delivery updates';
    } else if (!/^(?:03\d{9}|923\d{9})$/.test(customer.phone.replace(/\D/g, ''))) {
      errs.phone = 'Enter a valid Pakistani mobile number (e.g. 0316-7235194)';
    }

    if (orderType === 'delivery' && !customer.address.trim()) {
      errs.address = 'Delivery address and street landmark is required';
    }
    if (orderType === 'delivery' && !deliveryDistanceBand) {
      errs.deliveryDistance = 'Choose an estimated delivery distance in your basket first';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePrepareOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const order: PreparedOrder = {
      items: [...items],
      orderType,
      deliveryDistanceBand,
      branch: selectedBranch,
      customer,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const itemsSummary = order.items
      .map(({ menuItem, quantity, customization, totalPrice }) => {
        const options = [
          customization.selectedSize?.name,
          ...customization.selectedToppings.map((topping) => topping.name),
          customization.selectedSauce ? `Sauce: ${customization.selectedSauce.name}` : undefined,
          customization.specialInstructions ? `Note: ${customization.specialInstructions}` : undefined,
        ].filter(Boolean);
        return `${quantity}x ${menuItem.name}${options.length ? ` (${options.join(', ')})` : ''} - Rs. ${totalPrice}`;
      })
      .join('\n');
    const message = [
      '*NEW ORDER - New Karachi Fast Food*',
      '',
      `*Order type:* ${orderType.toUpperCase()}`,
      `*Branch:* ${selectedBranch.name}`,
      ...(orderType === 'delivery'
        ? [`*Estimated distance:* ${DELIVERY_DISTANCE_BANDS.find((band) => band.id === deliveryDistanceBand)?.label} (branch to confirm)`]
        : []),
      `*Customer:* ${customer.name}`,
      `*Phone:* ${customer.phone}`,
      ...(orderType === 'delivery' ? [`*Address:* ${customer.address}`] : []),
      ...(customer.notes ? [`*Rider instructions:* ${customer.notes}`] : []),
      `*Payment preference:* ${paymentMethod.toUpperCase()} (confirm with branch)`,
      '',
      '*Items:*',
      itemsSummary,
      '',
      `*Subtotal:* Rs. ${subtotal}`,
      ...(discount > 0 ? [`*Discount:* -Rs. ${discount}`] : []),
      `*Delivery:* Rs. ${deliveryFee}`,
      `*Total:* Rs. ${total}`,
    ].join('\n');
    const url = new URL(`https://wa.me/${selectedBranch.whatsapp}`);
    url.searchParams.set('text', message);
    setPreparedOrder(order);
    setWhatsAppUrl(url.toString());
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="text-left">
              <h2 id="checkout-title" className="text-lg font-black text-white">
                {preparedOrder ? 'Order Message Ready' : 'Checkout'}
              </h2>
              <p className="text-xs text-slate-400">
                {preparedOrder
                  ? `Prepared at ${preparedOrder.createdAt} · Send it to confirm`
                  : `Total: Rs. ${total.toLocaleString()} · ${orderType === 'delivery' ? 'Home Delivery' : 'Pickup at branch'}`}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
            {preparedOrder ? (
              // The branch confirms the order after the customer sends this WhatsApp message.
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">Ready to send, {preparedOrder.customer.name}</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Review and send the prepared message to{' '}
                    <strong className="text-amber-400">{preparedOrder.branch.shortName}</strong> in WhatsApp.
                    The branch must confirm availability and the final order.
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
                    <div>
                      <p className="text-xs font-bold text-white">Message prepared</p>
                      <p className="text-[11px] text-slate-400">Not sent yet — continue in WhatsApp to place your order.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-slate-500" />
                    <div>
                      <p className="text-xs font-bold text-white">Waiting for branch confirmation</p>
                      <p className="text-[11px] text-slate-400">No payment is taken on this website.</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary Snapshot */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-left text-xs space-y-2">
                  <div className="flex justify-between font-bold text-slate-300 border-b border-slate-800 pb-1.5">
                    <span>
                      Summary ({preparedOrder.items.reduce((count, item) => count + item.quantity, 0)}{' '}
                      {preparedOrder.items.reduce((count, item) => count + item.quantity, 0) === 1 ? 'item' : 'items'})
                    </span>
                    <span className="text-amber-400 tabular-nums">Rs. {preparedOrder.total.toLocaleString()}</span>
                  </div>
                  {preparedOrder.items.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-slate-400">
                      <span>{item.quantity}x {item.menuItem.name}</span>
                      <span className="tabular-nums">Rs. {item.totalPrice}</span>
                    </div>
                  ))}
                  {preparedOrder.orderType === 'delivery' && preparedOrder.deliveryDistanceBand && (
                    <div className="text-slate-400">
                      Estimated distance:{' '}
                      {DELIVERY_DISTANCE_BANDS.find((band) => band.id === preparedOrder.deliveryDistanceBand)?.label}
                    </div>
                  )}
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/60">
                    <span>Branch: {preparedOrder.branch.phone}</span>
                    <span className="capitalize font-semibold text-slate-300">{preparedOrder.paymentMethod.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {whatsAppUrl && (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp to Send</span>
                    </a>
                  )}
                  <a
                    href={`tel:${preparedOrder.branch.phone}`}
                    className="py-3 px-5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call Branch</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPreparedOrder(null);
                    setWhatsAppUrl(null);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Keep basket and edit checkout
                </button>
              </div>
            ) : (
              // Checkout Form
              <form noValidate onSubmit={handlePrepareOrder} className="space-y-5">
                
                {/* Branch Selection */}
                <div>
                  <label htmlFor="checkout-branch" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Fulfilling Branch
                  </label>
                  <select
                    id="checkout-branch"
                    value={selectedBranchId}
                    onChange={(e) => setSelectedBranchId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                  >
                    {BRANCH_LOCATIONS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.timing})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Customer Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Customer Information
                  </h4>

                  <div>
                    <label htmlFor="checkout-name" className="block text-xs text-slate-300 mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="checkout-name"
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'checkout-name-error' : undefined}
                        placeholder="E.g., Muhammad Usman"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    {errors.name && <p id="checkout-name-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs text-slate-300 mb-1">
                      Phone Number (For WhatsApp / Delivery Call)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
                        placeholder="0316-XXXXXXX"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    {errors.phone && <p id="checkout-phone-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label htmlFor="checkout-address" className="block text-xs text-slate-300 mb-1">
                        Delivery Address &amp; Nearest Landmark
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <textarea
                          id="checkout-address"
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          autoComplete="street-address"
                          aria-invalid={Boolean(errors.address)}
                          aria-describedby={errors.address ? 'checkout-address-error' : undefined}
                          placeholder="House/Hostel #, Street, Near MUST Campus / DHQ Hospital, Mirpur"
                          rows={2}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      {errors.address && <p id="checkout-address-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="checkout-notes" className="block text-xs text-slate-300 mb-1">Rider Instructions (Optional)</label>
                    <input
                      id="checkout-notes"
                      type="text"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      maxLength={300}
                      placeholder="E.g., Call when you reach the gate"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment preference sent to the branch for confirmation */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Payment Preference
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      aria-pressed={paymentMethod === 'cod'}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-amber-400" />
                      <span>Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('jazzcash')}
                      aria-pressed={paymentMethod === 'jazzcash'}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'jazzcash'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-5 h-5 font-black text-red-400 text-base">JC</span>
                      <span>JazzCash / EasyPaisa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      aria-pressed={paymentMethod === 'card'}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-blue-400" />
                      <span>Card on Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Explain the WhatsApp handoff; this page does not create a server-side order or take payment. */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your order details will be prepared for WhatsApp. The branch confirms your order and payment method; this website does not process payments.</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Prepare WhatsApp Order · Rs. {total.toLocaleString()}</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
