import PRODUCTS from '../../data/dummyData';
import {DELETE_PRODUCT} from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const {pid} = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(prod => prod.id !== pid),
      };
    default:
      return state;
  }
};
