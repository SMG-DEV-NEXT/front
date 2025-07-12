import { axiosLoggedIn, axiosWithoutAuth } from "../api";

const ChatService = {
  sendMessage: (data) => {
    return axiosWithoutAuth.post(`/telegram/send`, data);
  },
  getMessages: (userId) => {
    return axiosWithoutAuth.get(`/telegram/messages/${userId}`);
  },
};

export default ChatService;
