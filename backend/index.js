import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import FormDAO from "./api/DAO/FormDAO.js";
import ProductDAO from "./api/DAO/ProductDAO.js";
import UserController from "./api/controller/UserController.js";
import UserDao from "./api/DAO/UserDAO.js";
dotenv.config();

const port = process.env.PORT || 8000;
const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.URI_PRODUCT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => console.log("MongoDB connection error", err))
  .then(async (client) => {
    await FormDAO.injectDB(client);
    await ProductDAO.injectDB(client);

    await UserDao.injectDB(client);
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  });
