import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricChart } from "@/components/MetricChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Waves, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  Download,
  RefreshCw,
  BarChart3
} from "lucide-react";

// Sample wave data
const waveHeightData = [
  { time: "00:00", value: 1.2 },
  { time: "02:00", value: 1.4 },
  { time: "04:00", value: 1.5 },
  { time: "06:00", value: 1.8 },
  { time: "08:00", value: 2.1 },
  { time: "10:00", value: 2.3 },
  { time: "12:00", value: 2.5 },
  { time: "14:00", value: 2.8 },
  { time: "16:00", value: 2.4 },
  { time: "18:00", value: 2.1 },
  { time: "20:00", value: 1.9 },
  { time: "22:00", value: 1.6 },
];

const wavePeriodData = [
  { time: "00:00", value: 6.2 },
  { time: "02:00", value: 6.5 },
  { time: "04:00", value: 6.8 },
  { time: "06:00", value: 7.1 },
  { time: "08:00", value: 7.4 },
  { time: "10:00", value: 7.8 },
  { time: "12:00", value: 8.2 },
  { time: "14:00", value: 8.5 },
  { time: "16:00", value: 8.1 },
  { time: "18:00", value: 7.7 },
  { time: "20:00", value: 7.3 },
  { time: "22:00", value: 6.9 },
];

const buoyWaveData = [
  { id: "BOY-001", name: "Atlantic Pioneer", height: 1.9, period: 7.2, direction: "NW", status: "normal" },
  { id: "BOY-002", name: "Pacific Guardian", height: 2.8, period: 8.1, direction: "SW", status: "high" },
  { id: "BOY-003", name: "Arctic Sentinel", height: 0.8, period: 5.5, direction: "N", status: "low" },
  { id: "BOY-004", name: "Gulf Monitor", height: 1.5, period: 6.8, direction: "SE", status: "normal" },
  { id: "BOY-005", name: "Baltic Watcher", height: 1.2, period: 6.2, direction: "E", status: "normal" },
];

const waveCategories = [
  { category: "Calm", range: "0.0-0.5m", count: 0, color: "bg-blue-200" },
  { category: "Light", range: "0.5-1.0m", count: 1, color: "bg-blue-300" },
  { category: "Moderate", range: "1.0-2.0m", count: 3, color: "bg-blue-500" },
  { category: "Rough", range: "2.0-3.0m", count: 1, color: "bg-orange-500" },
  { category: "Very Rough", range: "3.0+m", count: 0, color: "bg-red-500" },
];

export default function SensorWaves() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "destructive";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Waves className="h-8 w-8 text-primary wave-animation" />
            Wave Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time wave height, period, and direction analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="ocean" className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="border-l-4 border-l-warning bg-warning/5 animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning animate-pulse" />
            <div>
              <p className="font-semibold text-warning">High Wave Alert</p>
              <p className="text-sm text-muted-foreground">Pacific Guardian reporting 2.8m waves. Monitor vessel traffic in area.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Wave Height</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1.84m</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +0.2m from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Max Wave Height</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2.8m</div>
            <div className="text-sm text-muted-foreground mt-1">Pacific Guardian</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">6.96s</div>
            <div className="text-sm text-muted-foreground mt-1">Stable conditions</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">5/5</div>
            <div className="text-sm text-green-600 mt-1">All operational</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricChart
          title="Wave Height Trends (24h)"
          data={waveHeightData}
          unit="m"
          color="hsl(var(--primary))"
          type="area"
        />
        <MetricChart
          title="Wave Period Analysis"
          data={wavePeriodData}
          unit="s"
          color="hsl(var(--accent))"
          type="line"
        />
      </div>

      {/* Wave Categories */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Current Wave Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {waveCategories.map((category, index) => (
              <div key={index} className="text-center p-4 rounded-lg border hover:shadow-md transition-all duration-300 hover-scale">
                <div className={`h-16 w-full rounded-lg ${category.color} mb-3 flex items-end justify-center text-white font-bold text-2xl animate-fade-in`}>
                  {category.count}
                </div>
                <p className="font-semibold">{category.category}</p>
                <p className="text-xs text-muted-foreground">{category.range}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Buoy Data */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Buoy Wave Measurements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buoyWaveData.map((buoy) => (
              <div key={buoy.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300 hover-scale">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Waves className="h-6 w-6 text-primary wave-animation" />
                  </div>
                  <div>
                    <p className="font-semibold">{buoy.name}</p>
                    <p className="text-sm text-muted-foreground">{buoy.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="text-lg font-bold">{buoy.height}m</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-lg font-bold">{buoy.period}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Direction</p>
                    <p className="text-lg font-bold">{buoy.direction}</p>
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