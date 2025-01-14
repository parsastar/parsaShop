import { GetAllUsers, GetUserById } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import { QueryTags } from "src/constants/ReactQueryTags";

export const useGetAllUsersQuery = ({ queryParams }: { queryParams: string }) =>
  useQuery({
    queryKey: [QueryTags.getAllUsers],
    queryFn: () => GetAllUsers({ queryParams }),
  });

export const useGetUserByIdQuery = ({ id }: { id: string | number }) =>
  useQuery({
    queryKey: [QueryTags.getSingleUser, id],
    queryFn: () => GetUserById({ id: id }),
  });
