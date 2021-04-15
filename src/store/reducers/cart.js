import {ADD_TO_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const {product} = action.payload;
      const productPrice = product.price;
      const productTitle = product.title;

      if (state.items[product.id]) {
        const updatedCartItem = new CartItem(
          state.items[product.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[product.id].total + productPrice,
        );
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: updatedCartItem,
            total: (state.total += productPrice),
          },
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice,
        );
        return {
          ...state,
          items: {...state.items, [product.id]: newCartItem},
          total: state.total + productPrice,
        };
      }

    default:
      return state;
  }
};
