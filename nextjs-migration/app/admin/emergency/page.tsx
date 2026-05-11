import { createAdminClient, EmergencyTicket } from '@/lib/supabase';
import { updateTicketStatus } from './actions';

export const dynamic = 'force-dynamic';

const FALLBACK: EmergencyTicket[] = [
  {
    id: 'demo-1',
    user_id: 'user-1',
    location: 'El Nido, Palawan',
    type: 'Medical',
    status: 'urgent',
    message: 'Traveler requesting nearest hospital and ambulance contact.',
    contact: '+63 917 555 0142',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    user_id: 'user-2',
    location: 'Siargao',
    type: 'Lost Document',
    status: 'pending',
    message: 'Passport lost during island hop, needs embassy coordination.',
    contact: '+63 918 555 0099',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function loadTickets(): Promise<{ rows: EmergencyTicket[]; usingFallback: boolean }> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from('emergency_tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    if (!data || data.length === 0) return { rows: FALLBACK, usingFallback: true };
    return { rows: data as EmergencyTicket[], usingFallback: false };
  } catch {
    return { rows: FALLBACK, usingFallback: true };
  }
}

const STATUS_STYLES: Record<EmergencyTicket['status'], string> = {
  urgent: 'bg-[#FDECEC] text-[#8B2E2E]',
  pending: 'bg-[#FFF4DA] text-[#8A6A1F]',
  resolved: 'bg-[#D9EAD3] text-[#2D4C2D]',
};

export default async function AdminEmergencyPage() {
  const { rows, usingFallback } = await loadTickets();

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="text-2xl text-[#1A1A1A]">Emergency Requests</h1>
          <p className="text-sm text-[#7AA082]">
            Live feed from Supabase · {rows.length} ticket{rows.length === 1 ? '' : 's'}
          </p>
          {usingFallback ? (
            <p className="mt-2 inline-block rounded-full bg-[#FFF4DA] px-3 py-1 text-xs text-[#8A6A1F]">
              Showing demo data — connect Supabase and create the emergency_tickets table to see live tickets.
            </p>
          ) : null}
        </header>

        <div className="overflow-hidden rounded-2xl border border-[#D9EAD3] bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#D9EAD3]/50 text-[#2D4C2D]">
              <tr>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-t border-[#D9EAD3]">
                  <td className="px-4 py-3 text-[#1A1A1A]">{t.location}</td>
                  <td className="px-4 py-3 text-[#1A1A1A]">{t.type}</td>
                  <td className="px-4 py-3 text-[#1A1A1A]">{t.message}</td>
                  <td className="px-4 py-3 text-[#1A1A1A]">{t.contact}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs ${STATUS_STYLES[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={async () => {
                        'use server';
                        if (usingFallback) return;
                        const next: EmergencyTicket['status'] =
                          t.status === 'urgent' ? 'pending' : t.status === 'pending' ? 'resolved' : 'urgent';
                        await updateTicketStatus(t.id, next);
                      }}
                    >
                      <button
                        type="submit"
                        disabled={usingFallback}
                        className="rounded-full border border-[#D9EAD3] px-3 py-1 text-xs text-[#2D4C2D] hover:bg-[#D9EAD3] disabled:opacity-50"
                      >
                        Advance status
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
