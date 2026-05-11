import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const PALETTE = ['#2D4C2D', '#7AA082', '#D2B48C', '#D9EAD3', '#5A7C5A'];

type Datum = { name: string; value: number };

export function BarStatsChart({ data, title }: { data: Datum[]; title?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      {title && <h3 className="mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E0" />
          <XAxis dataKey="name" stroke="#1A1A1A" />
          <YAxis stroke="#1A1A1A" />
          <Tooltip />
          <Bar dataKey="value" fill="#2D4C2D" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutStatsChart({ data, title }: { data: Datum[]; title?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      {title && <h3 className="mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
