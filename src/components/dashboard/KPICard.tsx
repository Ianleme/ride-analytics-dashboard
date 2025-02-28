
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
        "p-5 transition-all duration-300 animate-fade-in border-0 shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-center">
        {icon && (
          <div className="text-muted-foreground/70 mr-3">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-foreground">{value}</h3>
          {change && (
            <div className="flex items-center mt-1">
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive mr-1" />
              )}
              <p
                className={cn("text-xs", {
                  "text-emerald-500": trend === "up",
                  "text-destructive": trend === "down",
                })}
              >
                {change}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
