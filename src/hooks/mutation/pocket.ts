import { PatchPocket } from "@/api/users";
import { useMutation } from "@tanstack/react-query";

export const usePatchPocketMutation = () =>
  useMutation({
    mutationFn: PatchPocket,
  });
