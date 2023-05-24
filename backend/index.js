import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import FormDAO from "./api/DAO/FormDAO.js";
import ProductDAO from "./api/DAO/ProductDAO.js";
import UserController from "./api/controller/UserController.js";
import UserDao from "./api/DAO/UserDAO.js";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { time } from "console";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
const httpserver = http.createServer(app);
const io = new Server(httpserver, {
  cors: {
    origin: ["http://localhost:3001","http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
});
/*
const users = [];

const adduser = (userId, sockeId) => {
  !users.some(
    (user) => user.userId === userId && users.push({ userId, sockeId })
  );
};
const removeUser = (socketId) => {
  const users = users.filter((user) => user.sockeId != socketId);
};

// Socket.io event handlers

  


  // Handle admin join room
  socket.on("joinRoom", (roomToJoin) => {
    const currentRoom = users[roomToJoin];
    if (currentRoom) {
      socket.leave(currentRoom); // Leave the current room
    }
    socket.join(roomToJoin); // Join the new room

    // Update the room mapping
  });

  // Handle admin messages
  socket.on("adminMessage", ({ room: targetRoom, message }) => {
    io.to(targetRoom).emit("adminMessage", { room: targetRoom, message }); // Broadcast the message to the specific room
  });

  // Handle user messages
  socket.on("userMessage", (data) => {
    io.emit("userMessage", {
      message: data.message,
      data: data.date,
    }); // Broadcast the message to the specific room
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users); // Emit the updated list of opened rooms to
  });
  io.emit("getUsers", users);
  // Emit the initial list of opened rooms to the connected client
}); 

*/

MongoClient.connect(process.env.URI_PRODUCT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => console.log("MongoDB connection error", err))
  .then(async (client) => {
    await FormDAO.injectDB(client);
    await ProductDAO.injectDB(client);
    await UserDao.injectDB(client);
    httpserver.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  });
