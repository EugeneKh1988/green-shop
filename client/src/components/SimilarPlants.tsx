
import { IPlant } from "@/lib/Interfaces";
import PlantCard from "./PlantCard";
import React from "react";

interface SimilarPlantsProps {
  currentPlantDocumentId?: string;
  plants?: IPlant[];
  className?: string;
}

const SimilarPlants: React.FC<SimilarPlantsProps> = ({ className, plants, currentPlantDocumentId }) => {
  const classNameValue = className ? `${className}` : "";
  const modifiedPlants = plants?.filter(plant => plant?.documentId !== currentPlantDocumentId);
  //console.log(modifiedPlants);

  return (
    <div className={`${classNameValue}`}>
      {currentPlantDocumentId &&
      modifiedPlants &&
      modifiedPlants?.length > 0 ? (
        <>
          <p className="text-chateau-green font-bold text-[17px] leading-16 pb-12 border-b-[0.3px] border-b-chateau-green/50">
            Releted Products
          </p>
          <div className="mt-44 grid grid-cols-2 xl:grid-cols-5 gap-33 justify-between content-start">
            {modifiedPlants?.map((plantItem, index) => (
              <PlantCard
                plant={plantItem}
                className="max-w-219"
                key={plantItem?.documentId || index}
              />
            ))}
          </div>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default SimilarPlants;
