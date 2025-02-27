
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  MenuIcon,
  LogOut,
  Cloud,
  HelpCircle,
  Info,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Stations",
      href: "/stations",
      icon: MapPin,
    },
    {
      name: "Predictions",
      href: "/predictions",
      icon: TrendingUp,
    },
    {
      name: "Weather",
      href: "/weather",
      icon: Cloud,
    },
    {
      name: "Relatório",
      href: "/relatorio",
      icon: BarChart2,
    },
  ];

  const bottomNavigation = [
    {
      name: "Introduction",
      href: "/intro",
      icon: Info,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col bg-white border-r border-neutral-200 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-neutral-200">
        {!collapsed && (
          <span className="font-semibold text-neutral-900">Bike System</span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuIcon size={20} />
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <ul className="space-y-2 mb-4">
          {bottomNavigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-600 hover:text-neutral-900"
        >
          <LogOut className="mr-2 h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
