import { create } from 'zustand';
import { BRANCH_LOCATIONS, DELIVERY_DISTANCE_BANDS, PROMO_CODES } from '../data/menuData';
import { BranchLocation, CartItem, DeliveryDistanceBand, MenuItem, OrderType, SelectedCustomization } from '../types/restaurant';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  orderType: OrderType;
  deliveryDistanceBand: DeliveryDistanceBand | null;
  selectedBranchId: string;
  promoCode: string | null;
  promoDiscountPercent: number;
  promoFreeDelivery: boolean;
  promoMessage: string | null;

  // Actions
  toggleCart: (isOpen?: boolean) => void;
  setOrderType: (type: OrderType) => void;
  setDeliveryDistanceBand: (band: DeliveryDistanceBand) => void;
  setSelectedBranchId: (branchId: string) => void;
  addItem: (item: MenuItem, customization: SelectedCustomization, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Calculations
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getSelectedBranch: () => BranchLocation;
}

function generateCartItemId(menuItemId: string, customization: SelectedCustomization): string {
  const sizeKey = customization.selectedSize?.id || 'default';
  const toppingKeys = customization.selectedToppings.map((t) => t.id).sort().join(',');
  const sauceKey = customization.selectedSauce?.id || 'none';
  const notesKey = (customization.specialInstructions || '').trim().toLowerCase();
  return `${menuItemId}_${sizeKey}_${toppingKeys}_${sauceKey}_${notesKey}`;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  orderType: 'delivery',
  deliveryDistanceBand: null,
  selectedBranchId: 'dhq-main',
  promoCode: null,
  promoDiscountPercent: 0,
  promoFreeDelivery: false,
  promoMessage: null,

  toggleCart: (isOpen) =>
    set((state) => ({
      isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen,
    })),

  setOrderType: (type) => set({ orderType: type }),

  setDeliveryDistanceBand: (band) => set({ deliveryDistanceBand: band }),

  setSelectedBranchId: (branchId) => set({ selectedBranchId: branchId }),

  addItem: (menuItem, customization, quantity = 1) => {
    const sizeDelta = customization.selectedSize?.priceDelta || 0;
    const toppingsTotal = customization.selectedToppings.reduce((acc, t) => acc + t.price, 0);
    const sauceDelta = customization.selectedSauce?.price || 0;
    const unitPrice = menuItem.basePrice + sizeDelta + toppingsTotal + sauceDelta;
    const cartItemId = generateCartItemId(menuItem.id, customization);

    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...state.items];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return { items: updated, isCartOpen: true };
      }

      const newItem: CartItem = {
        cartItemId,
        menuItem,
        quantity,
        customization,
        unitPrice,
        totalPrice: unitPrice * quantity,
      };

      return { items: [...state.items, newItem], isCartOpen: true };
    });
  },

  updateQuantity: (cartItemId, delta) => {
    set((state) => {
      const updated = state.items
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0
              ? {
                  ...item,
                  quantity: newQty,
                  totalPrice: newQty * item.unitPrice,
                }
              : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      return { items: updated };
    });
  },

  removeItem: (cartItemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.cartItemId !== cartItemId),
    }));
  },

  clearCart: () => {
    set({
      items: [],
      deliveryDistanceBand: null,
      promoCode: null,
      promoDiscountPercent: 0,
      promoFreeDelivery: false,
      promoMessage: null,
    });
  },

  applyPromoCode: (inputCode: string) => {
    const code = inputCode.trim().toUpperCase();
    const config = PROMO_CODES[code];
    const subtotal = get().getSubtotal();

    if (!config) {
      return { success: false, message: 'Invalid promo code. Try "KARACHI20" or "WELCOME10"' };
    }

    if (subtotal < config.minSubtotal) {
      return {
        success: false,
        message: `Min order for this voucher is Rs. ${config.minSubtotal}. Add Rs. ${config.minSubtotal - subtotal} more.`,
      };
    }

    if (code === 'FREEDEL') {
      set({
        promoCode: code,
        promoDiscountPercent: 0,
        promoFreeDelivery: true,
        promoMessage: 'Free Delivery applied!',
      });
      return { success: true, message: 'Free Delivery Applied!' };
    }

    set({
      promoCode: code,
      promoDiscountPercent: config.discountPercent,
      promoFreeDelivery: false,
      promoMessage: `${config.discountPercent}% Discount applied (${config.description})!`,
    });
    return { success: true, message: `${config.discountPercent}% Discount applied!` };
  },

  removePromoCode: () => {
    set({
      promoCode: null,
      promoDiscountPercent: 0,
      promoFreeDelivery: false,
      promoMessage: null,
    });
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
  },

  getDiscount: () => {
    const { promoDiscountPercent } = get();
    const subtotal = get().getSubtotal();
    if (promoDiscountPercent <= 0) return 0;
    return Math.round((subtotal * promoDiscountPercent) / 100);
  },

  getDeliveryFee: () => {
    const { orderType, deliveryDistanceBand, promoFreeDelivery } = get();
    if (orderType === 'pickup') return 0;
    if (promoFreeDelivery) return 0;
    if (!deliveryDistanceBand) return 0;
    return DELIVERY_DISTANCE_BANDS.find((band) => band.id === deliveryDistanceBand)?.fee ?? 0;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    const discount = get().getDiscount();
    const deliveryFee = get().getDeliveryFee();
    return Math.max(0, subtotal - discount + deliveryFee);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  getSelectedBranch: () => {
    const { selectedBranchId } = get();
    const branch = BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId);
    return branch || BRANCH_LOCATIONS[0];
  },
}));
