import { axiosLoggedIn, axiosWithoutAuth } from "@/api";

export const smtpService = {
  edit: (data) => {
    return axiosLoggedIn.put("/smtp", data);
  },
  get: () => {
    return axiosLoggedIn.get("/smtp");
  },
};
