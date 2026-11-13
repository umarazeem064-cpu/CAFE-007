import React from 'react';
import { useApp } from '../context/AppContext';
import { BRANCHES } from '../data/branches';
import {
  PhoneCall,
  MapPin,
  Instagram,
  ShieldCheck,
  CalendarDays,
  Compass,
  Star,
  Bike,
  Heart,
  ChevronRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    t,
    setIsReservationOpen,
    setIsLiveTrackOpen,
    setIsFeedbackOpen,
    setIsPrivacyOpen,
  } = useApp();

  const mainBranch = BRANCHES.find((b) => b.isMain) || BRANCHES[0];
  const otherBranches = BRANCHES.filter((b) => !b.isMain);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 overflow-hidden flex items-center justify-center p-0.5">
                <img
                  src="/images/logo_007.jpg"
                  alt="Cafe 007 Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight uppercase block leading-none">
                  CAFÉ <span className="text-amber-500">007</span> MART
                </span>
                <span className="text-[11px] text-amber-400 font-semibold tracking-wide">
                  Let's Hangout... Quality is our recipe
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Burewala's premier family restaurant &amp; fast-food hub on Ratta Tibba Road. Proudly serving authentic pizzas with Shahi Crown crusts, crispy Al-Baik style broast, juicy zingers, loaded fries, and refreshing shakes.
            </p>

            {/* Helpline Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href="tel:03467787007"
                className="flex items-center gap-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Delivery Hotline: 0346-7787007</span>
              </a>

              <a
                href="tel:03006966007"
                className="flex items-center gap-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Support Line: 0300-6966007</span>
              </a>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://www.instagram.com/cafe007.455"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-400" />
                <span>@cafe007.455/E.B</span>
              </a>
            </div>
          </div>

          {/* Quick Nav & Services (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu-section" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>26 Signature Dishes</span>
                </a>
              </li>
              <li>
                <a href="#deals-section" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Big Pizza Deals (1-10)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                  <span>Table Booking &amp; Mezbani</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLiveTrackOpen(true)}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>Live GPS Order Tracking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>Customer Reviews &amp; Feedback</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy &amp; Security</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Main Branch & Map (Cols 8-9) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Main Location &amp; Branch Network
            </h4>

            {/* Main Burewala Address Card */}
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">
                  {mainBranch.name}
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                  FLAGSHIP
                </span>
              </div>
              <p className="text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{mainBranch.address}</span>
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{mainBranch.hours}</span>
                <a
                  href={mainBranch.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Other Branches list from the flyer */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
                Regional City Branches:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {otherBranches.map((b) => (
                  <span
                    key={b.id}
                    className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700/60"
                  >
                    {b.name.replace(' Branch', '')}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} CAFÉ 007 MART Burewala. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-slate-300 hover:underline"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="hover:text-slate-300 hover:underline"
            >
              Feedback Form
            </button>
            <span>·</span>
            <a
              href="https://maps.app.goo.gl/h9wbLVXorf6rmiAu7"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 hover:underline"
            >
              Google Maps
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
