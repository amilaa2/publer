import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
export function EngagementTrendChart({ data, platform }) {
  if (!data?.length) return null;

  const stroke = platform === 'instagram' ? '#e1306c' : platform === 'twitter' ? '#1da1f2' : platform === 'linkedin' ? '#0077b5' : '#1877f2';

  return (
    <div style={{ height: 200, marginTop: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--hairline)" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d) => d.slice(5)} />
          <YAxis tick={{ fontSize: 10 }} unit="%" />
          <Tooltip formatter={(v) => [`${v.toFixed(1)}%`, 'Engagement']} />
          <Line type="monotone" dataKey="rate" stroke={stroke} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
