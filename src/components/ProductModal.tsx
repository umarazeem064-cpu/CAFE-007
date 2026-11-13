import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowLeft, ShoppingBag, Plus, Minus, Check, ChevronRight } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    customizingProduct,
    setCustomizingProduct,
    addToCart,
    setIsCartOpen,
    t,
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [selectedCrust, setSelectedCrust] = useState<string>('Regular Crust');
  const [extraTopping, setExtraTopping] = useState<boolean>(false);
  const [extraCheese, setExtraCheese] = useState<boolean>(false);
  const [selectedDrink, setSelectedDrink] = useState<string>('Coca-Cola');
  const [instructions, setInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (customizingProduct) {
      setSelectedSize(customizingProduct.sizes ? 'M' : 'S');
      setSelectedCrust('Regular Crust');
      setExtraTopping(false);
      setExtraCheese(false);
      setSelectedDrink('Coca-Cola');
      setInstructions('');
      setQuantity(1);
    }
  }, [customizingProduct]);

  if (!customizingProduct) return null;

  // Calculate dynamic unit price
  let basePrice = customizingProduct.price;
  if (customizingProduct.sizes) {
    const sizeMatch = customizingProduct.sizes.find((s) => s.size === selectedSize);
    if (sizeMatch) basePrice = sizeMatch.price;
  }
  if (selectedCrust.includes('Crown')) basePrice += 150;
  if (selectedCrust.includes('Kebab')) basePrice += 200;
  if (extraTopping) basePrice += 100;
  if (extraCheese) basePrice += 80;

  const totalPrice = basePrice * quantity;

  const handleAddToCart = () => {
    addToCart(customizingProduct, {
      size: customizingProduct.sizes ? selectedSize : undefined,
      crust: selectedCrust,
      extraTopping,
      extraCheese,
      drink: selectedDrink,
      instructions,
      quantity,
    });
    setCustomizingProduct(null);
  };

  const handleBuyNowToCart = () => {
    addToCart(customizingProduct, {
      size: customizingProduct.sizes ? selectedSize : undefined,
      crust: selectedCrust,
      extraTopping,
      extraCheese,
      drink: selectedDrink,
      instructions,
      quantity,
    });
    setCustomizingProduct(null);
    setIsCartOpen(true);
  };

  const isPizza =
    customizingProduct.category.includes('pizza') || !!customizingProduct.sizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Modal Header with close button */}
        <div className="relative min-h-[210px] bg-white dark:bg-slate-800 flex items-center justify-center p-5 border-b border-slate-100 dark:border-slate-800">
          <img
            src={customizingProduct.image}
            alt={customizingProduct.name}
            className="w-full h-auto max-h-72 object-contain rounded-lg"
          />
          <button
            onClick={() => setCustomizingProduct(null)}
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold hover:scale-105 transition-transform shadow-sm"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('back')}</span>
          </button>
          <button
            onClick={() => setCustomizingProduct(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:scale-105 transition-transform shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {customizingProduct.category.replace('_', ' ')}
              </span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono tabular-nums">
                Rs. {basePrice}/-
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {customizingProduct.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {customizingProduct.description}
            </p>
          </div>

          {/* Pizza Size Selection */}
          {customizingProduct.sizes && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Select Pizza Size:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {customizingProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      selectedSize === s.size
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      Rs. {s.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Crust Type (for pizzas) */}
          {isPizza && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Crust Option:
              </label>
              <div className="space-y-2">
                {[
                  { id: 'Regular Crust', label: 'Regular Hand-Tossed Crust (Standard)', cost: 0 },
                  { id: 'Shahi Crown Crust', label: 'Crown / Shahi Stuffed Crust (+Rs. 150)', cost: 150 },
                  { id: 'Kebab Crust', label: 'Kebab Stuffed Edge Crust (+Rs. 200)', cost: 200 },
                ].map((crust) => (
                  <button
                    key={crust.id}
                    type="button"
                    onClick={() => setSelectedCrust(crust.id)}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      selectedCrust === crust.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{crust.label}</span>
                    {selectedCrust === crust.id && <Check className="w-4 h-4 text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons and toppings */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Extra Customizations:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setExtraTopping(!extraTopping)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  extraTopping
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>Extra Topping (+Rs. 100)</span>
                {extraTopping && <Check className="w-4 h-4 text-amber-500" />}
              </button>

              <button
                type="button"
                onClick={() => setExtraCheese(!extraCheese)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  extraCheese
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>Extra Cheese Slice (+Rs. 80)</span>
                {extraCheese && <Check className="w-4 h-4 text-amber-500" />}
              </button>
            </div>
          </div>

          {/* Drink Option if deal has drinks */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Preferred Soft Drink:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Coca-Cola', 'Sprite', 'Fanta', 'Pakola'].map((drink) => (
                <button
                  key={drink}
                  type="button"
                  onClick={() => setSelectedDrink(drink)}
                  className={`py-2 px-2 text-center rounded-xl border text-xs font-bold transition-all ${
                    selectedDrink === drink
                      ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {drink}
                </button>
              ))}
            </div>
          </div>

          {/* Special Cooking Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Special Instructions:
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Well done crust, extra spicy, no onions..."
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors shadow-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold font-mono text-sm text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Total Payable</span>
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
              Rs. {totalPrice}/-
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('add_to_cart')}</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNowToCart}
              className="flex-1 sm:flex-none px-5 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>{t('buy_now')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
