import { Link, useLocation } from 'react-router';
import { Cloud } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();
  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full transition-colors ${
        pathname === to ? 'bg-primary-forest text-white' : 'text-text-charcoal hover:bg-bg-mint'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary-sage rounded-2xl flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium text-primary-forest">PhiliFinds</span>
        </Link>
        <div className="flex items-center gap-2">
          {link('/dashboard', 'Dashboard')}
          {link('/itinerary/new', 'Plan Trip')}
          {link('/admin', 'Admin')}
        </div>
      </div>
    </nav>
  );
}
