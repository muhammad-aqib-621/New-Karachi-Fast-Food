import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Phone, MapPin, User, MessageSquare, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../../store/useCartStore';
import { BRANCH_LOCATIONS } from '../../data/menuData';
import { CustomerDetails, OrderConfirmation, PaymentMethod } from '../../types/restaurant';

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
  const clearCart = useCartStore((s) => s.clearCart);

  const selectedBranch = getSelectedBranch();

  // Form states
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customer.name.trim()) errs.name = 'Please provide your full name';
    if (!customer.phone.trim()) {
      errs.phone = 'Mobile number is required for delivery updates';
    } else if (customer.phone.trim().length < 10) {
      errs.phone = 'Please provide a valid 11-digit phone number (e.g. 0316-7235194)';
    }

    if (orderType === 'delivery' && !customer.address.trim()) {
      errs.address = 'Delivery address and street landmark is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `NK-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderConfirmation = {
        orderId,
        items: [...items],
        orderType,
        branch: selectedBranch,
        customer,
        subtotal,
        discount,
        deliveryFee,
        tax: 0,
        total,
        paymentMethod,
        estimatedDeliveryMinutes: orderType === 'delivery' ? 25 : 15,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      clearCart();
      fireConfetti();
    }, 600);
  };

  // Generate preformatted WhatsApp text message for order dispatch
  const handleOrderViaWhatsApp = () => {
    if (!validate()) return;

    const itemsSummary = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.menuItem.name} ${
            i.customization.selectedSize ? `(${i.customization.selectedSize.name})` : ''
          } - Rs. ${i.totalPrice}`
      )
      .join('%0A');

    const message = `*NEW ORDER - New Karachi Fast Food*%0A%0A` +
      `*Order Type:* ${orderType.toUpperCase()}%0A` +
      `*Branch:* ${selectedBranch.name}%0A` +
      `*Customer:* ${customer.name}%0A` +
      `*Phone:* ${customer.phone}%0A` +
      (orderType === 'delivery' ? `*Address:* ${customer.address}%0A` : '') +
      (customer.notes ? `*Special Notes:* ${customer.notes}%0A` : '') +
      `*Payment:* ${paymentMethod.toUpperCase()}%0A%0A` +
      `*ITEMS:*%0A${itemsSummary}%0A%0A` +
      `*Subtotal:* Rs. ${subtotal}%0A` +
      (discount > 0 ? `*Discount:* -Rs. ${discount}%0A` : '') +
      `*Delivery:* Rs. ${deliveryFee}%0A` +
      `*TOTAL:* Rs. ${total}`;

    const whatsappUrl = `https://wa.me/${selectedBranch.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Confirm order locally as well
    const orderId = `NK-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrder({
      orderId,
      items: [...items],
      orderType,
      branch: selectedBranch,
      customer,
      subtotal,
      discount,
      deliveryFee,
      tax: 0,
      total,
      paymentMethod,
      estimatedDeliveryMinutes: 25,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    clearCart();
    fireConfetti();
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={confirmedOrder ? handleFinish : onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="text-left">
              <h2 className="text-lg font-black text-white">
                {confirmedOrder ? 'Order Confirmed!' : 'Checkout & Express Dispatch'}
              </h2>
              <p className="text-xs text-slate-400">
                {confirmedOrder
                  ? `Order ID: ${confirmedOrder.orderId}`
                  : `Total: Rs. ${total.toLocaleString()} · ${orderType === 'delivery' ? 'Home Delivery' : 'Pickup at branch'}`}
              </p>
            </div>
            <button
              onClick={confirmedOrder ? handleFinish : onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
            {confirmedOrder ? (
              // Order Confirmation State
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">Thank You, {confirmedOrder.customer.name}!</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Your order has been sent directly to the kitchen at{' '}
                    <strong className="text-amber-400">{confirmedOrder.branch.shortName}</strong>.
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
                    <div>
                      <p className="text-xs font-bold text-white">Order Received &amp; Verified</p>
                      <p className="text-[11px] text-slate-400">Time: {confirmedOrder.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-white">Master Chefs Preparing Fresh</p>
                      <p className="text-[11px] text-slate-400">Estimated dispatch: {confirmedOrder.estimatedDeliveryMinutes} mins</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary Snapshot */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-left text-xs space-y-2">
                  <div className="flex justify-between font-bold text-slate-300 border-b border-slate-800 pb-1.5">
                    <span>Summary ({confirmedOrder.items.length} items)</span>
                    <span className="text-amber-400 tabular-nums">Rs. {confirmedOrder.total.toLocaleString()}</span>
                  </div>
                  {confirmedOrder.items.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-slate-400">
                      <span>{item.quantity}x {item.menuItem.name}</span>
                      <span className="tabular-nums">Rs. {item.totalPrice}</span>
                    </div>
                  ))}
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/60">
                    <span>Dispatch Phone: {confirmedOrder.branch.phone}</span>
                    <span className="capitalize font-semibold text-slate-300">{confirmedOrder.paymentMethod.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleFinish}
                    className="flex-1 py-3 px-5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors"
                  >
                    Done &amp; Return to Home
                  </button>
                  <a
                    href={`tel:${confirmedOrder.branch.phone}`}
                    className="py-3 px-5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call Branch</span>
                  </a>
                </div>
              </div>
            ) : (
              // Checkout Form
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                
                {/* Branch Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Fulfilling Branch
                  </label>
                  <select
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
                    <label className="block text-xs text-slate-300 mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="E.g., Muhammad Usman"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Phone Number (For WhatsApp / Delivery Call)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="0316-XXXXXXX"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">
                        Delivery Address &amp; Nearest Landmark
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <textarea
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          placeholder="House/Hostel #, Street, Near MUST Campus / DHQ Hospital, Mirpur"
                          rows={2}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Rider Instructions (Optional)</label>
                    <input
                      type="text"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder="E.g., Call when you reach the gate"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Payment Method
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
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

                {/* Trust guarantee */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Fresh Food Guarantee. Inspected &amp; sealed before rider dispatch.</span>
                </div>

                {/* Dual Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Dispatching...' : `Confirm Order · Rs. ${total.toLocaleString()}`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOrderViaWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-950"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Send Order Directly to WhatsApp</span>
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
