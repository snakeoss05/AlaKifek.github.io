import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import submitform from "./api/Routes/submit-form.route.js";
import productRouter from "./api/Routes/Products.js";
import authentification from "./api/Routes/authentification.js";
// Create Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/submit-form", submitform);
app.use("/api/products", productRouter);
app.use("/api/ath", authentification);
app.use("*", (req, res) => res.status(404).json({ error: "Page Not Found" }));
// Define database connection

// Define form data schema

// Define route to handle form submission

// Start server
export default app;
