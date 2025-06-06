import CarouselBlock from "@/components/Carousel";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import HomeBlog from "@/components/HomeBlog";
import Info from "@/components/Info";
import Nav from "@/components/Nav";
import NewsLetter from "@/components/NewsLetter";
import PlantsView from "@/components/PlantsView";
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
      <PlantsView
        sizes={data.sizes}
        categories={data.categories}
        banner={data.homepage.banner}
        images={data.homepage.images}
      />
      <Info info={data.homepage.info} images={data.homepage.images} />
      <HomeBlog posts={data.blogs} className="mt-40 mb-25 lg:mt-138 md:mb-100" />
      <NewsLetter
        newsletter={data.homepage.newsletter}
        images={data.homepage.images}
      />
      <Contacts
        contacts={data.homepage.contacts}
        header={data.homepage.header}
        images={data.homepage.images}
      />
      <Footer footer={data.homepage.footer} />
    </>
  );
}
