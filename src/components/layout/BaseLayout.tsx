
import { Sidebar } from "./Sidebar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px]">{children}</div>
    </div>
  );
}
