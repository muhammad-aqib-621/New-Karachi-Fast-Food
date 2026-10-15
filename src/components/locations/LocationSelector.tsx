import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, Check, ShieldCheck } from 'lucide-react';
import { BRANCH_LOCATIONS, isBranchOpen } from '../../data/menuData';
import { useCartStore } from '../../store/useCartStore';

export const LocationSelector: React.FC = () => {
  const selectedBranchId = useCartStore((s) => s.selectedBranchId);
  const setSelectedBranchId = useCartStore((s) => s.setSelectedBranchId);
  const selectedBranch = useCartStore((s) => s.getSelectedBranch());
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="locations-section" className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
            Always Within Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Our Branches in Mirpur
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Choose a branch for pickup or ask the team to confirm delivery coverage for your address.
          </p>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCH_LOCATIONS.map((branch) => {
            const isSelected = selectedBranchId === branch.id;
            return (
              <article
                key={branch.id}
                className={`relative rounded-3xl p-6 text-left transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-amber-50/50 dark:bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm'
                }`}
              >
                {/* Status & Active Check Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold ${
                    isBranchOpen(branch, currentTime)
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isBranchOpen(branch, currentTime) ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    <span>{isBranchOpen(branch, currentTime) ? 'Open now' : 'Closed now'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedBranchId(branch.id)}
                    aria-pressed={isSelected}
                    aria-label={`Select ${branch.shortName} as your branch`}
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md border transition-colors ${
                      isSelected
                        ? 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30'
                        : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 hover:border-amber-500'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{isSelected ? 'Selected' : 'Select'}</span>
                  </button>
                </div>

                {/* Branch Name & Address */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {branch.name}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 mb-3">
                    <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{branch.address}, {branch.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                    <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    <span>Delivery &amp; Takeaway: {branch.timing}</span>
                  </div>
                </div>

                {/* Contact and Direct Action Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${branch.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span className="tabular-nums">{branch.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${branch.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Delivery Guarantee Banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Need delivery?</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Contact your selected branch to confirm delivery coverage and estimated arrival time.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${selectedBranch.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl whitespace-nowrap hover:bg-amber-500/20 transition-colors"
          >
            Ask about delivery
          </a>
        </div>

      </div>
    </section>
  );
};
