import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Moon,
  Sun,
  Globe,
  Bell,
  User,
  PhoneCall,
  Menu,
  X,
  Compass,
  CalendarDays,
  ShieldCheck,
  Star,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    theme,
    toggleTheme,
    cartCount,
    setIsCartOpen,
    setIsProfileOpen,
    setIsReservationOpen,
    setIsLiveTrackOpen,
    setIsFeedbackOpen,
    setIsPrivacyOpen,
    unreadNotificationCount,
    notifications,
    markNotificationsAsRead,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcements & Delivery Helpline Ribbon */}
      <div className="bg-amber-500 text-slate-950 text-xs font-semibold px-4 py-1.5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider">
              FREE HOME DELIVERY
            </span>
            <span className="hidden sm:inline">Ratta Tibba Road, Burewala &amp; All City Branches</span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <a
              href="tel:03467787007"
              className="flex items-center gap-1 hover:underline text-slate-950 font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
              <span>0346-7787007</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a
              href="tel:03006966007"
              className="hidden md:flex items-center gap-1 hover:underline text-slate-950"
            >
              <span>0300-6966007</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Zone 1: Single Brand Element */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-amber-500 overflow-hidden flex items-center justify-center p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src="/images/logo_007.jpg"
                  alt="Cafe 007 Logo"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-none">
                  CAFÉ <span className="text-amber-500">007</span> MART
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                  Burewala · Let's Hangout
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <a
              href="#menu-section"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t('menu')}
            </a>
            <a
              href="#deals-section"
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t('deals')}
            </a>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t('reservations')}
            </button>
            <button
              onClick={() => setIsLiveTrackOpen(true)}
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>{t('tracking')}</span>
            </button>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{t('reviews')}</span>
            </button>
          </nav>

          {/* Zone 3: Actions (Theme, Language, Notifications, Profile, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Switch */}
            <div className="relative">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'en'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                  title="English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ur')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'ur'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                  title="اردو"
                >
                  اردو
                </button>
                <button
                  onClick={() => setLanguage('ro')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'ro'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                  title="Roman Urdu"
                >
                  RO
                </button>
              </div>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Dark Mode"
              title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  if (!isNotifOpen) markNotificationsAsRead();
                }}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">
                      Notifications &amp; Updates
                    </span>
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs"
                      >
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {n.title}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {n.message}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Dashboard Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="User Profile & Order History"
              title={t('profile')}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-xs shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t('cart')}</span>
              <span className="bg-slate-950 text-amber-400 px-1.5 py-0.2 rounded-full text-[11px] font-mono tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
            <a
              href="#menu-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              {t('menu')}
            </a>
            <a
              href="#deals-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              {t('deals')}
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="w-full text-left py-2 text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span>{t('reservations')}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLiveTrackOpen(true);
              }}
              className="w-full text-left py-2 text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>{t('tracking')}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFeedbackOpen(true);
              }}
              className="w-full text-left py-2 text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span>{t('reviews')}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPrivacyOpen(true);
              }}
              className="w-full text-left py-2 text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t('privacy_policy')}</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
