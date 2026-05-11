import { Users, Map, AlertTriangle, TrendingUp, Eye, Clock } from 'lucide-react';

export default function AdminOverview() {
  const stats = [
    { label: 'Total Users', value: '12,459', change: '+12.5%', icon: Users, color: 'bg-primary' },
    { label: 'Active Itineraries', value: '3,847', change: '+8.2%', icon: Map, color: 'bg-secondary' },
    { label: 'Popular Regions', value: '15', change: '+2', icon: TrendingUp, color: 'bg-accent' },
    { label: 'Pending Tickets', value: '23', change: '-5', icon: AlertTriangle, color: 'bg-destructive' },
  ];

  const recentItineraries = [
    { id: 1, user: 'Maria Santos', destination: 'Palawan', budget: '₱35,000', status: 'Completed', date: '2026-05-10' },
    { id: 2, user: 'John Reyes', destination: 'Boracay', budget: '₱28,000', status: 'In Progress', date: '2026-05-11' },
    { id: 3, user: 'Anna Cruz', destination: 'Siargao', budget: '₱22,000', status: 'Completed', date: '2026-05-10' },
    { id: 4, user: 'Pedro Garcia', destination: 'Baguio', budget: '₱15,000', status: 'In Progress', date: '2026-05-11' },
  ];

  const popularDestinations = [
    { name: 'Palawan', trips: 1234, percentage: 32 },
    { name: 'Boracay', trips: 987, percentage: 26 },
    { name: 'Siargao', trips: 654, percentage: 17 },
    { name: 'Cebu', trips: 543, percentage: 14 },
    { name: 'Baguio', trips: 421, percentage: 11 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your travel platform's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm px-2 py-1 rounded-lg ${
                  stat.change.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-medium mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Itineraries */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">Recent Itineraries</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {recentItineraries.map((itinerary) => (
              <div key={itinerary.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                    {itinerary.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{itinerary.user}</p>
                    <p className="text-sm text-muted-foreground">{itinerary.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{itinerary.budget}</p>
                  <p className="text-xs text-muted-foreground">{itinerary.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  itinerary.status === 'Completed'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-accent/20 text-accent'
                }`}>
                  {itinerary.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">Popular Destinations</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {popularDestinations.map((destination, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{idx + 1}</span>
                    <div>
                      <p className="font-medium">{destination.name}</p>
                      <p className="text-sm text-muted-foreground">{destination.trips} trips</p>
                    </div>
                  </div>
                  <span className="text-sm text-primary font-medium">{destination.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${destination.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer">
          <Eye className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-lg mb-1">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer">
          <TrendingUp className="w-8 h-8 text-secondary mb-3" />
          <h3 className="text-lg mb-1">View Analytics</h3>
          <p className="text-sm text-muted-foreground">Deep dive into travel trends</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer">
          <Clock className="w-8 h-8 text-accent mb-3" />
          <h3 className="text-lg mb-1">Emergency Queue</h3>
          <p className="text-sm text-muted-foreground">Handle emergency support requests</p>
        </div>
      </div>
    </div>
  );
}
