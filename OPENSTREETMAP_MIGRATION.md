# OpenStreetMap Migration - Complete Guide

## ✅ What Changed

**Before:** Google Maps API (requires API key, billing, $200/month after free tier)  
**After:** OpenStreetMap (FREE, no API key, no billing, unlimited)

---

## 📋 Updated Files

### 1. Environment Variables (`.env.local`)

**Removed:**
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

**Added:**
```env
NEXT_PUBLIC_APP_NAME=PhiliFinds
NEXT_PUBLIC_APP_EMAIL=your-email@example.com
```

### 2. New Files Created

- ✅ `lib/maps.ts` - OpenStreetMap utilities (geocoding, coordinates, distance calculations)
- ✅ `app/components/Map.tsx` - Reusable interactive map component
- ✅ Updated `app/api/emergency/route.ts` - Now uses Nominatim for real geocoding

### 3. Dependencies Added

```json
"leaflet": "^1.9.4",
"react-leaflet": "^4.2.1",
"@types/leaflet": "^1.9.12"
```

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd nextjs-migration
npm install
```

This will install Leaflet and React-Leaflet automatically.

### Step 2: Update `.env.local`

Copy this complete file to `/nextjs-migration/.env.local`:

```env
# ============================================
# PhiliFinds - Local Development Environment
# ============================================
# IMPORTANT: Never commit this file to Git!
# ============================================

# --------------------------------------------
# 1. SUPABASE CONFIGURATION
# --------------------------------------------
# 📍 Get these from: https://app.supabase.com
#    → Select your project → Settings → API
#
# Project URL (format: https://xxxxx.supabase.co)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Anon/Public Key (starts with: eyJhbGciOiJIUzI1...)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_anon_key

# Service Role Key (starts with: eyJhbGciOiJIUzI1...)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_role_key

# --------------------------------------------
# 2. OPENAI API (AI Itinerary Generation)
# --------------------------------------------
# 📍 Get your key from: https://platform.openai.com/api-keys
#
# Steps:
# 1. Create account at OpenAI
# 2. Go to API Keys section
# 3. Click "Create new secret key"
# 4. Copy key (starts with: sk-proj- or sk-)
#
# ⚠️ Make sure you have billing set up and credits available!
OPENAI_API_KEY=sk-proj-your_openai_api_key_here

# --------------------------------------------
# 3. MAP SERVICE (Location & Geocoding)
# --------------------------------------------
# 📍 Using OpenStreetMap (FREE - No API Key Required!)
#
# OpenStreetMap Nominatim for geocoding
# Leaflet.js for interactive maps
#
# Services used:
# ✓ Nominatim API (reverse geocoding) - FREE
# ✓ OpenStreetMap tiles - FREE
# ✓ No registration or API key needed!
#
# Optional: Set your app identifier for Nominatim (recommended)
NEXT_PUBLIC_APP_NAME=PhiliFinds
NEXT_PUBLIC_APP_EMAIL=your-email@example.com

# --------------------------------------------
# 4. APP SETTINGS
# --------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000

# --------------------------------------------
# OPTIONAL: Debug Settings (uncomment if needed)
# --------------------------------------------
# NEXT_PUBLIC_DEBUG=true
# NODE_ENV=development
```

### Step 3: Add Leaflet CSS to Layout

In `app/layout.tsx`, add:

```tsx
import 'leaflet/dist/leaflet.css';
```

### Step 4: Use the Map Component

```tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function DestinationPage() {
  return (
    <div>
      <h1>Boracay</h1>
      <Map
        center={{ lat: 11.9674, lng: 121.9248 }}
        zoom={13}
        markers={[
          {
            position: { lat: 11.9674, lng: 121.9248 },
            label: 'White Beach',
            description: 'Famous beach in Boracay'
          }
        ]}
      />
    </div>
  );
}
```

---

## 🛠️ Geocoding Examples

### Reverse Geocoding (Coordinates → Address)

```typescript
import { reverseGeocode } from '@/lib/maps';

