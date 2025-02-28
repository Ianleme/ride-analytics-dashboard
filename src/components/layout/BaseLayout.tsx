
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState("240px");

  // Listen for sidebar collapse events
  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setSidebarWidth(e.detail.collapsed ? "72px" : "240px");
    };

    window.addEventListener("sidebarStateChange" as any, handleSidebarChange);
    return () => {
      window.removeEventListener("sidebarStateChange" as any, handleSidebarChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div 
        className="transition-all duration-300" 
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </div>
    </div>
  );
}
