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
  static async updateProduct(req, res) {
    const { id } = req.params;
    const { title, descreption, quantity, price } = req.body;

    const updates = {
      $set: {},
    };

    if (title) {
      updates.$set.title = title;
    }
    if (quantity) {
      updates.$set.quantity = quantity;
    }

    if (descreption) {
      updates.$set.descreption = descreption;
    }

    if (price) {
      updates.$set.price = price;
    }

    try {
      const product = await ProductDAO.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await ProductDAO.updateProduct(id, updates);

      const response = {
        message: "Product updated successfully",
        originalValues: {},
        updatedValues: {},
      };

      if (title) {
        response.originalValues.title = product.title;
        response.updatedValues.title = updatedProduct.title;
      }

      if (description) {
        response.originalValues.description = product.description;
        response.updatedValues.description = updatedProduct.description;
      }

      if (price) {
        response.originalValues.price = product.price;
        response.updatedValues.price = updatedProduct.price;
      }

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await ProductDAO.filterProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}
