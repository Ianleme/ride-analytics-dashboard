
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const routes = [
  {
    id: 1,
    start: "Central Station",
    end: "Downtown Plaza",
    volume: 1234,
    avgDuration: 15.2,
    trend: "up",
  },
  {
    id: 2,
    start: "Riverside Park",
    end: "Business District",
    volume: 987,
    avgDuration: 18.5,
    trend: "down",
  },
  {
    id: 3,
    start: "University Campus",
    end: "Shopping Mall",
    volume: 876,
    avgDuration: 12.8,
    trend: "up",
  },
  {
    id: 4,
    start: "Beach Front",
    end: "Marina Bay",
    volume: 765,
    avgDuration: 20.1,
    trend: "neutral",
  },
  {
    id: 5,
    start: "Tech Hub",
    end: "Innovation Park",
    volume: 654,
    avgDuration: 16.7,
    trend: "up",
  },
];

export const TopRoutesTable = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Top Routes</h3>
        <p className="text-sm text-neutral-500">Most popular origin-destination pairs</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-600 font-medium">Start Station</TableHead>
              <TableHead className="text-neutral-600 font-medium">End Station</TableHead>
              <TableHead className="text-right text-neutral-600 font-medium">Volume</TableHead>
              <TableHead className="text-right text-neutral-600 font-medium">Avg. Duration</TableHead>
              <TableHead className="text-center text-neutral-600 font-medium">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id} className="transition-colors hover:bg-neutral-50/80">
                <TableCell className="font-medium text-neutral-900">{route.start}</TableCell>
                <TableCell className="text-neutral-700">{route.end}</TableCell>
                <TableCell className="text-right text-neutral-700 font-medium">{route.volume.toLocaleString()}</TableCell>
                <TableCell className="text-right text-neutral-700">
                  {route.avgDuration} min
                </TableCell>
                <TableCell className="text-center">
                  {route.trend === "up" && <ArrowUp className="h-4 w-4 text-emerald-500 inline" />}
                  {route.trend === "down" && <ArrowDown className="h-4 w-4 text-red-500 inline" />}
                  {route.trend === "neutral" && <Minus className="h-4 w-4 text-neutral-400 inline" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
