import PRODUCTS from '../../data/dummyData';
import Product from '../../models/product';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/products';

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
    case CREATE_PRODUCT:
      const {newTitle, newDescription, newImageUrl, newPrice} = action.payload;
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        newTitle,
        newDescription,
        newImageUrl,
        newPrice,
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.availableProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      const {id, title, description, imageUrl, price} = action.payload;
      const productIndex = state.userProducts.findIndex(prod => prod.id === id);
      const updateProduct = new Product(
        id,
        state.userProducts[productIndex].ownerId,
        title,
        imageUrl,
        description,
        price,
      );
      const updateUserProducts = [...state.userProducts];
      updateUserProducts[productIndex] = updateProduct;
      const availableProductsIndex = state.availableProducts.findIndex(
        prod => prod.id === id,
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductsIndex] = updateProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updateUserProducts,
      };
    default:
      return state;
  }
};
