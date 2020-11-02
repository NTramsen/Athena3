import { SET_CURRENT_USER, USER_LOADING, GET_USER_INFO } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: null,
  user: {},
  isLoading: false,
  isAdmin: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isLoading: false,
        isAdmin: action.payload.admin
      };
    case GET_USER_INFO:
      return {
        ...state
      }
    default:
      return state;
  }
}
