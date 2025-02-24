
import { Card } from "@/components/ui/card";

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Exemplo de dados para o heatmap
const data = Array.from({ length: 7 }, () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
);

export const DemandHeatmap = () => {
  const getColor = (value: number) => {
    const opacity = value / 100;
    return `rgba(99, 102, 241, ${opacity})`;
  };

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4">Demand by Hour & Day</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex mb-2">
            <div className="w-16" /> {/* Espaço para labels */}
            {hours.map((hour) => (
              <div key={hour} className="flex-1 text-center text-xs text-gray-500">
                {hour}h
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className="flex">
              <div className="w-16 flex items-center text-sm text-gray-500">
                {day}
              </div>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="flex-1 aspect-square border border-white/10"
                  style={{
                    backgroundColor: getColor(data[dayIndex][hour]),
                  }}
                  title={`${day} ${hour}h: ${data[dayIndex][hour]} rides`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="text-xs text-gray-500">Less</div>
        <div className="h-2 w-20 bg-gradient-to-r from-indigo-100 to-indigo-600" />
        <div className="text-xs text-gray-500">More</div>
      </div>
    </Card>
  );
};
