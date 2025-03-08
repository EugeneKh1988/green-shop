
import { IPlantCategory, } from "@/lib/Interfaces";

interface PlantCategoriesProps {
  onChangeCategory: (category: string) => void;
  currentCategoryValue: string;
  categories: IPlantCategory[];
  className?: string;
}

const PlantCategories: React.FC<PlantCategoriesProps> = ({
  onChangeCategory,
  currentCategoryValue,
  categories,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";
  const modifiedCategories = [{name: "All", slug: "all"}, ...categories];

  return (
    <div className={` ${classNameValue}`}>
      <h2 className="font-bold text-[18px] leading-16">Categories</h2>
      <ul className="mt-7 ml-12 font-medium text-[15px] leading-40">
        {modifiedCategories.map((category, index) => (
          <li key={category?.slug || index} className={`${currentCategoryValue == category?.slug ? 'text-chateau-green': ''}`}>
            <a
              className="block cursor-pointer"
              onClick={() => onChangeCategory(category?.slug || "all")}
            >
              {category?.name || "Category"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantCategories;
