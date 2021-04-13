import PRODUCTS from '../../data/dummyData';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownedId === 'u1'),
};

export default (state = initialState, action) => {
  return state;
};
