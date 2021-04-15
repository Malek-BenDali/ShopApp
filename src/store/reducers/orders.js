import Order from '../../models/order';
import {ADD_ORDER} from '../actions/orders';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const {items, amount} = action.payload;
      const nexOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date(),
      );

      return {
        ...state,
        orders: [...state.orders, nexOrder],
      };
    default:
      return state;
  }
};
