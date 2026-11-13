import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ArrowLeft,
  User,
  Shield,
  CreditCard,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Receipt,
  RotateCcw,
  Plus,
  Trash2,
  Lock,
} from 'lucide-react';

export const ProfileDrawer: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    userProfile,
    updateProfile,
    orders,
    addToCart,
    setIsCartOpen,
    setIsLiveTrackOpen,
    setActiveOrder,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'security'>('dashboard');
  const [newAddressLabel, setNewAddressLabel] = useState('');
  const [newAddressText, setNewAddressText] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);

  if (!isProfileOpen) return null;

  // Analytics Calculations
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const totalDeliverySaved = orders.length * 150; // Rs. 150 saved per free delivery!

  const handleAddAddress = () => {
    if (!newAddressLabel.trim() || !newAddressText.trim()) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddressLabel.trim(),
      address: newAddressText.trim(),
    };
    updateProfile({
      savedAddresses: [...userProfile.savedAddresses, newAddr],
    });
    setNewAddressLabel('');
    setNewAddressText('');
    setShowAddAddress(false);
  };

  const handleRemoveAddress = (id: string) => {
    updateProfile({
      savedAddresses: userProfile.savedAddresses.filter((a) => a.id !== id),
    });
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      addToCart(
        {
          id: item.productId,
          name: item.name,
          nameUrdu: item.name,
          nameRoman: item.name,
          category: 'pizza_deals',
          price: item.unitPrice,
          description: '',
          descriptionUrdu: '',
          image: item.image,
        },
        {
          size: item.selectedSize,
          crust: item.selectedCrust,
          extraTopping: item.extraTopping,
          extraCheese: item.extraCheese,
          drink: item.selectedDrink,
          quantity: item.quantity,
        }
      );
    });
    setIsProfileOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => {
                if (activeTab !== 'dashboard') {
                  setActiveTab('dashboard');
                } else {
                  setIsProfileOpen(false);
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('back')}</span>
            </button>
            <div className="w-11 h-11 rounded-2xl bg-amber-500 overflow-hidden flex items-center justify-center p-0.5 shadow-sm">
              <img
                src="/images/logo_007.jpg"
                alt="Agent"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {userProfile.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  Agent 007 Elite
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {userProfile.phone} · {userProfile.loyaltyPoints} Reward Points
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-5 text-xs font-bold overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard & Analytics' },
            { id: 'orders', label: `Order History (${orders.length})` },
            { id: 'addresses', label: 'Saved Addresses' },
            { id: 'security', label: 'Security & Gateway' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-extrabold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: DASHBOARD & ANALYTICS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Total Orders
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono tabular-nums">
                    {orders.length}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Points Earned
                  </span>
                  <span className="text-lg font-black text-amber-500 font-mono tabular-nums">
                    {userProfile.loyaltyPoints}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                    Free Delivery
                  </span>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                    Rs. {totalDeliverySaved}
                  </span>
                </div>
              </div>

              {/* Loyalty Reward Status */}
              <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>007 Secret Agent Status</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    Gold Tier
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  You earn 1 Reward Point for every Rs. 50 spent. Redeem points at checkout for free pizza toppings or dessert shakes!
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (userProfile.loyaltyPoints / 500) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 block">
                  {500 - userProfile.loyaltyPoints} points until Free Large Pizza treat!
                </span>
              </div>

              {/* Recent Order Quick Card */}
              {orders.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Latest Order
                  </span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                          #{orders[0].orderNumber}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                          {orders[0].status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                        {orders[0].items.length} items · Rs. {orders[0].total}/-
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveOrder(orders[0]);
                        setIsProfileOpen(false);
                        setIsLiveTrackOpen(true);
                      }}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
                    >
                      Track Live
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDER HISTORY TRACKER */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No previous orders placed yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                            {ord.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {new Date(ord.createdAt).toLocaleDateString()} at{' '}
                          {new Date(ord.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <span className="font-mono font-black text-sm text-slate-900 dark:text-white tabular-nums">
                        Rs. {ord.total}/-
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700">
                      {ord.items.map((it) => (
                        <div
                          key={it.id}
                          className="flex justify-between text-xs text-slate-600 dark:text-slate-300"
                        >
                          <span className="truncate max-w-[240px]">
                            {it.name} x {it.quantity}
                          </span>
                          <span className="font-mono tabular-nums text-slate-400">
                            Rs. {it.unitPrice * it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setActiveOrder(ord);
                          setIsProfileOpen(false);
                          setIsLiveTrackOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        View Live Track
                      </button>

                      <button
                        onClick={() => handleReorder(ord)}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Delivery Addresses
                </span>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-3 text-xs border border-slate-300 dark:border-slate-700">
                  <div>
                    <label className="font-semibold block mb-1">Label (e.g. Home, Office):</label>
                    <input
                      type="text"
                      value={newAddressLabel}
                      onChange={(e) => setNewAddressLabel(e.target.value)}
                      placeholder="e.g. Home"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Full Street Address:</label>
                    <input
                      type="text"
                      value={newAddressText}
                      onChange={(e) => setNewAddressText(e.target.value)}
                      placeholder="Street 4, Ratta Tibba Road, Burewala"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-3 py-1.5 text-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddAddress}
                      className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}

              {/* List */}
              <div className="space-y-2">
                {userProfile.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {addr.label}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                          {addr.address}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveAddress(addr.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & PAYMENT GATEWAY */}
          {activeTab === 'security' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    Data Security &amp; End-to-End Encryption
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Your address and order payloads are protected via SSL/TLS 256-bit client-side encryption. We never share customer records with third-party advertisers.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Verified PCI-DSS Compliant Gateway Integration</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Supported Payment Methods
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>JazzCash (0346-7787007)</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Easypaisa (0346-7787007)</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>PayPak / Visa / Mastercard</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl space-y-2">
                <span className="font-bold text-rose-700 dark:text-rose-400 block">
                  Clear Stored Session Data
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Want to clear all local order history and saved addresses from this device?
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your local order history?')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="px-3.5 py-1.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700"
                >
                  Clear Local Storage
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
