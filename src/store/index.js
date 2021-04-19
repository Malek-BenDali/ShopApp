import {combineReducers, createStore, applyMiddleware} from 'redux';
import {cartReducer, orderReducer, productReducer} from './reducers';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export {store};
