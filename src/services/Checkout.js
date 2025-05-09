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
  getListClient: (params) => {
    return axiosLoggedIn.get(`/checkout/client?page=${params.page}?limit=7`);
  },
  getFreeKassaUrl: (params) => {
    return axiosWithoutAuth.get(
      `/checkout/freekassa?orderId=${params.order}&amount=${params.amount}`
    );
  },
};

export default CheckoutService;
