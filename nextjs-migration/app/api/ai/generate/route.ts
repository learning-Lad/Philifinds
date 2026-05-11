import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateItineraryPrompt, ItineraryRequest } from '@/lib/ai-prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body: ItineraryRequest = await request.json();

    if (!body.destination || !body.budget || !body.duration || !body.travelStyle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = generateItineraryPrompt(body);

    console.log('[AI Generate] Starting itinerary generation for:', body.destination);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
      systemInstruction:
        'You are an expert travel planner specializing in the Philippines. You provide detailed, accurate, and practical travel itineraries in valid JSON format only.',
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText) throw new Error('No response from Gemini');

    const itineraryData = JSON.parse(responseText);

    console.log('[AI Generate] Successfully generated itinerary');

    return NextResponse.json({
      success: true,
      data: itineraryData.itinerary ?? itineraryData,
      meta: {
        model: 'gemini-1.5-flash',
        generated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[AI Generate] Error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: 'Failed to generate itinerary', message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'AI Itinerary Generation (Gemini)',
    version: '1.1.0',
  });
}
