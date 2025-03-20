import Nav from "@/components/Nav";
import { getClient } from "@/lib/ApolloClient";
import { IHomePage } from "@/lib/Interfaces";
import { homePageQuery, variables } from "@/queries/homepage";

export default async function AccountLayout({
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
        activeMenuName="Other"
      />
      {children}
    </>
  );
}

export const sideMenu = [
  { name: "Account Details", href: "/account/details", icon: "user" },
  { name: "Address", href: "/account/address", icon: "location" },
  { name: "Orders", href: "/account/orders", icon: "cart" },
  { name: "Wishlist", href: "/account/wishlist", icon: "heartStroke" },
  { name: "Reports", href: "/account/reports", icon: "activity" },
  { name: "Downloads", href: "/account/downloads", icon: "download" },
  { name: "Support", href: "/account/support", icon: "danger" },
];
