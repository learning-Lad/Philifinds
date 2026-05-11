import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

export default function AdminAnalytics() {
  // Most Requested Destinations
  const destinationData = [
    { name: 'Palawan', trips: 1234 },
    { name: 'Boracay', trips: 987 },
    { name: 'Siargao', trips: 654 },
    { name: 'Cebu', trips: 543 },
    { name: 'Baguio', trips: 421 },
    { name: 'Vigan', trips: 312 },
  ];

  // Group Sizes
  const groupSizeData = [
    { name: 'Solo', value: 35, color: '#2D4C2D' },
    { name: 'Couple', value: 40, color: '#7AA082' },
    { name: 'Small Group', value: 18, color: '#D2B48C' },
    { name: 'Large Group', value: 7, color: '#D9EAD3' },
  ];

  // Budget Trends Over Time
  const budgetTrendData = [
    { month: 'Jan', avgBudget: 14200 },
    { month: 'Feb', avgBudget: 15100 },
    { month: 'Mar', avgBudget: 15800 },
    { month: 'Apr', avgBudget: 16500 },
    { month: 'May', avgBudget: 16200 },
  ];

  // Travel Style Preferences
  const travelStyleData = [
    { name: 'Relaxing', value: 842 },
    { name: 'Adventure', value: 1243 },
    { name: 'Island Hopping', value: 1567 },
    { name: 'Cultural', value: 654 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Travel Trends Analytics</h1>
        <p className="text-muted-foreground">Insights into traveler behavior and preferences</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Trip Duration</span>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-medium">4.2 days</p>
          <p className="text-xs text-primary mt-1">+0.3 from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Budget</span>
            <DollarSign className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-2xl font-medium">₱16,200</p>
          <p className="text-xs text-secondary mt-1">+₱400 from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Group Size</span>
            <Users className="w-5 h-5 text-accent" />
          </div>
          <p className="text-2xl font-medium">2.3 people</p>
          <p className="text-xs text-accent mt-1">Stable</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Growth Rate</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-medium">12.5%</p>
          <p className="text-xs text-primary mt-1">Month over month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Most Requested Destinations */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h2 className="text-xl mb-6">Most Requested Destinations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={destinationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="trips" fill="#2D4C2D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Group Sizes */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h2 className="text-xl mb-6">Typical Group Sizes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={groupSizeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {groupSizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {groupSizeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Trend */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h2 className="text-xl mb-6">Average Budget Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={budgetTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `₱${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="avgBudget"
                stroke="#7AA082"
                strokeWidth={3}
                dot={{ fill: '#7AA082', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Average budget has increased by ₱2,000 over the past 5 months, indicating growing interest in premium experiences.
            </p>
          </div>
        </div>

        {/* Travel Style Preferences */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h2 className="text-xl mb-6">Travel Style Preferences</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={travelStyleData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="#D2B48C" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Island Hopping is the most popular travel style, followed by Adventure activities.
            </p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg mb-2">Peak Season Ahead</h3>
          <p className="text-sm text-muted-foreground">
            Summer months (June-August) show 45% increase in bookings. Prepare for high demand.
          </p>
        </div>

        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg mb-2">Couples Dominate</h3>
          <p className="text-sm text-muted-foreground">
            40% of travelers are couples, making it the largest segment. Focus marketing here.
          </p>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg mb-2">Premium Growth</h3>
          <p className="text-sm text-muted-foreground">
            Average budgets rising steadily. Users willing to spend more for quality experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
