import { axiosLoggedIn, axiosWithoutAuth } from "@/api";

export const FAQService = {
  // Get all contacts
  getFaqStat: (id) => {
    return axiosLoggedIn.get(`/faq/admin/stat/${id}`);
  }, // Get all contacts
  updateFaqStat: ({ statId, data }) => {
    return axiosLoggedIn.patch(`/faq/admin/stat/${statId}`, data);
  },
  createFaqStat: (data) => {
    return axiosLoggedIn.post(`/faq/admin/stat`, data);
  },
  deleteFaqStat: (id) => {
    return axiosLoggedIn.post(`/faq/admin/remove`, { id });
  },
  AQContent: (data) => {
    return axiosLoggedIn.post(`/faq/admin/init`, data);
  },
  // Create a new contact
  getAdminFaq: () => {
    return axiosLoggedIn.get("/faq/admin/faq");
  },

  getClientFaq: () => {
    return axiosLoggedIn.get("/faq/client/faq");
  },

  getBlockFaq: (id) => {
    return axiosLoggedIn.get(`/faq/admin/block/${id}`);
  },

  updateBlock: ({ id, data }) => {
    return axiosLoggedIn.post(`/faq/admin/block/${id}`, data);
  },

  getAllStats: () => {
    return axiosLoggedIn.get(`/faq/stats`);
  },
};
