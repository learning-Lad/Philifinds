# PhiliFinds - AI-Powered Travel Planning Platform

An intelligent travel planning platform for exploring the Philippines, featuring AI-generated itineraries, cost estimation, and comprehensive admin dashboard.

## 🌟 Features

### User Features
- **AI-Powered Itinerary Builder**: Multi-step form collecting destination, budget, duration, and travel style
- **Smart Recommendations**: Personalized travel plans based on preferences
- **Cost Breakdown**: Real-time estimates for flights, hotels, food, and activities
- **Trip Dashboard**: Progress checklist, itinerary sharing (URL/QR Code)
- **Emergency Support**: 24/7 assistance with local contact information

### Admin Features
- **Overview Dashboard**: Total users, active itineraries, popular regions, pending tickets
- **Analytics**: Travel trends with interactive charts (destinations, group sizes, budget trends)
- **Emergency Management**: Live feed of user assistance requests
- **User Moderation**: Account management and verification

## 🎨 Design System

### Brand Colors
- **Primary**: Forest Green (#2D4C2D)
- **Secondary**: Sage Green (#7AA082)
- **Accent**: Terracotta/Sand (#D2B48C)
- **Background**: Cream (#FAF9F6)
- **Muted**: Mint Green (#D9EAD3)

### Design Principles
- Rounded corners (16px+)
- Card-based layouts with subtle shadows
- Nature-inspired imagery (Philippines focus)
- Clean sans-serif typography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy `.env.example` to `.env.local` and add your API keys:
   ```bash
   cp .env.example .env.local
   ```

4. The dev server is already running in Figma Make

## 📁 Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── Login.tsx              # Authentication - Login
│   │   ├── Register.tsx           # Authentication - Sign Up
│   │   ├── Dashboard.tsx          # User trip dashboard
│   │   ├── ItineraryBuilder.tsx   # AI-powered trip planner
│   │   ├── ItineraryView.tsx      # Generated itinerary view
│   │   ├── admin/
│   │   │   ├── AdminLayout.tsx    # Admin sidebar layout
│   │   │   ├── AdminOverview.tsx  # Stats & overview
│   │   │   ├── AdminAnalytics.tsx # Travel trends charts
│   │   │   └── AdminEmergency.tsx # Emergency management
│   │   └── NotFound.tsx           # 404 page
│   ├── routes.tsx                 # React Router configuration
│   └── App.tsx                    # Main app component
├── styles/
│   ├── theme.css                  # PhiliFinds brand theme
│   └── fonts.css                  # Font imports
└── imports/                       # Figma assets
```

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `OPENAI_API_KEY`: OpenAI API key for AI itinerary generation
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key

## 🎯 Key Routes

- `/` or `/login` - Login page
- `/register` - Sign up page
- `/dashboard` - User dashboard
- `/itinerary/new` - Create new itinerary
- `/itinerary/:id` - View itinerary
- `/admin` - Admin overview
- `/admin/analytics` - Travel trends
- `/admin/emergency` - Emergency management

## 🛠️ Tech Stack

- **Framework**: React 18 with React Router 7
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend** (when connected): Supabase
- **AI**: OpenAI API

## 📊 Current Status

✅ Complete frontend implementation with mock data
⏳ Supabase integration pending (connect via Figma Make settings)

### Connecting Supabase

To enable real data persistence:
1. Use the Supabase connection card in Figma Make
2. Create the following tables in Supabase:
   - `users` - User accounts
   - `itineraries` - Travel plans
   - `emergency_tickets` - Support requests
3. Implement Row-Level Security (RLS) policies
4. Deploy Supabase edge functions for AI integration

## 🎨 Mascot: Nimnim

The platform features "Nimnim" - a friendly green cloud mascot that guides users through the itinerary creation process. Nimnim provides tips and encouragement throughout the journey.

## 📝 Notes

- This is a Figma Make project (React + Vite), not Next.js
- Mock data is used for demonstration purposes
- All authentication flows are currently client-side only
- Admin routes are accessible without authentication (add protection in production)
- Emergency support shows local Philippine emergency numbers

## 🔒 Security Considerations

- Implement proper authentication before deployment
- Add API rate limiting
- Secure admin routes with proper authorization
- Validate all user inputs
- Implement HTTPS in production
- Follow Supabase Row-Level Security best practices

## 📱 PWA Features (To Implement)

- Offline support
- Push notifications for trip reminders
- Add to home screen capability
- Service worker for caching

## 🌐 Future Enhancements

- Real-time collaboration on itineraries
- Integration with booking platforms
- Weather forecasts for destinations
- User reviews and ratings
- Social features (following, sharing)
- Mobile app (React Native)

---

Built with ❤️ for Philippine travelers
