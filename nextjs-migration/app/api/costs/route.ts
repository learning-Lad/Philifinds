import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Regional pricing multipliers for the Philippines
const REGIONAL_MULTIPLIERS: Record<string, number> = {
  // Premium destinations
  palawan: 1.4,
  boracay: 1.5,
  siargao: 1.3,

  // Mid-range
  cebu: 1.2,
  bohol: 1.15,
  'el nido': 1.4,
  coron: 1.35,

  // Budget-friendly
  baguio: 1.0,
  vigan: 0.9,
  manila: 1.1,
  batanes: 1.3,
  davao: 1.05,
  'ilocos norte': 0.95,
  sagada: 0.9,
};

// Base costs (in PHP) per category
const BASE_COSTS = {
  accommodation: {
    budget: 800,      // per night
    midrange: 2500,
    luxury: 6000,
  },
  food: {
    budget: 500,      // per day
    midrange: 1200,
    luxury: 3000,
  },
  activities: {
    island_hopping: 1200,
    diving: 2500,
    city_tour: 800,
    museum: 200,
    beach_resort_entry: 500,
    hiking: 500,
    cultural_show: 1000,
  },
  transportation: {
    tricycle: 50,
    jeepney: 15,
    van_rental: 3500,   // per day
    domestic_flight: 4000,
    boat_tour: 1500,
  },
};

interface CostEstimateRequest {
  destination: string;
  duration: string;
  groupSize: string;
  travelStyle: string;
  activities?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CostEstimateRequest = await request.json();

    // Extract number of days from duration
    const daysMatch = body.duration.match(/(\d+)/);
    const days = daysMatch ? parseInt(daysMatch[0]) : 3;

    // Determine budget tier from travel style
    let budgetTier: 'budget' | 'midrange' | 'luxury' = 'midrange';
    if (body.travelStyle === 'relaxing') budgetTier = 'luxury';
    if (body.travelStyle === 'cultural') budgetTier = 'budget';

    // Get regional multiplier
    const region = body.destination.toLowerCase();
    const multiplier = REGIONAL_MULTIPLIERS[region] || 1.0;

    // Calculate base costs
    const accommodationCost = BASE_COSTS.accommodation[budgetTier] * days * multiplier;
    const foodCost = BASE_COSTS.food[budgetTier] * days * multiplier;

    // Calculate activities cost based on travel style
    let activitiesCost = 0;
    switch (body.travelStyle) {
      case 'island-hopping':
        activitiesCost = (BASE_COSTS.activities.island_hopping * Math.ceil(days / 2)) * multiplier;
        break;
      case 'adventure':
        activitiesCost = (BASE_COSTS.activities.diving + BASE_COSTS.activities.hiking) * multiplier;
        break;
      case 'cultural':
        activitiesCost = (BASE_COSTS.activities.museum * 2 + BASE_COSTS.activities.cultural_show) * multiplier;
        break;
      case 'relaxing':
        activitiesCost = (BASE_COSTS.activities.beach_resort_entry * days) * multiplier;
        break;
    }

    // Transportation estimate
    const transportationCost = (BASE_COSTS.transportation.van_rental * Math.ceil(days / 2) +
      BASE_COSTS.transportation.tricycle * days * 2) * multiplier;

    // Calculate group discount
    const groupSizeNum = body.groupSize === 'Solo' ? 1 :
                         body.groupSize === 'Couple' ? 2 :
                         body.groupSize === 'Small Group' ? 4 : 6;

    const groupDiscount = groupSizeNum > 2 ? 0.85 : 1.0; // 15% discount for groups

    // Total calculation
    const subtotal = accommodationCost + foodCost + activitiesCost + transportationCost;
    const total = Math.round(subtotal * groupDiscount);

    const breakdown = {
      accommodation: Math.round(accommodationCost * groupDiscount),
      food: Math.round(foodCost * groupDiscount),
      activities: Math.round(activitiesCost * groupDiscount),
      transportation: Math.round(transportationCost * groupDiscount),
      total,
    };

    // Generate cost-saving tips
    const tips = generateCostSavingTips(region, budgetTier, body.travelStyle);

    console.log(`[Cost Estimator] ${body.destination}: ₱${total.toLocaleString()}`);

    return NextResponse.json({
      success: true,
      data: {
        breakdown,
        per_person: groupSizeNum > 1 ? Math.round(total / groupSizeNum) : total,
        currency: 'PHP',
        regional_multiplier: multiplier,
        tips,
      },
    });
  } catch (error) {
    console.error('[Cost Estimator] Error:', error);

    return NextResponse.json(
      { error: 'Failed to calculate costs' },
      { status: 500 }
    );
  }
}

function generateCostSavingTips(region: string, tier: string, style: string): string[] {
  const tips: string[] = [];

  if (tier !== 'budget') {
    tips.push('Consider traveling during off-season (June-November) for 30-40% savings');
  }

  if (region === 'palawan' || region === 'boracay') {
    tips.push('Book accommodation 2-3 months in advance for better rates');
  }

  tips.push('Eat at local carinderias instead of tourist restaurants to save 50% on food');

  if (style === 'island-hopping') {
    tips.push('Join group tours instead of private tours to reduce boat costs');
  }

  tips.push('Use jeepneys and tricycles instead of taxis for local transportation');

  return tips;
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Cost Estimator',
    supported_regions: Object.keys(REGIONAL_MULTIPLIERS),
  });
}
