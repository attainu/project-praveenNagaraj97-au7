import { USER_AUTH_TYPES } from "../../constants";

const {
  LOGIN: { LOAD_LOGGGED_USER },
  SIGNUP: { LOAD_SIGNUP, LOAD_SIGNED_UP_USER },
  USER_STATUS: { IS_LOGGED_IN, GET_USER },
  USER_UPDATE: { USER_PASSWORD_CHANGE },
} = USER_AUTH_TYPES;

const userAuthLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_LOGGGED_USER:
      return {
        ...state,
        userDetails: action.response,
      };

    case LOAD_SIGNUP:
      return { ...state, loadSignUp: true };

    case LOAD_SIGNED_UP_USER:
      return {
        ...state,
        userDetails: action.response,
      };
    default:
      return state;
  }
};

export const userAccredited = (state = {}, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return {
        ...state,
        isSigned: action.isSigned.message,
        user: action.isSigned.userId,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const userDetailsUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE:
      return { ...state, fields: action.data };
    default:
      return state;
  }
};

export { userAuthLoginReducer as default };
