
import { useState, useMemo, useCallback } from "react";
import { MapPinIcon, InfoIcon, BikeIcon, SearchIcon, FilterIcon, ArrowUpDown, ArrowDown, ArrowUp, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StationsMap from "@/components/stations/StationsMap";
import { DemandHeatmap } from "@/components/dashboard/DemandHeatmap";

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

// Estatísticas globais para visualização rápida
const globalStats = {
  totalStations: allStations.length,
  activeStations: allStations.filter(s => s.status === "active").length,
  totalBikes: allStations.reduce((sum, s) => sum + s.bikes, 0),
  totalDocks: allStations.reduce((sum, s) => sum + s.docks, 0),
  emptyStations: allStations.filter(s => s.bikes === 0).length,
  fullStations: allStations.filter(s => s.bikes === s.docks).length,
  maintenanceStations: allStations.filter(s => s.status === "maintenance").length,
};

// Categorias de estações para filtragem rápida
const stationCategories = [
  { id: "all", name: "All Stations", count: allStations.length },
  { id: "active", name: "Active", count: globalStats.activeStations },
  { id: "maintenance", name: "In Maintenance", count: globalStats.maintenanceStations },
  { id: "empty", name: "Empty", count: globalStats.emptyStations },
  { id: "full", name: "Full", count: globalStats.fullStations },
];

const Stations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"all" | "problem" | "high-usage">("all");
  const [sortField, setSortField] = useState<"name" | "bikes" | "usage" | "zone">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtrar estações com base em todos os critérios
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
    
    // Aplicar filtro de categoria
    if (selectedCategory !== "all") {
      switch (selectedCategory) {
        case "active":
          filtered = filtered.filter(station => station.status === "active");
          break;
        case "maintenance":
          filtered = filtered.filter(station => station.status === "maintenance");
          break;
        case "empty":
          filtered = filtered.filter(station => station.bikes === 0);
          break;
        case "full":
          filtered = filtered.filter(station => station.bikes === station.docks);
          break;
      }
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
  }, [searchQuery, currentView, sortField, sortDirection, selectedZone, selectedCategory]);
  
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

  // Simulação de carregamento de dados
  const refreshData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handlePageChange = (page: number) => {
    // Previne a mudança para páginas fora do range
    if (page < 1 || page > totalPages) return;
    
    setCurrentPage(page);
    // Rola para o topo da tabela
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="glass-card rounded-xl mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Bike Stations</h1>
            <p className="text-sm text-neutral-600">Managing {allStations.length} stations across the network</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search stations..."
                className="pl-10 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedZone(null)}>
                  All Zones
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {Object.keys(stationsByZone).map(zone => (
                  <DropdownMenuItem key={zone} onClick={() => setSelectedZone(zone)}>
                    {zone} ({stationsByZone[zone].length})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={refreshData} variant="outline" size="sm" className="hidden md:flex">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <BikeIcon className="mr-2 h-4 w-4" />
              Add Station
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <Card className="glass-card p-3">
          <p className="text-xs font-medium text-neutral-600">Total Stations</p>
          <h3 className="text-xl font-bold mt-1 text-neutral-900">{globalStats.totalStations}</h3>
          <p className="text-xs text-neutral-600 mt-1">
            {globalStats.activeStations} active
          </p>
        </Card>
        
        <Card className="glass-card p-3">
          <p className="text-xs font-medium text-neutral-600">Available Bikes</p>
          <h3 className="text-xl font-bold mt-1 text-primary">
            {globalStats.totalBikes}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            {Math.round((globalStats.totalBikes / globalStats.totalDocks) * 100)}% capacity
          </p>
        </Card>
        
        <Card className="glass-card p-3">
          <p className="text-xs font-medium text-neutral-600">Empty Stations</p>
          <h3 className="text-xl font-bold mt-1 text-orange-500">
            {globalStats.emptyStations}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            Need rebalancing
          </p>
        </Card>
        
        <Card className="glass-card p-3">
          <p className="text-xs font-medium text-neutral-600">Full Stations</p>
          <h3 className="text-xl font-bold mt-1 text-blue-500">
            {globalStats.fullStations}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            No empty docks
          </p>
        </Card>
        
        <Card className="glass-card p-3">
          <p className="text-xs font-medium text-neutral-600">In Maintenance</p>
          <h3 className="text-xl font-bold mt-1 text-yellow-600">
            {globalStats.maintenanceStations}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            {Math.round((globalStats.maintenanceStations / globalStats.totalStations) * 100)}% of network
          </p>
        </Card>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 mb-6">
        {stationCategories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentPage(1);
            }}
            className="flex items-center"
          >
            {category.name}
            <Badge variant="secondary" className="ml-2 bg-neutral-100">{category.count}</Badge>
          </Button>
        ))}
        {selectedZone && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedZone(null)}
            className="ml-auto"
          >
            Clear Zone: {selectedZone}
          </Button>
        )}
      </div>

      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="zones">Zone Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="glass-card overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">ID</TableHead>
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
                    <TableHead className="text-right w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell colSpan={7} className="h-12 bg-neutral-100/50"></TableCell>
                      </TableRow>
                    ))
                  ) : paginatedStations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                        No stations found with the current filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedStations.map((station) => (
                      <TableRow key={station.id}>
                        <TableCell className="font-mono text-xs text-neutral-500">#{station.id}</TableCell>
                        <TableCell className="font-medium">
                          <div>
                            {station.name}
                            <div className="text-xs text-neutral-500 truncate max-w-[230px]">{station.address}</div>
                          </div>
                        </TableCell>
                        <TableCell>{station.zone}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="w-24 bg-neutral-100 rounded-full h-2 mr-2">
                              <div 
                                className="h-2 rounded-full bg-primary" 
                                style={{ width: `${Math.round((station.bikes / station.docks) * 100)}%` }}
                              ></div>
                            </div>
                            <span>{station.bikes} / {station.docks}</span>
                          </div>
                        </TableCell>
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
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <InfoIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
          
          {/* Paginação */}
          {filteredStations.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-neutral-600">
                Showing {Math.min(filteredStations.length, 1) + (currentPage - 1) * itemsPerPage}-
                {Math.min(currentPage * itemsPerPage, filteredStations.length)} of {filteredStations.length} stations
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <ChevronLeft className="h-4 w-4 -ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    let pageNum = currentPage;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePageChange(pageNum)}
                        className="h-8 w-8"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                  <ChevronRight className="h-4 w-4 -ml-2" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600">Rows per page:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-16">
                      {itemsPerPage}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {[10, 20, 50, 100].map(size => (
                      <DropdownMenuItem 
                        key={size} 
                        onClick={() => {
                          setItemsPerPage(size);
                          setCurrentPage(1);
                        }}
                      >
                        {size}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="map">
          <div className="mb-6">
            <StationsMap />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="glass-card p-4">
              <h3 className="text-sm font-semibold mb-2">Station Density</h3>
              <p className="text-sm text-neutral-600">
                The map shows station clusters for better visualization. Zoom in to see individual stations.
              </p>
            </Card>
            <Card className="glass-card p-4">
              <h3 className="text-sm font-semibold mb-2">Status Overview</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Active ({globalStats.activeStations})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Maintenance ({globalStats.maintenanceStations})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Empty ({globalStats.emptyStations})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Full ({globalStats.fullStations})</span>
                </div>
              </div>
            </Card>
            <Card className="glass-card p-4">
              <h3 className="text-sm font-semibold mb-2">Zone Distribution</h3>
              <div className="space-y-1">
                {Object.entries(stationsByZone).map(([zone, stations]) => (
                  <div key={zone} className="flex justify-between items-center">
                    <span className="text-sm">{zone}</span>
                    <span className="text-sm font-medium">{stations.length}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="glass-card p-4">
              <h3 className="text-sm font-semibold mb-2">Network Health</h3>
              <div className="flex flex-col justify-center h-full">
                <div className="w-full bg-neutral-100 rounded-full h-3 mb-2">
                  <div 
                    className="h-3 rounded-full bg-green-500" 
                    style={{ width: `${Math.round((globalStats.activeStations / globalStats.totalStations) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-neutral-600 text-center">
                  {Math.round((globalStats.activeStations / globalStats.totalStations) * 100)}% of stations operational
                </p>
              </div>
            </Card>
          </div>
          
          <Card className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">Top 5 Highest Usage Stations</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Station</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                    <TableHead className="text-right">Availability</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...allStations]
                    .sort((a, b) => b.usage - a.usage)
                    .slice(0, 5)
                    .map(station => (
                      <TableRow key={station.id}>
                        <TableCell className="font-medium">{station.name}</TableCell>
                        <TableCell>{station.zone}</TableCell>
                        <TableCell className="text-right">{station.usage} rides</TableCell>
                        <TableCell className="text-right">{station.bikes} / {station.docks}</TableCell>
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">
              Station Usage Heatmap
            </h2>
            <p className="text-neutral-600 mb-4">
              Visualize demand patterns across the network to identify high-usage areas and optimize station distribution.
            </p>
          </div>
          
          <Card className="glass-card mb-6">
            <div className="p-6 overflow-hidden">
              <DemandHeatmap />
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">Peak Hours by Zone</h3>
              <div className="space-y-4">
                {Object.entries(stationsByZone).slice(0, 5).map(([zone, stations]) => (
                  <div key={zone} className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{zone} Zone</h4>
                      <span className="text-sm text-neutral-600">{stations.length} stations</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs w-10 text-neutral-500">0h</span>
                      <div className="flex-1 h-6 bg-neutral-100 flex">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="h-full" 
                            style={{ 
                              width: `${100/24}%`,
                              backgroundColor: i >= 7 && i <= 9 || i >= 16 && i <= 18 
                                ? `rgba(218, 33, 40, ${0.3 + Math.random() * 0.7})` 
                                : 'transparent',
                              borderRight: i < 23 ? '1px solid white' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs w-10 text-neutral-500 text-right">24h</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">Station Capacity Utilization</h3>
              <div className="space-y-4">
                {Object.entries(stationsByZone).slice(0, 5).map(([zone, stations]) => {
                  const zoneStats = stations.reduce(
                    (acc, station) => {
                      acc.totalBikes += station.bikes;
                      acc.totalDocks += station.docks;
                      return acc;
                    },
                    { totalBikes: 0, totalDocks: 0 }
                  );
                  const utilization = Math.round((zoneStats.totalBikes / zoneStats.totalDocks) * 100);
                  
                  return (
                    <div key={zone} className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{zone} Zone</h4>
                        <span className="text-sm text-neutral-600">{utilization}% utilized</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            utilization < 30 ? 'bg-red-500' : 
                            utilization < 50 ? 'bg-orange-500' : 
                            utilization > 80 ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${utilization}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>{zoneStats.totalBikes} bikes</span>
                        <span>{zoneStats.totalDocks} docks</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zones">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">Zone Analysis</h2>
            <p className="text-neutral-600">Compare metrics across different geographical zones</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {zoneStats.map((zone) => (
              <Card key={zone.zone} className="glass-card p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{zone.zone} Zone</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Stations:</span>
                    <span className="font-medium">{zone.stationCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Bike Availability:</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-neutral-100 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            zone.bikeAvailability < 30 ? 'bg-red-500' : 
                            zone.bikeAvailability < 50 ? 'bg-orange-500' : 
                            zone.bikeAvailability > 80 ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${zone.bikeAvailability}%` }}
                        />
                      </div>
                      <span className="font-medium">{zone.bikeAvailability}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Average Usage:</span>
                    <span className="font-medium">{zone.averageUsage} rides</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">In Maintenance:</span>
                    <span className="font-medium">
                      {zone.stationsInMaintenance} 
                      <span className="text-xs text-neutral-500 ml-1">
                        ({Math.round((zone.stationsInMaintenance / zone.stationCount) * 100)}%)
                      </span>
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedZone(zone.zone);
                      const listTab = document.querySelector('[data-state="active"][value="list"]') as HTMLElement;
                      if (listTab) listTab.click();
                    }}
                  >
                    View Stations
                  </Button>
                  <Button variant="outline" size="sm">
                    Zone Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">Zone Comparison: Station Count</h3>
              <div className="h-[300px] flex items-center">
                <div className="w-full space-y-3">
                  {zoneStats
                    .sort((a, b) => b.stationCount - a.stationCount)
                    .map(zone => {
                      const percentage = (zone.stationCount / globalStats.totalStations) * 100;
                      return (
                        <div key={zone.zone} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{zone.zone}</span>
                            <span>{zone.stationCount} stations ({Math.round(percentage)}%)</span>
                          </div>
                          <div className="w-full bg-neutral-100 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Card>
            
            <Card className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">Zone Comparison: Usage Intensity</h3>
              <div className="h-[300px] flex items-center">
                <div className="w-full space-y-3">
                  {zoneStats
                    .sort((a, b) => b.averageUsage - a.averageUsage)
                    .map(zone => {
                      const maxUsage = Math.max(...zoneStats.map(z => z.averageUsage));
                      const percentage = (zone.averageUsage / maxUsage) * 100;
                      return (
                        <div key={zone.zone} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{zone.zone}</span>
                            <span>{zone.averageUsage} rides per station</span>
                          </div>
                          <div className="w-full bg-neutral-100 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full bg-blue-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stations;
