import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const SettingsService = {
  getAllSettings: (options) => {
    return axiosWithoutAuth.get(`/settings`);
  },
  updateSettings: ({ title, settings }) => {
    return axiosLoggedIn.put(`/settings/${title}`, { settings });
  },
  getSetting: (id) => {
    return axiosWithoutAuth.get(`/settings/${title}`);
  },
};

export default SettingsService;
