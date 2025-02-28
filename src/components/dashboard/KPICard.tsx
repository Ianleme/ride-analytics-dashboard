
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  icon,
  trend,
  className,
}: KPICardProps) {
  return (
    <Card 
      className={cn(
        "p-6 hover-scale bg-gradient-to-br border transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900">{value}</h3>
          {change && (
            <div className="flex items-center mt-1">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <p
                className={cn("text-sm", {
                  "text-emerald-500": trend === "up",
                  "text-red-500": trend === "down",
                })}
              >
                {change}
              </p>
            </div>
          )}
        </div>
        {icon && (
          <div className="bg-white/60 p-3 rounded-full shadow-sm">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
