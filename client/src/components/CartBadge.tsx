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
          className="absolute bg-chateau-green size-12 text-[10px] font-medium top-5 right-0"
        >
          {productCartCount}
        </Badge>
      ) : null}
    </div>
  );
};

export default CartBadge;
