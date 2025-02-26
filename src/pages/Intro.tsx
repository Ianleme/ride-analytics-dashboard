
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Cloud,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboard",
    description:
      "Monitor bike system performance with live metrics, usage patterns, and key performance indicators.",
    href: "/",
  },
  {
    icon: MapPin,
    title: "Station Management",
    description:
      "View and manage all bike stations, track bike availability, and monitor station status in real-time.",
    href: "/stations",
  },
  {
    icon: TrendingUp,
    title: "Demand Predictions",
    description:
      "Access AI-powered demand forecasts to optimize bike distribution and maintain service quality.",
    href: "/predictions",
  },
  {
    icon: Cloud,
    title: "Weather Integration",
    description:
      "Stay informed about weather conditions and their impact on bike system operations.",
    href: "/weather",
  },
];

const Intro = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Welcome to the Bike System Dashboard
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Your comprehensive solution for managing and optimizing bike-sharing
          operations with real-time insights and predictive analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="glass-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 mb-4">{feature.description}</p>
                <Link to={feature.href}>
                  <Button variant="outline" className="group">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-8 text-center">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
          Need Help Getting Started?
        </h2>
        <p className="text-neutral-600 mb-6">
          Check out our comprehensive help section for detailed guides and
          documentation.
        </p>
        <Link to="/help">
          <Button className="bg-primary hover:bg-primary/90">
            View Help Documentation
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Intro;
