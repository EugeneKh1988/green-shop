import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import NewsLetter from "@/components/NewsLetter";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery, variables } from "@/queries/homepage";

export default async function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getClient().query<IHomePage>({
    query: homePageQuery,
    variables: variables,
  });
  //console.log(data);
  return (
    <>
      <Nav
        header={data.homepage.header}
        images={data.homepage.images}
        activeMenuName="Home"
      />
      {children}
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
