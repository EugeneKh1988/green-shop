"use client";

import { useGlobalContext } from "@/app/Context/store";
import { IPlantCart } from "@/lib/Interfaces";
import { fromLocalStorage, plantsCount, toCart, toLocalStorage } from "@/utils/utils";
import { ActionIcon, Button } from "@mantine/core";


interface  AddToCardProps {
  plantCart: IPlantCart;
  className?: string;
}

const AddToCard: React.FC<AddToCardProps> = ({ className, plantCart }) => {
  const classNameValue = className ? `${className}` : "";
  const {setProductCartCount} = useGlobalContext();

  // check if plant is in cart
  const inCart = () => {
    const cartPlants = fromLocalStorage<IPlantCart[]>("cart");
    if(cartPlants && cartPlants.length > 0) {
      const foundedIndex = cartPlants.findIndex(cartItem => cartItem.documentId == plantCart.documentId && cartItem.sizeCount?.size == plantCart.sizeCount?.size);
      if(foundedIndex >= 0) {
        return true;
      }
      return false;
    }
    return false;
  };

  // 
  const delFromCart = () => {
    const cartPlants = fromLocalStorage<IPlantCart[]>("cart");
    if(cartPlants && cartPlants.length > 0) {
      const foundedIndex = cartPlants.findIndex(cartItem => cartItem.documentId == plantCart.documentId && cartItem.sizeCount?.size == plantCart.sizeCount?.size);
      if(foundedIndex >= 0) {
        cartPlants.splice(foundedIndex, 1);
        toLocalStorage<IPlantCart[]>("cart", cartPlants);
      }
    }
  };


  return (
    <div className={`flex gap-10 ${classNameValue}`}>
      <Button
      className="min-h-40 uppercase text-chateau-green font-bold text-[14px] leading-20 rounded-[6px] bg-transparent border border-chateau-green hover:bg-chateau-green hover:text-white"
      onClick={() => {
        toCart(plantCart);
        setProductCartCount(plantsCount());
      }}
    >
      Add to cart
    </Button>
    {
      inCart() ? (<ActionIcon
        className="min-h-40 uppercase text-chateau-green font-bold text-[14px] leading-20 rounded-[6px] bg-transparent border border-chateau-green hover:bg-chateau-green hover:text-white"
        onClick={() => {
          delFromCart();
          setProductCartCount(plantsCount());
        }}
      >
        x
      </ActionIcon>): null
    }
    </div>
  );
};

export default AddToCard;
