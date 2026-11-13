import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRANCHES } from '../data/branches';
import { PaymentMethod } from '../types';
import {
  X,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Bike,
  Building2,
  Phone,
  User,
  MapPin,
  CreditCard,
  Wallet,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    placeOrder,
    userProfile,
    setIsLiveTrackOpen,
    t,
  } = useApp();

  const [customerName, setCustomerName] = useState(userProfile.name || '');
  const [customerPhone, setCustomerPhone] = useState(userProfile.phone || '0346-7787007');
  const [customerAddress, setCustomerAddress] = useState(
    userProfile.primaryAddress || 'Street 4, Ratta Tibba Road, Burewala'
  );
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].name);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleOrder = (viaWhatsApp: boolean) => {
    if (cart.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please provide your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    placeOrder(
      {
        customerName,
        customerPhone,
        customerAddress,
        branch: selectedBranch,
        paymentMethod,
        notes,
      },
      viaWhatsApp
    );
    setIsSubmitting(false);
    setIsLiveTrackOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('back')}</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                Your Order Bag
              </h2>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {cart.length} item{cart.length === 1 ? '' : 's'} added
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-500 hover:underline font-semibold"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Cart Empty State */}
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('empty_cart')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  {t('empty_cart_msg')}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Order Items
                </span>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3"
                  >
                    <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-lg p-1 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 space-x-1.5 mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedCrust && <span>· {item.selectedCrust}</span>}
                        {item.extraTopping && <span>· Extra Topping</span>}
                        {item.extraCheese && <span>· Extra Cheese</span>}
                        {item.selectedDrink && <span>· {item.selectedDrink}</span>}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white font-mono tabular-nums">
                          Rs. {item.unitPrice * item.quantity}/-
                        </span>

                        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono text-slate-900 dark:text-white tabular-nums px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Information Section */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Delivery Details (Burewala &amp; Hubs)
                </span>

                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name:
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Azeem Umar"
                        className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Mobile / WhatsApp Number:
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0346-7787007"
                        className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Delivery Address (Street / Sector / Area):
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <textarea
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={2}
                        placeholder="House #, Street #, Ratta Tibba Road, Burewala"
                        className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Select Nearest Branch:
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Payment Gateway
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'cod', label: 'Cash on Delivery (COD)', icon: Wallet },
                    { id: 'jazzcash', label: 'JazzCash Wallet', icon: Phone },
                    { id: 'easypaisa', label: 'Easypaisa Wallet', icon: Phone },
                    { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-amber-500" />
                        <span className="truncate">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Order / Kitchen Notes:
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ring doorbell, send garlic mayo and extra napkins."
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Security and Free Delivery Guarantee */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-400">
                <Bike className="w-4 h-4 shrink-0" />
                <span className="font-semibold">
                  Free Express Delivery across Burewala &amp; nearby regions.
                </span>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer with Actions */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 space-y-3">
            
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t('subtotal')}</span>
                <span className="font-mono tabular-nums">Rs. {cartSubtotal}/-</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t('delivery_charges')}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  {t('free')}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>{t('grand_total')}</span>
                <span className="font-mono tabular-nums text-base text-amber-600 dark:text-amber-400">
                  Rs. {cartTotal}/-
                </span>
              </div>
            </div>

            {/* Checkout Action: Place Order & WhatsApp */}
            <div className="pt-1">
              <button
                onClick={() => handleOrder(true)}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>{t('place_order_whatsapp')}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t('security_guarantee')}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
