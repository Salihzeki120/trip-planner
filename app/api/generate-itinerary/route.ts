import { ItineraryRequirements } from '@/lib/generateItinerary';
import { formatArrayToText, guessDurationFormat } from '@/utils/helpers';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type GenerateItineraryRequest = Request & {
    body: Partial<ItineraryRequirements>;
}

export async function POST(request: GenerateItineraryRequest) {
    if (!configuration.apiKey) {
        return NextResponse.json({ error: { message: "No API key found" } });
    }

    const itineraryRequirements = await request.json() as ItineraryRequirements;

    if (!itineraryRequirements) {
        return NextResponse.json({ error: { message: "No itinerary requirements found" } });
    }

    if (itineraryRequirements.destinations?.length === 0) {
        return NextResponse.json({ error: { message: "No destinations found" } });
    }

    try {
        console.log("itineraryRequirements", itineraryRequirements)
        const prompt = createTripItinerary(itineraryRequirements);
        console.log("prompt: ", prompt)
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.4,
            max_tokens: 1024,
            echo: true,
        });

        console.log("completion data", completion.data)
        const choices = completion.data.choices;
        const firstChoiceText = choices[0].text;
        return NextResponse.json({ result: firstChoiceText });
    } catch (error: any) {
        if (error.response) {
            console.error("Error with response:", error.response.status, error.response.data);
            return NextResponse.json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);

            return NextResponse.json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

const createTripItinerary = (requirements: ItineraryRequirements) => {
    const destinations = formatArrayToText(requirements.destinations);
    const duration = guessDurationFormat(requirements.duration);
    const activities = formatArrayToText(requirements.activities);

    const budget = requirements.budget;
    const months = formatArrayToText(requirements.months);
    const travellers = formatArrayToText(requirements.travellers)
    const dietaryRestrictions = formatArrayToText(requirements.dietaryRestrictions)
    const otherConsiderations = formatArrayToText(requirements.otherConsiderations)
    const inDepth = requirements.inDepth;

    return `
        As an expert travel planner for ${destinations}, I need you to provide me with a travel itinerary that fits accordingly with these requisites.
        - Duration: ${duration}
        - Activities: ${activities}
        ${budget && `- Budget: ${requirements.budget}`}
        ${months && `- Months: ${months} – if relevant, provide with the best time to visit`}
        ${travellers && `- Travellers: ${travellers}`}
        ${dietaryRestrictions && `- Dietary restrictions: ${dietaryRestrictions}`}
        ${otherConsiderations && `- Other considerations to take into account: ${otherConsiderations}`}

        ${inDepth && `
        Please provide me with a detailed itinerary for this trip, including:
        - Accommodation
        - Restaurants
        - Other relevant information
        `}
    `;
}