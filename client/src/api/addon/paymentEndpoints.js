import { apiBaseEndpoint } from "../";
import { useCookies } from "../../utils/useCookies";
import { useSessionStorage } from "../../utils/useSessionStorage";

import { COOKIE_NAMES } from "../../constants";

const { AUTH_TOKEN } = COOKIE_NAMES;
const { getCookie } = useCookies;
const { getSessionItem } = useSessionStorage;

const authTokenFromCookie = () => getCookie(AUTH_TOKEN);
const authTokenFromSession = () => getSessionItem(AUTH_TOKEN);

export const buyProductsSessionEndpoint = async (products) =>
  await apiBaseEndpoint.post(`/payment/buyProducts`, products, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });

export const buyProductsViaPaymentIntentEndpoint = async (products) =>
  await apiBaseEndpoint.post(`/payment/buyProducts/paymentIntent`, products, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
