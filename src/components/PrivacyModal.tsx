import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowLeft, ShieldCheck, Lock, Download, Trash2, CheckCircle2 } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyOpen, setIsPrivacyOpen, userProfile, orders, t } = useApp();

  if (!isPrivacyOpen) return null;

  const handleExportData = () => {
    const data = {
      profile: userProfile,
      orders,
      exportedAt: new Date().toISOString(),
      app: 'Café 007 Mart Official Website',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cafe007-user-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to permanently erase your stored address and order history from this device?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('back')}</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Privacy Policy &amp; Security Protocols
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Café 007 Mart · End-to-End User Data Control
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>Zero-Tracker &amp; Confidential Data Policy</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Café 007 Mart treats your privacy with top-tier security standards. Your phone number and home delivery address are strictly utilized for kitchen meal preparation and delivery rider routing.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              1. Information We Collect
            </h4>
            <p>
              When you place an order or book a reservation, we collect your name, contact phone number, chosen delivery location, and order customization preferences. No payment card details are stored on our servers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              2. WhatsApp Order Dispatch
            </h4>
            <p>
              When you click "Place Order &amp; WhatsApp", your order summary is transferred directly to our official Café 007 WhatsApp hotline (<strong>0346-7787007</strong>) using WhatsApp's end-to-end encrypted messaging infrastructure.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              3. User Data Rights &amp; Self-Service Control
            </h4>
            <p>
              You maintain 100% control over your information. You can download a complete backup of your orders or erase all records from this browser at any time.
            </p>
          </div>

          {/* User Control Buttons */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-slate-900 dark:text-white block text-xs">
              Manage Your Personal Data:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export My Data (JSON)</span>
              </button>

              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Erase All Data</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl"
          >
            I Understand &amp; Agree
          </button>
        </div>

      </div>
    </div>
  );
};
