// reducers/orders.js
const initialState = {
    orders: [], // Initialize an empty array for orders
  };
  
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_ORDERS_SUCCESS':
        return {
          ...state,
          orders: action.payload, // Update the orders array with new orders
        };
      case 'FETCH_USER_ORDERS_FAILURE':
        return state; // You can handle error state here
      default:
        return state;
    }
  };

  export default orderReducer;