import express from "express";
import UserController from "../controller/UserController.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/user/profile/:id", UserController.updateUser);
router.get("/profile", UserController.authenticateToken);
router.get("/user", UserController.getUserProfile);
router.post("/sendmsg", UserController.userSendMsg);

export default router;
