
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  Wind,
  ThermometerSun,
} from "lucide-react";
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

const weatherData = [
  { time: "00:00", temp: 18, humidity: 65, rain: 0 },
  { time: "03:00", temp: 17, humidity: 70, rain: 0 },
  { time: "06:00", temp: 16, humidity: 75, rain: 0.2 },
  { time: "09:00", temp: 19, humidity: 68, rain: 0.1 },
  { time: "12:00", temp: 22, humidity: 60, rain: 0 },
  { time: "15:00", temp: 24, humidity: 55, rain: 0 },
  { time: "18:00", temp: 21, humidity: 62, rain: 0 },
  { time: "21:00", temp: 19, humidity: 68, rain: 0 },
];

const Weather = () => {
  return (
    <div className="p-8">
      <div className="glass-card rounded-xl mb-8 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Weather Conditions
          </h1>
          <Button className="bg-primary hover:bg-primary/90">
            <CloudRain className="mr-2 h-4 w-4" />
            Update Forecast
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Temperature</p>
              <h3 className="text-3xl font-bold mt-2 text-neutral-900">22°C</h3>
            </div>
            <ThermometerSun className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-neutral-600 mt-2">Feels like 24°C</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Humidity</p>
              <h3 className="text-3xl font-bold mt-2 text-neutral-900">65%</h3>
            </div>
            <Droplets className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-neutral-600 mt-2">Moderate humidity</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Wind Speed</p>
              <h3 className="text-3xl font-bold mt-2 text-neutral-900">12km/h</h3>
            </div>
            <Wind className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-neutral-600 mt-2">North-East</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Conditions</p>
              <h3 className="text-3xl font-bold mt-2 text-neutral-900">Clear</h3>
            </div>
            <Sun className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-neutral-600 mt-2">Visibility 10km</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">
            Temperature & Humidity Trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                <XAxis dataKey="time" className="text-neutral-600" />
                <YAxis yAxisId="left" className="text-neutral-600" />
                <YAxis yAxisId="right" orientation="right" className="text-neutral-600" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temp"
                  name="Temperature (°C)"
                  stroke="#DA2128"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  name="Humidity (%)"
                  stroke="#4B5563"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">
            Precipitation Forecast
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                <XAxis dataKey="time" className="text-neutral-600" />
                <YAxis className="text-neutral-600" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rain"
                  name="Rainfall (mm)"
                  stroke="#4B5563"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
