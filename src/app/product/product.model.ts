import mongoose, { Schema } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  variants: [
    {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  inventory: {
    quantity: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
