import { create } from 'zustand';
import { Scenario } from '@/data/scenarios';
import productsData from '@/data/products.json';

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutStore {
  // Current state
  scenario: Scenario;
  currentStep: CheckoutStep;
  cart: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;

  // Actions
  setScenario: (scenario: Scenario) => void;
  setStep: (step: CheckoutStep) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setShippingInfo: (info: Partial<ShippingInfo>) => void;
  setPaymentInfo: (info: Partial<PaymentInfo>) => void;
  reset: () => void;

  // Computed
  getTotal: () => number;
  getItemCount: () => number;
}

const initialShippingInfo: ShippingInfo = {
  fullName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
};

const initialPaymentInfo: PaymentInfo = {
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  // Initial state
  scenario: 'normal',
  currentStep: 'cart',
  cart: [],
  shippingInfo: initialShippingInfo,
  paymentInfo: initialPaymentInfo,

  // Actions
  setScenario: (scenario) => {
    const products = (productsData as Record<Scenario, Product[]>)[scenario];
    const cart: CartItem[] =
      scenario === 'empty'
        ? []
        : products.slice(0, scenario === 'edge-case' ? 5 : 2).map((p) => ({
            ...p,
            quantity: 1,
          }));

    set({
      scenario,
      cart,
      currentStep: 'cart',
      shippingInfo: initialShippingInfo,
      paymentInfo: initialPaymentInfo,
    });
  },

  setStep: (currentStep) => set({ currentStep }),

  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set({
        cart: get().cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      });
    }
  },

  setShippingInfo: (info) => {
    set({ shippingInfo: { ...get().shippingInfo, ...info } });
  },

  setPaymentInfo: (info) => {
    set({ paymentInfo: { ...get().paymentInfo, ...info } });
  },

  reset: () => {
    const { scenario } = get();
    get().setScenario(scenario);
  },

  // Computed
  getTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
}));
