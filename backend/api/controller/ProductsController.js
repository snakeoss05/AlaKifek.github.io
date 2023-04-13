import ProductDAO from "../DAO/ProductDAO.js";

import { ObjectId } from "mongodb";
export default class ProductsController {
  static async getProducts(req, res) {
    try {
      const products = await ProductDAO.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getProductById(req, res) {
    try {
      const product = await ProductDAO.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
  static async createProduct(req, res) {
    const {
      category,
      title,
      descreption,
      price,
      quantity,
      mark,
      img1,
      img2,
      img3,
      img4,
    } = req.body;

    try {
      const newProduct = await ProductDAO.addProduct(
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
      );

      res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  static async deleteProduct(req, res) {
    const { id } = req.params;
    console.log(`Deleting product with id ${id}`);
    try {
      const deletedProduct = await ProductDAO.deleteProduct(new ObjectId(id));
      if (deletedProduct.error) {
        console.log(
          `Error deleting product with id ${id}: ${deletedProduct.error}`
        );
        res.status(500).send({ error: deletedProduct.error });
      } else {
        console.log(`Product with id ${id} deleted successfully`);
        res.send({ message: "Product deleted successfully" });
      }
    } catch (e) {
      console.error(`Unable to delete product with id ${id}: ${e}`);
      res.status(500).send({ error: e });
    }
  }
  static async  updateProduct(req, res) {
  const { id } = req.params;
  const { title, descreption, quantity, price, mainimg, secimg, thirdimg, category, fourimg } = req.body;

  const updatedProduct = await ProductDAO.updateProduct(id, title, descreption, quantity, price, mainimg, secimg, thirdimg, category, fourimg);

  if (updatedProduct.error) {
    return res.status(500).send({ message: 'Unable to update product', error: updatedProduct.error });
  }

  return res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
}
}
