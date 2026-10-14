import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, Leaf, X } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuData';
import { MenuItem } from '../../types/restaurant';
import { FoodCard } from '../food-card/FoodCard';
import { CustomizationModal } from '../food-card/CustomizationModal';

const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: '🍽️' },
  { id: 'burgers', label: 'Zinger & Burgers', icon: '🍔' },
  { id: 'pizzas', label: 'Pizzas & Crown Crust', icon: '🍕' },
  { id: 'deals', label: 'Deals & Combos', icon: '🔥' },
  { id: 'broast', label: 'Crispy Broast', icon: '🍗' },
  { id: 'wraps', label: 'Wraps & Shawarma', icon: '🌯' },
  { id: 'fries', label: 'Loaded Fries & Sides', icon: '🍟' },
  { id: 'falooda', label: 'Royal Falooda & Ice Cream', icon: '🍨' },
  { id: 'shakes', label: 'Fresh Shakes & Drinks', icon: '🥤' },
];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search query (search in English name, Urdu name, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchUrdu = item.urduName?.includes(q) || false;
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchUrdu && !matchDesc) return false;
      }

      // Tag filter
      if (activeTagFilter === 'spicy' && !item.isSpicy) return false;
      if (activeTagFilter === 'special' && !item.isChefsSpecial) return false;
      if (activeTagFilter === 'veg' && !item.isVegetarian) return false;
      if (activeTagFilter === 'sweet' && !item.isSweet) return false;

      return true;
    });
  }, [activeCategory, searchQuery, activeTagFilter]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setActiveTagFilter(null);
  };

  return (
    <section id="menu-section" className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="text-left">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
              Authentic Taste Since 1998
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Explore Our Fresh Menu
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Handcrafted with 100% Halal fresh ingredients, custom spiced to your liking.
            </p>
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, pizzas, falooda..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sticky Category Tabs Bar */}
        <div className="sticky top-16 sm:top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dietary & Highlight Quick Filter Badges */}
          <div className="flex items-center gap-2 pt-2.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap pl-1">
              Filters:
            </span>
            <button
              onClick={() => setActiveTagFilter(activeTagFilter === 'special' ? null : 'special')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTagFilter === 'special'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Special ⭐</span>
            </button>

            <button
              onClick={() => setActiveTagFilter(activeTagFilter === 'spicy' ? null : 'spicy')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTagFilter === 'spicy'
                  ? 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Spicy 🌶️</span>
            </button>

            <button
              onClick={() => setActiveTagFilter(activeTagFilter === 'veg' ? null : 'veg')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTagFilter === 'veg'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Vegetarian 🌿</span>
            </button>

            <button
              onClick={() => setActiveTagFilter(activeTagFilter === 'sweet' ? null : 'sweet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTagFilter === 'sweet'
                  ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🍨 Sweet / Falooda</span>
            </button>

            {(activeTagFilter || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="text-amber-600 dark:text-amber-400 hover:underline font-bold ml-auto whitespace-nowrap cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-4 text-xs text-slate-500 dark:text-slate-400 text-left flex items-center justify-between">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredItems.length}</strong> unique dishes
          </span>
          {activeCategory !== 'all' && (
            <span>
              Category: <span className="text-amber-600 dark:text-amber-400 capitalize font-bold">{activeCategory}</span>
            </span>
          )}
        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onCustomize={(selected) => setCustomizingItem(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <span className="text-5xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">No menu items found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mt-1">
              We couldn't find any dishes matching "{searchQuery}". Try searching for burgers, pizza, or broast!
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-6 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Customization Modal */}
      <CustomizationModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
      />
    </section>
  );
};
