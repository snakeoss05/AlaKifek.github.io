import express from "express";
import ProductController from "../controller/ProductsController";

const router = express.Router();

router.get("/get", ProductController.getProducts);
router.post("/add", ProductController.createProduct);
router.get("/get/:id", ProductController.getProductById);
router.route("/delete/:id").delete(ProductController.deleteProduct);
router.put("/product/:id", ProductController.updateProduct);
export default router;
