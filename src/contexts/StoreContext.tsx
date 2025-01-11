import React, { createContext, useContext, useReducer } from 'react';
import { Category } from '@/types/categories';

interface Product {
  id: string;
  name: string;
  price: number;
  brand?: string;
  volume?: string;
  pricePerUnit?: string;
  image?: string;
  quantity: number;
  description?: string;
}

interface Store {
  id: number;
  name: string;
  email: string;
  store_type_id: number;
}

interface State {
  cart: Product[];
  isCartOpen: boolean;
  isSidebarOpen: boolean;
  currentCategory: Category | null;
  selectedCategory: Category | null;
  store: Store | null;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_CURRENT_CATEGORY'; payload: Category | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: Category | null }
  | { type: 'SET_STORE'; payload: Store | null };

const initialState: State = {
  cart: [],
  isCartOpen: false,
  isSidebarOpen: false,
  currentCategory: null,
  selectedCategory: null,
  store: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity === 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case 'SET_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: action.payload,
      };
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case 'SET_STORE':
      return {
        ...state,
        store: action.payload,
      };
    default:
      return state;
  }
};

const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
