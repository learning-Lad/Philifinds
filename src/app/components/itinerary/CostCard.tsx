import { Wallet } from 'lucide-react';

type CostItem = { label: string; amount: number };

export default function CostCard({
  title = 'Estimated Costs',
  items,
  currency = 'PHP',
}: {
  title?: string;
  items: CostItem[];
  currency?: string;
}) {
  const total = items.reduce((sum, i) => sum + i.amount, 0);
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-primary-forest" />
        <h3>{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span>{fmt(item.amount)}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border mt-4 pt-4 flex justify-between">
        <span className="font-medium">Total</span>
        <span className="font-medium text-primary-forest">{fmt(total)}</span>
      </div>
    </div>
  );
}
