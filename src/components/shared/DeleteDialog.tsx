"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteImageMutation } from "@/hooks/mutation/Image";
import { useToast } from "@/hooks/use-toast";
import useDeleteDialogStore from "@/store/deleteDialogStore";
import { revalidateMultipleQueries } from "@/utils/revalidateQueries";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
export function DeleteDialog() {
  const { toast } = useToast();
  const { open, setOpen, title, imageUrl, description, deleteFn } =
    useDeleteDialogStore();
  const removeServiceMutation = useMutation({
    mutationFn: deleteFn?.fn,
  });
  const deleteImage = useDeleteImageMutation();
  const handleDelete = async () => {
    try {
      if (imageUrl) {
        await deleteImage.mutateAsync(imageUrl, {
          onSuccess: () => {
            console.log("image deleted successfully");
          },
          onError: (err) => {
            throw new Error("Failed to delete the existing image.");
          },
        });
      }
      await removeServiceMutation.mutateAsync(undefined, {
        onSuccess: (response: any) => {
          if (deleteFn?.queryKey?.length) {
            revalidateMultipleQueries({ queries: deleteFn.queryKey });
          }
          if (deleteFn?.NextRevalidateFn?.length) {
            deleteFn?.NextRevalidateFn?.forEach((fn) => {
              fn();
            });
          }
          toast({
            title: response.message || "deleted successfully",
            variant: "success",
            duration: 3000,
          });
        },
        onError: (error: any) => {
          toast({
            title: "خطا در حذف",
            description: error?.response?.message || "something went wrong !",
            variant: "destructive",
            duration: 3000,
          });
        },
      });

      // Close the delete dialog after success
      setOpen();
    } catch (error) {
      // Handle any errors from `mutateAsync`
      toast({
        title: "خطا در حذف",
        description: error instanceof Error ? error.message : "مشکلی پیش آمد",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] w-full flex gap-12 flex-col text-center max-w-[350px] rounded-md">
        <div className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="text-center ">{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{description}</DialogDescription>
        </div>
        <DialogFooter>
          <div className="flex w-full gap-5 justify-between sm:justify-evenly items-center">
            <Button
              onClick={handleDelete}
              disabled={
                removeServiceMutation.isPending || deleteImage.isPending
              }
              className="rounded-full w-[80%] mx-auto"
              variant={"destructive"}
              type="button"
            >
              {removeServiceMutation.isPending || deleteImage.isPending
                ? "  Deleting  "
                : "Delete "}
              {(removeServiceMutation.isPending || deleteImage.isPending) && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
            <Button
              disabled={
                removeServiceMutation.isPending || deleteImage.isPending
              }
              className="bg-cyan-700 rounded-full hover:bg-cyan-600 w-[80%] mx-auto"
              onClick={setOpen}
              variant={"destructive"}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
