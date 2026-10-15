export interface SizeOption {
  id: string;
  name: string;
  priceDelta: number;
  label?: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
}

export interface SauceOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  description: string;
  basePrice: number;
  category: 'burgers' | 'pizzas' | 'deals' | 'broast' | 'wraps' | 'fries' | 'falooda' | 'shakes';
  image: string;
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  isSpicy?: boolean;
  isChefsSpecial?: boolean;
  isVegetarian?: boolean;
  isHalal: boolean;
  isSweet?: boolean;
  sizes?: SizeOption[];
  availableToppings?: ToppingOption[];
  availableSauces?: SauceOption[];
}

export interface SelectedCustomization {
  selectedSize?: SizeOption;
  selectedToppings: ToppingOption[];
  selectedSauce?: SauceOption;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization: SelectedCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface BranchLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  area: string;
  city: string;
  phone: string;
  whatsapp: string;
  timing: string;
  openTimeHour: number; // 10 (10 AM)
  closeTimeHour: number; // 2 (2 AM)
  deliveryRangeKm: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export type OrderType = 'delivery' | 'pickup';
export type PaymentMethod = 'cod' | 'jazzcash' | 'card';
export type DeliveryDistanceBand = 'within-3' | '3-5' | '5-8' | 'over-8';

export interface PreparedOrder {
  items: CartItem[];
  orderType: OrderType;
  deliveryDistanceBand: DeliveryDistanceBand | null;
  branch: BranchLocation;
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
}
