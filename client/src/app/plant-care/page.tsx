import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";


export default async function PlantCarePage() {

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
