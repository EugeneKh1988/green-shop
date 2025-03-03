import CarouselBlock from "@/components/Carousel";
import HomeBlog from "@/components/HomeBlog";
import Info from "@/components/Info";
import Nav from "@/components/Nav";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery, variables } from "@/queries/homepage";

export default async function Home() {
  const {data} = await getClient().query<IHomePage>({query: homePageQuery,variables: variables});
  //console.log(data);

  return (
    <>
      <Nav
        header={data.homepage.header}
        images={data.homepage.images}
        activeMenuName="Home"
      />
      <CarouselBlock
        carousel={data.homepage.carousel}
        images={data.homepage.images}
      />
      <Info info={data.homepage.info} images={data.homepage.images} />
      <HomeBlog posts={data.blogs} />
    </>
  );
}
