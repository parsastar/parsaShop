import { PostPayment, PutPayment, RemovePayment } from "@/api/payment";

import { useMutation } from "@tanstack/react-query";

export const usePostPaymentQuery = () =>
  useMutation({
    mutationFn: PostPayment,
  });

export const usePutPaymentQuery = () =>
  useMutation({
    mutationFn: PutPayment,
  });

export const useRemovePaymentQuery = () =>
  useMutation({
    mutationFn: RemovePayment,
  });
