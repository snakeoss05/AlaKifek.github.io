import express from "express";
import ProductController from "../controller/ProductsController.js";

const router = express.Router();

router.get("/get", ProductController.getProducts);
router.post("/add", ProductController.createProduct);
router.get("/get/:id", ProductController.getProductById);
router.route("/delete/:id").delete(ProductController.deleteProduct);
router.put("/update/:id", ProductController.updateProduct);
router.route("/filter/:category").get(ProductController.getProductsByCategory);
export default router;
