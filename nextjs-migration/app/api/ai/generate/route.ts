import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateItineraryPrompt, ItineraryRequest } from '@/lib/ai-prompts';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'nodejs'; // Force Node.js runtime

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ItineraryRequest = await request.json();

    // Validate required fields
    if (!body.destination || !body.budget || !body.duration || !body.travelStyle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate prompt
    const prompt = generateItineraryPrompt(body);

    console.log('[AI Generate] Starting itinerary generation for:', body.destination);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-3.5-turbo' for faster/cheaper responses
      messages: [
        {
          role: 'system',
          content: 'You are an expert travel planner specializing in the Philippines. You provide detailed, accurate, and practical travel itineraries in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' }, // Ensure JSON response
    });

    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const itineraryData = JSON.parse(responseText);

    console.log('[AI Generate] Successfully generated itinerary');

    // Return the generated itinerary
    return NextResponse.json({
      success: true,
      data: itineraryData.itinerary,
      meta: {
        model: completion.model,
        tokens_used: completion.usage?.total_tokens || 0,
        generated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[AI Generate] Error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Failed to generate itinerary',
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check API status
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'AI Itinerary Generation',
    version: '1.0.0',
  });
}
