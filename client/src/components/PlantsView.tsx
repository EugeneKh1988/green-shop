"use client"

import { IBanner, IImage, IPlantCategory, IPlants, IPlantSize } from "@/lib/Interfaces";
import Container from "@/components/Container";
import PlantCategories from "./PlantCategories";
import PlantSizes from "./PlantSizes";
import PlantPrices from "./PlantPrices";
import Banner from "./Banner";
import { plantsQuery, plantsQueryVariables } from "@/queries/homepage";
import { useSuspenseQuery } from "@apollo/client";
import PlantCard from "./PlantCard";
import { readLocalStorageValue, useLocalStorage } from "@mantine/hooks";
import { Pagination } from "@mantine/core";
import { useEffect } from "react";
import PlantSort from "./PlantsSort";

interface PlantsViewProps {
  sizes: IPlantSize[];
  categories: IPlantCategory[];
  banner: IBanner;
  images: IImage[];
  className?: string;
}

const PlantsView: React.FC<PlantsViewProps> = ({
  sizes,
  categories,
  banner,
  images,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";
  const [category, setCategory] = useLocalStorage({
    key: "category",
    defaultValue: "all",
  });
  const [size, setSize] = useLocalStorage({
    key: "size",
    defaultValue: "all",
  });
  const [price, setPrice] = useLocalStorage<[number, number]>({
    key: "prices",
    defaultValue: [0, 100],
  });
  // page
  const pageSize = 9;
  const [activePage, setPage] = useLocalStorage({
    key: "page",
    defaultValue: 1
  });
  const [sort, setSort] = useLocalStorage({
    key: "sort",
    defaultValue: "price:asc",
  });

  const variables = plantsQueryVariables(category, size, price, sort, activePage, pageSize);
  const { data } = useSuspenseQuery<IPlants>(plantsQuery, {
    variables: variables,
  });
  //console.log(data);

  // reset page after category, size of price change
  useEffect(() => {
    if(activePage > 1) {
      setPage(1);
    }
  }, [category, size, price]);

  return (
    <Container className={`my-26 ${classNameValue}`}>
      <div className="flex gap-50">
        <div className="max-w-310 grow hidden md:block">
          <div className="bg-alabaster py-14 pl-18 pr-24">
            <PlantCategories
              categories={categories}
              currentCategoryValue={category}
              onChangeCategory={setCategory}
            />
            <PlantPrices
              initialPriceValue={readLocalStorageValue({
                key: "prices",
                defaultValue: price,
              })}
              onChangePrice={setPrice}
              className="mt-46"
            />
            <PlantSizes
              sizes={sizes}
              currentSizeValue={size}
              onChangeSize={setSize}
              className="mt-46"
            />
          </div>
          <Banner banner={banner} images={images} />
        </div>
        <div className="w-full">
          <div className="flex justify-end">
            <PlantSort currentSortValue={sort} onChangeSort={setSort} />
          </div>
          <div className="mt-31 grid grid-cols-2 xl:grid-cols-3 gap-33 justify-between content-start">
            {data.plants_connection.nodes.map((plant, index) => (
              <PlantCard
                plant={plant}
                key={plant?.documentId || index}
                className="max-w-258"
              />
            ))}
            <div className="mt-90 col-span-2 xl:col-span-3 flex justify-end">
              {data.plants_connection.nodes.length > 0 ? (
                <Pagination
                  value={activePage}
                  onChange={setPage}
                  total={data.plants_connection.pageInfo?.pageCount || 1}
                  classNames={{
                    control:
                      "bg-transparent border-1 border-[#E5E5E5] rounded-[4px] text-[18px] leading-16 data-active:text-white data-active:bg-chateau-green hover:data-active:bg-chateau-green-600",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlantsView;
