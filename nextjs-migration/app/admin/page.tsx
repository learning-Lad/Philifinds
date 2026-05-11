import { Users, Map, AlertTriangle, TrendingUp } from 'lucide-react';
import { adminLogoutAction } from './login/actions';

export const dynamic = 'force-dynamic';

const STATS = [
  { label: 'Active Users', value: '1,284', icon: Users },
  { label: 'Itineraries Generated', value: '3,571', icon: Map },
  { label: 'Open Emergency Tickets', value: '4', icon: AlertTriangle },
  { label: 'Weekly Growth', value: '+12.4%', icon: TrendingUp },
];

export default function AdminOverviewPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#1A1A1A]">Admin Overview</h1>
            <p className="text-sm text-[#7AA082]">PhiliFinds operational snapshot</p>
          </div>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="rounded-full border border-[#D9EAD3] bg-white px-4 py-2 text-sm text-[#2D4C2D] shadow-sm hover:bg-[#D9EAD3]"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#D9EAD3] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#D9EAD3]">
                <Icon className="h-5 w-5 text-[#2D4C2D]" />
              </div>
              <p className="text-sm text-[#7AA082]">{label}</p>
              <p className="mt-1 text-2xl text-[#1A1A1A]">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <a
            href="/admin/analytics"
            className="rounded-2xl border border-[#D9EAD3] bg-white p-6 shadow-sm transition hover:border-[#7AA082]"
          >
            <h2 className="text-lg text-[#2D4C2D]">Analytics & Trends</h2>
            <p className="mt-1 text-sm text-[#1A1A1A]">
              Visualize popular destinations, user segments, and weekly growth.
            </p>
          </a>
          <a
            href="/admin/emergency"
            className="rounded-2xl border border-[#D9EAD3] bg-white p-6 shadow-sm transition hover:border-[#7AA082]"
          >
            <h2 className="text-lg text-[#2D4C2D]">Emergency Requests</h2>
            <p className="mt-1 text-sm text-[#1A1A1A]">
              Live feed of traveler emergency tickets across the Philippines.
            </p>
          </a>
        </section>
      </div>
    </main>
  );
}
