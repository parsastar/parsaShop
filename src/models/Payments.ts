import { Schema, model, models, Types } from "mongoose";

// Define the schema for payments
const paymentSchema = new Schema<IPayment>({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
    required: true,
  },

  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Refers to the Product model
        required: true,
      },
      count: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

// Define the TypeScript interface for Payment
export interface IPayment {
  address: string;
  description: string;
  amount: number;
  user: Types.ObjectId; // This will hold the ObjectId of the associated user
  items: {
    product: Types.ObjectId; // This will hold the ObjectId of the associated product
    count: number;
  }[];
  createdAt: Date;
}

const Payment = models.Payment || model<IPayment>("Payment", paymentSchema);

export default Payment;
