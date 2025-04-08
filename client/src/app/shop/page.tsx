import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import PlantsView from "@/components/PlantsView";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery, variables } from "@/queries/homepage";


export default async function ShopPage() {
  const { data } = await getClient().query<IHomePage>({
    query: homePageQuery,
    variables: variables,
  });

  return (
    <>
      <Container>
        <BreadCrumbs
          links={[{ name: "Home", href: "/" }, { name: "Shop" }]}
          className="mt-36"
        />
      </Container>
      <PlantsView
        sizes={data.sizes}
        categories={data.categories}
        banner={data.homepage.banner}
        images={data.homepage.images}
      />
    </>
  );
}
