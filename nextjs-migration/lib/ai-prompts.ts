export interface ItineraryRequest {
  destination: string;
  budget: number;
  duration: string;
  groupSize: string;
  travelStyle: 'relaxing' | 'adventure' | 'island-hopping' | 'cultural';
}

export const generateItineraryPrompt = (request: ItineraryRequest): string => {
  return `You are a travel expert specializing in the Philippines. Generate a detailed day-by-day itinerary based on the following requirements:

**Destination**: ${request.destination}
**Duration**: ${request.duration}
**Budget**: ₱${request.budget.toLocaleString()} PHP total
**Group Size**: ${request.groupSize}
**Travel Style**: ${request.travelStyle}

Please create a JSON response with the following structure:
{
  "itinerary": {
    "destination": "${request.destination}",
    "summary": "Brief overview of the trip (2-3 sentences)",
    "daily_plan": [
      {
        "day": 1,
        "title": "Day title",
        "activities": [
          {
            "time": "HH:MM AM/PM",
            "title": "Activity name",
            "location": "Specific location",
            "cost": "₱XXX or 'Free' or 'Included'",
            "description": "Brief description (1-2 sentences)"
          }
        ]
      }
    ],
    "cost_breakdown": {
      "accommodation": 0,
      "food": 0,
      "activities": 0,
      "transportation": 0,
      "total": 0
    },
    "travel_tips": [
      "Tip 1",
      "Tip 2",
      "Tip 3"
    ]
  }
}

**Guidelines**:
1. Consider the travel style when selecting activities:
   - Relaxing: Beach resorts, spas, leisurely dining
   - Adventure: Hiking, diving, water sports, outdoor activities
   - Island Hopping: Multiple islands, boat tours, snorkeling
   - Cultural: Museums, historical sites, local markets, traditional experiences

2. Budget allocation:
   - Ensure total cost stays within the specified budget
   - Apply realistic Philippine pricing (higher for Palawan/Boracay, lower for provincial areas)
   - Factor in group size for shared costs

3. Timing:
   - Start days at reasonable times (8-9 AM)
   - Include meal times
   - Allow travel time between locations
   - End days by 8-9 PM

4. Authenticity:
   - Use real Philippine locations and attractions
   - Include local food recommendations
   - Suggest transportation options (tricycle, jeepney, van rental)

5. Practical details:
   - Mention if activities require advance booking
   - Note seasonal considerations
   - Include safety tips if relevant

Generate a comprehensive, realistic, and exciting itinerary that maximizes value within the budget.`;
};
