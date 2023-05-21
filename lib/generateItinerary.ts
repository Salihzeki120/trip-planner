export type ItineraryRequirements = {
    destinations: string;
    duration: string;
    activities: string[];
    budget: string;
    months: string[];
    travellers: string;
    dietaryRestrictions: string[];
    otherConsiderations: string[];
    inDepth: boolean;
}

export const generateItinerary = async (itinerary: ItineraryRequirements): Promise<string> => {
    const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...itinerary }),
    });

    const data = await response.json();

    if (response.status !== 200) {
        throw data.result || new Error(`generateItinerary.ts: Request failed with status ${response.status}`);
    }

    return data.result;
};