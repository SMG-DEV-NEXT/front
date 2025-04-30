import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const CheckoutService = {
  checkout: (data) => {
    return axiosWithoutAuth.post(`/checkout`, data);
  },
  info: (id) => {
    return axiosWithoutAuth.get(`/checkout/${id}`);
  },
  getList: (params) => {
    return axiosLoggedIn.get(`/checkout?${params}`);
  },
};

export default CheckoutService;
