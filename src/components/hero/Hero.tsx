import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, Star, MapPin, Bike, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { FOOD_ASSETS } from '../../data/menuData';

export const Hero: React.FC = () => {
  const orderType = useCartStore((s) => s.orderType);
  const setOrderType = useCartStore((s) => s.setOrderType);
  const selectedBranch = useCartStore((s) => s.getSelectedBranch());

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeals = () => {
    const el = document.getElementById('deals-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 dark:bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Order Toggle & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Delivery hours & Location notice */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-700 dark:text-amber-400 mb-6">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Delivery &amp; pickup available daily</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-700 dark:text-slate-300">Mirpur AJK</span>
            </div>

            {/* Catchy Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white text-balance leading-[1.1]">
              Craving Satisfied <br />
              in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 dark:from-amber-400 dark:via-amber-500 dark:to-red-500">Minutes</span> 🔥
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Experience the legend of Mirpur! Freshly hand-battered crispy Zinger burgers, cheesy Crown Crust pizzas, and our iconic signature Royal Falooda.
            </p>

            {/* Embedded Order Method Toggle right in Hero */}
            <div className="mt-7 w-full max-w-md p-1.5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pickup / Takeaway</span>
                </button>
              </div>

              {/* Order Info Bar */}
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 px-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span className="truncate">{selectedBranch.shortName}</span>
                </div>
                <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">
                  {orderType === 'delivery' ? '15–30 Mins Express' : 'Ready in 12 Mins'}
                </span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToMenu}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToDeals}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 transition-all cursor-pointer shadow-sm"
              >
                <span>Explore Deals</span>
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="mt-8 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-900 dark:text-slate-200">4.9/5.0</span>
                <span>(1,200+ Reviews)</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Halal</span>
                <span>Fresh Meat Daily</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase with Floating Dynamic Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-2xl shadow-slate-300/40 dark:shadow-black/80 bg-white dark:bg-slate-900 group">
              <img
                src={FOOD_ASSETS.hero}
                alt="New Karachi Fast Food feast with crispy zinger burger, gourmet pizza and royal falooda"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-100">
                  <span className="font-bold text-amber-400">Signature Trio:</span> Zinger, Crown Pizza &amp; Royal Falooda
                </div>
              </div>
            </div>

            {/* Floating Dynamic Badge 1: 15-Min Delivery */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-2 sm:-left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-500/30 p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-slate-400/20 dark:shadow-black/60 flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-extrabold">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Freshly prepared</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">Made to order</p>
              </div>
            </motion.div>

            {/* Floating Dynamic Badge 2: 4.9 Star Rated */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -right-2 sm:-right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-slate-400/20 dark:shadow-black/60 flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Star className="w-5 h-5 fill-emerald-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Customer Love</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">4.9 ★ Rated</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
