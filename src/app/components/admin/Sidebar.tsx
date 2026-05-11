import { NavLink } from 'react-router';
import { LayoutDashboard, BarChart3, Siren, Cloud } from 'lucide-react';

const items = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/emergency', label: 'Emergency', icon: Siren },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4 mb-4">
        <div className="w-9 h-9 bg-primary-sage rounded-2xl flex items-center justify-center">
          <Cloud className="w-5 h-5 text-white" />
        </div>
        <span className="font-medium">PhiliFinds Admin</span>
      </div>
      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                isActive ? 'bg-primary-sage text-white' : 'hover:bg-white/10'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
