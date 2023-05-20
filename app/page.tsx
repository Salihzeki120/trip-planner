import Hero from "@/components/Hero";
import TripPlaner from "@/components/trip-planer/TripPlaner";

const Home = () => (
  <main className="min-h-screen">
    <div className="flex flex-col justify-center items-center p-16 md:p-24">
      <Hero />
      <div className="h-12" />
      <TripPlaner />
    </div>
  </main>
)

export default Home;