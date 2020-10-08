import {
  GLOBAL_ERROR,
  WEBSITE_LOAD,
  GLOBAL_SUCCESS,
  GLOBAL_SUCCESS_WITH_IMG,
  IS_LOADING,
} from "../../constants";

export const websiteLoad = () => ({ type: WEBSITE_LOAD });

export const isLoading = (boolean) => ({ type: IS_LOADING, boolean });

export const globalFailureMessenger = (error) => ({
  type: GLOBAL_ERROR,
  error,
});

export const globalSuccesMessenger = (success) => ({
  type: GLOBAL_SUCCESS,
  success,
});

export const globalSuccesMessengerWithImg = (success, image) => ({
  type: GLOBAL_SUCCESS_WITH_IMG,
  successData: { success, image },
});
