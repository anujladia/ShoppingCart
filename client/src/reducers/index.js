import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import errorReducer from "./errorReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  shop: productReducer,
  cart: cartReducer,
  errors: errorReducer,
  admin: adminReducer
});
