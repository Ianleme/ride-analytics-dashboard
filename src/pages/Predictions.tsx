
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { 
  AlertTriangle, 
  ArrowDown, 
  ArrowUp, 
  Bike, 
  Calendar, 
  CloudRain, 
  RefreshCw, 
  Sun, 
  TrendingDown, 
  TrendingUp 
} from "lucide-react";

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

const weekdayPredictions = [
  { day: "Monday", predicted: 1850, lastWeek: 1780, change: 4 },
  { day: "Tuesday", predicted: 1920, lastWeek: 1850, change: 3.8 },
  { day: "Wednesday", predicted: 2100, lastWeek: 1950, change: 7.7 },
  { day: "Thursday", predicted: 2050, lastWeek: 1980, change: 3.5 },
  { day: "Friday", predicted: 2200, lastWeek: 2050, change: 7.3 },
  { day: "Saturday", predicted: 2500, lastWeek: 2400, change: 4.2 },
  { day: "Sunday", predicted: 2150, lastWeek: 2200, change: -2.3 },
];

const stationPredictions = [
  { name: "Central Station", predicted: 450, capacity: 550, usage: 82 },
  { name: "Harbor View", predicted: 380, capacity: 400, usage: 95 },
  { name: "Business District", predicted: 520, capacity: 600, usage: 87 },
  { name: "University", predicted: 320, capacity: 350, usage: 91 },
  { name: "Airport Terminal", predicted: 280, capacity: 400, usage: 70 },
];

const factorImpactData = [
  { factor: "Temperature", impact: 85 },
  { factor: "Precipitation", impact: 72 },
  { factor: "Wind", impact: 43 },
  { factor: "Weekend/Holiday", impact: 67 },
  { factor: "Event", impact: 58 },
];

const hourlyDemandDistribution = [
  { hour: "00:00", weekday: 20, weekend: 45 },
  { hour: "02:00", weekday: 10, weekend: 30 },
  { hour: "04:00", weekday: 5, weekend: 15 },
  { hour: "06:00", weekday: 45, weekend: 20 },
  { hour: "08:00", weekday: 200, weekend: 60 },
  { hour: "10:00", weekday: 120, weekend: 120 },
  { hour: "12:00", weekday: 150, weekend: 170 },
  { hour: "14:00", weekday: 130, weekend: 190 },
  { hour: "16:00", weekday: 180, weekend: 160 },
  { hour: "18:00", weekday: 220, weekend: 130 },
  { hour: "20:00", weekday: 100, weekend: 160 },
  { hour: "22:00", weekday: 50, weekend: 120 },
];

const seasonalTrendData = [
  { month: "Jan", rides: 1200, predicted: 1250 },
  { month: "Feb", rides: 1350, predicted: 1400 },
  { month: "Mar", rides: 1800, predicted: 1850 },
  { month: "Apr", rides: 2200, predicted: 2300 },
  { month: "May", rides: 2600, predicted: 2700 },
  { month: "Jun", rides: 2800, predicted: 2900 },
  { month: "Jul", rides: 2850, predicted: 2950 },
  { month: "Aug", rides: 2800, predicted: 2900 },
  { month: "Sep", rides: 2500, predicted: 2600 },
  { month: "Oct", rides: 2200, predicted: 2300 },
  { month: "Nov", rides: 1800, predicted: 1850 },
  { month: "Dec", rides: 1400, predicted: 1450 },
];

