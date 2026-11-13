import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, PhoneCall, Compass, ShoppingBag } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { cartCount, setIsCartOpen, activeOrder, setIsLiveTrackOpen } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Active Order Live Tracking Bubble */}
      {activeOrder && (
        <button
          onClick={() => setIsLiveTrackOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-900/95 dark:bg-slate-800/95 text-amber-400 text-xs font-bold rounded-full shadow-lg border border-amber-500/50 hover:scale-105 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Track Order #{activeOrder.orderNumber}</span>
        </button>
      )}

      {/* Floating Cart Pill on All Screens */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full shadow-xl hover:scale-105 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Cart ({cartCount})</span>
        </button>
      )}

      {/* Direct WhatsApp Floating Icon */}
      <a
        href="https://wa.me/923467787007?text=Hi%20Cafe%20007%20Mart!%20I%20want%20to%20order%20food."
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all border-2 border-white dark:border-slate-800"
        aria-label="Direct WhatsApp Order"
        title="Chat & Order on WhatsApp (0346-7787007)"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      </a>
    </div>
  );
};
