import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  DECREMENT_CART_ITEM_QUANTITY,
  CLEAR_CART, // Add this import
} from './cartActionTypes';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: DELETE_FROM_CART,
  payload: itemId,
});

export const updateCartItemQuantity = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { itemId, quantity },
});

export const decrementCartItemQuantity = (item) => ({
  type: DECREMENT_CART_ITEM_QUANTITY,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});