import { apiBaseEndpoint } from "../index";
import { useCookies } from "../../utils/useCookies";
import { useSessionStorage } from "../../utils/useSessionStorage";
import { COOKIE_NAMES } from "../../constants";

const { getCookie } = useCookies;
const { getSessionItem } = useSessionStorage;
const { AUTH_TOKEN } = COOKIE_NAMES;

const authTokenFromCookie = () => getCookie(AUTH_TOKEN);
const authTokenFromSession = () => getSessionItem(AUTH_TOKEN);

export const getUserOrdersEndpoint = async () =>
  await apiBaseEndpoint.get(`/orders/getUserOrders`, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });

export const retrievePaymentIntent = async (intentID = "id", data) =>
  await apiBaseEndpoint.post(
    `/orders/buyProduct/retrieveIntent/${intentID}`,
    data,
    {
      headers: {
        authorization: `Bearer ${
          authTokenFromCookie() || authTokenFromSession()
        }`,
      },
    }
  );
