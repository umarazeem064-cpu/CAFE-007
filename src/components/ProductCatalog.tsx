import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Flame,
  Sparkles,
  Heart,
  ChevronRight,
  ArrowLeft,
  Plus,
  Minus,
} from 'lucide-react';

const CATEGORIES: Array<{ id: ProductCategory; labelKey: string }> = [
  { id: 'all', labelKey: 'all_items' },
  { id: 'pizza_deals', labelKey: 'cat_pizza_deals' },
  { id: 'fast_food_deals', labelKey: 'cat_fast_food_deals' },
  { id: 'burgers', labelKey: 'cat_burgers' },
  { id: 'wraps', labelKey: 'cat_wraps' },
  { id: 'snacks', labelKey: 'cat_snacks' },
  { id: 'albaik', labelKey: 'cat_albaik' },
  { id: 'pasta', labelKey: 'cat_pasta' },
];

export const ProductCatalog: React.FC = () => {
  const {
    t,
    language,
    cart,
    addToCart,
    updateQuantity,
    setCustomizingProduct,
    userProfile,
    toggleFavorite,
    setIsCartOpen,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 'S' | 'M' | 'L'>>({});

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Spicy / Popular toggles
      if (filterSpicyOnly && !item.isSpicy) return false;
      if (filterPopularOnly && !item.isPopular) return false;

      // Text query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName =
          item.name.toLowerCase().includes(query) ||
          item.nameUrdu.toLowerCase().includes(query) ||
          item.nameRoman.toLowerCase().includes(query);
        const matchDesc =
          item.description.toLowerCase().includes(query) ||
          item.descriptionUrdu.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchTags = item.tags?.some((tag) => tag.toLowerCase().includes(query));

        if (!matchName && !matchDesc && !matchCategory && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, filterSpicyOnly, filterPopularOnly]);

  const getSelectedSize = (product: Product): 'S' | 'M' | 'L' | undefined => {
    if (!product.sizes || product.sizes.length === 0) return undefined;
    if (selectedSizes[product.id]) return selectedSizes[product.id];
    const medium = product.sizes.find((s) => s.size === 'M');
    return medium ? 'M' : product.sizes[0].size;
  };

  const handleAddSingleItem = (product: Product) => {
    const size = getSelectedSize(product);
    addToCart(product, size ? { size } : undefined);
  };

  const handleBuyNow = (product: Product) => {
    const size = getSelectedSize(product);
    const existing = cart.find(
      (item) =>
        item.productId === product.id &&
        (size ? item.selectedSize === size : !item.selectedSize)
    );
    if (!existing) {
      addToCart(product, size ? { size } : undefined);
    }
    setIsCartOpen(true);
  };

  const getItemDisplayName = (product: Product) => {
    if (language === 'ur') return product.nameUrdu || product.name;
    if (language === 'ro') return product.nameRoman || product.name;
    return product.name;
  };

  const getItemDisplayDesc = (product: Product) => {
    if (language === 'ur') return product.descriptionUrdu || product.description;
    return product.description;
  };

  return (
    <section id="menu-section" className="py-12 lg:py-16 bg-white dark:bg-[#0c0d12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Title & Search bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              {selectedCategory !== 'all' || searchQuery || filterSpicyOnly || filterPopularOnly ? (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setFilterSpicyOnly(false);
                    setFilterPopularOnly(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-xs font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('back')} ({t('all_items')})</span>
                </button>
              ) : (
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('back_to_home')}</span>
                </button>
              )}
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <span>Freshly Prepared Daily</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Our 26 Signature Dishes &amp; Deals
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              26 distinct dishes from Café 007 Mart Burewala — full uncropped platter views from Pizza Deals and Zinger Burgers to Al-Baik Broast and Creamy Pasta.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-150 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Quick Filters & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
            <div className="flex items-center gap-2 font-medium">
              <span>
                Showing <strong className="text-slate-900 dark:text-white tabular-nums">{filteredProducts.length}</strong> items
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  (Reset Category)
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterPopularOnly(!filterPopularOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  filterPopularOnly
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('filter_popular')}</span>
              </button>

              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  filterSpicyOnly
                    ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('filter_spicy')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              No items found matching "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for "pizza", "zinger", "broast", or "shawarma".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterSpicyOnly(false);
                setFilterPopularOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {filteredProducts.map((product) => {
              const isFav = userProfile.favoriteProductIds.includes(product.id);
              const hasSizes = !!product.sizes && product.sizes.length > 0;
              const activeSize = getSelectedSize(product);
              const activeSizeObj = hasSizes
                ? product.sizes!.find((s) => s.size === activeSize) || product.sizes![0]
                : undefined;
              const displayPrice = activeSizeObj
                ? `Rs. ${activeSizeObj.price}/-`
                : `Rs. ${product.price}/-`;
              const cartEntry = cart.find(
                (item) =>
                  item.productId === product.id &&
                  (hasSizes ? item.selectedSize === activeSize : true)
              );

              return (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Flexible Full-Dish Image Container (no cropping, full dish visible) */}
                    <div
                      onClick={() => setCustomizingProduct(product)}
                      className="relative min-h-[210px] w-full bg-white dark:bg-slate-900/60 overflow-hidden flex items-center justify-center p-3 sm:p-4 border-b border-slate-100 dark:border-slate-700/50 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto max-h-72 object-contain rounded-lg group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-xs"
                        aria-label="Add to Favorites"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>

                      {/* Tag Badge */}
                      {product.tags && product.tags.length > 0 && (
                        <span className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-xs text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                          {product.tags[0]}
                        </span>
                      )}

                      {/* Spicy icon badge */}
                      {product.isSpicy && (
                        <span className="absolute bottom-2.5 left-2.5 bg-rose-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" />
                          <span>Spicy</span>
                        </span>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 truncate">
                          {product.category.replace('_', ' ')}
                        </span>
                        {product.prepTimeMinutes && (
                          <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                            ~{product.prepTimeMinutes} mins
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => setCustomizingProduct(product)}
                        className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors cursor-pointer"
                      >
                        {getItemDisplayName(product)}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {getItemDisplayDesc(product)}
                      </p>

                      {/* Quick Size Selector if Dish has Sizes */}
                      {hasSizes && (
                        <div className="flex items-center gap-1.5 pt-1">
                          {product.sizes!.map((sz) => (
                            <button
                              key={sz.size}
                              type="button"
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [product.id]: sz.size,
                                }))
                              }
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
                                activeSize === sz.size
                                  ? 'bg-amber-500 border-amber-500 text-slate-950'
                                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {sz.size} · Rs.{sz.price}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Price Display & Customize Trigger */}
                      <div className="pt-1.5 flex items-center justify-between">
                        <span className="text-sm font-black text-slate-900 dark:text-white font-mono tabular-nums">
                          {displayPrice}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCustomizingProduct(product)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          <SlidersHorizontal className="w-3 h-3" />
                          <span>{t('customise')}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons: Always Add to Cart (or live Qty) + Buy Now */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    {cartEntry ? (
                      <div className="w-full py-1 px-1.5 bg-amber-500/15 border border-amber-500 rounded-xl flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartEntry.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-black text-amber-700 dark:text-amber-400 font-mono tabular-nums">
                          {cartEntry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartEntry.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddSingleItem(product)}
                        className="w-full py-2 px-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('add_to_cart')}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleBuyNow(product)}
                      className="w-full py-2 px-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors shadow-xs"
                    >
                      <span>{cartEntry ? t('view_cart') : t('buy_now')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
