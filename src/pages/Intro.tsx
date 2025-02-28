
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Cloud,
  ArrowRight,
  BarChart2,
  ChevronDown,
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const features = [
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboard",
    description:
      "Monitor bike system performance with live metrics, usage patterns, and key performance indicators.",
    href: "/",
    details: [
      "Live KPI Cards showing total rides, average duration, monthly growth, and member/casual split",
      "Trend charts showing ride patterns over time to identify peak hours and days",
      "Heat map visualization of demand across different time periods",
      "Table of top routes with popularity metrics and growth indicators",
      "Interactive charts that allow you to analyze system performance from multiple angles"
    ]
  },
  {
    icon: MapPin,
    title: "Station Management",
    description:
      "View and manage all bike stations, track bike availability, and monitor station status in real-time.",
    href: "/stations",
    details: [
      "Interactive map showing all stations with status indicators and capacity information",
      "Detailed table of stations with sorting and filtering capabilities",
      "Live status indicators showing which stations need rebalancing",
      "Capacity utilization metrics to identify bottlenecks in the system",
      "Historical occupancy data to track station performance over time"
    ]
  },
  {
    icon: TrendingUp,
    title: "Demand Predictions",
    description:
      "Access AI-powered demand forecasts to optimize bike distribution and maintain service quality.",
    href: "/predictions",
    details: [
      "Machine learning-based demand predictions for the next 24 hours, week, and month",
      "Station-specific forecasts to target rebalancing efforts efficiently",
      "Weather-adjusted demand models that account for environmental factors",
      "Rebalancing recommendations based on predicted imbalances",
      "Impact factor analysis showing how different variables affect demand"
    ]
  },
  {
    icon: Cloud,
    title: "Weather Integration",
    description:
      "Stay informed about weather conditions and their impact on bike system operations.",
    href: "/weather",
    details: [
      "Current weather conditions including temperature, humidity, wind, and sky conditions",
      "Temperature and humidity trend forecasts to plan for changing conditions",
      "Precipitation forecasts to anticipate reduced demand during rainfall",
      "Analysis of how weather impacts ride volume across different temperature ranges",
      "Historical weather data correlated with ride patterns to identify important relationships"
    ]
  },
  {
    icon: BarChart2,
    title: "Business Performance Reports",
    description:
      "Comprehensive business analytics and reporting to track system performance and financial metrics.",
    href: "/relatorio",
    details: [
      "Financial performance dashboards with revenue tracking and projections",
      "Operational efficiency metrics including bike utilization and maintenance costs",
      "User demographics and behavior analysis to understand customer segments",
      "Comparative performance against historical benchmarks and targets",
      "Exportable reports for stakeholder presentations and planning sessions"
    ]
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

      <div className="grid grid-cols-1 gap-6 mb-12">
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
                
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value={`feature-${feature.title}`}>
                    <AccordionTrigger className="text-sm">
                      View Detailed Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                        {feature.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
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
