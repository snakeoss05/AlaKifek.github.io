import { MongoClient } from "mongodb";
import Product from "../Models/Product.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
const ObjectId = mongodb.ObjectId;
let products;
dotenv.config();
export default class ProductDAO {
  static async injectDB() {
    if (products) {
      return;
    }

    try {
      const client = await MongoClient.connect(process.env.URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      products = client.db("Productlist").collection("Productlist");

      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error(`Unable to connect to MongoDB: ${error}`);
    }
  }

  static async getProducts() {
    try {
      const productList = await products.find().toArray();
      return productList;
    } catch (error) {
      console.error(`Unable to retrieve product list: ${error}`);
      return { error };
    }
  }
  static async getProductById(id) {
    try {
      const product = await products.findOne(
        { _id: new ObjectId(id) },
        { maxTimeMS: 30000 }
      );
      return product;
    } catch (e) {
      console.error(`Unable to retrieve product with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async getProduct(query) {
    try {
      if (query) {
        const product = await products
          .find({
            $or: [
              { title: { $regex: query, $options: "i" } },
              { category: { $regex: query, $options: "i" } },
            ],
          })
          .limit(6)
          .toArray();
        return product;
      }
    } catch (e) {
      console.error(`Unable to retrieve products with query ${query}: ${e}`);
      return { error: e };
    }
  }
  static async addProduct(
    groupe,
    promotion,
    category,
    title,
    descreption,
    price,
    quantity,
    mark,
    img1,
    img2,
    img3,
    img4
  ) {
    try {
      const newProduct = new Product({
        title: title,
        descreption: descreption,
        price: price,
        promotion: promotion | 0,
        groupe: groupe,
        imgurl: {
          mainimg: img1,
          secimg: img2,
          thirdimg: img3,
          fourimg: img4,
        },
        quantity: quantity,
        category: category,
        mark: mark,
      });

      return await products.insertOne(newProduct);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async updateProduct(id, updates) {
    try {
      const updatedProduct = await products.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },

        updates,

        { new: true }
      );
      return updatedProduct;
    } catch (e) {
      console.error(`Unable to update product with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async deleteProduct(id) {
    try {
      const options = { maxTimeMS: 30000 }; // Increase timeout to 30 seconds
      const deletedProduct = await products.findOneAndDelete(
        { _id: new mongoose.Types.ObjectId(id) },
        options
      );
      return new Product(deletedProduct.value);
    } catch (e) {
      console.error(`Unable to delete product with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async filterProductsByCategory(category) {
    try {
      const productlist = await products
        .find({ $or: [{ category: category }, { groupe: category }] })
        .toArray();
      return productlist;
    } catch (error) {
      console.error(error);
      throw new Error("Error filtering products by category");
    }
  }
  static async filterProductsByGroupe(groupe) {
    try {
      const productlist = await products.find({ groupe: groupe }).toArray();
      return productlist;
    } catch (error) {
      console.error(error);
      throw new Error("Error filtering products by category");
    }
  }
  static async filterProductsInPromo() {
    try {
      const productlist = await products
        .find({ promotion: { $exists: true, $ne: "0" } })
        .toArray();
      return productlist;
    } catch (error) {
      console.error(error);
      throw new Error("Error filtering products by promotion");
    }
  }
}
