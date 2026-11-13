import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ShoppingBag, Sparkles, Check, ChevronRight, ArrowLeft, Plus, Minus, SlidersHorizontal } from 'lucide-react';

export const DealsCarousel: React.FC = () => {
  const { t, cart, addToCart, updateQuantity, setCustomizingProduct, setIsCartOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'pizza' | 'fast_food'>('all');

  const pizzaDeals = PRODUCTS.filter((p) => p.category === 'pizza_deals');
  const fastFoodDeals = PRODUCTS.filter(
    (p) =>
      p.category === 'fast_food_deals' ||
      p.category === 'albaik' ||
      p.category === 'burgers' ||
      p.category === 'wraps'
  );

  const displayedDeals =
    activeTab === 'pizza'
      ? pizzaDeals
      : activeTab === 'fast_food'
      ? fastFoodDeals
      : [...pizzaDeals.slice(0, 3), ...fastFoodDeals.slice(0, 3)];

  const handleBuyNow = (deal: Product) => {
    const existing = cart.find((item) => item.productId === deal.id);
    if (!existing) {
      addToCart(deal);
    }
    setIsCartOpen(true);
  };

  return (
    <section id="deals-section" className="py-12 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
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
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Unbeatable Meal Combos</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Big Pizza &amp; Fast Food Value Deals
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Authentic recipes straight from our menu flyers. Every deal includes fresh sides, crispy fries, and ice-cold drinks.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Featured Deals
            </button>
            <button
              onClick={() => setActiveTab('pizza')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'pizza'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Pizza Deals (1-10)
            </button>
            <button
              onClick={() => setActiveTab('fast_food')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'fast_food'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Fast Food &amp; Broast
            </button>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {displayedDeals.map((deal) => {
            const cartEntry = cart.find((item) => item.productId === deal.id);
            return (
              <div
                key={deal.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Flexible Full-Dish Image Container */}
                  <div
                    onClick={() => setCustomizingProduct(deal)}
                    className="relative min-h-[210px] w-full bg-white dark:bg-slate-900/60 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100 dark:border-slate-700/50 cursor-pointer"
                  >
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-auto max-h-72 object-contain rounded-lg group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                    {deal.tags && deal.tags.length > 0 && (
                      <span className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-xs text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                        {deal.tags[0]}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomizingProduct(deal);
                      }}
                      className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1 hover:border-amber-500 transition-colors"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-amber-500" />
                      <span>{t('customise')}</span>
                    </button>
                    <span className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded shadow-xs font-mono tabular-nums">
                      Rs. {deal.price}/-
                    </span>
                  </div>

                  {/* Deal Information */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3
                        onClick={() => setCustomizingProduct(deal)}
                        className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors cursor-pointer"
                      >
                        {deal.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {deal.description}
                      </p>
                    </div>

                    {/* Itemized deal bullets if available */}
                    {deal.dealItems && deal.dealItems.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                        {deal.dealItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons: Add to Cart (or Qty Stepper) + Buy Now (Cart Checkout) */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  {cartEntry ? (
                    <div className="w-full py-1.5 px-2 bg-amber-500/15 border border-amber-500 rounded-xl flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => updateQuantity(cartEntry.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-amber-700 dark:text-amber-400 font-mono tabular-nums">
                        {cartEntry.quantity} {t('in_cart')}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(cartEntry.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCart(deal)}
                      className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t('add_to_cart')}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleBuyNow(deal)}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>{cartEntry ? t('view_cart') : t('buy_now')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View full menu anchor */}
        <div className="text-center pt-4">
          <a
            href="#menu-section"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <span>Looking for our complete individual pizzas, burgers, pasta, and shakes?</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