const eventImpactData = [
  { name: "No Event", value: 65 },
  { name: "Sports", value: 15 },
  { name: "Concert", value: 10 },
  { name: "Festival", value: 7 },
  { name: "Other", value: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

const Predictions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePredictions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8">
      <div className="glass-card rounded-xl mb-8 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Demand Predictions
            </h1>
            <p className="text-neutral-600">
              AI-powered forecasts to optimize bike availability across the network
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={handleUpdatePredictions}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
          <div className="mt-4 text-sm text-neutral-500">
            <div className="flex items-center">
              <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
              <span>2.3% improvement since last week</span>
            </div>
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
          <div className="mt-4 text-sm">
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Suggested rebalancing needed</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Weather Impact
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-neutral-900">-8%</span>
            <span className="text-sm text-neutral-600 ml-2">Due to rain</span>
          </div>
          <div className="mt-4 flex space-x-2">
            <Badge variant="outline" className="flex items-center">
              <CloudRain className="h-3 w-3 mr-1" />
              Rain
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Sun className="h-3 w-3 mr-1" />
              22°C
            </Badge>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="hourly" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Outlook</TabsTrigger>
          <TabsTrigger value="stations">Station Predictions</TabsTrigger>
          <TabsTrigger value="factors">Impact Factors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hourly">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">
              Hourly Demand Forecast
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                Weekday vs Weekend Distribution
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyDemandDistribution}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                    <XAxis dataKey="hour" className="text-neutral-600" />
                    <YAxis className="text-neutral-600" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="weekday" name="Weekday Demand" fill="#4B5563" />
                    <Bar dataKey="weekend" name="Weekend Demand" fill="#DA2128" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                Forecast Confidence Levels
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Morning Rush (7AM-9AM)</span>
                    <span className="text-sm font-medium text-green-600">High Confidence (95%)</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Midday (10AM-2PM)</span>
                    <span className="text-sm font-medium text-green-600">Medium-High (88%)</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Evening Rush (4PM-7PM)</span>
                    <span className="text-sm font-medium text-yellow-600">Medium (82%)</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Night (8PM-12AM)</span>
                    <span className="text-sm font-medium text-yellow-600">Medium (75%)</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Early Morning (12AM-6AM)</span>
                    <span className="text-sm font-medium text-orange-600">Medium-Low (65%)</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weekly">
          <Card className="glass-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">
              Weekly Demand Forecast
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayPredictions}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="day" className="text-neutral-600" />
                  <YAxis className="text-neutral-600" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="predicted" name="Predicted Rides" fill="#DA2128" />
                  <Bar dataKey="lastWeek" name="Last Week" fill="#4B5563" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {weekdayPredictions.filter((_, i) => i < 3).map((day) => (
              <Card key={day.day} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {day.day}
                </h3>
                <div className="mt-2">
                  <div className="text-3xl font-bold text-neutral-900">{day.predicted}</div>
                  <div className="flex items-center mt-1">
                    {day.change >= 0 ? (
                      <span className="text-green-600 flex items-center">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        {day.change}% vs last week
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <ArrowDown className="h-4 w-4 mr-1" />
                        {Math.abs(day.change)}% vs last week
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Peak: 17:30-18:30
                  </Badge>
                  {day.day === "Monday" && (
                    <Badge variant="outline" className="flex items-center bg-amber-50">
                      <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                      High evening demand
                    </Badge>
                  )}
                  {day.day === "Wednesday" && (
                    <Badge variant="outline" className="flex items-center bg-blue-50">
                      <Bike className="h-3 w-3 mr-1 text-blue-500" />
                      Bike to Work Day
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="glass-card p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">
              Seasonal Trend Prediction
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={seasonalTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="month" className="text-neutral-600" />
                  <YAxis className="text-neutral-600" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rides"
                    name="Historical Rides"
                    stroke="#4B5563"
                    strokeWidth={2}
                    dot={{ fill: "#4B5563" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    name="Predicted Trend"
                    stroke="#DA2128"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#DA2128" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="stations">
          <Card className="glass-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6 text-neutral-900">
              Top Station Demand Predictions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 font-semibold">Station</th>
                    <th className="text-right pb-3 font-semibold">Predicted Rides</th>
                    <th className="text-right pb-3 font-semibold">Capacity Utilization</th>
                    <th className="text-right pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stationPredictions.map((station) => (
                    <tr key={station.name} className="border-b">
                      <td className="py-3">
                        <div className="font-medium">{station.name}</div>
                      </td>
                      <td className="text-right py-3">{station.predicted}</td>
                      <td className="text-right py-3">
                        <div className="flex items-center justify-end">
                          <div className="w-24 bg-neutral-100 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                station.usage > 90 ? 'bg-red-500' : 
                                station.usage > 80 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${station.usage}%` }}
                            ></div>
                          </div>
                          <span>{station.usage}%</span>
                        </div>
                      </td>
                      <td className="text-right py-3">
                        {station.usage > 90 ? (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            At Risk
                          </Badge>
                        ) : station.usage > 80 ? (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Watch
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Balanced
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                Stations Needing Rebalancing
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">High-Risk Stations</span>
                  <span className="text-red-500">2 stations</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Watch Stations</span>
                  <span className="text-amber-500">5 stations</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Balanced Stations</span>
                  <span className="text-green-500">43 stations</span>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Recommended Actions:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0"></span>
                      <span>Add 15 bikes to Harbor View Station before 8:00 AM</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0"></span>
                      <span>Add 10 bikes to University Station before 9:00 AM</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                      <span>Monitor Business District during lunch hours (12:00-14:00)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                Predicted Station Capacity
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventImpactData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {eventImpactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-neutral-600 mt-4">
                Factors influencing station demand during peak hours
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="factors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                Weather Impact Factors
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={factorImpactData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Impact Score"
                      dataKey="impact"
                      stroke="#DA2128"
                      fill="#DA2128"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-neutral-600 mt-4">
                Relative importance of factors in prediction model (scale: 0-100)
              </div>
            </Card>
            
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                AI Model Prediction Accuracy
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Weather-based Predictions</span>
                    <span className="text-sm font-medium">96.2%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "96.2%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Time-based Patterns</span>
                    <span className="text-sm font-medium">94.8%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "94.8%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Holiday Impact</span>
                    <span className="text-sm font-medium">92.5%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92.5%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Special Events</span>
                    <span className="text-sm font-medium">89.3%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "89.3%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Long-term Trends</span>
                    <span className="text-sm font-medium">91.7%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "91.7%" }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t mt-6">
                  <h4 className="font-medium mb-2 text-neutral-900">Recent Improvements:</h4>
                  <ul className="text-sm space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>Weather pattern recognition improved by 2.4%</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>Event impact model accuracy up by 3.7%</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingDown className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                      <span>Holiday predictions decreased by 1.2%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6 text-neutral-900">
              Special Event Impact Predictions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 font-semibold">Event</th>
                    <th className="text-left pb-3 font-semibold">Date</th>
                    <th className="text-left pb-3 font-semibold">Location</th>
                    <th className="text-right pb-3 font-semibold">Expected Impact</th>
                    <th className="text-right pb-3 font-semibold">Affected Stations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">
                      <div className="font-medium">City Marathon</div>
                      <div className="text-xs text-neutral-500">Sports</div>
                    </td>
                    <td className="py-3">Oct 12</td>
                    <td className="py-3">Downtown</td>
                    <td className="text-right py-3">
                      <Badge className="bg-red-100 text-red-800">
                        +65% Demand
                      </Badge>
                    </td>
                    <td className="text-right py-3">12</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">
                      <div className="font-medium">Music Festival</div>
                      <div className="text-xs text-neutral-500">Concert</div>
                    </td>
                    <td className="py-3">Oct 18-20</td>
                    <td className="py-3">Memorial Park</td>
                    <td className="text-right py-3">
                      <Badge className="bg-red-100 text-red-800">
                        +120% Demand
                      </Badge>
                    </td>
                    <td className="text-right py-3">8</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">
                      <div className="font-medium">Tech Conference</div>
                      <div className="text-xs text-neutral-500">Business</div>
                    </td>
                    <td className="py-3">Nov 5-7</td>
                    <td className="py-3">Convention Center</td>
                    <td className="text-right py-3">
                      <Badge className="bg-amber-100 text-amber-800">
                        +35% Demand
                      </Badge>
                    </td>
                    <td className="text-right py-3">5</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <div className="font-medium">Food Festival</div>
                      <div className="text-xs text-neutral-500">Cultural</div>
                    </td>
                    <td className="py-3">Nov 12</td>
                    <td className="py-3">Waterfront</td>
                    <td className="text-right py-3">
                      <Badge className="bg-amber-100 text-amber-800">
                        +40% Demand
                      </Badge>
                    </td>
                    <td className="text-right py-3">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Predictions;
