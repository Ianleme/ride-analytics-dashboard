
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const helpTopics = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How to navigate the dashboard?",
        answer:
          "Use the sidebar navigation to access different sections. The dashboard provides an overview of system performance, while specific sections offer detailed insights into stations, predictions, and weather conditions.",
      },
      {
        question: "What do the main metrics mean?",
        answer:
          "The dashboard displays key metrics such as total rides, average duration, and system utilization. Hover over any metric for detailed explanations and historical context.",
      },
    ],
  },
  {
    category: "Stations Management",
    items: [
      {
        question: "How to check station status?",
        answer:
          "Visit the Stations page to view real-time status of all stations. Each station card shows current bike availability, maintenance status, and historical usage patterns.",
      },
      {
        question: "Can I see station locations on a map?",
        answer:
          "Yes, the Stations page includes an interactive map showing all station locations. Click on any station marker for detailed information.",
      },
    ],
  },
  {
    category: "Predictions & Analytics",
    items: [
      {
        question: "How accurate are the demand predictions?",
        answer:
          "Our AI-powered predictions maintain a 94%+ accuracy rate. The Predictions page shows detailed accuracy metrics and confidence intervals for all forecasts.",
      },
      {
        question: "What factors influence predictions?",
        answer:
          "Predictions consider historical usage patterns, weather conditions, time of day, day of week, and special events in the area.",
      },
    ],
  },
  {
    category: "Weather Integration",
    items: [
      {
        question: "How often is weather data updated?",
        answer:
          "Weather data is updated every 15 minutes, providing real-time conditions and forecasts for the next 24 hours.",
      },
      {
        question: "How does weather affect the system?",
        answer:
          "Weather conditions impact both bike availability and demand. The system automatically adjusts predictions based on current and forecasted weather conditions.",
      },
    ],
  },
];

const Help = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Help & Documentation
        </h1>
        <p className="text-neutral-600">
          Find answers to common questions and learn how to make the most of your
          bike system dashboard.
        </p>
      </div>

      <Card className="glass-card p-4 mb-8">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search help articles..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        </div>
      </Card>

      <div className="space-y-6">
        {helpTopics.map((topic) => (
          <Card key={topic.category} className="glass-card p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {topic.category}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {topic.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Help;
