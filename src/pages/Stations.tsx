import { MapPinIcon, InfoIcon, BikeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import StationsMap from "@/components/stations/StationsMap";

const stations = [
  {
    id: 1,
    name: "Central Station",
    address: "123 Main St",
    bikes: 15,
    docks: 20,
    status: "active",
  },
  {
    id: 2,
    name: "Downtown Plaza",
    address: "456 Market St",
    bikes: 8,
    docks: 12,
    status: "active",
  },
  {
    id: 3,
    name: "Riverside Park",
    address: "789 River Rd",
    bikes: 10,
    docks: 15,
    status: "maintenance",
  },
];

const Stations = () => {
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
              />
              <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <BikeIcon className="mr-2 h-4 w-4" />
              Add New Station
            </Button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mb-8">
        <StationsMap />
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <Card key={station.id} className="glass-card hover-scale">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{station.name}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{station.address}</p>
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
    </div>
  );
};

export default Stations;
