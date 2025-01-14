import { IUser } from "../users/TUser";
import { TGetPayment } from "./payments";

export type TUserWithID = IUser & {
  _id: string;
};
export type TGetUser = {
  message: string;
  user: TUserWithID;
  payments: TGetPayment[];
  status: number;
};

export type TPostUser = Omit<TUserWithID, "_id" | "createdAt">;

export type TPatchPocket  = {
  value : number
}
export type TGetUsers = {
  message: string;
  users: TUserWithID[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalUsers: number;
  };
  status: number;
};
