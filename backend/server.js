import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import submitform from "./api/Routes/submit-form.route.js";
import productRouter from "./api/Routes/Products.js";
import authentification from "./api/Routes/authentification.js";
import UserDao from "./api/DAO/UserDAO.js";
import http from "http";
import mongodb from "mongodb";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/submit-form", submitform);
app.use("/api/products", productRouter);
app.use("/api/ath", authentification);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("*", (req, res) => res.status(404).json({ error: "Page Not Found" }));
// Define database connection

// Define form data schema

// Define route to handle form submission

// Start server
export default app;
