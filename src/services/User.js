import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const UserService = {
  registration: (options) => {
    return axiosWithoutAuth.post("/auth/register", options);
  },
  login: (options) => {
    return axiosWithoutAuth.post("/auth/login", options);
  },
  auth: () => {
    return axiosLoggedIn.get("/auth");
  },
  genearteFA: () => {
    return axiosLoggedIn.post("/auth/generate");
  },
  disableFA: () => {
    return axiosLoggedIn.post("/auth/disable-fa");
  },
  get2FA: () => {
    return axiosLoggedIn.get("/auth/get-qr");
  },
  logout: () => {
    return axiosLoggedIn.post("/auth/logout");
  },
  forgetStep1: (email) => {
    return axiosWithoutAuth.post("/auth/forget-email", { email });
  },
  forgetStep2: (options) => {
    return axiosWithoutAuth.post("/auth/forget-code", options);
  },
  forgetStep3: (options) => {
    return axiosWithoutAuth.post("/auth/forget-reset", options);
  },
  saveAccount: (options) => {
    return axiosLoggedIn.post("/auth/account-save", options);
  },
};

export default UserService;
