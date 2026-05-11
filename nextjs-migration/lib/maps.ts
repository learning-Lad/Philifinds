/**
 * OpenStreetMap & Nominatim Utilities
 * Free, open-source mapping - no API key required!
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodingResult {
  lat: number;
  lon: number;
  display_name: string;
  address: {
    city?: string;
    state?: string;
    province?: string;
    country?: string;
    country_code?: string;
  };
}

/**
 * Reverse geocode coordinates to location name using Nominatim
 */
export async function reverseGeocode(
  coordinates: Coordinates
): Promise<GeocodingResult | null> {
  try {
    const { lat, lng } = coordinates;
    const appName = process.env.NEXT_PUBLIC_APP_NAME || 'PhiliFinds';
    const appEmail = process.env.NEXT_PUBLIC_APP_EMAIL || '';

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?` +
        `format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': `${appName} ${appEmail}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data: GeocodingResult = await response.json();
    return data;
  } catch (error) {
    console.error('[Nominatim] Reverse geocoding error:', error);
    return null;
  }
}

/**
 * Forward geocode location name to coordinates using Nominatim
 */
export async function forwardGeocode(
  locationName: string
): Promise<GeocodingResult[]> {
  try {
    const appName = process.env.NEXT_PUBLIC_APP_NAME || 'PhiliFinds';
    const appEmail = process.env.NEXT_PUBLIC_APP_EMAIL || '';

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(locationName)}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          'User-Agent': `${appName} ${appEmail}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data: GeocodingResult[] = await response.json();
    return data;
  } catch (error) {
    console.error('[Nominatim] Forward geocoding error:', error);
    return [];
  }
}

/**
 * Get OpenStreetMap tile URL for Leaflet
 */
export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

/**
 * OpenStreetMap attribution (required for usage)
 */
export const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * Default map center for Philippines
 */
export const PHILIPPINES_CENTER: Coordinates = {
  lat: 12.8797,
  lng: 121.7740,
};

/**
 * Popular Philippine destinations with coordinates
 */
export const PHILIPPINE_DESTINATIONS: Record<string, Coordinates> = {
  manila: { lat: 14.5995, lng: 120.9842 },
  boracay: { lat: 11.9674, lng: 121.9248 },
  palawan: { lat: 9.8349, lng: 118.7384 },
  cebu: { lat: 10.3157, lng: 123.8854 },
  baguio: { lat: 16.4023, lng: 120.5960 },
  siargao: { lat: 9.8609, lng: 126.0476 },
  vigan: { lat: 17.5747, lng: 120.3869 },
  'el nido': { lat: 11.1949, lng: 119.4013 },
  'puerto princesa': { lat: 9.7392, lng: 118.7353 },
  bohol: { lat: 9.8500, lng: 124.1435 },
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
