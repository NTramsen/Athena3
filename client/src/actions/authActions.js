import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token, user } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("id", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      // const decoded = jwt_decode(token);
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Admin login
export const loginAdmin = adminData => dispatch => {
  axios
    .post("/api/admins/login", adminData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token, admin } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("id", admin.id);
      localStorage.setItem("name", admin.name);
      localStorage.setItem("email", admin.email);
      // const decoded = jwt_decode(token);
      dispatch(setCurrentAdmin(admin));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};




// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Set logged in admin
export const setCurrentAdmin = admin => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: admin
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  // setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
