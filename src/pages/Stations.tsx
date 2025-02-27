
import { useState, useMemo } from "react";
import { MapPinIcon, InfoIcon, BikeIcon, SearchIcon, FilterIcon, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StationsMap from "@/components/stations/StationsMap";

// Dados simulados para um grande número de estações
const generateStations = (count: number) => {
  const zones = ["North", "South", "East", "West", "Central"];
  const streets = ["Main St", "Oak Ave", "Park Rd", "River Blvd", "Market St", "Broadway", "Lake Dr"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Station ${i + 1}`,
    address: `${Math.floor(Math.random() * 999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
    bikes: Math.floor(Math.random() * 20) + 1,
    docks: Math.floor(Math.random() * 15) + 10,
    status: Math.random() > 0.85 ? "maintenance" : "active",
    zone: zones[Math.floor(Math.random() * zones.length)],
    usage: Math.floor(Math.random() * 1000) + 100,
    averageDuration: Math.floor(Math.random() * 30) + 5,
    lat: 40.73 + (Math.random() * 0.1 - 0.05),
    lng: -73.93 + (Math.random() * 0.1 - 0.05),
  }));
};

const allStations = generateStations(1000);

// Agrupamento de estações por zona
const stationsByZone = allStations.reduce((acc, station) => {
  if (!acc[station.zone]) {
    acc[station.zone] = [];
  }
  acc[station.zone].push(station);
  return acc;
}, {} as Record<string, typeof allStations>);

// Estatísticas por zona
const zoneStats = Object.entries(stationsByZone).map(([zone, stations]) => {
  const totalBikes = stations.reduce((sum, s) => sum + s.bikes, 0);
  const totalDocks = stations.reduce((sum, s) => sum + s.docks, 0);
  const averageUsage = stations.reduce((sum, s) => sum + s.usage, 0) / stations.length;
  const stationsInMaintenance = stations.filter(s => s.status === "maintenance").length;
  
  return {
    zone,
    stationCount: stations.length,
    totalBikes,
    totalDocks,
    bikeAvailability: Math.round((totalBikes / totalDocks) * 100),
    averageUsage: Math.round(averageUsage),
    stationsInMaintenance,
  };
});

const Stations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"all" | "problem" | "high-usage">("all");
  const [sortField, setSortField] = useState<"name" | "bikes" | "usage" | "zone">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  
  // Filtra e ordena as estações com base nos critérios atuais
  const filteredStations = useMemo(() => {
    let filtered = allStations;
    
    // Aplicar filtro de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        station => 
          station.name.toLowerCase().includes(query) || 
          station.address.toLowerCase().includes(query) ||
          station.zone.toLowerCase().includes(query)
      );
    }
    
    // Aplicar filtro de zona
    if (selectedZone) {
      filtered = filtered.filter(station => station.zone === selectedZone);
    }
    
    // Aplicar filtros de visualização
    if (currentView === "problem") {
      filtered = filtered.filter(
        station => station.status === "maintenance" || station.bikes === 0 || station.bikes === station.docks
      );
    } else if (currentView === "high-usage") {
      filtered = filtered.filter(station => station.usage > 500);
    }
    
    // Aplicar ordenação
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "bikes") {
        comparison = a.bikes - b.bikes;
      } else if (sortField === "usage") {
        comparison = a.usage - b.usage;
      } else if (sortField === "zone") {
        comparison = a.zone.localeCompare(b.zone);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    return filtered;
  }, [searchQuery, currentView, sortField, sortDirection, selectedZone]);
  
  // Paginação simples
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const paginatedStations = filteredStations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleSort = (field: "name" | "bikes" | "usage" | "zone") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const renderSortIcon = (field: "name" | "bikes" | "usage" | "zone") => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    
    return sortDirection === "asc" ? 
      <ArrowUp className="h-4 w-4 ml-1" /> : 
      <ArrowDown className="h-4 w-4 ml-1" />;
  };
  
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="glass-card rounded-xl mb-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-neutral-900">Bike Stations</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search stations..."
                className="pl-10 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <BikeIcon className="mr-2 h-4 w-4" />
              Add New Station
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card p-6">
          <p className="text-sm font-medium text-neutral-600">Total Stations</p>
          <h3 className="text-3xl font-bold mt-2 text-neutral-900">{allStations.length}</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Active: {allStations.filter(s => s.status === "active").length}
          </p>
        </Card>
        
        <Card className="glass-card p-6">
          <p className="text-sm font-medium text-neutral-600">Available Bikes</p>
          <h3 className="text-3xl font-bold mt-2 text-primary">
            {allStations.reduce((sum, s) => sum + s.bikes, 0)}
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Across all stations
          </p>
        </Card>
        
        <Card className="glass-card p-6">
          <p className="text-sm font-medium text-neutral-600">Empty Stations</p>
          <h3 className="text-3xl font-bold mt-2 text-neutral-900">
            {allStations.filter(s => s.bikes === 0).length}
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Need rebalancing
          </p>
        </Card>
        
        <Card className="glass-card p-6">
          <p className="text-sm font-medium text-neutral-600">Maintenance</p>
          <h3 className="text-3xl font-bold mt-2 text-yellow-600">
            {allStations.filter(s => s.status === "maintenance").length}
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Stations in maintenance
          </p>
        </Card>
      </div>

      <Tabs defaultValue="map" className="mb-8">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="zones">Zone Analysis</TabsTrigger>
          <TabsTrigger value="status">Status Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          {/* Map */}
          <div className="mb-6">
            <StationsMap />
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Map Filters</h2>
            <div className="flex gap-2">
              <Button 
                variant={currentView === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentView("all")}
              >
                All Stations
              </Button>
              <Button 
                variant={currentView === "problem" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentView("problem")}
              >
                Problem Stations
              </Button>
              <Button 
                variant={currentView === "high-usage" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentView("high-usage")}
              >
                High Usage
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedStations.slice(0, 6).map((station) => (
              <Card key={station.id} className="glass-card hover-scale">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">{station.name}</h3>
                      <p className="text-sm text-neutral-600 mt-1">{station.address}</p>
                      <p className="text-xs font-medium text-primary mt-1">Zone: {station.zone}</p>
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Available Bikes</p>
                      <p className="text-lg font-semibold text-primary mt-1">
                        {station.bikes}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Empty Docks</p>
                      <p className="text-lg font-semibold text-neutral-900 mt-1">
                        {station.docks - station.bikes}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        station.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {station.status === 'active' ? 'Active' : 'Maintenance'}
                    </span>
                    <Button variant="outline" className="text-primary">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {paginatedStations.length > 6 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="text-primary">
                View All Results
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Station List</h2>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filter by Zone
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedZone(null)}>
                    All Zones
                  </DropdownMenuItem>
                  {Object.keys(stationsByZone).map(zone => (
                    <DropdownMenuItem key={zone} onClick={() => setSelectedZone(zone)}>
                      {zone}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Input
                type="search"
                placeholder="Search stations..."
                className="w-[200px]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          
          <Card className="glass-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Station {renderSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("zone")}>
                    <div className="flex items-center">
                      Zone {renderSortIcon("zone")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("bikes")}>
                    <div className="flex items-center justify-end">
                      Bikes {renderSortIcon("bikes")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("usage")}>
                    <div className="flex items-center justify-end">
                      Usage {renderSortIcon("usage")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStations.map((station) => (
                  <TableRow key={station.id}>
                    <TableCell className="font-medium">
                      <div>
                        {station.name}
                        <div className="text-xs text-neutral-500">{station.address}</div>
                      </div>
                    </TableCell>
                    <TableCell>{station.zone}</TableCell>
                    <TableCell className="text-right">{station.bikes} / {station.docks}</TableCell>
                    <TableCell className="text-right">{station.usage} rides</TableCell>
                    <TableCell className="text-right">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          station.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {station.status === 'active' ? 'Active' : 'Maintenance'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          
          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-neutral-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStations.length)} of {filteredStations.length} stations
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="zones" className="mt-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">Zone Analysis</h2>
            <p className="text-neutral-600">Compare metrics across different geographical zones</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {zoneStats.map((zone) => (
              <Card key={zone.zone} className="glass-card p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{zone.zone} Zone</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Stations:</span>
                    <span className="font-medium">{zone.stationCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Bike Availability:</span>
                    <span className="font-medium">{zone.bikeAvailability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Average Usage:</span>
                    <span className="font-medium">{zone.averageUsage} rides</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">In Maintenance:</span>
                    <span className="font-medium">{zone.stationsInMaintenance}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={() => {
                    setSelectedZone(zone.zone);
                    document.querySelector('[data-state="active"][value="list"]')?.click();
                  }}
                >
                  View Stations
                </Button>
              </Card>
            ))}
          </div>
          
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Comparative Zone Performance</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={zoneStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="zone" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="stationCount" name="Station Count" fill="#A5A9B8" />
                  <Bar yAxisId="left" dataKey="bikeAvailability" name="Bike Availability (%)" fill="#DA2128" />
                  <Bar yAxisId="right" dataKey="averageUsage" name="Avg. Usage" fill="#4B5563" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="mt-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">System Status</h2>
            <p className="text-neutral-600">Overview of all stations by operational status</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Status Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Active', value: allStations.filter(s => s.status === 'active').length },
                      { name: 'Maintenance', value: allStations.filter(s => s.status === 'maintenance').length },
                      { name: 'Empty', value: allStations.filter(s => s.bikes === 0 && s.status === 'active').length },
                      { name: 'Full', value: allStations.filter(s => s.bikes === s.docks && s.status === 'active').length },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Stations" fill="#DA2128" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Bike Availability Ranges</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { range: '0%', value: allStations.filter(s => s.bikes === 0).length },
                      { range: '1-25%', value: allStations.filter(s => s.bikes > 0 && s.bikes / s.docks <= 0.25).length },
                      { range: '26-50%', value: allStations.filter(s => s.bikes / s.docks > 0.25 && s.bikes / s.docks <= 0.5).length },
                      { range: '51-75%', value: allStations.filter(s => s.bikes / s.docks > 0.5 && s.bikes / s.docks <= 0.75).length },
                      { range: '76-99%', value: allStations.filter(s => s.bikes / s.docks > 0.75 && s.bikes < s.docks).length },
                      { range: '100%', value: allStations.filter(s => s.bikes === s.docks).length },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Stations" fill="#4B5563" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Priority Alerts</h3>
              <div className="space-y-4">
                {allStations.filter(s => s.bikes === 0 || s.status === 'maintenance').slice(0, 5).map(station => (
                  <div 
                    key={station.id} 
                    className="p-4 rounded-lg border border-neutral-200 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium text-neutral-900">{station.name}</h4>
                      <p className="text-sm text-neutral-600">Zone: {station.zone}</p>
                    </div>
                    <div>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          station.bikes === 0 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {station.bikes === 0 ? 'Empty' : 'Maintenance'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </Card>
            
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rebalancing Recommendations</h3>
              <div className="space-y-4">
                {[...allStations]
                  .sort((a, b) => (a.bikes / a.docks) - (b.bikes / b.docks))
                  .slice(0, 5)
                  .map(station => (
                    <div 
                      key={station.id} 
                      className="p-4 rounded-lg border border-neutral-200 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-neutral-900">{station.name}</h4>
                        <p className="text-sm text-neutral-600">Zone: {station.zone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900">{station.bikes} / {station.docks}</p>
                        <p className="text-xs text-neutral-600">
                          {Math.round((station.bikes / station.docks) * 100)}% capacity
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Rebalancing Plan
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stations;
