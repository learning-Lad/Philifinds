export type ItineraryParams = {
  destination: string;
  startDate: string;
  duration: string;
  budget: 'backpacker' | 'mid-range' | 'luxury';
  travelStyle: 'adventure' | 'relaxing' | 'culture';
};

export const buildItinerarySystemPrompt = () =>
  `You are Nimnim, a friendly travel planner specializing in the Philippines. Always respond with valid JSON only — no markdown fences, no commentary.`;

export const buildItineraryUserPrompt = (p: ItineraryParams) => `
Generate a day-by-day itinerary for the following trip:
- Destination: ${p.destination}
- Start date: ${p.startDate}
- Duration: ${p.duration}
- Budget tier: ${p.budget}
- Travel style: ${p.travelStyle}

Return JSON of the shape:
{
  "summary": string,
  "days": [
    {
      "day": number,
      "title": string,
      "activities": [
        { "time": string, "name": string, "description": string, "estimatedCostPHP": number }
      ]
    }
  ],
  "packingList": string[],
  "tips": string[]
}
`.trim();
