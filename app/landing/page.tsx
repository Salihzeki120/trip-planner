import TripPlaner from "@/components/itinerary-form/trip-planner";
import Hero from "@/components/hero";
import PageWrapper from "@/components/page-wrapper";

const Page = () => {
  return (
    <PageWrapper>
      <Hero
        title={
          <>
            Plan your <span className="color-effect">next trip</span>
            <br />
            like a pro.
          </>
        }
        description="Let our AI-powered travel assistant help you create an itenerary for your next trip and bring an immersive experience to your travel."
      />
      <div className="h-12" />
      <TripPlaner />
    </PageWrapper>
  );
};

export default Page;
