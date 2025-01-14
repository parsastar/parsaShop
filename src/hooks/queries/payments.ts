import { GetAllPayments, GetPaymentsByUserID, getPaymentById } from "@/api/payment";
import { useQuery } from "@tanstack/react-query";
import { QueryTags } from "src/constants/ReactQueryTags";

export const useGetPaymentsByUserId = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [QueryTags.getUserPayments, id],
    queryFn: () => GetPaymentsByUserID({ id }),
  });
export const useGetAllPayments = ({ queryParams }: { queryParams: string }) =>
  useQuery({
    queryKey: [QueryTags.getAllPayments, queryParams],
    queryFn: () => GetAllPayments({ queryParams }),
  });

export const useGetPaymentById = ({ id }: { id: string | number }) =>
  useQuery({
    queryKey: [QueryTags.getPayment, id],
    queryFn: () => getPaymentById({ id }),
  });
