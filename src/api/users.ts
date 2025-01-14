import { api } from "./config";
import {
  TGetUser,
  TGetUsers,
  TPatchPocket,
  TPostUser,
} from "src/types/api/users";

export const GetAllUsers = ({
  queryParams,
}: {
  queryParams?: string;
}): Promise<TGetUsers> =>
  api.get(`/api/users?${queryParams || ""}`).then((res) => res.data);

export const GetUserById = ({
  id,
}: {
  id: string | number;
}): Promise<TGetUser> => api.get(`/api/users/${id}`).then((res) => res.data);

export const PutProduct = ({
  product,
  id,
}: {
  product: TPostUser;
  id: string | number;
}) => api.put(`/api/users/${id}`, product).then((res) => res.data);

export const RemoveProduct = ({ id }: { id: string | number }) =>
  api.delete(`/api/users/${id}`).then((res) => res.data);

export const PatchPocket = ({
  id,
  value,
}: {
  id: string;
  value: TPatchPocket;
}) => {
  console.log("trying , ", id, value);
  return api.patch(`/api/users/${id}`, value);
};
