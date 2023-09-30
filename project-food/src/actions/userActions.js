// userActions.js
import axios from "../api/axios"; // Update with correct import path
import { FETCH_USER_ADDRESS_SUCCESS } from "./cartActionTypes"; // Update with correct import path;

export const fetchUserAddress = () => (dispatch) => {
  axios
    .get("/address", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }) // Replace with your API endpoint
    .then((response) => {
      const addressData = response.data; // Assuming the response contains address data
      dispatch({ type: FETCH_USER_ADDRESS_SUCCESS, payload: addressData });
    })
    .catch((error) => {
      // Handle error
    });
};
