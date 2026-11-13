export type Language = 'en' | 'ur' | 'ro';

export type ProductCategory =
  | 'all'
  | 'pizza_deals'
  | 'fast_food_deals'
  | 'regular_pizza'
  | 'treat_pizza'
  | 'special_pizza'
  | 'albaik_broast'
  | 'albaik'
  | 'burgers'
  | 'wraps'
  | 'snacks'
  | 'pasta'
  | 'beverages';

export interface PizzaSizeOption {
  size: 'S' | 'M' | 'L';
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  nameRoman: string;
  category: ProductCategory;
  price: number;
  description: string;
  descriptionUrdu: string;
  image: string;
  sizes?: PizzaSizeOption[];
  tags?: string[];
  isPopular?: boolean;
  isSpicy?: boolean;
  prepTimeMinutes?: number;
  dealItems?: string[];
}

export interface CartItem {
  id: string; // unique cart instance id
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
  selectedCrust?: string;
  extraTopping?: boolean;
  extraCheese?: boolean;
  selectedDrink?: string;
  specialInstructions?: string;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'card';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  branch: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  estimatedDeliveryMinutes: number;
  riderName?: string;
  riderPhone?: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'family_hall' | 'vip_lounge' | 'outdoor' | 'birthday_hall';
  branch: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  primaryAddress: string;
  savedAddresses: Array<{ id: string; label: string; address: string }>;
  loyaltyPoints: number;
  favoriteProductIds: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended: string;
  verifiedPurchase: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'deal' | 'system';
  read: boolean;
}
