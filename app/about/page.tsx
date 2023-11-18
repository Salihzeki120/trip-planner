import Hero from "@/components/hero";
import PageWrapper from "@/components/page-wrapper";

const Page = () => (
  <PageWrapper>
    <Hero
      title={
        <>
          About{" "}
          <span className="color-effect">
            who? why?
            <br />
            and when?
          </span>
        </>
      }
      description="Stay tuned for updates!"
    />
  </PageWrapper>
);

export default Page;
