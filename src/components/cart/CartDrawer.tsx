import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Bike, Store, CheckCircle2 } from 'lucide-react';
import { DELIVERY_DISTANCE_BANDS } from '../../data/menuData';
import { useCartStore } from '../../store/useCartStore';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.getItemCount());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const orderType = useCartStore((s) => s.orderType);
  const setOrderType = useCartStore((s) => s.setOrderType);
  const deliveryDistanceBand = useCartStore((s) => s.deliveryDistanceBand);
  const setDeliveryDistanceBand = useCartStore((s) => s.setDeliveryDistanceBand);
  const selectedBranch = useCartStore((s) => s.getSelectedBranch());

  const promoCode = useCartStore((s) => s.promoCode);
  const promoMessage = useCartStore((s) => s.promoMessage);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);

  const subtotal = useCartStore((s) => s.getSubtotal());
  const discount = useCartStore((s) => s.getDiscount());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const total = useCartStore((s) => s.getTotal());

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleDeliveryDistanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBand = DELIVERY_DISTANCE_BANDS.find((band) => band.id === event.currentTarget.value);
    if (selectedBand) setDeliveryDistanceBand(selectedBand.id);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setPromoInput('');
    }
  };

  const handleProceed = () => {
    toggleCart(false);
    onProceedToCheckout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h2 id="cart-title" className="text-base font-extrabold text-white">Your Order</h2>
                    <p className="text-xs text-slate-400">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'} in basket
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleCart(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Mode & Branch Selector */}
              <div className="p-3 bg-slate-950/60 border-b border-slate-800/80">
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>
                      Delivery {deliveryDistanceBand ? `(Rs. ${deliveryFee})` : '(Select distance)'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Pickup (Free)</span>
                  </button>
                </div>
                <div className="mt-1.5 px-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">Branch: {selectedBranch.shortName}</span>
                  <span className="text-amber-400 shrink-0 font-medium">{selectedBranch.timing}</span>
                </div>
                {orderType === 'delivery' && (
                  <label className="block mt-3 text-left">
                    <span className="block mb-1 text-[11px] font-semibold text-slate-300">
                      Estimated distance (branch confirms)
                    </span>
                    <select
                      value={deliveryDistanceBand ?? ''}
                      onChange={handleDeliveryDistanceChange}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="" disabled>Select distance from the branch</option>
                      {DELIVERY_DISTANCE_BANDS.map((band) => (
                        <option key={band.id} value={band.id}>
                          {band.label} · {band.fee === 0 ? 'Free' : `Rs. ${band.fee}`}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/60 flex items-center justify-center text-slate-500">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Explore our delicious burgers, stone-baked pizzas, or royal falooda to get started!
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleCart(false)}
                      className="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map((cartItem) => {
                    const { cartItemId, menuItem, quantity, customization, totalPrice } = cartItem;
                    return (
                      <div
                        key={cartItemId}
                        className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col gap-2.5 text-left"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <img
                            src={menuItem.image}
                            alt={menuItem.name}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-900 border border-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">
                              {menuItem.name}
                            </h4>
                            
                            {/* Selected Size */}
                            {customization.selectedSize && (
                              <p className="text-xs text-amber-400 font-medium">
                                Size: {customization.selectedSize.name}
                              </p>
                            )}

                            {/* Selected Toppings */}
                            {customization.selectedToppings.length > 0 && (
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                + {customization.selectedToppings.map((t) => t.name).join(', ')}
                              </p>
                            )}

                            {/* Selected Sauce */}
                            {customization.selectedSauce && (
                              <p className="text-[11px] text-slate-400">
                                Sauce: {customization.selectedSauce.name}
                              </p>
                            )}

                            {/* Special notes */}
                            {customization.specialInstructions && (
                              <p className="text-[11px] text-slate-400 italic">
                                Note: "{customization.specialInstructions}"
                              </p>
                            )}
                          </div>

                          {/* Delete Item */}
                          <button
                            type="button"
                            onClick={() => removeItem(cartItemId)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Bottom Row: Quantity Steppers & Item Price */}
                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(cartItemId, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-white tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(cartItemId, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-extrabold text-amber-400 tabular-nums">
                            Rs. {totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer with Promo Code & Totals */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-4">
                  {/* Promo Code Input */}
                  <div>
                    {promoCode ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-bold">{promoCode} Applied</span>
                        </div>
                        <button
                          type="button"
                          onClick={removePromoCode}
                          className="text-slate-400 hover:text-red-400 font-semibold text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value);
                              setPromoError(null);
                            }}
                            placeholder="Promo Code (KARACHI20)"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none uppercase"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {promoError && (
                      <p className="mt-1.5 text-[11px] text-red-400 text-left">
                        {promoError}
                      </p>
                    )}
                    {promoMessage && !promoError && (
                      <p className="mt-1 text-[11px] text-emerald-400 text-left">
                        {promoMessage}
                      </p>
                    )}
                  </div>

                  {/* Breakdown summary */}
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-200 tabular-nums">
                        Rs. {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount</span>
                        <span className="font-semibold tabular-nums">
                          - Rs. {discount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>
                        Delivery Fee{' '}
                      </span>
                      <span className="font-semibold text-slate-200 tabular-nums">
                        {orderType === 'delivery' && !deliveryDistanceBand
                          ? 'Select distance above'
                          : deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm sm:text-base font-extrabold text-white">
                      <span>Total Amount</span>
                      <span className="text-amber-400 tabular-nums">
                        {orderType === 'delivery' && !deliveryDistanceBand
                          ? 'Select distance'
                          : `Rs. ${total.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="button"
                    onClick={handleProceed}
                    disabled={orderType === 'delivery' && !deliveryDistanceBand}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-500"
                  >
                    <span>
                      {orderType === 'delivery' && !deliveryDistanceBand
                        ? 'Choose delivery distance'
                        : `Proceed to Checkout · Rs. ${total.toLocaleString()}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
