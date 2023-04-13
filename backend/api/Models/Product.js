import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
  imgurl: {
    mainimg: {
      type: String,
      required: true,
    },
    secimg: {
      type: String,
      required: true,
    },
    thirdimg: {
      type: String,
      required: true,
    },
    fourimg: {
      type: String,
    },
  },
  quantity: {
    type: Number,
    required: true,
  },
  descreption: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
