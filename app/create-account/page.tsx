import Hero from "@/components/hero";
import PageWrapper from "@/components/page-wrapper";

const Page = () => (
  <PageWrapper>
    <Hero
      title={
        <>
          Work in <span className="color-effect">progress</span>!
        </>
      }
      description="Stay tuned for updates!"
    />
  </PageWrapper>
);

export default Page;
