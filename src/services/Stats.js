import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const StatsService = {
  getStatsGames: (options) => {
    const { page, limit, gameId, search = "", type = "new" } = options;
    return axiosWithoutAuth.get(
      `/stats/game/${gameId}?limit=${limit}&page=${page}&search=${search}`
    );
  },
  getAllGames: () => {
    return axiosWithoutAuth.get(`/stats/games`);
  },
  getAllStatsAdmin: (options) => {
    return axiosLoggedIn.get(`/stats/admin`, { params: options });
  },
  createStat: (options) => {
    return axiosLoggedIn.post("/stats", options);
  },
  updateStat: (options) => {
    const { id, data } = options;
    return axiosLoggedIn.patch(`/stats/${id}`, options.data);
  },
  getStat: (id) => {
    return axiosLoggedIn.get(`/stats/${id}`);
  },
  getStatUser: (id) => {
    return axiosLoggedIn.get(`/stats/api/${id}`);
  },
  getTopStats: (id) => {
    return axiosWithoutAuth.get(`/stats/top`);
  },
};

export default StatsService;
