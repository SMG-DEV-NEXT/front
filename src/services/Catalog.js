import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const CatalogService = {
  getCatalogs: (options) => {
    const { page, limit, search = "" } = options;
    return axiosWithoutAuth.get(
      `/catalog/all?limit=${limit}&page=${page}&search=${search}`
    );
  },
  getAllGames: () => {
    return axiosWithoutAuth.get(`/stats/games`);
  },
  getTop: () => {
    return axiosWithoutAuth.get(`/catalog/top`);
  },
};

export default CatalogService;
