import axios from '../api/axios';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/product',
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const products = response.data;

      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      // Handle error
    }
  };
};