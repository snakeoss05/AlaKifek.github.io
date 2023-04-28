import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  groupe: { type: String },

  category: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  promotion: { type: String },
  mark: {
    type: String,
  },

  imgurl: {
    mainimg: {
      type: String,
    },
    secimg: {
      type: String,
    },
    thirdimg: {
      type: String,
    },
    fourimg: {
      type: String,
    },
  },
  quantity: {
    type: Number,
  },
  descreption: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
