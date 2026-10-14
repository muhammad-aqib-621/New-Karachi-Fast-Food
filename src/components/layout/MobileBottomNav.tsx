import React from 'react';
import { Utensils, Sparkles, MapPin, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useTheme } from '../../context/ThemeContext';

interface MobileBottomNavProps {
  onOpenLocations: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenLocations }) => {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.getItemCount());
  const total = useCartStore((s) => s.getTotal());
  const { theme, toggleTheme } = useTheme();

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeals = () => {
    const el = document.getElementById('deals-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800/90 px-3 py-2 transition-colors">
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {/* Menu */}
        <button
          onClick={scrollToMenu}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Menu</span>
        </button>

        {/* Deals */}
        <button
          onClick={scrollToDeals}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-semibold mt-0.5">Deals</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
          <span className="text-[10px] font-semibold mt-0.5">Theme</span>
        </button>

        {/* Branches */}
        <button
          onClick={onOpenLocations}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Branches</span>
        </button>

        {/* Floating Cart Button */}
        <button
          onClick={() => toggleCart(true)}
          className="relative flex items-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-transform cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold tabular-nums">
              {itemCount} · Rs.{total}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
