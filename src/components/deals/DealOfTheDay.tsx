import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { MENU_ITEMS } from '../../data/menuData';

export const DealOfTheDay: React.FC = () => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  // Dynamic countdown timer for the daily deal
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
                <span>LIMITED TIME DEAL OF THE DAY</span>
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

            {/* Right: Dynamic Countdown & CTA Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-6 shrink-0 w-full lg:w-auto">
              {/* Countdown Blocks */}
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-inner">
                  <span className="text-xl font-black tabular-nums text-amber-600 dark:text-amber-400">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">HOURS</span>
                </div>
                <span className="text-xl font-bold text-slate-400 dark:text-slate-600">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-inner">
                  <span className="text-xl font-black tabular-nums text-amber-600 dark:text-amber-400">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">MINS</span>
                </div>
                <span className="text-xl font-bold text-slate-400 dark:text-slate-600">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-inner">
                  <span className="text-xl font-black tabular-nums text-amber-600 dark:text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">SECS</span>
                </div>
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
