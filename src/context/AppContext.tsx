import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Product,
  CartItem,
  Order,
  Reservation,
  UserProfile,
  Review,
  AppNotification,
  PaymentMethod,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, options?: {
    size?: 'S' | 'M' | 'L';
    crust?: string;
    extraTopping?: boolean;
    extraCheese?: boolean;
    drink?: string;
    instructions?: string;
    quantity?: number;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;

  // Ordering & WhatsApp
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    branch: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }, viaWhatsApp?: boolean) => Order;

  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;

  // Reservations
  reservations: Reservation[];
  bookTable: (details: Omit<Reservation, 'id' | 'status'>) => Reservation;

  // Profile
  userProfile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleFavorite: (productId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (newReview: Omit<Review, 'id' | 'date'>) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type?: 'order' | 'deal' | 'system') => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isLiveTrackOpen: boolean;
  setIsLiveTrackOpen: (open: boolean) => void;
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: (open: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;
  customizingProduct: Product | null;
  setCustomizingProduct: (p: Product | null) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PROFILE: UserProfile = {
  name: 'Azeem Umar',
  phone: '0346-7787007',
  email: 'customer@cafe007.pk',
  primaryAddress: 'Street 4, Ratta Tibba Road, Burewala',
  savedAddresses: [
    { id: 'addr-1', label: 'Home', address: 'House 12, Street 4, Ratta Tibba Road, Burewala' },
    { id: 'addr-2', label: 'Office', address: 'Commercial Plaza, College Road, Burewala' },
  ],
  loyaltyPoints: 340,
  favoriteProductIds: ['pizza-deal-2', 'ff-deal-11', 'albaik-full', 'burger-mighty-zinger'],
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Malik Zeeshan',
    rating: 5,
    date: 'Yesterday',
    comment: 'Best pizza in Burewala! Shahi Crown Crust is absolutely loaded with cheese and chicken tikka.',
    dishRecommended: 'Shahi Crust Pizza',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    author: 'Hamza Arshad',
    rating: 5,
    date: '2 days ago',
    comment: 'The 5 Zinger Family Deal (Deal 11) is insane value for money. Fresh, steaming hot, and delivered in 25 mins.',
    dishRecommended: 'Family Deal 11',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    author: 'Dr. Ayesha Tariq',
    rating: 5,
    date: '4 days ago',
    comment: 'Al-Baik broast recipe is authentic, super juicy from inside and crispy outside with wonderful garlic dips.',
    dishRecommended: 'Al-Baik Broast (Half)',
    verifiedPurchase: true,
  },
  {
    id: 'rev-4',
    author: 'Usman Farooq',
    rating: 5,
    date: '1 week ago',
    comment: 'Great family sitting atmosphere on Ratta Tibba Road! Staff was polite and fast.',
    dishRecommended: 'Big Deal 9',
    verifiedPurchase: true,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('cafe007_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cafe007_lang', lang);
    if (lang === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.lang = 'ur';
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.lang = lang === 'ro' ? 'ur-Latn' : 'en';
    }
  };

  useEffect(() => {
    if (language === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cafe007_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Cafe 007 signature dark agent theme default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cafe007_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe007_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cafe007_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    options?: {
      size?: 'S' | 'M' | 'L';
      crust?: string;
      extraTopping?: boolean;
      extraCheese?: boolean;
      drink?: string;
      instructions?: string;
      quantity?: number;
    }
  ) => {
    let unitPrice = product.price;
    if (options?.size && product.sizes) {
      const match = product.sizes.find((s) => s.size === options.size);
      if (match) unitPrice = match.price;
    }
    if (options?.crust?.includes('Crown')) unitPrice += 150;
    if (options?.crust?.includes('Kebab')) unitPrice += 200;
    if (options?.extraTopping) unitPrice += 100;
    if (options?.extraCheese) unitPrice += 80;

    const qty = options?.quantity || 1;
    const itemInstanceId = `${product.id}-${options?.size || 'std'}-${options?.crust || 'std'}-${options?.extraTopping ? 'top' : ''}-${options?.extraCheese ? 'chs' : ''}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemInstanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemInstanceId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      const newItem: CartItem = {
        id: itemInstanceId,
        productId: product.id,
        name: product.name,
        image: product.image,
        unitPrice,
        quantity: qty,
        selectedSize: options?.size,
        selectedCrust: options?.crust,
        extraTopping: options?.extraTopping,
        extraCheese: options?.extraCheese,
        selectedDrink: options?.drink,
        specialInstructions: options?.instructions,
      };
      return [...prev, newItem];
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = 0; // FREE Home delivery as per flyer!
  const cartTotal = cartSubtotal + deliveryFee;

  // Profile & Saved details
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('cafe007_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('cafe007_profile', JSON.stringify(updated));
      return updated;
    });
    showToast('Profile updated successfully!');
  };

  const toggleFavorite = (productId: string) => {
    setUserProfile((prev) => {
      const exists = prev.favoriteProductIds.includes(productId);
      const nextFavorites = exists
        ? prev.favoriteProductIds.filter((id) => id !== productId)
        : [...prev.favoriteProductIds, productId];
      const updated = { ...prev, favoriteProductIds: nextFavorites };
      localStorage.setItem('cafe007_profile', JSON.stringify(updated));
      return updated;
    });
  };

  // Orders & Active Tracking
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('cafe007_orders');
      if (saved) return JSON.parse(saved);
      // Sample recent order for immediate live tracking demonstration
      const sampleOrder: Order = {
        id: 'ord-1007',
        orderNumber: '007-8491',
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        customerName: 'Azeem Umar',
        customerPhone: '0346-7787007',
        customerAddress: 'Ratta Tibba Road, Burewala',
        branch: 'Burewala (Main Branch)',
        items: [
          {
            id: 'item-1',
            productId: 'dish-02',
            name: 'Big Deal 3 (1 Large + 1 Medium Pizza + 1.5L Drink)',
            image: '/images/dish_02.jpg',
            unitPrice: 2550,
            quantity: 1,
            selectedSize: 'M',
            selectedDrink: 'Coca Cola',
          },
        ],
        subtotal: 2300,
        deliveryFee: 0,
        discount: 0,
        total: 2300,
        paymentMethod: 'cod',
        notes: 'Extra ketchup and garlic mayo sauce packet.',
        status: 'on_the_way',
        estimatedDeliveryMinutes: 14,
        riderName: 'Tariq Khan',
        riderPhone: '0346-7787007',
      };
      return [sampleOrder];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => orders[0] || null);

  useEffect(() => {
    localStorage.setItem('cafe007_orders', JSON.stringify(orders));
  }, [orders]);

  // Place Order & WhatsApp Handler
  const placeOrder = (
    details: {
      customerName: string;
      customerPhone: string;
      customerAddress: string;
      branch: string;
      paymentMethod: PaymentMethod;
      notes?: string;
    },
    viaWhatsApp: boolean = false
  ): Order => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `007-${randomCode}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerAddress: details.customerAddress,
      branch: details.branch,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discount: 0,
      total: cartTotal,
      paymentMethod: details.paymentMethod,
      notes: details.notes,
      status: 'confirmed',
      estimatedDeliveryMinutes: 25,
      riderName: 'Tariq Khan',
      riderPhone: '0346-7787007',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCartOpen(false);

    // Award loyalty points
    updateProfile({
      loyaltyPoints: userProfile.loyaltyPoints + Math.floor(cartTotal / 50),
      name: details.customerName || userProfile.name,
      phone: details.customerPhone || userProfile.phone,
      primaryAddress: details.customerAddress || userProfile.primaryAddress,
    });

    addNotification(
      `Order #${orderNumber} Confirmed!`,
      `Your delicious meal has been received by Café 007 Mart ${details.branch}. Kitchen is firing up the ovens!`,
      'order'
    );

    // Open WhatsApp with complete formatted order payload
    if (viaWhatsApp) {
      const itemsText = newOrder.items
        .map(
          (item, idx) =>
            `${idx + 1}. *${item.name}* x ${item.quantity} = Rs. ${item.unitPrice * item.quantity}${
              item.selectedSize ? ` [Size: ${item.selectedSize}]` : ''
            }${item.selectedCrust ? ` [Crust: ${item.selectedCrust}]` : ''}${
              item.selectedDrink ? ` [Drink: ${item.selectedDrink}]` : ''
            }`
        )
        .join('\n');

      const message = `*🍕 NEW ONLINE ORDER - CAFÉ 007 MART*
--------------------------------
*Order ID:* #${orderNumber}
*Branch:* ${newOrder.branch}
*Customer:* ${newOrder.customerName}
*Phone:* ${newOrder.customerPhone}
*Delivery Address:* ${newOrder.customerAddress}
--------------------------------
*ORDER ITEMS:*
${itemsText}
--------------------------------
*Subtotal:* Rs. ${newOrder.subtotal}/-
*Delivery:* FREE HOME DELIVERY
*Total Payable:* *Rs. ${newOrder.total}/-*
*Payment Mode:* ${newOrder.paymentMethod.toUpperCase()}
${newOrder.notes ? `*Special Instructions:* ${newOrder.notes}` : ''}
--------------------------------
_Order placed via Cafe 007 Mart Official App_
_Let's Hangout... Quality is our recipe!_`;

      const encodedMessage = encodeURIComponent(message);
      // Official WhatsApp Number from Flyer: 0346-7787007 -> 923467787007
      const whatsappUrl = `https://wa.me/923467787007?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    }

    // Auto simulate progression for live tracking demo
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === newOrder.id ? { ...o, status: 'preparing' } : o))
      );
      if (activeOrder?.id === newOrder.id) {
        setActiveOrder((prev) => (prev ? { ...prev, status: 'preparing' } : null));
      }
      addNotification(
        `Order #${orderNumber} Cooking`,
        'Chef is baking your crust and frying crispy broast to golden perfection.',
        'order'
      );
    }, 15000);

    return newOrder;
  };

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const bookTable = (details: Omit<Reservation, 'id' | 'status'>): Reservation => {
    const newRes: Reservation = {
      ...details,
      id: `res-${Date.now()}`,
      status: 'confirmed',
    };
    setReservations((prev) => [newRes, ...prev]);

    addNotification(
      'Table Reservation Confirmed!',
      `Table for ${details.guests} guests confirmed for ${details.date} at ${details.time} at ${details.branch}.`,
      'system'
    );

    // Option to send reservation confirmation to WhatsApp
    const resMsg = `*🍽️ TABLE RESERVATION - CAFÉ 007 MART*
--------------------------------
*Name:* ${details.name}
*Phone:* ${details.phone}
*Guests:* ${details.guests} Persons
*Date:* ${details.date}
*Time:* ${details.time}
*Area:* ${details.seatingArea.replace('_', ' ').toUpperCase()}
*Branch:* ${details.branch}
${details.specialRequests ? `*Special Request:* ${details.specialRequests}` : ''}
--------------------------------
_Please reserve our table. Thank you!_`;

    const encoded = encodeURIComponent(resMsg);
    window.open(`https://wa.me/923467787007?text=${encoded}`, '_blank');

    return newRes;
  };

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const rev: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [rev, ...prev]);
    showToast('Thank you for your rating & feedback!');
  };

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Welcome to Café 007 Mart!',
      message: 'Free Home Delivery is live across Burewala! Explore 26 signature pizzas, burgers & broast.',
      timestamp: '10 mins ago',
      type: 'deal',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Big Deal 11 - Family Pack Special',
      message: '5 Zinger Burgers + Large Fries + 1.5L drink for only Rs. 2350/-',
      timestamp: '1 hour ago',
      type: 'deal',
      read: false,
    },
  ]);

  const addNotification = (title: string, message: string, type: 'order' | 'deal' | 'system' = 'system') => {
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isLiveTrackOpen, setIsLiveTrackOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        placeOrder,
        orders,
        activeOrder,
        setActiveOrder,
        reservations,
        bookTable,
        userProfile,
        updateProfile,
        toggleFavorite,
        reviews,
        addReview,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        addNotification,
        isCartOpen,
        setIsCartOpen,
        isProfileOpen,
        setIsProfileOpen,
        isReservationOpen,
        setIsReservationOpen,
        isLiveTrackOpen,
        setIsLiveTrackOpen,
        isFeedbackOpen,
        setIsFeedbackOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        customizingProduct,
        setCustomizingProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
