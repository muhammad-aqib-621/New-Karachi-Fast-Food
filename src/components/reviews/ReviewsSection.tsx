import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { CUSTOMER_TESTIMONIALS } from '../../data/menuData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-16 bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 text-left">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
              Loved by Foodies in Mirpur
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Customer Reviews &amp; Stories
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">4.9 / 5.0</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">· Over 1,200 Happy Diners</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between text-left hover:border-amber-400 dark:hover:border-slate-700 transition-all shadow-sm hover:shadow-md"
            >
              <div>
                {/* Rating stars & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Favorite Item */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{review.role}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">{review.date}</span>
                </div>

                <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md">
                  <span>Ordered:</span>
                  <span className="font-bold">{review.favoriteItem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
