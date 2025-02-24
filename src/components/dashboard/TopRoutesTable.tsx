
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
      <h3 className="text-lg font-semibold mb-4">Top Routes</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Start Station</TableHead>
              <TableHead>End Station</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Avg. Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{route.start}</TableCell>
                <TableCell>{route.end}</TableCell>
                <TableCell className="text-right">{route.volume}</TableCell>
                <TableCell className="text-right">
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
