
import { Card } from "@/components/ui/card";

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Example data for the heatmap
const data = Array.from({ length: 7 }, () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
);

export const DemandHeatmap = () => {
  const getColor = (value: number) => {
    // Primary color with varying opacity based on intensity
    return `rgba(var(--primary-rgb, 218, 33, 40), ${value / 100})`;
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Hourly Demand by Day of Week</h3>
        <p className="text-sm text-neutral-500">Shows ride volume patterns throughout the week</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex mb-2">
            <div className="w-16" />
            {hours.map((hour) => (
              <div key={hour} className="flex-1 text-center text-xs text-neutral-500 font-medium">
                {hour}h
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className="flex mb-1">
              <div className="w-16 flex items-center text-sm font-medium text-neutral-600">
                {day}
              </div>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="flex-1 aspect-square transition-colors duration-300 hover:opacity-80"
                  style={{
                    backgroundColor: getColor(data[dayIndex][hour]),
                    borderRadius: '2px',
                    margin: '1px',
                  }}
                  title={`${day} ${hour}h: ${data[dayIndex][hour]} rides`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="text-xs text-neutral-500">Less</div>
        <div className="h-2 w-24 bg-gradient-to-r from-primary/10 to-primary rounded" />
        <div className="text-xs text-neutral-500">More</div>
      </div>
    </div>
  );
};
