import { Metadata } from "next";

export const seoConfig: Metadata = {
  title: "TripPlanner: Instant Itineraries, Effortless Travel",
  description:
    "Discover quick and easy travel planning with TripPlanner. Just enter your destination and get an instant personalized itinerary. Explore the world hassle-free with TripPlanner - your fast track to a perfect trip",
  icons: [
    {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🌍</text></svg>",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://trip-planner.rydkvist.com/",
    images: [
      {
        url: "/assets/cover.jpg",
        width: 900,
        height: 400,
        alt: "TripPlanner: Instant Itineraries, Effortless Travel",
      },
    ],
  },
};
