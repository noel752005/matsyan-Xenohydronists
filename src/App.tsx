import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BuoyMap from "./pages/BuoyMap";
import AIInsights from "./pages/AIInsights";
import NotFound from "./pages/NotFound";
import SensorTemperature from "./pages/SensorTemperature";
import SensorWaves from "./pages/SensorWaves";
import SensorWind from "./pages/SensorWind";
import SensorGyro from "./pages/SensorGyro";
import SensorHealth from "./pages/SensorHealth";
import Settings from "./pages/Settings";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<BuoyMap />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/sensors/temperature" element={<SensorTemperature />} />
            <Route path="/sensors/waves" element={<SensorWaves />} />
            <Route path="/sensors/wind" element={<SensorWind />} />
            <Route path="/sensors/gyro" element={<SensorGyro />} />
            <Route path="/sensors/health" element={<SensorHealth />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
