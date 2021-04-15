import Order from '../../models/order';
import {ADD_ORDER} from '../actions/orders';
import moment from 'moment';

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
        moment(new Date()).format('MMMM Do YYYY, hh:mm '),
      );

      return {
        ...state,
        orders: [...state.orders, nexOrder],
      };
    default:
      return state;
  }
};
