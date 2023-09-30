import { combineReducers } from 'redux';
import cartReducer from './cartReducer'; // Import all your reducers here
import userReducer from './userReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  cartReducer,
  userReducer,
  orderReducer,
  // add more reducers as needed
});

export default rootReducer;