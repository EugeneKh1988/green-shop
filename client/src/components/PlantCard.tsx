
import { IPlant, } from "@/lib/Interfaces";
import StrapiImage from "./StrapiImage";
import Link from "next/link";
import { ActionIcon } from "@mantine/core";
import SvgIcon from "./SvgIcon";
import { discountPrice } from "@/utils/utils";

interface PlantCardProps {
  plant: IPlant;
  className?: string;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, className }) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <div className={` ${classNameValue}`}>
      <div className="bg-alabaster pt-31 pb-19 px-4 relative border-t-alabaster border-t-1 hover:border-t-chateau-green group">
        <StrapiImage
          src={plant?.cover?.url || "#"}
          width={plant?.cover?.width || 0}
          height={plant?.cover?.height || 0}
          alt={plant?.name || ""}
          className="mix-blend-multiply max-h-250"
        />
        {plant?.discount ? (
          <div className="absolute left-0 top-14 max-w-80 bg-chateau-green text-white text-[16px] leading-16 font-medium py-7 px-8">{`${plant?.discount}% OFF`}</div>
        ) : null}
        <div className="opacity-0 group-hover:opacity-100 absolute left-0 right-0 bottom-7 flex justify-center gap-10 transition-all duration-500">
          <ActionIcon
            variant="white"
            size={35}
            className="rounded-[4px] hover:text-chateau-green"
          >
            <SvgIcon iconName="cart" />
          </ActionIcon>
          <ActionIcon
            variant="white"
            size={35}
            className="rounded-[4px] hover:text-chateau-green"
          >
            <SvgIcon iconName="heartStroke" />
          </ActionIcon>
          <ActionIcon
            variant="white"
            size={35}
            className="rounded-[4px] hover:text-chateau-green"
          >
            <SvgIcon iconName="find" />
          </ActionIcon>
        </div>
      </div>
      <Link
        href={`/${plant?.category?.slug ? plant?.category?.slug + "/" : ""}${plant?.slug}`}
        className="block mt-12 text-[16px] leading-16"
      >
        {plant?.name}
      </Link>
      <p className="mt-6 font-bold text-[18px] leading-16 text-chateau-green">
        ${discountPrice(plant?.discount, plant?.price)}
        {plant?.discount ? (
          <span className="text-[#A5A5A5] line-through font-normal ml-16">
            {`$${plant?.price?.toFixed(2)}`}
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default PlantCard;
