import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import FormDAO from "./api/DAO/FormDAO.js";
import ProductDAO from "./api/DAO/ProductDAO.js";

import UserDao from "./api/DAO/UserDAO.js";
import { createServer } from "http";
import { Server as httpserver } from "socket.io";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
const server = createServer(app);
const io = new httpserver(server, {
  cors: {
    origin: ["https://alakifekbackend.onrender.com", "http://localhost:3000"],
  },
});
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Socket.io event handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Handle admin join room
  socket.on("joinRoom", (roomToJoin) => {
    const currentRoom = users.find((user) => user.socketId === socket.id);
    if (currentRoom) {
      socket.leave(currentRoom); // Leave the current room
    }
    socket.join(roomToJoin); // Join the new room

    // Update the room mapping
  });

  // Handle admin messages
  socket.on("adminMessage", (data) => {
    io.to(data.room).emit("sendToUserMessage", data);
    // Broadcast the message to the specific room
  });

  // Handle user messages
  socket.on("userMessage", (data) => {
    io.emit("userMessage", data); // Broadcast the message to all connected clients
    console.log(data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users); // Emit the updated list of users to all connected clients
  });

  // Emit the initial list of users to the connected client
  socket.emit("getUsers", users);
});

MongoClient.connect(process.env.URI_PRODUCT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => console.log("MongoDB connection error", err))
  .then(async (client) => {
    await FormDAO.injectDB(client);
    await ProductDAO.injectDB(client);
    await UserDao.injectDB(client);
    server.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  });
