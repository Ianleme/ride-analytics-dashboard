
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

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
    <Card className={cn("p-6 hover-scale glass-card", className)}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-neutral-900">{value}</h3>
          {change && (
            <p
              className={cn("text-sm mt-1", {
                "text-primary": trend === "up",
                "text-destructive": trend === "down",
              })}
            >
              {change}
            </p>
          )}
        </div>
        {icon && <div className="text-neutral-400">{icon}</div>}
      </div>
    </Card>
  );
}
