import { UPLOAD_CSV, GET_ERRORS, CSV_UPLOADING } from "./types";
import axios from "axios";

// Upload CSV to database
export const uploadCSV = file => dispatch => {
  dispatch(setLoading());
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  axios
    .post("api/upload", formData, config)
    .then(res => {
      console.log(res);
      dispatch({
        type: UPLOAD_CSV,
        payload: {}
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// CSV Uploading
export const setLoading = () => {
  return {
    type: CSV_UPLOADING
  };
};
