import { IPayment } from "@/models/Payments";
import { TGetProduct } from "./product";
import { TUserWithID } from "./users";

export type TPostPayment = {
  address: string;
  description: string;
  amount: number;
  userId: string; // This will hold the ObjectId of the associated user
  items: {
    product: string; // This will hold the ObjectId of the associated product
    count: number;
  }[];
};

export type TGetPayment = {
  address: string;
  description: string;
  amount: number;
  createdAt: Date;
  _id: string;
  user: TUserWithID;
  items: {
    product: TGetProduct;
    count: number;
  }[];
};
export type TGetPaymentsByUserID = {
  message: "Payment retrieved successfully";
  data: (IPayment & {
    _id: string;
    user: TUserWithID;
    items: {
      product: TGetProduct;
      count: number;
    }[];
  })[];
  status: 200;
};

export type TGetPayments = {
  message: string;
  payments: TGetPayment[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
  status: number;
};
