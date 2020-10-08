import { apiBaseEndpoint } from "..";
import { useCookies } from "../../utils/useCookies";
import { useSessionStorage } from "../../utils/useSessionStorage";
import { COOKIE_NAMES } from "../../constants";

const { AUTH_TOKEN } = COOKIE_NAMES;
const { getCookie } = useCookies;
const { getSessionItem } = useSessionStorage;

const authTokenFromCookie = () => getCookie(AUTH_TOKEN);
const authTokenFromSession = () => getSessionItem(AUTH_TOKEN);

export const addMobileReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addMobileReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addComputerReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addComputerReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addElectronicsReview = async (data) => {
  return await apiBaseEndpoint.post(
    "/product_review/addElectronicsReview",
    data,
    {
      headers: {
        authorization: `Bearer ${
          authTokenFromCookie() || authTokenFromSession()
        }`,
      },
    }
  );
};

export const addBeautyReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addBeautyReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addFashionReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addFashionReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addKitchenReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addKitchenReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addPetReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addPetReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addFoodReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addFoodReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};
