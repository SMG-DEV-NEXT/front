import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const StatistisService = {
  initDefault: () => {
    return axiosLoggedIn.get(`/statistic?range=month`);
  },
  getChart: (method, from, to) => {
    return axiosLoggedIn.get(
      `/statistic/chart?range=${method}${from ? `&from=${from}` : ""}${
        to ? `&to=${to}` : ""
      }`
    );
  },
};

export default StatistisService;
