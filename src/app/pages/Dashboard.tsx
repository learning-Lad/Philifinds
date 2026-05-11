import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, MapPin, Calendar, Users, DollarSign, Share2, Cloud, LogOut, Menu } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Mock data - will come from Supabase
  const itineraries = [
    {
      id: '1',
      destination: 'Palawan',
      duration: '5 Days',
      budget: '₱25,000',
      groupSize: '2 people',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1583408764595-2aca0683e0b7?w=800&q=80',
      createdAt: '2026-04-15',
    },
    {
      id: '2',
      destination: 'Boracay',
      duration: '3 Days',
      budget: '₱18,000',
      groupSize: '4 people',
      status: 'in-progress',
      image: 'https://images.unsplash.com/photo-1613401202527-1c4b1ac16e56?w=800&q=80',
      createdAt: '2026-05-01',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl text-primary">PhiliFinds</h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button className="text-foreground hover:text-primary transition-colors">
                My Trips
              </button>
              <button className="text-foreground hover:text-primary transition-colors">
                Explore
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Admin
              </button>
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                  JD
                </div>
                <span>Juan Dela Cruz</span>
              </button>
              <button className="text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl">Welcome back, Juan! 👋</h2>
          </div>
          <p className="text-muted-foreground">
            Ready to plan your next Philippine adventure? Let Nimnim help you create the perfect itinerary.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total Trips</span>
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl">12</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Places Visited</span>
              <Calendar className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl">8</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total Saved</span>
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl">₱45k</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Travel Buddies</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl">6</p>
          </div>
        </div>

        {/* Create New Itinerary Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/itinerary/new')}
            className="w-full bg-primary text-primary-foreground py-6 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg">Create New Itinerary with Nimnim</span>
          </button>
        </div>

        {/* Itineraries List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl">Your Itineraries</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm">
                All
              </button>
              <button className="px-4 py-2 bg-white text-foreground rounded-xl text-sm border border-border">
                Completed
              </button>
              <button className="px-4 py-2 bg-white text-foreground rounded-xl text-sm border border-border">
                In Progress
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itineraries.map((itinerary) => (
              <div
                key={itinerary.id}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/itinerary/${itinerary.id}`)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={itinerary.image}
                    alt={itinerary.destination}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl mb-1">{itinerary.destination}</h4>
                      <p className="text-sm text-muted-foreground">
                        Created {new Date(itinerary.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        itinerary.status === 'completed'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-accent/20 text-accent'
                      }`}
                    >
                      {itinerary.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{itinerary.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{itinerary.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{itinerary.groupSize}</span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2 border border-border rounded-xl hover:bg-muted transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share Trip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
