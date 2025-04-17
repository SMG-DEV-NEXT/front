import axios from "axios";
import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const promoApi = {
  createPromocode: (data) => axiosLoggedIn.post("/promocode", data),

  getAllPromocodes: ({ page = 1, limit = 30 }) =>
    axiosLoggedIn.get("/promocode", { params: { page, limit } }),

  deletePromocode: (id) => axiosLoggedIn.delete(`/promocode/${id}`),

  checkPromocode: (code) => axiosWithoutAuth.get(`/promocode/check/${code}`),

  getPromocodeById: (id) => axiosLoggedIn.get(`/promocode/${id}`),

  updatePromocode: ({ id, data }) =>
    axiosLoggedIn.put(`/promocode/${id}`, data),

  check: (code) => axiosWithoutAuth.get(`/promocode/check/${code}`),
};

export default promoApi;
