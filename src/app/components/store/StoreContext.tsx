import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedStorage?: string;
  selectedColor?: string;
};

type State = {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  compareList: string[];
  user: { name: string; email: string; phone: string } | null;
};

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_WISHLIST"; payload: string }
  | { type: "ADD_TO_RECENTLY_VIEWED"; payload: string }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "TOGGLE_SEARCH" }
  | { type: "SET_SEARCH_OPEN"; payload: boolean }
  | { type: "TOGGLE_COMPARE"; payload: string }
  | { type: "CLEAR_COMPARE" }
  | { type: "SET_USER"; payload: State["user"] }
  | { type: "CLEAR_CART" };

function getLS<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

const initialState: State = {
  cart: getLS("dg_cart", []),
  wishlist: getLS("dg_wishlist", []),
  recentlyViewed: getLS("dg_recent", []),
  isCartOpen: false,
  isSearchOpen: false,
  compareList: [],
  user: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const key = action.payload.product.id + (action.payload.selectedStorage || "") + (action.payload.selectedColor || "");
      const existing = state.cart.find(
        (i) => i.product.id + (i.selectedStorage || "") + (i.selectedColor || "") === key
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id + (i.selectedStorage || "") + (i.selectedColor || "") === key
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((i) => i.product.id !== action.payload) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((i) => i.product.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i)
          .filter((i) => i.quantity > 0),
      };
    case "TOGGLE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    case "ADD_TO_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter((id) => id !== action.payload);
      return { ...state, recentlyViewed: [action.payload, ...filtered].slice(0, 8) };
    }
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };
    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.payload };
    case "TOGGLE_SEARCH":
      return { ...state, isSearchOpen: !state.isSearchOpen };
    case "SET_SEARCH_OPEN":
      return { ...state, isSearchOpen: action.payload };
    case "TOGGLE_COMPARE":
      return {
        ...state,
        compareList: state.compareList.includes(action.payload)
          ? state.compareList.filter((id) => id !== action.payload)
          : state.compareList.length < 3
          ? [...state.compareList, action.payload]
          : state.compareList,
      };
    case "CLEAR_COMPARE":
      return { ...state, compareList: [] };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem("dg_cart", JSON.stringify(state.cart));
    } catch {}
  }, [state.cart]);

  useEffect(() => {
    try {
      localStorage.setItem("dg_wishlist", JSON.stringify(state.wishlist));
    } catch {}
  }, [state.wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("dg_recent", JSON.stringify(state.recentlyViewed));
    } catch {}
  }, [state.recentlyViewed]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (state.cart.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state.cart.length]);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
