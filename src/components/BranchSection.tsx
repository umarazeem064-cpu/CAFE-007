import React from 'react';
import { useApp } from '../context/AppContext';
import { BRANCHES } from '../data/branches';
import { MapPin, PhoneCall, ExternalLink, Clock, Building2, ArrowLeft } from 'lucide-react';

export const BranchSection: React.FC = () => {
  const { t } = useApp();
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('back_to_home')}</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Multi-City Network</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Visit Café 007 Mart in Your City
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Main branch located on Ratta Tibba Road, Burewala with express delivery hubs across Punjab &amp; Islamabad.
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/h9wbLVXorf6rmiAu7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Open Google Maps Pin</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all ${
                b.isMain
                  ? 'bg-amber-500/10 border-amber-500/40 text-slate-900 dark:text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{b.name}</span>
                    {b.isMain && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-slate-950">
                        Main
                      </span>
                    )}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {b.nameUrdu}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 mt-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.hours}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <a
                  href={`tel:${b.phone.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-slate-900 dark:text-white hover:text-amber-500 flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3 text-amber-500" />
                  <span>{b.phone}</span>
                </a>

                <a
                  href={b.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
