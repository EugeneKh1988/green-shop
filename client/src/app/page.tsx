import CarouselBlock from "@/components/Carousel";
import Nav from "@/components/Nav";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery } from "@/queries/homepage";

export default async function Home() {
  const {data} = await getClient().query<IHomePage>({query: homePageQuery});
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
    </>
  );
}
