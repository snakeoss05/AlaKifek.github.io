import { MongoClient } from "mongodb";
import mongodb from "mongodb";
import mongoose from "mongoose";
import ClientCommands from "../Models/FormData.js";
const ObjectId = mongodb.ObjectId;
let form;

export default class FormDAO {
  static async injectDB() {
    if (form) {
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
      form = client.db("Productlist").collection("ClientCommands");
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
    cartitems
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
      });

      return await form.insertOne(newClientCommand);
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
