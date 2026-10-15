import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Plus, Minus, Utensils } from 'lucide-react';
import { MenuItem, SauceOption, SizeOption, ToppingOption } from '../../types/restaurant';
import { useCartStore } from '../../store/useCartStore';

interface CustomizationModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, isOpen, onClose }) => {
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    item?.sizes?.[0]
  );
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<SauceOption | undefined>(
    item?.availableSauces?.[0]
  );
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Sync state whenever active item changes
  React.useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes?.[0]);
      setSelectedToppings([]);
      setSelectedSauce(item.availableSauces?.[0]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleToggleTopping = (topping: ToppingOption) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  // Real-time calculated price
  const sizeDelta = selectedSize?.priceDelta || 0;
  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const sauceDelta = selectedSauce?.price || 0;
  const unitPrice = item.basePrice + sizeDelta + toppingsTotal + sauceDelta;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(
      item,
      {
        selectedSize,
        selectedToppings,
        selectedSauce,
        specialInstructions: specialInstructions.trim(),
      },
      quantity
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col max-h-[90vh] text-slate-900 dark:text-slate-100 transition-colors"
        >
          {/* Header with image */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0 bg-slate-950">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-3 left-4 right-4 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {item.name}
                </span>
                {item.urduName && (
                  <span className="text-sm font-bold text-amber-400">
                    ({item.urduName})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>

          {/* Scrollable Customization Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left">
            
            {/* Size / Portion Selection */}
            {item.sizes && item.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Select Size / Combo
                  </h4>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Required</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {item.sizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    const displayDelta = size.priceDelta > 0 ? `+ Rs. ${size.priceDelta}` : 'Included';
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-amber-500 bg-amber-500 text-slate-950'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </div>
                          <div>
                            <span>{size.name}</span>
                            {size.label && (
                              <span className="ml-2 text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase">
                                · {size.label}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs font-bold tabular-nums text-slate-500 dark:text-slate-400">
                          {displayDelta}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extra Toppings / Add-ons */}
            {item.availableToppings && item.availableToppings.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Extra Add-ons &amp; Toppings
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">Optional</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {item.availableToppings.map((topping) => {
                    const isSelected = selectedToppings.some((t) => t.id === topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => handleToggleTopping(topping)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isSelected
                                ? 'border-amber-500 bg-amber-500 text-slate-950'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{topping.name}</span>
                        </div>
                        <span className="text-xs font-bold tabular-nums text-amber-600 dark:text-amber-400">
                          + Rs. {topping.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sauce Selection */}
            {item.availableSauces && item.availableSauces.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Choice of Sauce / Dip
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">Select 1</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.availableSauces.map((sauce) => {
                    const isSelected = selectedSauce?.id === sauce.id;
                    return (
                      <button
                        key={sauce.id}
                        type="button"
                        onClick={() => setSelectedSauce(sauce)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <span>{sauce.name}</span>
                        {sauce.price > 0 && (
                          <span className="text-amber-600 dark:text-amber-400 font-bold">+Rs. {sauce.price}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Special Preparation Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="E.g., Extra crispy, no onions, sauce on the side..."
                rows={2}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer with Quantity Stepper & Add Button */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-4 transition-colors">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Add to Order · Rs. {totalPrice.toLocaleString()}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
