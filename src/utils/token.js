import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../costants/token";

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN);
  return Cookies.remove(ACCESS_TOKEN);
};

// export const getRefreshToken = () => {
//   return Cookies.get(REFRESH_TOKEN);
// };

export const setAccessToken = (token, isRemember) => {
  if (!isRemember) {
    return sessionStorage.setItem(ACCESS_TOKEN, token);
  }
  return Cookies.set(ACCESS_TOKEN, token);
};
