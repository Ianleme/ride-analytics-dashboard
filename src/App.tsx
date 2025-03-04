
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseLayout } from "./components/layout/BaseLayout";
import Index from "./pages/Index";
import Stations from "./pages/Stations";
import Predictions from "./pages/Predictions";
import Weather from "./pages/Weather";
import Intro from "./pages/Intro";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Relatorio from "./pages/Relatorio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BaseLayout>
                <Index />
              </BaseLayout>
            }
          />
          <Route
            path="/stations"
            element={
              <BaseLayout>
                <Stations />
              </BaseLayout>
            }
          />
          <Route
            path="/predictions"
            element={
              <BaseLayout>
                <Predictions />
              </BaseLayout>
            }
          />
          <Route
            path="/weather"
            element={
              <BaseLayout>
                <Weather />
              </BaseLayout>
            }
          />
          <Route
            path="/relatorio"
            element={
              <BaseLayout>
                <Relatorio />
              </BaseLayout>
            }
          />
          <Route
            path="/intro"
            element={
              <BaseLayout>
                <Intro />
              </BaseLayout>
            }
          />
          <Route
            path="/help"
            element={
              <BaseLayout>
                <Help />
              </BaseLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
