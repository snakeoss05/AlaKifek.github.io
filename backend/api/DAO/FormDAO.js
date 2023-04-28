import { MongoClient } from "mongodb";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

import ClientCommands from "../Models/FormData.js";
dotenv.config();
const ObjectId = mongodb.ObjectId;
let form;
let ordersCollection;
export default class FormDAO {
  static async injectDB() {
    if (form) {
      return;
    }
    try {
      const client = await MongoClient.connect(process.env.URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      form = client.db("Productlist").collection("ClientCommands");
      ordersCollection = client.db("Productlist").collection("orders");
    } catch (e) {
      console.error(`Unable to connect to MongoDB: ${e}`);
    }
  }

  static async addForm(
    firstname,
    lastname,
    adresse,
    city,
    CodePostal,
    phoneNumber,
    cartitems,
    clientId
  ) {
    try {
      const newClientCommand = new ClientCommands({
        firstname: firstname,
        lastname: lastname,
        adresse: adresse,
        city: city,
        CodePostal: CodePostal,
        phoneNumber: phoneNumber,
        cartitems: cartitems,
        clientId: clientId,
      });

      await ordersCollection.insertOne(newClientCommand);
      await form.insertOne(newClientCommand);
    } catch (e) {
      console.error(`Unable to post Form ${e}`);
      return { error: e };
    }
  }

  static async getClientCommands() {
    try {
      const clientCommands = await form.find().toArray();
      return clientCommands;
    } catch (e) {
      console.error(`Unable to retrieve client commands ${e}`);
      return { error: e };
    }
  }
  static async getClientCommandsbyemail(email) {
    try {
      const clientCommands = await ordersCollection
        .find({ clientId: email })
        .toArray();
      return clientCommands;
    } catch (e) {
      console.error(`Unable to retrieve client commands ${e}`);
      return { error: e };
    }
  }
  static async deleteClientCommands(id) {
    try {
      const deletedClientCommands = await form.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });
      return new ClientCommands(deletedClientCommands.value);
    } catch (e) {
      console.error(`Unable to delete client command with id ${id}: ${e}`);
      return { error: e };
    }
  }
}
