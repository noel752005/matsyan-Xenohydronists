import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricChart } from "@/components/MetricChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Download,
  Calendar,
  MapPin
} from "lucide-react";

// Sample temperature data
const temperatureData = [
  { time: "00:00", value: 22.1 },
  { time: "02:00", value: 21.9 },
  { time: "04:00", value: 21.8 },
  { time: "06:00", value: 22.2 },
  { time: "08:00", value: 22.9 },
  { time: "10:00", value: 23.5 },
  { time: "12:00", value: 24.2 },
  { time: "14:00", value: 24.8 },
  { time: "16:00", value: 23.8 },
  { time: "18:00", value: 23.1 },
  { time: "20:00", value: 22.5 },
  { time: "22:00", value: 22.3 },
];

const weeklyData = [
  { time: "Mon", value: 22.5 },
  { time: "Tue", value: 23.1 },
  { time: "Wed", value: 21.8 },
  { time: "Thu", value: 24.2 },
  { time: "Fri", value: 23.7 },
  { time: "Sat", value: 22.9 },
  { time: "Sun", value: 23.4 },
];

const buoyTemperatures = [
  { id: "BOY-001", name: "Atlantic Pioneer", temperature: 23.1, status: "normal", location: "North Atlantic" },
  { id: "BOY-002", name: "Pacific Guardian", temperature: 21.8, status: "normal", location: "Pacific Coast" },
  { id: "BOY-003", name: "Arctic Sentinel", temperature: 18.5, status: "low", location: "Arctic Circle" },
  { id: "BOY-004", name: "Gulf Monitor", temperature: 26.2, status: "high", location: "Gulf of Mexico" },
  { id: "BOY-005", name: "Baltic Watcher", temperature: 19.7, status: "normal", location: "Baltic Sea" },
];

const alerts = [
  { time: "2 hours ago", message: "Temperature spike detected in Gulf Monitor", severity: "warning" },
  { time: "5 hours ago", message: "Arctic Sentinel showing consistently low readings", severity: "info" },
  { time: "1 day ago", message: "All sensors calibrated successfully", severity: "success" },
];

export default function SensorTemperature() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "destructive";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "warning": return "destructive";
      case "info": return "secondary";
      case "success": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Thermometer className="h-8 w-8 text-primary" />
            Temperature Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time temperature data from all marine sensors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <Calendar className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="marine" className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="ocean-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Current Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">22.8°C</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +0.3° from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="ocean-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Highest Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">26.2°C</div>
            <div className="text-sm text-muted-foreground mt-1">Gulf Monitor</div>
          </CardContent>
        </Card>

        <Card className="ocean-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Lowest Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">18.5°C</div>
            <div className="text-sm text-muted-foreground mt-1">Arctic Sentinel</div>
          </CardContent>
        </Card>

        <Card className="ocean-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">5/5</div>
            <div className="text-sm text-green-600 mt-1">All online</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricChart
          title="24-Hour Temperature Trend"
          data={temperatureData}
          unit="°C"
          color="hsl(var(--primary))"
          type="area"
        />
        <MetricChart
          title="Weekly Average"
          data={weeklyData}
          unit="°C"
          color="hsl(var(--accent))"
          type="line"
        />
      </div>

      {/* Buoy Temperature Status */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Individual Buoy Temperatures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buoyTemperatures.map((buoy) => (
              <div key={buoy.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300 hover-scale">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{buoy.name}</p>
                    <p className="text-sm text-muted-foreground">{buoy.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(buoy.status)} className="animate-pulse">
                    {buoy.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-lg font-bold">{buoy.temperature}°C</p>
                    <p className="text-xs text-muted-foreground">{buoy.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Recent Temperature Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Badge variant={getAlertColor(alert.severity)} className="text-xs">
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}