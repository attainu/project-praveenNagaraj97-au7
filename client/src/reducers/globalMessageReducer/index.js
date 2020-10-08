import {
  GLOBAL_ERROR,
  GLOBAL_SUCCESS,
  GLOBAL_SUCCESS_WITH_IMG,
} from "../../constants";

const globalMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      state["globalError"] = action.error;
      return { ...state };
    case GLOBAL_SUCCESS:
      state["globalSuccess"] = action.success;
      return { ...state };
    case GLOBAL_SUCCESS_WITH_IMG:
      state["globalSuccessWithImg"] = action.successData;
      return { ...state };
    default:
      return state;
  }
};

export default globalMessageReducer;
