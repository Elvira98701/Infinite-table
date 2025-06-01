import { Container, Form, InfiniteLoader } from "@/components/shared";

export const App = () => {
  return (
    <main>
      <section className="py-10">
        <Container className="min-h-screen">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5">
            <h1 className="font-bold flex-1">Dynamic Data Table</h1>
            <Form className="max-w-2xl flex-2/3" />
          </div>

          <InfiniteLoader />
        </Container>
      </section>
    </main>
  );
};
