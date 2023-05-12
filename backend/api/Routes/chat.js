import { Router } from "express";
const router = Router();

import { userMessage, adminMessage } from "./controller";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined the chat`);
    });

    socket.on("adminMessage", (data) => {
      const { userId, message } = data;
      adminMessage(userId, message, io);
    });

    socket.on("userMessage", (data) => {
      const { userId, message } = data;
      userMessage(userId, message, io);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return router;
};
