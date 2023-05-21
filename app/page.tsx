import Hero from "@/components/Hero";
import TripPlaner from "@/components/TripPlaner";

const Home = () => (
  <main className="min-h-screen">
    <div className="flex flex-col justify-center items-center p-8 md:p-24">
      <Hero />
      <div className="h-12" />
      <TripPlaner />
    </div>
  </main>
)

export default Home;