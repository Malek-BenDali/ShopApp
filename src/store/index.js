import {combineReducers, createStore} from 'redux';

import productReducer from './reducers/products';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

export {store};
