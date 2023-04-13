import { MongoClient } from "mongodb";
import Product from "../Models/Product.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
const ObjectId = mongodb.ObjectId;
let products;

export default class ProductDAO {
  static async injectDB() {
    if (products) {
      return;
    }

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Admin:Admin@cluster0.uhdnbun.mongodb.net/Productlist?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,

          socketTimeoutMS: 40000,
        }
      );
      const db = client.db("Productlist");
      products = db.collection("Productlist");
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
  static async addProduct(
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
  static async updateProduct(
    id,
    title,
    descreption,
    quantity,
    price,
    mainimg,
    secimg,
    thirdimg,
    category,
    fourimg
  ) {
    try {
      const updatedProduct = await products.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        {
          $set: {
            title: title,
            descreption: descreption,
            quantity: quantity,
            price: price,

            imgurl: {
              mainimg: mainimg,
              secimg: secimg,
              thirdimg: thirdimg,
              fourimg: fourimg,
            },
            category: category,
          },
        },
        { returnOriginal: false }
      );
      return new Product(updatedProduct.value);
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
}
