import { MOCK_ITINERARY } from '@/config';
import { ItineraryRequirements } from '@/lib/generateItinerary';
import { formatArrayToText } from '@/utils/helpers';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const runtime = 'edge';

type GenerateItineraryRequest = Request & {
    body: Partial<ItineraryRequirements>;
}

const askGPT = async (prompt: string) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: prompt }],
    });

    console.log(completion.data)
    return completion.data.choices[0].message?.content;
}

export async function POST(request: GenerateItineraryRequest) {
    if (!configuration.apiKey) {
        return NextResponse.json({ error: { message: "No API key found" } });
    }

    const itineraryRequirements = await request.json() as ItineraryRequirements;

    if (!itineraryRequirements) {
        return NextResponse.json({ error: { message: "No itinerary requirements found" } });
    }

    if (!itineraryRequirements.destinations) {
        return NextResponse.json({ error: { message: "No destinations found" } });
    }

    if (!itineraryRequirements.duration) {
        return NextResponse.json({ error: { message: "No duration entered" } });
    }

    try {
        const prompt = createTripItinerary(itineraryRequirements);

        if (process.env.NODE_ENV === 'development' && process.env.MOCK === 'true') {
            return NextResponse.json({ result: MOCK_ITINERARY });
        }

        const response = await askGPT(prompt);
        return NextResponse.json({ result: response });
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
    const destinations = requirements.destinations;
    const duration = requirements.duration;
    const activities = formatArrayToText(requirements.activities);

    const budget = requirements.budget;
    const months = formatArrayToText(requirements.months);
    const travellers = requirements.travellers
    const dietaryRestrictions = formatArrayToText(requirements.dietaryRestrictions)
    const otherConsiderations = formatArrayToText(requirements.otherConsiderations)
    const inDepth = requirements.inDepth;

    return `Act as a travel expert for ${destinations} and provide a travel itinerary that fits to these requisites.
        - Duration: ${duration}
        - Activities: ${activities}
        ${budget ? `- Budget: ${requirements.budget}` : null}
        ${months ? `- Months: ${months} – if relevant, provide with the best time to visit` : null}
        ${travellers ? `- Travellers: ${travellers}` : null}
        ${dietaryRestrictions ? `- Dietary restrictions: ${dietaryRestrictions}` : null}
        ${otherConsiderations ? `- Other considerations to take into account: ${otherConsiderations}` : null}

        ${inDepth ? `Please do provide an in-depth itinerary, including:
        - Accommodation
        - Restaurants
        - Other relevant information
        ` : null}
    `;
}