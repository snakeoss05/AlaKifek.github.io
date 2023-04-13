import express from "express";
import FormController from "../controller/formController";

const router = express.Router();

router.route("/post").post(FormController.apipostform);
router.get("/clientCommands", FormController.getClientCommands);
router.delete("/delete/:id", FormController.deleteClientCommands);
export default router;
