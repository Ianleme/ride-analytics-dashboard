
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const predictionData = [
  { time: "06:00", actual: 120, predicted: 115 },
  { time: "07:00", actual: 180, predicted: 175 },
  { time: "08:00", actual: 250, predicted: 260 },
  { time: "09:00", actual: 210, predicted: 220 },
  { time: "10:00", actual: 160, predicted: 165 },
  { time: "11:00", actual: 140, predicted: 145 },
  { time: "12:00", actual: null, predicted: 180 },
  { time: "13:00", actual: null, predicted: 220 },
  { time: "14:00", actual: null, predicted: 190 },
];

const Predictions = () => {
  return (
    <div className="p-8">
      <div className="glass-card rounded-xl mb-8 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Demand Predictions
          </h1>
          <Button className="bg-primary hover:bg-primary/90">
            Update Predictions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Prediction Accuracy
          </h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-primary">94.8%</span>
            <span className="text-sm text-neutral-600 ml-2">Last 24h</span>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Peak Hour Prediction
          </h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-neutral-900">08:00</span>
            <span className="text-sm text-neutral-600 ml-2">+15% expected</span>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Weather Impact
          </h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-neutral-900">-8%</span>
            <span className="text-sm text-neutral-600 ml-2">Due to rain</span>
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-neutral-900">
          Demand Forecast
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
              <XAxis dataKey="time" className="text-neutral-600" />
              <YAxis className="text-neutral-600" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual Demand"
                stroke="#DA2128"
                strokeWidth={2}
                dot={{ fill: "#DA2128" }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="Predicted Demand"
                stroke="#4B5563"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#4B5563" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Predictions;
