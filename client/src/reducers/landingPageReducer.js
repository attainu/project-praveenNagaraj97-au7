import { RECENT_VIEWED } from "../constants";

const landingPageReducer = (state = {}, action) => {
  switch (action.type) {
    case RECENT_VIEWED:
      return { ...state, viewedItems: action.data };

    default:
      return state;
  }
};

export default landingPageReducer;
