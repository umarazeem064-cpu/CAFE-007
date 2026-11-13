import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ArrowLeft,
  Compass,
  CheckCircle2,
  Clock,
  Bike,
  PhoneCall,
  MessageCircle,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const LiveOrderTracker: React.FC = () => {
  const { isLiveTrackOpen, setIsLiveTrackOpen, activeOrder, orders, t } = useApp();

  const currentOrder = activeOrder || orders[0] || null;
  const [riderProgress, setRiderProgress] = useState(65); // 0 to 100% on the map route

  // Simulate rider bike movement along route
  useEffect(() => {
    if (!isLiveTrackOpen) return;
    const interval = setInterval(() => {
      setRiderProgress((prev) => (prev >= 95 ? 30 : prev + 2));
    }, 2500);
    return () => clearInterval(interval);
  }, [isLiveTrackOpen]);

  if (!isLiveTrackOpen) return null;

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', time: '12 mins ago', done: true },
    {
      key: 'preparing',
      label: 'Kitchen Cooking',
      time: '6 mins ago',
      done: currentOrder?.status !== 'confirmed',
    },
    {
      key: 'on_the_way',
      label: 'Rider on the Way',
      time: 'On Route',
      done: currentOrder?.status === 'on_the_way' || currentOrder?.status === 'delivered',
    },
    {
      key: 'delivered',
      label: 'Delivered',
      time: 'Estimated ~12 mins',
      done: currentOrder?.status === 'delivered',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsLiveTrackOpen(false)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('back')}</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Live GPS Order Tracking
                </h3>
                {currentOrder && (
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold rounded">
                    #{currentOrder.orderNumber}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Café 007 Hub · Ratta Tibba Road, Burewala
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsLiveTrackOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Simulated Interactive Live Map View */}
          <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 shadow-inner">
            {/* Map styling grid & road representation */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Simulated Road Lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 50 140 Q 180 60 300 110 T 520 80"
                fill="none"
                stroke="#334155"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 50 140 Q 180 60 300 110 T 520 80"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>

            {/* Hub Marker (Left: Ratta Tibba Road Burewala) */}
            <div className="absolute left-8 top-28 -translate-y-1/2 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center shadow-lg">
                <img
                  src="/images/logo_007.jpg"
                  alt="007 Hub"
                  className="w-6 h-6 rounded-full object-cover"
                />
              </div>
              <span className="text-[10px] font-bold text-amber-400 mt-1 bg-slate-950/80 px-1.5 py-0.5 rounded shadow">
                Café 007 Hub
              </span>
            </div>

            {/* Destination Marker (Right: Customer Address) */}
            <div className="absolute right-8 top-16 -translate-y-1/2 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 mt-1 bg-slate-950/80 px-1.5 py-0.5 rounded shadow">
                Your Doorstep
              </span>
            </div>

            {/* Moving Rider on the Path */}
            <div
              className="absolute top-20 -translate-y-1/2 flex flex-col items-center transition-all duration-1000 ease-linear"
              style={{ left: `${Math.min(80, Math.max(25, riderProgress))}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-amber-500/30">
                <Bike className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-950 bg-amber-400 px-2 py-0.5 rounded-full mt-1 shadow font-mono">
                Rider Tariq
              </span>
            </div>

            {/* Live ETA Card Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">ETA:</span>
              <strong className="text-white font-mono">~12 - 15 Mins</strong>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-slate-300">
              <span className="text-emerald-400 font-bold">Speed:</span> 38 km/h · Honda 125
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Order Progress
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {steps.map((st, idx) => (
                <div
                  key={st.key}
                  className={`p-3 rounded-xl border flex flex-col justify-between ${
                    st.done
                      ? 'border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${st.done ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`}
                    />
                  </div>
                  <span className="text-xs font-bold leading-tight">{st.label}</span>
                  <span className="text-[10px] opacity-75 mt-1">{st.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rider Profile Card & Direct Hotline */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-amber-500 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/images/delivery_rider.jpg"
                  alt="Rider Tariq"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Tariq Khan (Express Delivery Rider)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Assigned Bike: Honda 125 · Burewala Central Route
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="tel:03467787007"
                className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Rider</span>
              </a>

              <a
                href="https://wa.me/923467787007?text=Hi%20Tariq!%20Where%20is%20my%20Cafe%20007%20order?"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Order Details Receipt */}
          {currentOrder && (
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Order Receipt Summary
              </span>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery Address:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-xs">
                    {currentOrder.customerAddress}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Payment Status:</span>
                  <span className="font-semibold text-slate-900 dark:text-white uppercase">
                    {currentOrder.paymentMethod} (Cash On Delivery)
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Items:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {currentOrder.items.length} item(s)
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>Total Amount:</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">
                    Rs. {currentOrder.total}/-
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
