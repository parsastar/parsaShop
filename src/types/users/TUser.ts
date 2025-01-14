export type IUser = {
  role: "ADMIN" | "USER";
  pocket?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
};

export type IRequestUser = Omit<IUser, "createdAt">;
