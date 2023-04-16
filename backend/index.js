import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import FormDAO from "./api/DAO/FormDAO.js";
import ProductDAO from "./api/DAO/ProductDAO.js";

dotenv.config();

const port = process.env.PORT || 8000;
const MongoClient = mongodb.MongoClient;
const hostname = "192.168.1.6";
MongoClient.connect(process.env.URI_PRODUCT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => console.log("MongoDB connection error", err))
  .then(async (client) => {
    await FormDAO.injectDB(client);
    await ProductDAO.injectDB(client);
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  });
