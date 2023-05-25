import Hero from "@/components/Layout/Hero";
import PageWrapper from "@/components/Layout/PageWrapper";
import TripPlaner from "@/components/ItineraryForm/TripPlaner";

const Landing = () => (
  <PageWrapper>
    <Hero
      title={<>Plan your <span className="color-effect">next trip</span><br />like a pro.</>}
      description="Let our AI-powered travel assistant help you create an itenerary for your next trip and bring an immersive experience to your travel."
    />
    <div className="h-12" />
    <TripPlaner />
  </PageWrapper>
)

export default Landing;