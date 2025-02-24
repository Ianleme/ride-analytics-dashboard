
import DashboardHeader from "@/components/layout/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  ActivityIcon,
  ClockIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Rides"
          value="1.234K"
          change="+12.3% vs last month"
          trend="up"
          icon={<ActivityIcon className="h-6 w-6" />}
        />
        <KPICard
          title="Average Duration"
          value="18.5 min"
          change="-2.1% vs last month"
          trend="down"
          icon={<ClockIcon className="h-6 w-6" />}
        />
        <KPICard
          title="Monthly Growth"
          value="+15.2%"
          change="5.3% higher than target"
          trend="up"
          icon={<TrendingUpIcon className="h-6 w-6" />}
        />
        <KPICard
          title="Member/Casual Split"
          value="68/32"
          change="2% more members"
          trend="up"
          icon={<UsersIcon className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};

export default Index;
