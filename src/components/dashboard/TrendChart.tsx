
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
import { Card } from "@/components/ui/card";

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
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4">Trend Over Time</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="casualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="member"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#memberGradient)"
              name="Member Rides"
            />
            <Area
              type="monotone"
              dataKey="casual"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#casualGradient)"
              name="Casual Rides"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
