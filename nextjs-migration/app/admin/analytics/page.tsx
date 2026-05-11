'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const DESTINATIONS = [
  { name: 'Palawan', trips: 412 },
  { name: 'Cebu', trips: 318 },
  { name: 'Boracay', trips: 274 },
  { name: 'Siargao', trips: 221 },
  { name: 'Bohol', trips: 189 },
  { name: 'Batanes', trips: 92 },
];

const WEEKLY_GROWTH = [
  { week: 'W1', users: 420, itineraries: 510 },
  { week: 'W2', users: 480, itineraries: 612 },
  { week: 'W3', users: 545, itineraries: 690 },
  { week: 'W4', users: 612, itineraries: 778 },
  { week: 'W5', users: 690, itineraries: 845 },
  { week: 'W6', users: 760, itineraries: 932 },
];

const SEGMENTS = [
  { name: 'Backpacker', value: 38 },
  { name: 'Mid-range', value: 44 },
  { name: 'Luxury', value: 18 },
];

const COLORS = ['#2D4C2D', '#7AA082', '#D2B48C'];

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#D9EAD3] bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg text-[#2D4C2D]">{title}</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-2xl text-[#1A1A1A]">Analytics & Trends</h1>
          <p className="text-sm text-[#7AA082]">Travel patterns across PhiliFinds</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Top Destinations">
            <BarChart data={DESTINATIONS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D9EAD3" />
              <XAxis dataKey="name" stroke="#7AA082" />
              <YAxis stroke="#7AA082" />
              <Tooltip />
              <Bar dataKey="trips" fill="#2D4C2D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Weekly Growth">
            <LineChart data={WEEKLY_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D9EAD3" />
              <XAxis dataKey="week" stroke="#7AA082" />
              <YAxis stroke="#7AA082" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#2D4C2D" strokeWidth={2} />
              <Line type="monotone" dataKey="itineraries" stroke="#D2B48C" strokeWidth={2} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Budget Tier Segments">
            <PieChart>
              <Pie
                data={SEGMENTS}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {SEGMENTS.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartCard>

          <ChartCard title="Itineraries per Week">
            <BarChart data={WEEKLY_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D9EAD3" />
              <XAxis dataKey="week" stroke="#7AA082" />
              <YAxis stroke="#7AA082" />
              <Tooltip />
              <Bar dataKey="itineraries" fill="#7AA082" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartCard>
        </div>
      </div>
    </main>
  );
}
