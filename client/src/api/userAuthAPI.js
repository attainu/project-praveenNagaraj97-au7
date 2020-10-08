import { apiBaseEndpoint } from "./index";
import { useCookies } from "../utils/useCookies";
import { useSessionStorage } from "../utils/useSessionStorage";
import { COOKIE_NAMES } from "../constants";

const { getCookie } = useCookies;
const { getSessionItem } = useSessionStorage;
const { AUTH_TOKEN } = COOKIE_NAMES;

export const loginEndPoint = async (email, password, expiresIn) => {
  const response = await apiBaseEndpoint.post("/user/signin", {
    email,
    password,
    expiresIn,
  });

  return response;
};

export const signUpEndPoint = async (
  name,
  email,
  password,
  confirmPassword,
  phoneNumber
) => {
  const signUpFields = {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  };

  const response = await apiBaseEndpoint.post(`/user/signup`, {
    ...signUpFields,
  });

  return response;
};

export const authAccreditationEndPoint = async (auth_token) => {
  const response = await apiBaseEndpoint.get(`/user/accredit`, {
    headers: {
      authorization: `Bearer ${auth_token}`,
    },
  });
  return response;
};

export const forgotPasswordEndpoint = async (email) => {
  const response = await apiBaseEndpoint.post(`/user/forgotPassword`, {
    email,
  });
  return response;
};

export const resetPasswordEndpoint = async (
  resetToken,
  password,
  confirmPassword
) => {
  const response = await apiBaseEndpoint.post(
    `/user/resetPassword/${resetToken}`,
    {
      password,
      confirmPassword,
    }
  );

  return response;
};

const authTokenFromCookie = () => getCookie(AUTH_TOKEN);
const authTokenFromSession = () => getSessionItem(AUTH_TOKEN);

export const getUserEndpoint = async () => {
  const response = await apiBaseEndpoint.get("/user/getMe", {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });

  return response;
};

export const updateUserPasswordEndpoint = async (
  currentPassword,
  password,
  confirmPassword
) => {
  const response = await apiBaseEndpoint.post(
    "/user/changePassword",
    { currentPassword, password, confirmPassword },
    {
      headers: {
        authorization: `Bearer ${authTokenFromCookie || authTokenFromSession}`,
      },
    }
  );

  return response;
};
