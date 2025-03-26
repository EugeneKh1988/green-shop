import AccountSide from "@/components/AccountSide";
import Container from "@/components/Container";
import { sideMenu } from "../layout";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Container className="pt-61">
      <div className="flex gap-28">
        <AccountSide activeMenu="Account Details" menu={sideMenu} />
        <div className="grow">{children}</div>
      </div>
    </Container>
  );
}
