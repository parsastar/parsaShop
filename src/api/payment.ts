import {
  TGetPayment,
  TGetPayments,
  TGetPaymentsByUserID,
  TPostPayment,
} from "src/types/api/payments";
import { api } from "./config";

export const PostPayment = ({ payment }: { payment: TPostPayment }) =>
  api.post(`/api/payments/`, payment);

export const PutPayment = ({
  id,
  payment,
}: {
  id: string;
  payment: TPostPayment;
}) => api.put(`/api/payments/${id}`, payment);

export const GetAllPayments = ({
  queryParams = "",
}: {
  queryParams: string;
}): Promise<TGetPayments> =>
  api.get(`/api/payments?${queryParams}`).then((res) => res.data);

export const RemovePayment = ({ id }: { id: string }) =>
  api.delete(`/api/payments/${id}`);

export const getPaymentById = ({
  id,
}: {
  id: string | number;
}): Promise<TGetPayment> =>
  api.get(`/api/payments/${id}`).then((res) => res.data.data);

export const GetPaymentsByUserID = ({
  id,
}: {
  id: string | number;
}): Promise<TGetPaymentsByUserID> =>
  api.get(`/api/users/${id}/payments`).then((res) => res.data);
