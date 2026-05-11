import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, Share2, Download, Calendar, MapPin, DollarSign, Users,
  CheckCircle2, Circle, AlertCircle, QrCode, Link2, Sun, Utensils, Camera, Hotel
} from 'lucide-react';

export default function ItineraryView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Book flights', completed: false },
    { id: 2, task: 'Reserve hotels', completed: true },
    { id: 3, task: 'Pack essentials', completed: false },
    { id: 4, task: 'Prepare documents', completed: false },
  ]);

  // Mock itinerary data
  const itinerary = {
    destination: 'Palawan',
    duration: '5 Days',
    budget: '₱25,000',
    groupSize: '2 people',
    travelStyle: 'Island Hopping',
    dailyPlan: [
      {
        day: 1,
        title: 'Arrival & El Nido Town',
        activities: [
          { time: '10:00 AM', icon: Hotel, title: 'Check-in at Hotel', location: 'El Nido Beach Hotel', cost: '₱3,500' },
          { time: '12:00 PM', icon: Utensils, title: 'Lunch at Artcafe', location: 'El Nido Town', cost: '₱800' },
          { time: '3:00 PM', icon: Camera, title: 'Explore Nacpan Beach', location: 'Nacpan Beach', cost: 'Free' },
          { time: '7:00 PM', icon: Utensils, title: 'Dinner at Seaside Restaurant', location: 'El Nido Town', cost: '₱1,200' },
        ],
      },
      {
        day: 2,
        title: 'Island Hopping Tour A',
        activities: [
          { time: '8:00 AM', icon: Sun, title: 'Island Hopping Tour A', location: 'Bacuit Bay', cost: '₱1,200' },
          { time: '12:00 PM', icon: Utensils, title: 'Beach BBQ Lunch', location: 'Secret Lagoon', cost: '₱500' },
          { time: '4:00 PM', icon: Camera, title: 'Snorkeling at Small Lagoon', location: 'Small Lagoon', cost: 'Included' },
          { time: '7:00 PM', icon: Utensils, title: 'Dinner at Night Market', location: 'El Nido Town', cost: '₱600' },
        ],
      },
      {
        day: 3,
        title: 'Island Hopping Tour C',
        activities: [
          { time: '8:00 AM', icon: Sun, title: 'Island Hopping Tour C', location: 'Bacuit Bay', cost: '₱1,400' },
          { time: '12:00 PM', icon: Utensils, title: 'Island Picnic Lunch', location: 'Hidden Beach', cost: '₱500' },
          { time: '3:00 PM', icon: Camera, title: 'Visit Matinloc Shrine', location: 'Matinloc Island', cost: 'Included' },
          { time: '7:00 PM', icon: Utensils, title: 'Farewell Dinner', location: 'El Nido Town', cost: '₱1,500' },
        ],
      },
    ],
    costBreakdown: {
      flights: 8000,
      accommodation: 10500,
      food: 4600,
      activities: 2600,
      total: 25700,
    },
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const shareUrl = `https://philifinds.com/itinerary/${id}`;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl hover:bg-muted transition-colors">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-border shadow-lg p-4 space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                      <Link2 className="w-5 h-5" />
                      <div className="text-left">
                        <p className="text-sm font-medium">Copy Link</p>
                        <p className="text-xs text-muted-foreground">Share via URL</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                      <QrCode className="w-5 h-5" />
                      <div className="text-left">
                        <p className="text-sm font-medium">QR Code</p>
                        <p className="text-xs text-muted-foreground">Generate QR code</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Itinerary Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Overview */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h1 className="text-3xl mb-4">{itinerary.destination} Adventure</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{itinerary.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">{itinerary.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Group</p>
                    <p className="text-sm font-medium">{itinerary.groupSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Style</p>
                    <p className="text-sm font-medium">{itinerary.travelStyle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Plans */}
            {itinerary.dailyPlan.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                    {day.day}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Day {day.day}</p>
                    <h3 className="text-xl">{day.title}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {day.activities.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-secondary" />
                          </div>
                          {idx < day.activities.length - 1 && (
                            <div className="w-0.5 h-8 bg-border mt-2"></div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.location}</p>
                            </div>
                            <span className="text-sm text-primary font-medium">{activity.cost}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-border sticky top-24">
              <h3 className="text-lg mb-4">Cost Breakdown</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Flights</span>
                  <span className="text-sm font-medium">₱{itinerary.costBreakdown.flights.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accommodation</span>
                  <span className="text-sm font-medium">₱{itinerary.costBreakdown.accommodation.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Food & Dining</span>
                  <span className="text-sm font-medium">₱{itinerary.costBreakdown.food.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Activities & Tours</span>
                  <span className="text-sm font-medium">₱{itinerary.costBreakdown.activities.toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Estimate</span>
                  <span className="text-xl font-medium text-primary">₱{itinerary.costBreakdown.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Progress Checklist */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="text-lg mb-4">Trip Checklist</h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                      {item.task}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <h3 className="text-lg text-destructive">Emergency Support</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                24/7 assistance for travelers in {itinerary.destination}
              </p>
              <button className="w-full bg-destructive text-destructive-foreground py-2 rounded-xl hover:opacity-90 transition-opacity">
                Get Help Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
