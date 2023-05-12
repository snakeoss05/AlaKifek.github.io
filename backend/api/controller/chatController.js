import { addMessage } from "./dao";

const userMessage = (userId, message, io) => {
  const userMessage = {
    userId,
    message,
    isAdminMessage: false,
  };
  addMessage(userMessage);
  io.to(userId).emit("userMessage", userMessage);
};

const adminMessage = (userId, message, io) => {
  const adminMessage = {
    userId,
    message,
    isAdminMessage: true,
  };
  addMessage(adminMessage);
  io.to(userId).emit("adminMessage", adminMessage);
};

export default {
  userMessage,
  adminMessage,
};
