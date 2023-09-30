import { FETCH_USER_ADDRESS_SUCCESS } from '../actions/cartActionTypes'; // Update with correct import path

const initialState = {
  address: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;