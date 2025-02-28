
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2024-01", member: 4000, casual: 2400, temp: 24 },
  { date: "2024-02", member: 3000, casual: 1398, temp: 22 },
  { date: "2024-03", member: 2000, casual: 9800, temp: 26 },
  { date: "2024-04", member: 2780, casual: 3908, temp: 28 },
  { date: "2024-05", member: 1890, casual: 4800, temp: 30 },
  { date: "2024-06", member: 2390, casual: 3800, temp: 32 },
];

export const TrendChart = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="casualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4B5563" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4B5563" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200/80" />
          <XAxis 
            dataKey="date" 
            className="text-xs text-neutral-600"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            className="text-xs text-neutral-600" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          />
          <Legend 
            iconType="circle" 
            iconSize={8}
            wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="member"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#memberGradient)"
            name="Member Rides"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="casual"
            stroke="#4B5563"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#casualGradient)"
            name="Casual Rides"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
