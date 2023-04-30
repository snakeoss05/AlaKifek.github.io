import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import mongodb from "mongodb";
import mongoose from "mongoose";
import User from "../Models/Userschema.js";
const ObjectId = mongodb.ObjectId;
dotenv.config();
let connection;
export default class UserDao {
  static async injectDB() {
    if (connection) {
      return;
    }

    try {
      const client = await MongoClient.connect(process.env.URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connection = client.db("Productlist").collection("User");

      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error(`Unable to connect to MongoDB: ${error}`);
    }
  }

  static async registerUser({ email, hashedPassword, username }) {
    try {
      const existingUser = await connection.findOne({ email: email });
      if (existingUser) {
        return { error: "Email already exists." };
      }
      const newUser = new User(email, hashedPassword, username);

      const result = await connection.insertOne(newUser);
      if (result.insertedCount !== 1) {
        return { error: "Failed to create user." };
      }

      return newUser; // return the newly created user
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async loginUser(email) {
    try {
      const user = await connection.findOne({ email: email });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateUserProfile(id, updates) {
    try {
      const updatedProfile = await connection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updates,
        { new: true }
      );
      return updatedProfile;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async findUserById(id) {
    try {
      const user = await connection.findOne(
        { _id: new ObjectId(id) },
        { maxTimeMS: 30000 }
      );

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
