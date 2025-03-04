import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { DemandHeatmap } from "@/components/dashboard/DemandHeatmap";
import { TopRoutesTable } from "@/components/dashboard/TopRoutesTable";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  PieChart,
  TrendingUp,
  Users,
  Bike,
  MapPin,
  ThermometerSun,
  Info,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { SelectFilter } from "@/components/ui/select-filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker";

const STORAGE_KEY = "portfolio-dashboard-intro-shown";

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [userType, setUserType] = useState<string>("all");
  const [bikeType, setBikeType] = useState<string>("all");
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem(STORAGE_KEY) === "true";
    setShowIntro(!hasSeenIntro);
  }, []);

  const handleCloseIntro = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShowIntro(false);
  };

  const handleShowIntro = () => {
    setShowIntro(true);
  };

  const handleDateRangeChange = (value: DateRange) => {
    setDateRange(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-6 md:p-8">
      {showIntro && <PortfolioIntro onClose={handleCloseIntro} />}
      
      <div className="animate-fadeIn rounded-xl mb-8 overflow-hidden">
        <div className="bg-white p-6 border-b border-border shadow-sm rounded-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and analyze real-time bike-sharing metrics
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
              />
              <div className="flex space-x-2 w-full sm:w-auto">
                <SelectFilter
                  value={userType}
                  onChange={setUserType}
                  options={[
                    { value: "all", label: "All Users" },
                    { value: "member", label: "Members" },
                    { value: "casual", label: "Casuals" },
                  ]}
                  placeholder="User Type"
                />
                <SelectFilter
                  value={bikeType}
                  onChange={setBikeType}
                  options={[
                    { value: "all", label: "All Bikes" },
                    { value: "electric", label: "Electric" },
                    { value: "classic", label: "Classic" },
                  ]}
                  placeholder="Bike Type"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleShowIntro}
                  title="Show Portfolio Information"
                  className="flex-shrink-0"
                >
                  <Info className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-shrink-0">
                      Export
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Reports</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Rides"
          value="1,234K"
          change="+12.3% vs last month"
          trend="up"
          icon={<Bike className="h-6 w-6 text-primary/70" />}
          className="border shadow-sm"
        />
        <KPICard
          title="Average Duration"
          value="18.5 min"
          change="-2.1% vs last month"
          trend="down"
          icon={<Clock className="h-6 w-6 text-amber-500/70" />}
          className="border shadow-sm"
        />
        <KPICard
          title="Monthly Growth"
          value="+15.2%"
          change="5.3% higher than target"
          trend="up"
          icon={<TrendingUp className="h-6 w-6 text-emerald-500/70" />}
          className="border shadow-sm"
        />
        <KPICard
          title="Member/Casual Split"
          value="68/32"
          change="2% more members"
          trend="up"
          icon={<Users className="h-6 w-6 text-accent/70" />}
          className="border shadow-sm"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Featured Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white p-6 col-span-1 lg:col-span-2 hover-scale animate-fade-in shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ride Volume Trends</h3>
                <p className="text-sm text-muted-foreground">Last 6 months rider activity</p>
              </div>
              <PieChart className="h-5 w-5 text-primary/70" />
            </div>
            <TrendChart />
          </Card>
          
          <Card className="bg-white p-6 hover-scale animate-fade-in shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Weather Impact</h3>
                <p className="text-sm text-muted-foreground">Effect on ridership</p>
              </div>
              <ThermometerSun className="h-5 w-5 text-amber-500" />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground">Temperature Impact</span>
                  <span className="text-xs font-medium text-emerald-600">HIGH</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground">Rain Impact</span>
                  <span className="text-xs font-medium text-destructive">SEVERE</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground">Season Impact</span>
                  <span className="text-xs font-medium text-amber-600">MEDIUM</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full text-primary">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Weather Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Demand Distribution</h2>
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            View by Location
          </Button>
        </div>
        <Card className="bg-white p-6 hover-scale animate-fade-in shadow-sm">
          <DemandHeatmap />
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Popular Routes Analysis</h2>
        <Card className="bg-white p-6 hover-scale animate-fade-in shadow-sm">
          <TopRoutesTable />
        </Card>
      </div>
    </div>
  );
};

export default Index;
