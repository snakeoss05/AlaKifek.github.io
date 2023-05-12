import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

import UserDao from "../DAO/UserDAO.js";
dotenv.config();

export default class UserController {
  static async registerUser(req, res) {
    const { email, username, password } = req.body;

    try {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await UserDao.registerUser(
        email,
        username,
        hashedPassword
      );
      if (result.error) {
        return res.status(400).send(result.error); // use 400 status code for bad request
      }
      res.status(201).send("Register Success");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;
    const user = await UserDao.loginUser(email);
    try {
      if (!user) {
        return res.status(404).send("Email not registered.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).send("Wrong password.");
      }

      const token = jwt.sign({ _id: user._id }, secretOrPrivateKey);

      // Return a JSON response with a message and a status code
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async updateUser(req, res) {
    const { FirstName, LastName, City, email, AddressLine, PhoneNumber } =
      req.body;

    const { id } = req.params;
    const updates = {
      $set: {},
    };
    if (FirstName) {
      updates.$set.FirstName = FirstName;
    }
    if (LastName) {
      updates.$set.LastName = LastName;
    }
    if (City) {
      updates.$set.City = City;
    }
    if (email) {
      updates.$set.email = email;
    }
    if (AddressLine) {
      updates.$set.AddressLine = AddressLine;
    }
    if (PhoneNumber) {
      updates.$set.PhoneNumber = PhoneNumber;
    }

    try {
      const updatedUser = await UserDao.updateUserProfile(id, updates);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async authenticateToken(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      res.json(user);
    });
  }
  static async getUserProfile(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const id = decodedToken._id;

      const user = await UserDao.findUserById(id); // Fetch user data from database
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  static async userSendMsg(req, res) {
    const { id, msg, date } = req.body;
    try {
      const userMsg = await UserDao.UserSend(id, msg, date);
      res.status(200).json(userMsg);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
