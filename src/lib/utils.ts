export const formatPHP = (n: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);

export const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });

export const REGIONAL_COST_MULTIPLIER: Record<string, number> = {
  Boracay: 1.4,
  Siargao: 1.35,
  Palawan: 1.25,
  Batanes: 1.3,
  Cebu: 1.1,
  Manila: 1.05,
  Bohol: 1.0,
  Vigan: 0.9,
  Baguio: 0.95,
  Sagada: 0.9,
  Davao: 1.0,
  'Ilocos Norte': 0.9,
};

export const applyRegionalMultiplier = (destination: string, amount: number) =>
  Math.round(amount * (REGIONAL_COST_MULTIPLIER[destination] ?? 1));
