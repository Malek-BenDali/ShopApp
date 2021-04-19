import axios from 'axios';
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchPorducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'https://rn-shopapp-ddf7f-default-rtdb.firebaseio.com/products.json',
      );

      const resData = response.data;
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }
      dispatch({
        type: SET_PRODUCT,
        payload: {
          products: loadedProducts,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.delete(
        `https://rn-shopapp-ddf7f-default-rtdb.firebaseio.com/products/${productId}.json`,
        config,
      );
      return dispatch({
        type: DELETE_PRODUCT,
        payload: {
          pid: productId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProduct = (
  newTitle,
  newDescription,
  newImageUrl,
  newPrice,
) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      title: newTitle,
      description: newDescription,
      imageUrl: newImageUrl,
      price: newPrice,
    });
    try {
      const response = await axios.post(
        'https://rn-shopapp-ddf7f-default-rtdb.firebaseio.com/products.json',
        body,
        config,
      );
      const resData = response.data;
      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          id: resData.name,
          newTitle,
          newDescription,
          newImageUrl,
          newPrice,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateProduct = (id, title, description, imageUrl, price) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        id,
        title,
        description,
        imageUrl,
        price,
      });
      await axios.patch(
        `https://rn-shopapp-ddf7f-default-rtdb.firebaseio.com/products/${id}.json`,
        body,
        config,
      );
      return dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          id,
          title,
          description,
          imageUrl,
          price,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
