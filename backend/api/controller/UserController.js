import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

import UserDao from "../DAO/UserDAO.js";
dotenv.config();
const saltRounds = 10;

export default class UserController {
  static async registerUser(req, res) {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const result = await UserDao.registerUser({
        email,
        hashedPassword,
        username,
      });

      if (result.error) {
        res.status(400).send(result.error);
      }

      res.status(201).send("User created successfully"); // use 201 status code for successful creation
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;

    try {
      const user = await UserDao.loginUser(email);

      if (!user) {
        return res.status(404).send("Email not registered.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).send("Wrong password.");
      }

      const token = jwt.sign(user, secretOrPrivateKey);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { FirstName, LastName, City, email, AddressLine, PhoneNumber } =
        req.body;
      const updates = {
        $set: {},
      };
      if (FirstName) updates.$set.FirstName = FirstName;
      if (LastName) updates.$set.LastName = LastName;
      if (email) updates.$set.email = email;
      if (City) updates.$set.City = City;
      if (AddressLine) updates.$set.AddressLine = AddressLine;
      if (PhoneNumber) updates.$set.PhoneNumber = PhoneNumber;
      const updatedProfile = await UserDao.updateUserProfile(id, updates);
      if (!updatedProfile)
        return res.status(404).json({ message: "User profile not found" });
      res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
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
}
