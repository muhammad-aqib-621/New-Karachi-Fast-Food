import React from 'react';
import { ShoppingBag, PhoneCall, Sun, Moon } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { KarachiLogo } from '../brand/KarachiLogo';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenLocationsModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLocationsModal }) => {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.getItemCount());
  const total = useCartStore((s) => s.getTotal());
  const selectedBranch = useCartStore((s) => s.getSelectedBranch());
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Authentic Karachi Fast Food Logo */}
        <a
          href="#"
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 transition-transform active:scale-98"
          aria-label="New Karachi Fast Food Home"
        >
          <KarachiLogo size="md" />
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <a
            href="#menu-section"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Menu
          </a>
          <a
            href="#deals-section"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Deals &amp; Combos
          </a>
          <a
            href="#falooda-section"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Royal Falooda
          </a>
          <button
            onClick={onOpenLocationsModal}
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Branches
          </button>
          <a
            href="#reviews-section"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: Actions (Theme Toggle + Call + Cart CTA) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-amber-400 hover:border-amber-500 transition-all cursor-pointer shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Quick Call */}
          <a
            href={`tel:${selectedBranch.phone}`}
            className="hidden lg:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors whitespace-nowrap"
            title={`Call branch: ${selectedBranch.phone}`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span className="tabular-nums">{selectedBranch.phone}</span>
          </a>

          {/* Primary Cart CTA */}
          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all rounded-xl shadow-lg shadow-amber-500/25 whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {itemCount > 0 ? (
              <span className="flex items-center gap-1.5 pl-1.5 border-l border-amber-600/40 tabular-nums">
                <span className="bg-slate-950 text-amber-400 text-xs px-1.5 py-0.2 rounded-md font-bold">
                  {itemCount}
                </span>
                <span className="hidden sm:inline text-xs font-extrabold">
                  · Rs. {total.toLocaleString()}
                </span>
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
};
