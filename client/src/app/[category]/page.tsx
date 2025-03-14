import Container from "@/components/Container";




export default async function CategoryPage({ params }: {params: Promise<{category: string}>}) {
    const { category } = await params;
  return (
    <Container>
       <p>My category is: {category}</p>
    </Container>
  );
}
