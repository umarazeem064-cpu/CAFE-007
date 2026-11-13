import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageCircle,
  PhoneCall,
  CalendarDays,
  MapPin,
  Clock,
  ShieldCheck,
  Bike,
  Flame,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, setIsReservationOpen, setIsCartOpen, cartCount } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pt-6 pb-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Markers */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Burewala's #1 Rated Food Hangout</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Bike className="w-3.5 h-3.5 text-emerald-500" />
                <span>Free Home Delivery</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Open 11 AM - 2 AM</span>
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Craving Hot Pizza, Crispy Broast &amp; Juicy Burgers?
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
                Welcome to <strong className="text-slate-900 dark:text-white">CAFÉ 007 MART</strong> on Ratta Tibba Road, Burewala. Explore our 26 signature dishes featuring full pizza combos, crispy Al-Baik broast, sizzling zinger deals, and creamy pasta.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Menu & Add to Cart CTA */}
              <a
                href="#menu-section"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t('browse_menu_order')}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* View Cart CTA */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span>{t('view_cart')} ({cartCount})</span>
              </button>

              {/* Reservation CTA */}
              <button
                onClick={() => setIsReservationOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-colors"
              >
                <CalendarDays className="w-4 h-4 text-amber-500" />
                <span>{t('reservations')}</span>
              </button>

              {/* Optional Direct WhatsApp Support */}
              <a
                href="https://wa.me/923467787007?text=Hi%20Cafe%20007%20Mart!%20I%20have%20a%20question%20about%20the%20menu."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-3.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Helpline and Location bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400">Instant Hotline</span>
                  <a href="tel:03467787007" className="font-bold text-slate-900 dark:text-white hover:underline">
                    0346-7787007 / 0300-6966007
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400">Main Location</span>
                  <a
                    href="https://maps.app.goo.gl/h9wbLVXorf6rmiAu7"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-slate-900 dark:text-white hover:underline"
                  >
                    Ratta Tibba Road, Burewala (View Map)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 ml-auto text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Halal Quality Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Campaign Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 group">
              <img
                src="/images/hero_pizza.jpg"
                alt="Cafe 007 Signature Pizza"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded uppercase tracking-wider">
                    HOT DEALS LIVE
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    From Rs. 350/-
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  Shahi Crown Crust &amp; Al-Baik Chicken Broast
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Baked with secret spices and loaded with pure mozzarella, sizzling seekh kebabs, and crispy tenders.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/delivery_rider.jpg"
                      alt="Free Delivery"
                      className="w-8 h-8 rounded-full border border-amber-500 object-cover"
                    />
                    <div className="text-[11px] text-white">
                      <span className="font-bold block">Free Express Delivery</span>
                      <span className="text-amber-400">Doorstep in ~25 Minutes</span>
                    </div>
                  </div>

                  <a
                    href="#deals-section"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    View Deals
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Highlight Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 p-3.5 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 items-center gap-3 max-w-xs">
              <div className="w-16 h-12 rounded-lg bg-[#e1252d]/10 flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                <img
                  src="/images/dish_16.jpg"
                  alt="Family Deal"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                  Top Seller Family Pack
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  5 Zinger Burgers + Large Fries + 1.5L
                </h4>
                <span className="text-xs font-black text-slate-900 dark:text-white font-mono">
                  Rs. 2350/-
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
