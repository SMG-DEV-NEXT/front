import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../costants/token";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.get(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);
  }
  return Cookies.get(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACCESS_TOKEN);
  }
  localStorage.removeItem("anon_user_id");

  return Cookies.remove(ACCESS_TOKEN);
};

// export const getRefreshToken = () => {
//   return Cookies.get(REFRESH_TOKEN);
// };

export const setAccessToken = (token, isRemember) => {
  if (!isRemember) {
    return sessionStorage.setItem(ACCESS_TOKEN, token);
  }
  localStorage.removeItem("anon_user_id");
  return Cookies.set(ACCESS_TOKEN, token);
};
