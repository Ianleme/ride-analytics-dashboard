
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const routes = [
  {
    id: 1,
    start: "Central Station",
    end: "Downtown Plaza",
    volume: 1234,
    avgDuration: 15.2,
  },
  {
    id: 2,
    start: "Riverside Park",
    end: "Business District",
    volume: 987,
    avgDuration: 18.5,
  },
  {
    id: 3,
    start: "University Campus",
    end: "Shopping Mall",
    volume: 876,
    avgDuration: 12.8,
  },
  {
    id: 4,
    start: "Beach Front",
    end: "Marina Bay",
    volume: 765,
    avgDuration: 20.1,
  },
  {
    id: 5,
    start: "Tech Hub",
    end: "Innovation Park",
    volume: 654,
    avgDuration: 16.7,
  },
];

export const TopRoutesTable = () => {
  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4 text-neutral-900">Top Routes</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-600">Start Station</TableHead>
              <TableHead className="text-neutral-600">End Station</TableHead>
              <TableHead className="text-right text-neutral-600">Volume</TableHead>
              <TableHead className="text-right text-neutral-600">Avg. Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id} className="hover:bg-neutral-50">
                <TableCell className="font-medium text-neutral-900">{route.start}</TableCell>
                <TableCell className="text-neutral-700">{route.end}</TableCell>
                <TableCell className="text-right text-neutral-700">{route.volume}</TableCell>
                <TableCell className="text-right text-neutral-700">
                  {route.avgDuration} min
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
