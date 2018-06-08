import axios from "axios";
import {
  CREATE_CART,
  GET_CART,
  ADD_TO_CART,
  GET_ERRORS,
  REMOVE_FROM_CART
} from "./types";

// Create a cart
export const createCart = () => dispatch => {
  axios
    .post("api/cart/create_cart")
    .then(res => {
      // Save cart to local Storage
      const { _id } = res.data;
      // Set cart id to local Storage
      localStorage.setItem("cart_id", _id);
      dispatch({
        type: CREATE_CART,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: CREATE_CART,
        payload: {}
      })
    );
};

// Get user cart
export const getUserCart = cart_id => dispatch => {
  axios
    .get(`api/cart/${cart_id}`)
    .then(res =>
      dispatch({
        type: GET_CART,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CART,
        payload: {}
      })
    );
};

// Add product to cart
export const addProductToCart = (product_id, cart_id) => dispatch => {
  axios
    .post(`api/cart/${product_id}/${cart_id}`)
    .then(res =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove product from cart
export const removeProductFromCart = (product_id, cart_id) => dispatch => {
  axios
    .delete(`api/cart/${product_id}/${cart_id}`)
    .then(res =>
      dispatch({
        type: REMOVE_FROM_CART,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
