import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import PlantDescription from "@/components/PlantDescription";
import PlantInfo from "@/components/PlantInfo";
import PlantPhotos from "@/components/PlantPhotos";
import SimilarPlants from "@/components/SimilarPlants";
import { getClient } from "@/lib/ApolloClient";
import { IPlant } from "@/lib/Interfaces";
import { plantQuery, plantQueryVariables, plantsByCategoryQuery, plantsByCategoryVariables } from "@/queries/plant";

// Return a list of `params` to populate the [plant] and [category] dynamic segments
export async function generateStaticParams() {
  const { data } = await getClient().query<{ plants: IPlant[] }>({
    query: plantQuery,
  });
 
  return data.plants.map((plant) => ({
    plant: plant?.slug,
    category: plant?.category?.slug
  }));
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ category: string, plant: string }>;
}) {
  const { category, plant } = await params;
  // plant data
  const plantVariables = plantQueryVariables(plant, category);
  const { data } = await getClient().query<{ plants: IPlant[] }>({
    query: plantQuery,
    variables: plantVariables,
  });
  // similar plants data
  const similarCount = 5;
  const similarPlantsVariables = plantsByCategoryVariables(
    category,
    similarCount
  );
  const { data: similarPlants } = await getClient().query<{ plants: IPlant[] }>(
    {
      query: plantsByCategoryQuery,
      variables: similarPlantsVariables,
    }
  );
  //console.log(similarPlants);

  const plantItem =
    data?.plants && data?.plants?.length ? data?.plants[0] : null;
  return (
    <Container className="pb-50 xl:pb-120">
      {plantItem ? (
        <>
          <BreadCrumbs
            links={[{ name: "Home", href: "/" }, { name: "Shop" }]}
            className="pt-37"
          />
          <div className="mt-43 flex gap-52 flex-col xl:flex-row">
            <PlantPhotos photos={plantItem?.photos} className="xl:basis-1/2" />
            <div className="xl:basis-1/2">
              <PlantInfo plantItem={plantItem} />
            </div>
          </div>
          <PlantDescription description={plantItem?.description} />
          <SimilarPlants className="mt-50 xl:mt-127" currentPlantDocumentId={plantItem?.documentId} plants={similarPlants.plants} />
        </>
      ) : (
        <p>There is no such plant</p>
      )}
    </Container>
  );
}
