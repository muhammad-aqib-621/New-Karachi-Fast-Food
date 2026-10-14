import React from 'react';
import { Sparkles, Heart, Plus } from 'lucide-react';
import { FOOD_ASSETS, MENU_ITEMS } from '../../data/menuData';
import { useCartStore } from '../../store/useCartStore';

export const FaloodaSpotlight: React.FC = () => {
  const addItem = useCartStore((s) => s.addItem);
  const faloodaItem = MENU_ITEMS.find((i) => i.id === 'special-falooda-kulfa') || MENU_ITEMS[0];
  const shakeItem = MENU_ITEMS.find((i) => i.id === 'new-karachi-super-mix') || MENU_ITEMS[0];

  return (
    <section id="falooda-section" className="py-16 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Dessert Story */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>THE LEGENDARY SWEET HERITAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Famous Karachi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 dark:from-amber-400 dark:via-rose-400 dark:to-purple-400">
                Special Royal Falooda
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Before the burgers and pizzas, foodies across Mirpur fell in love with our signature dessert. Prepared fresh with dense slow-churned rabri milk, chilled silk vermicelli, natural sweet basil seeds, and topped with rich handmade pistachio kulfa ice cream.
            </p>

            {/* Quality Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400 block tabular-nums">100%</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Pure Buffalo Milk Rabri</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400 block tabular-nums">25+ Yrs</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Master Artisanal Recipe</span>
              </div>
            </div>

            {/* Quick Add CTA */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  addItem(faloodaItem, {
                    selectedToppings: [],
                  })
                }
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Order Royal Falooda · Rs. 350</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  addItem(shakeItem, {
                    selectedToppings: [],
                  })
                }
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-all cursor-pointer shadow-sm"
              >
                <span>Super Mix Shake · Rs. 300</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Falooda Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-purple-950/20 dark:shadow-purple-950/30 bg-white dark:bg-slate-900 group">
              <img
                src={FOOD_ASSETS.specialFalooda}
                alt="New Karachi Signature Royal Falooda Kulfa with rose syrup, vermicelli, rabri and cherry"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-left">
                <div>
                  <p className="text-sm font-bold text-white">Signature Royal Falooda Kulfa</p>
                  <p className="text-xs text-amber-400">Rs. 350 · Served Icy Chilled</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Heart className="w-4 h-4 fill-purple-400" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
