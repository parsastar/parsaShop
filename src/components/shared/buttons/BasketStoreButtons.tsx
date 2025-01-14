import { Button } from "@/components/ui/button";
import { TBasketStore } from "@/store/basketStore";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { TGetProduct } from "src/types/api/product";

const BasketStoreButtons = ({
  countAll,
  product,
  items,
  setItem,
}: {
  countAll: number;
  product: TGetProduct;
  items: TBasketStore["items"];
  setItem: TBasketStore["setItem"];
}) => {
  // Find the item in the basket
  const basketItem = items.find((item) => item.item._id === product._id);
  const countInBasket = basketItem?.count || 0;

  const handleAddToBasket = () => {
    if (product.count <= 0) return;
    const updatedItems = [...items];
    updatedItems.push({ item: product, count: 1 });
    setItem(updatedItems, countAll + 1);
  };

  const handleIncrement = () => {
    const existingItemIndex = items.findIndex(
      (item) => item.item._id === product._id
    );
    if (product.count - items[existingItemIndex].count > 0) {
      const updatedItems = items.map((item, index) =>
        index == existingItemIndex ? { ...item, count: item.count + 1 } : item
      );
      setItem(updatedItems, countAll + 1);
    }
  };
  const IsAvailableForMore = () => {
    const existingItemIndex = items.findIndex(
      (item) => item.item._id === product._id
    );
    return product.count - items[existingItemIndex].count;
  };
  const handleDecrement = () => {
    const updatedItems = items
      .map((item) =>
        item.item._id === product._id
          ? { ...item, count: item.count - 1 }
          : item
      )
      .filter((item) => item.count > 0);

    setItem(updatedItems, countAll - 1);
  };

  return (
    <div className="flex gap-2 items-center">
      {product.count <= 0 ? (
        <p className="bg-primary opacity-80 rounded-md text-sm py-2 px-5 text-white font-medium">
          {" "}
          out of stock
        </p>
      ) : countInBasket <= 0 ? (
        <Button
          className="bg-primary py-2 text-white"
          onClick={handleAddToBasket}
        >
          Add to basket
        </Button>
      ) : (
        <>
          <Button
            className="bg-red-700 py-2 px-2 h-fit"
            onClick={handleDecrement}
          >
            <Minus size={20} />
          </Button>
          <p className="text-lg">{countInBasket}</p>
          <Button
            disabled={!IsAvailableForMore()}
            className="px-2 py-2 h-fit"
            onClick={handleIncrement}
          >
            <Plus size={20} />
          </Button>
        </>
      )}
    </div>
  );
};

export default BasketStoreButtons;
