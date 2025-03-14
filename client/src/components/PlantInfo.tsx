"use client"

import { IPlant, ISizeCount } from "@/lib/Interfaces";
import { ActionIcon, Button, RangeSlider } from "@mantine/core";
import { useEffect, useState } from "react";
import SvgIcon from "./SvgIcon";
import Link from "next/link";
import { discountPrice } from "@/utils/utils";


interface PlantInfoProps {
  plantItem?: IPlant,
  className?: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantItem, className }) => {
  const classNameValue = className ? `${className}` : "";
  const [sizeCount, setSizeCount] = useState<ISizeCount>({});
  const [count, setCount] = useState(1);

  useEffect(() => {
    if(plantItem && plantItem?.sizeCount && plantItem?.sizeCount.length > 0) {
      setSizeCount(plantItem?.sizeCount[0]);
    }
  }, []);

  const getsize = (sizeName: string) => {
    if (sizeName == "small") {
      return "S";
    } else if (sizeName == "medium") {
      return "M";
    } else if (sizeName == "large") {
      return "L";
    }
    return "";
  };

  const decreaseCount = () => {
    if(count > 1) {
        setCount(count => count - 1);
    }
  };

  const increaseCount = () => {
    if (count < (sizeCount?.count || 1)) {
      setCount((count) => count + 1);
    }
  };

  const changeSize = (newSize?: ISizeCount) => {
    if(newSize && newSize.size !== sizeCount?.size) {
      setSizeCount(newSize);
      setCount(1);
    }
  };

  return (
    <div className={` ${classNameValue}`}>
      <h1 className="text-[28px] leading-16 font-bold">{plantItem?.name}</h1>
      <div className="mt-21 flex justify-between pb-13 border-b-[0.3px] border-b-chateau-green/50">
        <p className="text-[22px] leading-16 font-bold text-chateau-green">
          ${discountPrice(plantItem?.discount, plantItem?.price)}
          {plantItem?.discount ? (
            <span className="text-[#A5A5A5] line-through font-normal ml-16">
              {`$${plantItem?.price?.toFixed(2)}`}
            </span>
          ) : null}
        </p>
      </div>
      <p className="font-medium text-[15px] leading-16 mt-15">
        Short Description:
      </p>
      <p className="text-[14px] leading-24 text-dove-gray mt-10">
        {plantItem?.shortDescription}
      </p>
      <p className="font-medium text-[15px] leading-16 mt-24">Size:</p>
      <div className="flex mt-11 gap-10">
        {plantItem?.sizeCount?.map((sizeItem, index) => (
          <div
            key={index}
            className={`flex justify-center items-center cursor-pointer size-28 rounded-full border ${sizeItem?.size === sizeCount?.size ? "border-chateau-green text-chateau-green text-[18px] font-bold" : "border-[#EAEAEA] text-dove-gray text-[14px] font-medium"}  leading-16`}
            onClick={() => {changeSize(sizeItem)}}
          >
            {sizeItem?.size}
          </div>
        ))}
      </div>
      <div className="flex gap-10 mt-23 items-center">
        <div className="flex gap-20 items-center">
          <div
            className="cursor-pointer rounded-full w-33 h-38 shrink-0 bg-chateau-green hover:bg-chateau-green-600 text-white text-[28px] leading-16 flex justify-center items-center"
            onClick={() => decreaseCount()}
          >
            -
          </div>
          <p className="text-[20px] leading-10">{count}</p>
          <div
            className="cursor-pointer rounded-full w-33 h-38 shrink-0 bg-chateau-green hover:bg-chateau-green-600 text-white text-[28px] leading-16 flex justify-center items-center"
            onClick={() => increaseCount()}
          >
            +
          </div>
        </div>
        <Button className="min-h-40 ml-26 uppercase bg-chateau-green hover:bg-chateau-green-600 text-white font-bold text-[14px] leading-20 rounded-[6px]">
          Buy NOW
        </Button>
        <Button className="min-h-40 uppercase text-chateau-green font-bold text-[14px] leading-20 rounded-[6px] bg-transparent border border-chateau-green hover:bg-chateau-green hover:text-white">
          Add to cart
        </Button>
        <ActionIcon
          variant="outline"
          size={40}
          radius={6}
          className="text-chateau-green border-chateau-green hover:bg-chateau-green hover:text-white"
        >
          <SvgIcon iconName="heartStroke" />
        </ActionIcon>
      </div>
      <p className="text-dove-gray mt-26 text-[15px] leading-16">
        SKU: <span className="text-tuatara">{plantItem?.sku}</span>
      </p>
      <p className="text-dove-gray mt-10 text-[15px] leading-16">
        Category:{" "}
        <span className="text-tuatara">{plantItem?.category?.name}</span>
      </p>
      <div className="mt-18 flex gap-16 items-center">
        <p className="font-medium text-[15px] leading-16">
          Share this products:
        </p>
        <Link href="#">
          <SvgIcon iconName="facebook" />
        </Link>
        <Link href="#">
          <SvgIcon iconName="twitter" />
        </Link>
        <Link href="#">
          <SvgIcon iconName="linkedin" />
        </Link>
      </div>
    </div>
  );
};

export default PlantInfo;
