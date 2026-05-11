'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase';

export async function updateTicketStatus(id: string, status: 'urgent' | 'pending' | 'resolved') {
  const admin = createAdminClient();
  const { error } = await admin
    .from('emergency_tickets')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/emergency');
}
