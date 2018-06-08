import { UPLOAD_CSV, CSV_UPLOADING } from "../actions/types";

const initialState = {
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_CSV:
      return {
        ...state,
        loading: false
      };
    case CSV_UPLOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
