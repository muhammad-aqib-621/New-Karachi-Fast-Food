import React, { useState } from 'react';
import { Sparkles, Plus, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { MENU_ITEMS } from '../../data/menuData';

export const DealOfTheDay: React.FC = () => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const dealItem = MENU_ITEMS.find((item) => item.id === 'deal-2') || MENU_ITEMS[0];

  const handleClaimDeal = () => {
    addItem(dealItem, {
      selectedToppings: [],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="deals-section" className="py-10 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 p-1 sm:p-1.5 shadow-2xl shadow-amber-500/10">
          <div className="rounded-[22px] bg-white dark:bg-slate-950 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-left transition-colors">
            
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TODAY'S DEAL</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Duo Crispy Broast &amp; Zinger Feast 🔥
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Includes <span className="text-slate-900 dark:text-white font-semibold">2 Crispy Zinger Burgers</span>,{' '}
                <span className="text-slate-900 dark:text-white font-semibold">2 Fried Chicken Pieces</span>,{' '}
                <span className="text-slate-900 dark:text-white font-semibold">2 Regular Crinkle Fries</span>, and a{' '}
                <span className="text-slate-900 dark:text-white font-semibold">1.5 Litre Family Drink</span>.
              </p>

              {/* Price & savings */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                  Rs. 1,399
                </span>
                <span className="text-lg text-slate-400 line-through tabular-nums">
                  Rs. 1,750
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                  Save Rs. 351 (20% Off)
                </span>
              </div>
            </div>

            {/* Order CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-6 shrink-0 w-full lg:w-auto">
              <div className="flex flex-col items-center justify-center min-w-40 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-lg font-black text-amber-600 dark:text-amber-400">Combo deal</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Save Rs. 351</span>
              </div>

              {/* Claim Button */}
              <button
                type="button"
                onClick={handleClaimDeal}
                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Claim Deal • Rs. 1,399</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
