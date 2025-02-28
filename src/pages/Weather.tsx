
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  Wind,
  ThermometerSun,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
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

// Dados simulados para histograma de rides por temperatura
const ridesByTemperature = [
  { temperature: "0-5°C", rides: 120, frequency: 5 },
  { temperature: "6-10°C", rides: 250, frequency: 12 },
  { temperature: "11-15°C", rides: 420, frequency: 18 },
  { temperature: "16-20°C", rides: 680, frequency: 25 },
  { temperature: "21-25°C", rides: 820, frequency: 30 },
  { temperature: "26-30°C", rides: 580, frequency: 8 },
  { temperature: "31-35°C", rides: 320, frequency: 2 },
];

// Dados para o gráfico de impacto da chuva
const rainImpactData = [
  { rainLevel: "None (0mm)", rides: 850, changePercent: 0 },
  { rainLevel: "Light (0.1-2mm)", rides: 620, changePercent: -27 },
  { rainLevel: "Moderate (2.1-5mm)", rides: 380, changePercent: -55 },
  { rainLevel: "Heavy (5.1-10mm)", rides: 180, changePercent: -79 },
  { rainLevel: "Very Heavy (>10mm)", rides: 70, changePercent: -92 },
];

// Dados para scatter plot de correlação temperatura x rides x frequência
const temperatureCorrelationData = [
  { temp: 2, rides: 100, frequency: 3 },
  { temp: 5, rides: 150, frequency: 5 },
  { temp: 8, rides: 200, frequency: 8 },
  { temp: 12, rides: 350, frequency: 12 },
  { temp: 15, rides: 450, frequency: 15 },
  { temp: 18, rides: 550, frequency: 20 },
  { temp: 21, rides: 650, frequency: 25 },
  { temp: 24, rides: 700, frequency: 18 },
  { temp: 27, rides: 600, frequency: 12 },
  { temp: 30, rides: 450, frequency: 8 },
  { temp: 33, rides: 300, frequency: 4 },
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

      {/* Impacto do clima nas rides */}
      <Card className="glass-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-neutral-900">
          Weather Impact on Ride Volume
        </h2>
        
        <Tabs defaultValue="temperature">
          <TabsList className="mb-6">
            <TabsTrigger value="temperature">Temperature Impact</TabsTrigger>
            <TabsTrigger value="rain">Rain Impact</TabsTrigger>
            <TabsTrigger value="correlation">Weather Correlation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2 text-neutral-900">
                Ride Distribution by Temperature Range
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                This histogram shows the total number of rides for each temperature range, revealing optimal temperature zones for bike usage.
              </p>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ridesByTemperature}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="temperature" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, "Rides"]} />
                  <Legend />
                  <Bar dataKey="rides" fill="#8884d8" name="Number of Rides" />
                  <Bar dataKey="frequency" fill="#82ca9d" name="Frequency (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="rain">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2 text-neutral-900">
                Impact of Rainfall on Daily Rides
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                This chart demonstrates how different levels of rainfall affect the number of daily bike rides.
              </p>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={rainImpactData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rainLevel" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, "Rides"]} />
                  <Legend />
                  <Bar dataKey="rides" fill="#3b82f6" name="Number of Rides" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="correlation">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2 text-neutral-900">
                Temperature, Ride Volume & Frequency Correlation
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                This scatter plot shows the relationship between temperature, ride volume, and how frequently each temperature occurs.
              </p>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="temp" name="Temperature" unit="°C" />
                  <YAxis type="number" dataKey="rides" name="Rides" />
                  <ZAxis type="number" dataKey="frequency" name="Frequency" range={[20, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Temperature-Rides Correlation" data={temperatureCorrelationData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">
            Temperature & Humidity Trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weatherData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temp"
                  name="Temperature (°C)"
                  stroke="#ff7300"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="humidity" 
                  name="Humidity (%)" 
                  stroke="#387908"
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
              <BarChart
                data={weatherData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [value + " mm", "Precipitation"]} />
                <Legend />
                <Bar dataKey="rain" fill="#3b82f6" name="Precipitation (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
