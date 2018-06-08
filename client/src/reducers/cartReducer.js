import {
  CREATE_CART,
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART
} from "../actions/types";

const initialState = {
  cart: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_CART:
      return {
        ...state,
        cart: action.payload
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
