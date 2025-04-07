import BreadCrumbs from "@/components/BreadCrumbs";
import Cart from "@/components/Cart";
import Container from "@/components/Container";


export default async function CategoryPage() {
  
  return (
    <Container>
       <BreadCrumbs
        links={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }, {name: "Shopping cart"}]}
        className="mt-36"
      />
      <Cart />
    </Container>
  );
}