const result = await reverseGeocode({ lat: 11.9674, lng: 121.9248 });
console.log(result?.display_name);
// "White Beach, Boracay, Aklan, Philippines"
```

### Forward Geocoding (Address → Coordinates)

```typescript
import { forwardGeocode } from '@/lib/maps';

const results = await forwardGeocode('Boracay, Philippines');
console.log(results[0]);
// { lat: 11.9674, lon: 121.9248, display_name: "...", address: {...} }
```

### Predefined Philippine Destinations

```typescript
import { PHILIPPINE_DESTINATIONS } from '@/lib/maps';

const destinations = [
  PHILIPPINE_DESTINATIONS.manila,     // { lat: 14.5995, lng: 120.9842 }
  PHILIPPINE_DESTINATIONS.boracay,    // { lat: 11.9674, lng: 121.9248 }
  PHILIPPINE_DESTINATIONS.palawan,    // { lat: 9.8349, lng: 118.7384 }
  PHILIPPINE_DESTINATIONS.cebu,       // { lat: 10.3157, lng: 123.8854 }
  PHILIPPINE_DESTINATIONS.baguio,     // { lat: 16.4023, lng: 120.5960 }
  PHILIPPINE_DESTINATIONS.siargao,    // { lat: 9.8609, lng: 126.0476 }
  PHILIPPINE_DESTINATIONS['el nido'], // { lat: 11.1949, lng: 119.4013 }
];
```

### Distance Calculation

```typescript
import { calculateDistance } from '@/lib/maps';

const distance = calculateDistance(
  { lat: 14.5995, lng: 120.9842 },  // Manila
  { lat: 10.3157, lng: 123.8854 }   // Cebu
);
console.log(`${distance.toFixed(2)} km`); // "570.25 km"
```

---

## 🎯 API Integration

The Emergency API now uses real OpenStreetMap geocoding:

```typescript
// POST /api/emergency
{
  "coordinates": { "lat": 11.9674, "lng": 121.9248 },
  "type": "medical"
}

// Response includes location detected via Nominatim
{
  "success": true,
  "data": {
    "location": "boracay",  // ← Detected from coordinates
    "contacts": [...],
    "safety_tips": [...]
  }
}
```

---

## 📊 Comparison: Google Maps vs OpenStreetMap

| Feature | Google Maps | OpenStreetMap |
|---------|-------------|---------------|
| **Cost** | $200/month free tier → Paid | FREE forever |
| **API Key** | Required | None |
| **Billing** | Required | Not required |
| **Philippines Coverage** | Excellent | Excellent |
| **Rate Limits** | 25,000/day free | Fair use policy |
| **Privacy** | Tracks users | No tracking |
| **Offline** | Limited | Full support |
| **Customization** | Limited | Complete control |

---

## 🔥 Benefits of OpenStreetMap

✅ **$0 Monthly Cost** - No credit card needed  
✅ **No API Key Setup** - Works immediately  
✅ **No Rate Limits** - Fair use policy  
✅ **Better Privacy** - No Google tracking  
✅ **Open Source** - Community-driven  
✅ **Offline Capable** - Cache tiles for offline use  
✅ **Full Control** - Customize everything  
✅ **Great for Philippines** - Excellent local coverage

---

## 🚨 Important Notes

1. **Nominatim Fair Use Policy**
   - Add User-Agent header (already done in `lib/maps.ts`)
   - Max 1 request/second for free tier
   - For high-volume apps, consider self-hosting Nominatim

2. **No API Key Needed**
   - Maps work immediately after `npm install`
   - No registration or billing setup required

3. **Attribution Required**
   - Must display "© OpenStreetMap contributors"
   - Already included in the Map component

---

## 🎉 You're Done!

You can now:
- ✅ Display interactive maps (FREE)
- ✅ Geocode addresses to coordinates (FREE)
- ✅ Reverse geocode coordinates to addresses (FREE)
- ✅ Calculate distances between locations
- ✅ Use predefined Philippine destinations

All without spending a cent or setting up billing! 🎊

---

**Questions?** Check the [README.md](./README.md) for more examples and documentation.
