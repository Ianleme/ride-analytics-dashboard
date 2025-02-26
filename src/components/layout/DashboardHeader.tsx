
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { SelectFilter } from "@/components/ui/select-filter";

const DashboardHeader = () => {
  return (
    <header className="animate-fadeIn w-full px-8 py-6 glass-card rounded-xl mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <DateRangePicker />
          <SelectFilter
            options={[
              { value: "member", label: "Member" },
              { value: "casual", label: "Casual" },
            ]}
            placeholder="User Type"
          />
          <SelectFilter
            options={[
              { value: "electric", label: "Electric" },
              { value: "classic", label: "Classic" },
            ]}
            placeholder="Bike Type"
          />
          <Button variant="outline">Export</Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
