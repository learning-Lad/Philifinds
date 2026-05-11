import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client-side Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Server-side Supabase client with service role (for admin operations)
export const createAdminClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Database Types
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Itinerary {
  id: string;
  user_id: string;
  destination: string;
  budget: number;
  duration: string;
  group_size: string;
  travel_style: string;
  daily_plan: DailyPlan[];
  status: 'draft' | 'completed' | 'in-progress';
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Activity {
  time: string;
  title: string;
  location: string;
  cost: string;
  description?: string;
}

export interface EmergencyTicket {
  id: string;
  user_id: string;
  location: string;
  type: string;
  status: 'urgent' | 'pending' | 'resolved';
  message: string;
  contact: string;
  created_at: string;
  updated_at: string;
}
