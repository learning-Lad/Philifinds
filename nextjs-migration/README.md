# PhiliFinds - Next.js 14 Migration Package

Complete Next.js 14 implementation with TypeScript, Node.js API routes, and Supabase integration.

## 🚀 What's Included

### ✅ Complete Tech Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Node.js** API Route Handlers
- **Tailwind CSS** with PhiliFinds theme
- **Framer Motion** for animations
- **Supabase** client configuration
- **OpenAI API** integration
- **OpenStreetMap** with Leaflet for maps (FREE!)

### ✅ API Routes (Node.js)

1. **`/api/ai/generate`** - AI Itinerary Generation
   - Uses OpenAI GPT-4o
   - Generates complete day-by-day itineraries
   - Structured JSON responses
   - Cost breakdowns included

2. **`/api/costs`** - Smart Cost Estimator
   - Regional pricing multipliers for Philippines
   - Group size discounts
   - Travel style-based calculations
   - Cost-saving tips generation

3. **`/api/emergency`** - Emergency Support System
   - Location-based emergency contacts
   - National hotlines (911, Red Cross, PNP)
   - Regional contacts for major destinations
   - Reverse geocoding support

### ✅ Library Files

- **`lib/supabase.ts`** - Supabase client & admin configuration + TypeScript types
- **`lib/ai-prompts.ts`** - Structured prompts for AI generation
- **`lib/maps.ts`** - OpenStreetMap utilities (geocoding, distance calc, coordinates)
- **`lib/utils.ts`** - Utility functions (coming soon)

### ✅ Configuration Files

- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - PhiliFinds design tokens
- `next.config.mjs` - Next.js configuration
- `.env.example` - Environment variables template

## 📦 Installation

### 1. Extract Migration Package

```bash
cd /path/to/philifinds
cp -r nextjs-migration/* ./new-nextjs-app/
cd new-nextjs-app
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
# Supabase (from https://app.supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI (from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your-openai-key

# OpenStreetMap - FREE! (No API key needed)
# Optional: Set your app details for Nominatim rate limits
NEXT_PUBLIC_APP_NAME=PhiliFinds
NEXT_PUBLIC_APP_EMAIL=your-email@example.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Supabase Database

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Users table (handled by Supabase Auth, but you can extend it)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Itineraries table
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  travel_style TEXT NOT NULL,
  daily_plan JSONB NOT NULL,
  status TEXT DEFAULT 'draft',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Emergency tickets table
CREATE TABLE emergency_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  message TEXT NOT NULL,
  contact TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Emergency logs table (for API tracking)
CREATE TABLE emergency_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location TEXT,
  type TEXT,
  coordinates JSONB,
  requested_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own itineraries
CREATE POLICY "Users can read own itineraries"
  ON itineraries FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read public itineraries
CREATE POLICY "Anyone can read public itineraries"
  ON itineraries FOR SELECT
  USING (is_public = TRUE);

-- Users can insert their own itineraries
CREATE POLICY "Users can insert own itineraries"
  ON itineraries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own itineraries
CREATE POLICY "Users can update own itineraries"
  ON itineraries FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own itineraries
CREATE POLICY "Users can delete own itineraries"
  ON itineraries FOR DELETE
  USING (auth.uid() = user_id);

-- Emergency tickets policies (similar pattern)
CREATE POLICY "Users can read own tickets"
  ON emergency_tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON emergency_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 API Endpoints

### Generate Itinerary

```typescript
POST /api/ai/generate

Body:
{
  "destination": "Palawan",
  "budget": 25000,
  "duration": "5 Days",
  "groupSize": "Couple",
  "travelStyle": "island-hopping"
}

Response:
{
  "success": true,
  "data": {
    "destination": "Palawan",
    "summary": "...",
    "daily_plan": [...],
    "cost_breakdown": {...},
    "travel_tips": [...]
  },
  "meta": {
    "model": "gpt-4o",
    "tokens_used": 2450
  }
}
```

### Cost Estimation

```typescript
POST /api/costs

Body:
{
  "destination": "Boracay",
  "duration": "3 Days",
  "groupSize": "Small Group",
  "travelStyle": "relaxing"
}

Response:
{
  "success": true,
  "data": {
    "breakdown": {
      "accommodation": 11250,
      "food": 5100,
      "activities": 2125,
      "transportation": 5950,
      "total": 24425
    },
    "per_person": 6106,
    "regional_multiplier": 1.5,
    "tips": [...]
  }
}
```

### Emergency Support

```typescript
POST /api/emergency

Body:
{
  "location": "El Nido, Palawan",
  "type": "medical"
}

