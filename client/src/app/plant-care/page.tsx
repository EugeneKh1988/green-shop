import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import PlantsView from "@/components/PlantsView";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery, variables } from "@/queries/homepage";


export default async function PlantCarePage() {
  const { data } = await getClient().query<IHomePage>({
    query: homePageQuery,
    variables: variables,
  });

  return (
    <Container>
      <BreadCrumbs
        links={[{ name: "Home", href: "/" }, { name: "Plant Care" }]}
        className="mt-36"
      />
      <h3 className="my-20 text-[20px] leading-22 text-chateau-green text-center">
        No content
      </h3>
    </Container>
  );
}
