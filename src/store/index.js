import {combineReducers, createStore} from 'redux';
import {cartReducer, orderReducer, productReducer} from './reducers';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer);

export {store};