Response:
{
  "success": true,
  "data": {
    "location": "palawan",
    "contacts": [
      {
        "service": "Palawan Provincial Hospital",
        "number": "(048) 433-2956",
        "type": "medical"
      },
      ...
    ],
    "safety_tips": [...]
  }
}
```

## 🎨 Design Tokens

```typescript
colors: {
  'primary-forest': '#2D4C2D',    // Primary actions, headings
  'primary-sage': '#7AA082',       // Secondary elements
  'bg-cream': '#FAF9F6',           // Main background
  'bg-mint': '#D9EAD3',            // Muted backgrounds
  'accent-sand': '#D2B48C',        // Accents, highlights
  'text-charcoal': '#1A1A1A',      // Body text
}

borderRadius: {
  '2xl': '16px',  // Cards, containers
  'full': '9999px' // Buttons, badges
}
```

## 📁 Project Structure

```
nextjs-migration/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── api/
│   │   ├── ai/generate/route.ts      ← AI generation (Node.js)
│   │   ├── costs/route.ts            ← Cost estimator (Node.js)
│   │   └── emergency/route.ts        ← Emergency support (Node.js)
│   ├── dashboard/page.tsx
│   ├── itinerary/[id]/page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── analytics/page.tsx
│   │   └── emergency/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Map.tsx                       ← OpenStreetMap component
│   ├── ui/                           ← Reusable UI components
│   ├── itinerary/                    ← Itinerary-specific
│   ├── admin/                        ← Admin dashboard
│   └── shared/                       ← Shared components
├── lib/
│   ├── supabase.ts                   ← Supabase configuration
│   ├── ai-prompts.ts                 ← AI prompt templates
│   ├── maps.ts                       ← OpenStreetMap utilities
│   └── utils.ts                      ← Utility functions
├── public/                           ← Static assets
├── .env.example                      ← Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env.local`
2. **Supabase RLS**: Always enable Row Level Security
3. **API Keys**: Use service role key only in API routes (server-side)
4. **Input Validation**: Validate all user inputs
5. **Rate Limiting**: Implement rate limiting for API routes

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🗺️ OpenStreetMap Integration

PhiliFinds uses **OpenStreetMap** - a free, open-source mapping solution (no API key required!).

### Features

✅ **Free Forever** - No API keys, no billing, no limits  
✅ **Leaflet.js** - Interactive maps with React  
✅ **Nominatim API** - Geocoding (address ↔ coordinates)  
✅ **Zero Setup** - Works immediately after `npm install`

### Using the Map Component

```tsx
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function MyPage() {
  return (
    <Map
      center={{ lat: 11.9674, lng: 121.9248 }}  // Boracay
      zoom={13}
      markers={[
        {
          position: { lat: 11.9674, lng: 121.9248 },
          label: 'White Beach',
          description: 'Famous beach destination'
        }
      ]}
    />
  );
}
```

### Geocoding Utilities

```typescript
import { forwardGeocode, reverseGeocode, PHILIPPINE_DESTINATIONS } from '@/lib/maps';

// Convert location name to coordinates
const results = await forwardGeocode('Boracay, Philippines');
// [{ lat: 11.9674, lon: 121.9248, display_name: '...' }]

// Convert coordinates to location name
const location = await reverseGeocode({ lat: 11.9674, lng: 121.9248 });
// { display_name: 'White Beach, Boracay...', address: {...} }

// Use predefined destinations
const cebuCoords = PHILIPPINE_DESTINATIONS.cebu;
// { lat: 10.3157, lng: 123.8854 }
```

### API Route Example

The Emergency API already uses OpenStreetMap for reverse geocoding:

```typescript
// In /api/emergency/route.ts
const location = await reverseGeocode(coordinates);
// Returns location name for coordinate-based emergency requests
```

### Adding Map Styles to Your App

Add Leaflet CSS to your `app/layout.tsx`:

```tsx
import 'leaflet/dist/leaflet.css';
```

### Why OpenStreetMap?

- ✅ **Cost**: $0/month vs Google Maps $200/month (after free tier)
- ✅ **Privacy**: No tracking, no data collection
- ✅ **Community**: Open data, constantly updated
- ✅ **Philippines Coverage**: Excellent coverage of all regions
- ✅ **Offline Capable**: Can cache tiles for offline use

## 📝 Next Steps

1. **Create Page Components**: Build the frontend pages using the React components from the current app
2. **Add Authentication**: Implement Supabase Auth in login/register pages
3. **Connect API Routes**: Call the API routes from frontend components
4. **Add Analytics**: Integrate Recharts for admin dashboard
5. **Testing**: Write tests for API routes and components
6. **Optimization**: Add caching, image optimization
7. **PWA**: Add service worker and manifest

## 🆚 Migration from Current App

The current React app can be migrated page by page:

1. **Copy component logic** from `src/app/pages/` to Next.js `app/` directory
2. **Replace mock data** with Supabase queries
3. **Update API calls** to use Next.js API routes
4. **Add TypeScript types** for all components
5. **Test incrementally** as you migrate each page

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Built with ❤️ for PhiliFinds**
