import { useNavigate } from 'react-router';
import { Home, Search, Cloud } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Cloud className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-6xl font-medium text-primary mb-4">404</h1>
          <h2 className="text-2xl mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            Looks like you've wandered off the beaten path. Let's get you back to exploring the Philippines!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          <button
            onClick={() => navigate('/itinerary/new')}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-border bg-white rounded-2xl hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5" />
            Plan a Trip
          </button>
        </div>

        <div className="mt-12 p-6 bg-secondary/10 rounded-2xl">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip from Nimnim:</strong> Use the navigation menu to explore your itineraries or create new travel plans!
          </p>
        </div>
      </div>
    </div>
  );
}
