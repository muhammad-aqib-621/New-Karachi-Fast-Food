import React from 'react';
import { Phone, Clock, MapPin, MessageSquare } from 'lucide-react';
import { BRANCH_LOCATIONS } from '../../data/menuData';
import { KarachiLogo } from '../brand/KarachiLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-left pt-14 pb-24 md:pb-14 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Col 1: Brand & Story */}
          <div className="space-y-4">
            <KarachiLogo size="md" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Serving legendary handcrafted Zinger Burgers, stone-baked Crown Crust Pizzas, and iconic Royal Falooda in Mirpur Azad Kashmir since 1998.
            </p>
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white">Branch Hours:</p>
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Hours vary by location</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Full Menu &amp; Combos
                </a>
              </li>
              <li>
                <a href="#deals-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Deal of the Day
                </a>
              </li>
              <li>
                <a href="#falooda-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Special Falooda &amp; Shakes
                </a>
              </li>
              <li>
                <a href="#locations-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Our Mirpur Branches
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Customer Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Order Phone Lines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Direct Phone Lines
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:0316-7235194"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="tabular-nums font-semibold">0316-7235194</span>
                <span className="text-[10px] text-slate-400">(DHQ Main)</span>
              </a>
              <a
                href="tel:0349-7872375"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="tabular-nums font-semibold">0349-7872375</span>
                <span className="text-[10px] text-slate-400">(MUST Hub)</span>
              </a>
              <a
                href="tel:0317-9094422"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="tabular-nums font-semibold">0317-9094422</span>
                <span className="text-[10px] text-slate-400">(Downtown)</span>
              </a>
              <a
                href={`https://wa.me/${BRANCH_LOCATIONS[0].whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Order via WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Col 4: Main Location & Accepted Payments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Headquarters
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Allama Iqbal Road, Opposite DHQ Hospital, Near MUST University, Mirpur, Azad Kashmir.
              </span>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Payment Preferences (Confirm with Branch)
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                  Cash on Delivery
                </span>
                <span className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-red-600 dark:text-red-400 shadow-sm">
                  JazzCash
                </span>
                <span className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                  EasyPaisa
                </span>
                <span className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                  Visa / Mastercard
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} New Karachi Fast Food &amp; Special Falooda. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
