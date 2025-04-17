import { axiosLoggedIn, axiosWithoutAuth } from "../api";

export const AdminCatalog = {
  createCatalog: (options) => {
    return axiosLoggedIn.post("/catalog", options);
  },
  updateCatalog: (params) => {
    const { id, data } = params;
    return axiosLoggedIn.put(`/catalog/${id}`, data);
  },
  getAllCatalogs: () => {
    return axiosLoggedIn.get("/catalog");
  },
  getCatalog: (id) => {
    return axiosLoggedIn.get(`/catalog/${id}`);
  },
  deleteCatalog: (id) => {
    return axiosLoggedIn.delete(`/catalog/${id}`);
  },
  deleteCatalogs: (ids) => {
    return axiosLoggedIn.delete(`/catalog`, { data: { ids } });
  },
};

export const CheatService = {
  getCheats: () => {
    return axiosLoggedIn.get("/cheats");
  },
  getCheat: (id) => {
    return axiosLoggedIn.get(`/cheats/${id}`);
  },
  updateCheat: (params) => {
    const { id, data } = params;
    return axiosLoggedIn.put(`/cheats/${id}`, data);
  },
  createCheat: (options) => {
    return axiosLoggedIn.post("/cheats", options);
  },
  deleteCheat: (id) => {
    return axiosLoggedIn.delete(`/cheats/${id}`);
  },
  deleteCheats: (ids) => {
    return axiosLoggedIn.delete(`/cheats/many`, { data: ids });
  },
  getPlans: (id) => {
    return axiosLoggedIn.get(`/cheats/plans/${id}`);
  },
  getPlan: (id) => {
    return axiosLoggedIn.get(`/plans/${id}`);
  },
  updatePlan: (options) => {
    const { id, data } = options;
    return axiosLoggedIn.put(`/plans/${id}`, data);
  },
};
