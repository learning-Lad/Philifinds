import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const runtime = 'nodejs';

// Philippine Emergency Contacts Database
const NATIONAL_EMERGENCY_CONTACTS = [
  {
    service: 'National Emergency Hotline',
    number: '911',
    type: 'general',
    available: '24/7',
  },
  {
    service: 'Philippine Red Cross',
    number: '143',
    type: 'medical',
    available: '24/7',
  },
  {
    service: 'Philippine National Police Hotline',
    number: '117',
    type: 'police',
    available: '24/7',
  },
  {
    service: 'DOT Tourist Assistance',
    number: '(02) 8524-1703',
    type: 'tourism',
    available: 'Business hours',
  },
];

const REGIONAL_CONTACTS: Record<string, Array<{
  service: string;
  number: string;
  type: string;
}>> = {
  palawan: [
    { service: 'Palawan Provincial Hospital', number: '(048) 433-2956', type: 'medical' },
    { service: 'El Nido Police Station', number: '(048) 434-0888', type: 'police' },
    { service: 'Puerto Princesa Tourism Office', number: '(048) 433-2983', type: 'tourism' },
  ],
  boracay: [
    { service: 'Boracay Health Center', number: '(036) 288-3232', type: 'medical' },
    { service: 'Boracay Police Station', number: '(036) 288-3066', type: 'police' },
    { service: 'Malay Tourism Office', number: '(036) 288-5689', type: 'tourism' },
  ],
  cebu: [
    { service: 'Cebu City Medical Center', number: '(032) 255-8000', type: 'medical' },
    { service: 'Cebu City Police Office', number: '(032) 231-2304', type: 'police' },
    { service: 'Cebu Tourism Office', number: '(032) 256-2337', type: 'tourism' },
  ],
  manila: [
    { service: 'Manila Medical Center', number: '(02) 8523-8131', type: 'medical' },
    { service: 'Manila Police District', number: '(02) 8527-3738', type: 'police' },
    { service: 'Manila Tourism Office', number: '(02) 8527-3850', type: 'tourism' },
  ],
};

interface EmergencyRequest {
  location?: string;
  type?: 'medical' | 'police' | 'tourism' | 'general';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: EmergencyRequest = await request.json();

    // Get location from request
    let location = body.location?.toLowerCase() || 'general';

    // If coordinates provided, reverse geocode to get location (simplified)
    if (body.coordinates) {
      location = await reverseGeocode(body.coordinates);
    }

    // Build contacts list
    let contacts = [...NATIONAL_EMERGENCY_CONTACTS];

    // Add regional contacts if available
    const regionalKey = Object.keys(REGIONAL_CONTACTS).find(key =>
      location.includes(key)
    );

    if (regionalKey) {
      contacts = [
        ...REGIONAL_CONTACTS[regionalKey],
        ...contacts,
      ];
    }

    // Filter by type if specified
    if (body.type) {
      contacts = contacts.filter(c => c.type === body.type || c.type === 'general');
    }

    // Log emergency request
    console.log(`[Emergency] Request from ${location} - Type: ${body.type || 'general'}`);

    // Optional: Store emergency request in database for tracking
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from('emergency_logs').insert({
          location,
          type: body.type || 'general',
          coordinates: body.coordinates,
          requested_at: new Date().toISOString(),
        });
      } catch (dbError) {
        // Don't fail the request if logging fails
        console.error('[Emergency] Failed to log request:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        location,
        contacts,
        safety_tips: generateSafetyTips(location),
      },
    });
  } catch (error) {
    console.error('[Emergency] Error:', error);

    // Always return emergency contacts even if there's an error
    return NextResponse.json({
      success: true,
      data: {
        location: 'Philippines',
        contacts: NATIONAL_EMERGENCY_CONTACTS,
        safety_tips: ['Call 911 for immediate emergency assistance'],
      },
    });
  }
}

async function reverseGeocode(coordinates: { lat: number; lng: number }): Promise<string> {
  // Simplified location detection based on coordinates
  // In production, use Google Maps Geocoding API
  const { lat, lng } = coordinates;

  // Basic region detection
  if (lat >= 9 && lat <= 11 && lng >= 118 && lng <= 120) {
    return 'palawan';
  }
  if (lat >= 11 && lat <= 12 && lng >= 121 && lng <= 122) {
    return 'boracay';
  }
  if (lat >= 10 && lat <= 11 && lng >= 123 && lng <= 124) {
    return 'cebu';
  }
  if (lat >= 14 && lat <= 15 && lng >= 120 && lng <= 121) {
    return 'manila';
  }

  return 'philippines';
}

function generateSafetyTips(location: string): string[] {
  const tips = [
    'Always keep your embassy contact information handy',
    'Share your itinerary with family or friends',
    'Keep copies of important documents (passport, IDs) in cloud storage',
  ];

  if (location.includes('island') || location.includes('beach')) {
    tips.push('Follow beach safety flags and lifeguard instructions');
    tips.push('Stay hydrated and use sun protection');
  }

  return tips;
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Emergency Support',
    supported_regions: Object.keys(REGIONAL_CONTACTS),
    national_hotlines: NATIONAL_EMERGENCY_CONTACTS.map(c => ({
      service: c.service,
      number: c.number,
    })),
  });
}
