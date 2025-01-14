import { ClassAttributes, InputHTMLAttributes } from "react";

export interface SignupType {
  email: string;
  password: string;
}

export type CustomInputType =
  | JSX.IntrinsicAttributes
  | ClassAttributes<HTMLInputElement>
  | InputHTMLAttributes<HTMLInputElement>;
