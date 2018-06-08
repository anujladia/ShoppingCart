import { GET_PRODUCTS, PRODUCTS_LOADING } from "./types";
import axios from "axios";

// Get all products
export const getProducts = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/products")
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      });
    });
};

// Profile Loading
export const setLoading = () => {
  return {
    type: PRODUCTS_LOADING
  };
};
