
import { Button, RangeSlider } from "@mantine/core";
import { useEffect, useState } from "react";


interface PlantPricesProps {
  onChangePrice: (price: [number, number]) => void;
  initialPriceValue: [number, number];
  className?: string;
}

const PlantPrices: React.FC<PlantPricesProps> = ({
  onChangePrice,
  initialPriceValue,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";
  const [price, setPrice] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    if (initialPriceValue) {
      setPrice(initialPriceValue);
    }
  }, []);

  return (
    <div className={` ${classNameValue}`}>
      <h2 className="font-bold text-[18px] leading-16">Price Range</h2>
      <div className="ml-12">
        <RangeSlider
          defaultValue={initialPriceValue}
          label={null}
          min={0}
          max={1000}
          step={1}
          minRange={10}
          value={price}
          onChange={setPrice}
          classNames={{
            root: "mt-20 max-w-226",
            bar: "bg-chateau-green",
            thumb: "bg-chateau-green border-white border-3 size-15",
            track: "before:bg-chateau-green/20 h-4",
          }}
        />
        <p className="mt-15 text-[15px] leading-16">
          Price:
          <span className="font-bold text-chateau-green">
            {` $${price[0]} - $${price[1]}`}
          </span>
        </p>
        <Button
          onClick={() => onChangePrice(price)}
          className="mt-16 bg-chateau-green hover:bg-chateau-green-600 text-white font-bold text-[16px] leading-20 rounded-[6px] data-disabled:bg-chateau-green-300"
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default PlantPrices;
