// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import redux-thunk
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;