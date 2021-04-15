import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/orders';
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
    case REMOVE_FROM_CART:
      const {productId} = action.payload;
      const selectedCartItem = state.items[productId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItem;
      if (currentQty > 1) {
        updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.total - selectedCartItem.productPrice,
        );
        updatedCartItem = {...state.items, [productId]: updatedCartItem};
      } else {
        updatedCartItem = {...state.items};
        delete updatedCartItem[productId];
      }
      return {
        ...state,
        items: updatedCartItem,
        total: state.total - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};
