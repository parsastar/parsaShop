import { timeStamp } from "console";
import { Schema, model, models, Types } from "mongoose";

// Define the schema for products
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Refers to the Category model
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image: {
      type: String, // Assuming image is stored as a URL or path
    },
  },
  { timestamps: true }
);

// Define the TypeScript interface for Product
export interface IProduct {
  name: string;
  description?: string;
  price: number;
  category: Types.ObjectId; // This will hold the ObjectId of the associated category
  count: number;
  createdAt: Date;
  image?: string; // Added image field
}

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
