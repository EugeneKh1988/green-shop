import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import HomeBlog from "@/components/HomeBlog";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery, variables } from "@/queries/homepage";

export default async function BlogsPage() {
  const { data } = await getClient().query<IHomePage>({
    query: homePageQuery,
    variables: variables,
  });

  return (
    <>
      <Container>
        <BreadCrumbs
          links={[{ name: "Home", href: "/" }, { name: "Blogs" }]}
          className="mt-36"
        />
      </Container>
      <HomeBlog posts={data.blogs} className="mt-20 mb-30" />
    </>
  );
}
