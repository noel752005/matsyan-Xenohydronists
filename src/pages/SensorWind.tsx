import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricChart } from "@/components/MetricChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wind, 
  Navigation, 
  TrendingUp, 
  TrendingDown,
  Compass,
  Download,
  RefreshCw,
  Eye
} from "lucide-react";

// Sample wind data
const windSpeedData = [
  { time: "00:00", value: 12.5 },
  { time: "02:00", value: 11.8 },
  { time: "04:00", value: 13.2 },
  { time: "06:00", value: 15.1 },
  { time: "08:00", value: 16.8 },
  { time: "10:00", value: 18.2 },
  { time: "12:00", value: 19.5 },
  { time: "14:00", value: 21.3 },
  { time: "16:00", value: 18.7 },
  { time: "18:00", value: 16.4 },
  { time: "20:00", value: 15.2 },
  { time: "22:00", value: 13.9 },
];

const windGustData = [
  { time: "00:00", value: 18.2 },
  { time: "02:00", value: 17.1 },
  { time: "04:00", value: 19.8 },
  { time: "06:00", value: 22.3 },
  { time: "08:00", value: 24.7 },
  { time: "10:00", value: 26.1 },
  { time: "12:00", value: 28.9 },
  { time: "14:00", value: 31.2 },
  { time: "16:00", value: 27.5 },
  { time: "18:00", value: 24.8 },
  { time: "20:00", value: 22.1 },
  { time: "22:00", value: 20.4 },
];

const buoyWindData = [
  { 
    id: "BOY-001", 
    name: "Atlantic Pioneer", 
    speed: 15.2, 
    gust: 22.1, 
    direction: 245, 
    directionText: "SW",
    status: "normal" 
  },
  { 
    id: "BOY-002", 
    name: "Pacific Guardian", 
    speed: 21.3, 
    gust: 31.2, 
    direction: 285, 
    directionText: "NW",
    status: "high" 
  },
  { 
    id: "BOY-003", 
    name: "Arctic Sentinel", 
    speed: 8.7, 
    gust: 12.4, 
    direction: 15, 
    directionText: "N",
    status: "low" 
  },
  { 
    id: "BOY-004", 
    name: "Gulf Monitor", 
    speed: 12.8, 
    gust: 18.9, 
    direction: 155, 
    directionText: "SE",
    status: "normal" 
  },
  { 
    id: "BOY-005", 
    name: "Baltic Watcher", 
    speed: 14.1, 
    gust: 20.3, 
    direction: 220, 
    directionText: "SW",
    status: "normal" 
  },
];

const windCategories = [
  { category: "Calm", range: "0-1 km/h", count: 0, color: "bg-green-200", description: "Smoke rises vertically" },
  { category: "Light Air", range: "1-5 km/h", count: 0, color: "bg-green-300", description: "Smoke drift indicates wind direction" },
  { category: "Light Breeze", range: "6-11 km/h", count: 1, color: "bg-blue-300", description: "Wind felt on face" },
  { category: "Gentle Breeze", range: "12-19 km/h", count: 3, color: "bg-blue-400", description: "Leaves rustle" },
  { category: "Moderate Breeze", range: "20-28 km/h", count: 1, color: "bg-yellow-400", description: "Small branches move" },
  { category: "Fresh Breeze", range: "29-38 km/h", count: 0, color: "bg-orange-400", description: "Large branches move" },
];

export default function SensorWind() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "destructive";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getWindDirection = (degrees: number) => {
    return `rotate(${degrees}deg)`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Wind className="h-8 w-8 text-primary" />
            Wind Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time wind speed, direction, and gust analysis across all stations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Now
          </Button>
          <Button variant="marine" className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Wind Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Wind Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">15.4 km/h</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.1 km/h increase
            </div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Peak Gust</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">31.2 km/h</div>
            <div className="text-sm text-muted-foreground mt-1">Pacific Guardian</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Predominant Direction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-accent">SW</div>
              <Navigation 
                className="h-6 w-6 text-accent transition-transform duration-500" 
                style={{ transform: getWindDirection(245) }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-1">245°</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold text-primary">12.5 km</div>
            </div>
            <div className="text-sm text-green-600 mt-1">Good conditions</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricChart
          title="Wind Speed (24h)"
          data={windSpeedData}
          unit="km/h"
          color="hsl(var(--primary))"
          type="area"
        />
        <MetricChart
          title="Wind Gusts (24h)"
          data={windGustData}
          unit="km/h"
          color="hsl(var(--destructive))"
          type="line"
        />
      </div>

      {/* Wind Scale */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            Beaufort Wind Scale Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {windCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-all duration-300 hover-scale">
                <div className="flex items-center justify-between mb-2">
                  <div className={`h-8 w-8 rounded-full ${category.color} flex items-center justify-center text-white font-bold animate-fade-in`}>
                    {category.count}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.range}
                  </Badge>
                </div>
                <p className="font-semibold text-sm">{category.category}</p>
                <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Buoy Wind Data */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Buoy Wind Measurements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buoyWindData.map((buoy) => (
              <div key={buoy.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300 hover-scale">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wind className="h-6 w-6 text-primary" />
                    <Navigation 
                      className="absolute h-4 w-4 text-primary/60 transition-transform duration-1000" 
                      style={{ transform: getWindDirection(buoy.direction) }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{buoy.name}</p>
                    <p className="text-sm text-muted-foreground">{buoy.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Speed</p>
                    <p className="text-lg font-bold">{buoy.speed} km/h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Gust</p>
                    <p className="text-lg font-bold text-destructive">{buoy.gust} km/h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Direction</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold">{buoy.directionText}</p>
                      <span className="text-sm text-muted-foreground">({buoy.direction}°)</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(buoy.status)} className="animate-pulse">
                    {buoy.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}