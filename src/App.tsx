import { Container, InfiniteLoader } from "@/components/shared";

export const App = () => {
  return (
    <main>
      <section className="py-10 ">
        <Container className="min-h-screen">
          <h1 className="font-bold mb-5">Dynamic Data Table</h1>
          <InfiniteLoader />
        </Container>
      </section>
    </main>
  );
};
