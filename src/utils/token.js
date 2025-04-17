import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../costants/token";

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  return Cookies.remove(ACCESS_TOKEN);
};

// export const getRefreshToken = () => {
//   return Cookies.get(REFRESH_TOKEN);
// };

export const setAccessToken = (token) => {
  return Cookies.set(ACCESS_TOKEN, token);
};
