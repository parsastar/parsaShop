"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDashModal } from "src/store/dashModalStore";
import CategoryForm from "./category/CategoryForm";
import { DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./product/ProductForm";
import PocketForm from "./pocket/PocketForm";
export default function AdminModal() {
  const { step: modalStep, handleClose, setStep } = useDashModal();
  const { value: step, selected } = modalStep;
  const handleContent = () => {
    switch (step) {
      case "category":
        return (
          <CategoryForm
            key={"category"}
            handleClose={handleClose}
            selected={selected}
          />
        );
      case "pocket":
        return (
          <PocketForm
            key={"pocket"}
            handleClose={handleClose}
            selected={selected}
          />
        );
      case "product":
        return (
          <ProductForm
            key={"product"}
            selected={selected}
            handleClose={handleClose}
          />
        );
      default:
        return <div> close </div>;
    }
  };
  return (
    <Drawer
      onOpenChange={step !== "close" ? handleClose : () => {}}
      open={step !== "close"}
    >
      <AnimatePresence mode="wait">
        {step !== "close" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <DrawerContent onEscapeKeyDown={handleClose}>
              <DialogTitle className="hidden">modal</DialogTitle>
              <div className="max-h-[80svh] container min-h-[50svh]  overflow-auto ">
                <AnimatePresence mode="wait">{handleContent()}</AnimatePresence>
              </div>
            </DrawerContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Drawer>
  );
}
