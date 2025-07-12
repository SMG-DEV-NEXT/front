import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const CheatsService = {
  getCheats: (options) => {
    const {
      page = 1,
      limit = 4,
      search = "",
      type,
      range,
      catalogId,
    } = options;
    if (range) {
      return axiosWithoutAuth.get(
        `/cheats/api/all?catalogId=${catalogId}&limit=${limit}&page=${page}&search=${search}&type=${type}&price_start=${range[0]}&price_end=${range[1]}`
      );
    }
    return axiosWithoutAuth.get(
      `/cheats/api/all?catalogId=${catalogId}&limit=${limit}&page=${page}&search=${search}&type=${type}`
    );
  },

  getCheat: ({ cheat: id, refId }) => {
    return axiosWithoutAuth.get(`/cheats/view/${id}?ref=${refId}`);
  },

  createComment: (options) => {
    return axiosLoggedIn.post("/comments/create", options);
  },

  getAllCommentsAdmin: (options) => {
    return axiosLoggedIn.get(`/comments?cheatTitle=${
      options.cheatTitle
    }&userEmail=${options.mail}&createdTo=${
      options.endDate || "undefined"
    }&createdFrom=${
      options.startDate || "undefined"
    }&sortBy=stars&order=desc&page=${options.page}&limit=${options.limit}
      `);
  },

  getComment: (id) => {
    return axiosLoggedIn.get(`/comments/${id}`);
  },

  saveComment: (options) => {
    const { id, data } = options;
    return axiosLoggedIn.put(`/comments/${id}`, data);
  },

  getTop: () => {
    return axiosWithoutAuth.get(`/cheats/api/top`);
  },
  search: (s) => {
    return axiosWithoutAuth.get(`/cheats/head/${s}`);
  },
};

export default CheatsService;
