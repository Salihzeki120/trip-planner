import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {


    return NextResponse.json({ hello: "Hello!" });
}

