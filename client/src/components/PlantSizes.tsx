
import { IPlantSize, } from "@/lib/Interfaces";

interface PlantSizesProps {
  onChangeSize: (size: string) => void;
  currentSizeValue: string;
  sizes: IPlantSize[];
  className?: string;
}

const PlantSizes: React.FC<PlantSizesProps> = ({
  onChangeSize,
  currentSizeValue,
  sizes,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";
  const modifiedSizes = [{ name: "All", slug: "all" }, ...sizes];

  return (
    <div className={` ${classNameValue}`}>
      <h2 className="font-bold text-[18px] leading-16">Size</h2>
      <ul className="mt-7 ml-12 font-medium text-[15px] leading-40">
        {modifiedSizes.map((size, index) => (
          <li
            key={size?.slug || index}
            className={`${currentSizeValue == size?.slug ? "text-chateau-green" : ""}`}
          >
            <a
              className="block cursor-pointer"
              onClick={() => onChangeSize(size?.slug || "all")}
            >
              {size?.name || "Size"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantSizes;
