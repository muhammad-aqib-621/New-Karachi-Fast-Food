import React, { useState } from 'react';
import { Plus, Check, SlidersHorizontal, Flame, Sparkles, Leaf } from 'lucide-react';
import { MenuItem } from '../../types/restaurant';
import { useCartStore } from '../../store/useCartStore';

interface FoodCardProps {
  item: MenuItem;
  onCustomize: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onCustomize }) => {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item, {
      selectedSize: item.sizes?.[0],
      selectedToppings: [],
      selectedSauce: item.availableSauces?.[0],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const hasCustomizations = (item.sizes && item.sizes.length > 1) || (item.availableToppings && item.availableToppings.length > 0);

  return (
    <div
      onClick={() => onCustomize(item)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-black/50 cursor-pointer text-left"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 dark:from-slate-900 via-transparent to-transparent opacity-80" />

        {/* Dietary / Feature Indicators */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {item.isChefsSpecial && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-extrabold shadow-sm">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              <span>Special</span>
            </span>
          )}
          {item.isSpicy && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600 text-white text-[11px] font-bold shadow-sm">
              <Flame className="w-3 h-3 fill-white" />
              <span>Spicy</span>
            </span>
          )}
          {item.isVegetarian && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold shadow-sm">
              <Leaf className="w-3 h-3" />
              <span>Veg</span>
            </span>
          )}
        </div>

        {/* Prep Time in Corner */}
        <div className="absolute bottom-2.5 left-2.5 text-[11px] font-medium text-white bg-slate-950/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
          <span>{item.prepTimeMinutes} mins prep</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title & Urdu Name */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
              {item.name}
            </h3>
            {item.urduName && (
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold shrink-0">
                {item.urduName}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase tracking-wider font-semibold">
              {item.sizes && item.sizes.length > 1 ? 'From' : 'Price'}
            </span>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400 tabular-nums">
              Rs. {item.basePrice.toLocaleString()}
            </span>
          </div>

          {/* Buttons: Customize & Quick Add */}
          <div className="flex items-center gap-1.5">
            {hasCustomizations && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCustomize(item);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Customize ingredients & size"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span className="hidden sm:inline">Options</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-95 cursor-pointer ${
                justAdded
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
              }`}
              aria-label={`Add ${item.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add +</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
