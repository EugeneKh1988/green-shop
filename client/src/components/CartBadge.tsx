"use client";

import { useGlobalContext } from "@/app/Context/store";
import { IPlantCart } from "@/lib/Interfaces";
import { fromLocalStorage } from "@/utils/utils";
import { Badge } from "@mantine/core";
import { useEffect } from "react";


interface CartBadgeProps {
  className?: string;
}

const CartBadge: React.FC<CartBadgeProps> = ({ className }) => {
  const classNameValue = className ? `${className}` : "";
  const {productCartCount, setProductCartCount} = useGlobalContext();

  useEffect(() => {
    plantsCount();
  }, []);

  const plantsCount = () => {
    const cartPlants = fromLocalStorage<IPlantCart[]>("cart");
    if (cartPlants && cartPlants.length > 0) {
      let count = 0;
      cartPlants.forEach((plantItem) =>
        plantItem.sizeCount?.count
          ? (count += plantItem.sizeCount?.count)
          : null
      );
      setProductCartCount(count);
    } else {
      setProductCartCount(0);
    }
  };

  return (
    <div className={` ${classNameValue}`}>
      {productCartCount > 0 ? (
        <Badge
          circle
          className={`absolute bg-chateau-green text-[10px] font-medium right-0 leading-12 ${productCartCount > 9 ? 'size-18 bottom-0': 'size-12 top-5'}`}
        >
          {productCartCount}
        </Badge>
      ) : null}
    </div>
  );
};

export default CartBadge;
