import { useState } from 'react';
import { Check, ListChecks } from 'lucide-react';

export default function Checklist({
  title = 'Trip Checklist',
  items,
}: {
  title?: string;
  items: string[];
}) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const toggle = (item: string) => setDone((d) => ({ ...d, [item]: !d[item] }));
  const completed = items.filter((i) => done[i]).length;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary-forest" />
          <h3>{title}</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {completed}/{items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <button
              onClick={() => toggle(item)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-bg-mint transition-colors text-left"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  done[item] ? 'bg-primary-forest border-primary-forest' : 'border-primary-sage'
                }`}
              >
                {done[item] && <Check className="w-3 h-3 text-white" />}
              </span>
              <span className={done[item] ? 'line-through text-muted-foreground' : ''}>{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
