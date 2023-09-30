import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  DECREMENT_CART_ITEM_QUANTITY,
  CLEAR_CART,
} from "../actions/cartActionTypes";
import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initialState = {
  products: [], // Initialize an empty array for products
  cartItems: [], // Initialize as an empty object
  cartTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.productID === action.payload.productID
      );
      if (existingItem) {
        // Item already exists, update quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productID === existingItem.productID
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Item doesn't exist, add to cart with quantity 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productID !== action.payload
        ),
      };

    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productID === action.payload.productID
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case DECREMENT_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productID === action.payload.productID
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload, // Store fetched products in state
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [], // Clear cart items
      };
    default:
      return state;
  }
};

export default cartReducer;
