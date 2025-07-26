import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const ReselllerService = {
  getAllResellers({ skip = 0, take = 30 }) {
    return axiosLoggedIn.get("/resellers", {
      params: { skip, take },
    });
  },

  // Get all resellers (no pagination) — for client use
  getAllResellersRaw() {
    return axiosWithoutAuth.get("/resellers/raw");
  },

  // Get a single reseller by ID
  getReseller(id) {
    return axiosWithoutAuth.get(`/resellers/${id}`);
  },

  // Create a new reseller
  createReseller(payload) {
    return axiosLoggedIn.post("/resellers", payload);
  },

  // Update a reseller
  updateReseller({ id, payload }) {
    return axiosLoggedIn.patch(`/resellers/${id}`, payload);
  },

  // Delete a reseller
  deleteReseller(id) {
    return axiosLoggedIn.delete(`/resellers/${id}`);
  },

  check(email) {
    return axiosLoggedIn.post("/resellers/check", { email });
  },

  request(data) {
    return axiosWithoutAuth.post("/resellers/request", data);
  },

  updateRequest(data) {
    return axiosLoggedIn.put("/resellers/request", data);
  },

  getRequests({ skip = 0, take = 30 }) {
    return axiosLoggedIn.get("/resellers/request", {
      params: { skip, take },
    });
  },

  deleteRequest(id) {
    return axiosLoggedIn.delete(`/resellers/request/${id}`);
  },
};

export default ReselllerService;
