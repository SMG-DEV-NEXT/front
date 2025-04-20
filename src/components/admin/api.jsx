import { axiosLoggedIn } from "@/api";

export const AdminCatalogAPI = {
  getAllCatalogs: () => {
    return axiosLoggedIn.get("/catalog");
  },
};
