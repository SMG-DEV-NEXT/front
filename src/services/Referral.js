import { axiosLoggedIn, axiosWithoutAuth } from "@/api";

export const referralService = {
  // 1. Create referral (admin only)
  create: (data) => {
    return axiosLoggedIn.post("/referral", data);
  },

  deleteReferral: (id) => axiosLoggedIn.delete(`/referral/${id}`),

  // 2. Update referral
  update: ({ id, data }) => {
    return axiosLoggedIn.patch(`/referral/${id}`, data);
  },

  // 3. Get all referrals for admin (adminId = string)
  getByAdmin: (adminId) => {
    return axiosLoggedIn.get(`/referral/admin/${adminId}`);
  },

  getAll: ({ page = 1, limit = 30 }) => {
    return axiosLoggedIn.get(`/referral`, { params: { page, limit } });
  },

  // 4. Check referral code from frontend (public)
  checkCode: (code) => {
    return axiosWithoutAuth.get(`/referral/check/${code}`);
  },

  getById: (id) => {
    return axiosLoggedIn.get(`/referral/${id}`);
  },

  // 5. Track referral views (public)
  trackView: (code) => {
    return axiosWithoutAuth.post(`/referral/track-view/${code}`);
  },
};
