import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricChart } from "@/components/MetricChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Battery, 
  Wifi, 
  HardDrive,
  Cpu,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Zap,
  Signal
} from "lucide-react";

// Sample system health data
const batteryData = [
  { time: "00:00", value: 89 },
  { time: "02:00", value: 87 },
  { time: "04:00", value: 85 },
  { time: "06:00", value: 83 },
  { time: "08:00", value: 85 },
  { time: "10:00", value: 87 },
  { time: "12:00", value: 91 },
  { time: "14:00", value: 93 },
  { time: "16:00", value: 91 },
  { time: "18:00", value: 89 },
  { time: "20:00", value: 87 },
  { time: "22:00", value: 86 },
];

const uptimeData = [
  { time: "00:00", value: 99.8 },
  { time: "02:00", value: 99.9 },
  { time: "04:00", value: 99.7 },
  { time: "06:00", value: 99.6 },
  { time: "08:00", value: 99.8 },
  { time: "10:00", value: 99.9 },
  { time: "12:00", value: 100 },
  { time: "14:00", value: 99.9 },
  { time: "16:00", value: 99.8 },
  { time: "18:00", value: 99.9 },
  { time: "20:00", value: 99.7 },
  { time: "22:00", value: 99.8 },
];

const buoyHealthData = [
  { 
    id: "BOY-001", 
    name: "Atlantic Pioneer", 
    battery: 87,
    signal: 92,
    temperature: 42,
    storage: 78,
    uptime: 99.8,
    status: "healthy",
    lastMaintenance: "2 weeks ago"
  },
  { 
    id: "BOY-002", 
    name: "Pacific Guardian", 
    battery: 45,
    signal: 78,
    temperature: 38,
    storage: 84,
    uptime: 98.2,
    status: "warning",
    lastMaintenance: "1 month ago"
  },
  { 
    id: "BOY-003", 
    name: "Arctic Sentinel", 
    battery: 12,
    signal: 0,
    temperature: 35,
    storage: 92,
    uptime: 0,
    status: "critical",
    lastMaintenance: "3 months ago"
  },
  { 
    id: "BOY-004", 
    name: "Gulf Monitor", 
    battery: 91,
    signal: 88,
    temperature: 44,
    storage: 65,
    uptime: 99.9,
    status: "healthy",
    lastMaintenance: "1 week ago"
  },
  { 
    id: "BOY-005", 
    name: "Baltic Watcher", 
    battery: 73,
    signal: 85,
    temperature: 40,
    storage: 71,
    uptime: 99.5,
    status: "healthy",
    lastMaintenance: "10 days ago"
  },
];

const systemAlerts = [
  { time: "30 min ago", buoy: "Arctic Sentinel", message: "System offline - No response", severity: "critical" },
  { time: "2 hours ago", buoy: "Pacific Guardian", message: "Low battery warning", severity: "warning" },
  { time: "4 hours ago", buoy: "Atlantic Pioneer", message: "Scheduled maintenance completed", severity: "success" },
  { time: "8 hours ago", buoy: "Gulf Monitor", message: "High CPU temperature detected", severity: "warning" },
  { time: "1 day ago", buoy: "Baltic Watcher", message: "Firmware update successful", severity: "success" },
];

export default function SensorHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "healthy": return "default";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "healthy": return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "success": return "default";
      default: return "outline";
    }
  };

  const getHealthColor = (value: number, type: string) => {
    if (type === "battery") {
      if (value >= 70) return "text-green-600";
      if (value >= 30) return "text-yellow-600";
      return "text-destructive";
    }
    if (type === "temperature") {
      if (value <= 50) return "text-green-600";
      if (value <= 70) return "text-yellow-600";
      return "text-destructive";
    }
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary animate-pulse" />
            System Health Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive health status and diagnostics for all marine monitoring systems
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Diagnostics
          </Button>
          <Button variant="marine" className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Health Report
          </Button>
        </div>
      </div>

      {/* Critical Alert */}
      <Card className="border-l-4 border-l-destructive bg-destructive/5 animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
            <div>
              <p className="font-semibold text-destructive">Critical System Alert</p>
              <p className="text-sm text-muted-foreground">Arctic Sentinel is offline and requires immediate attention. Last contact: 2 hours ago.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Systems Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">4/5</div>
            <div className="text-sm text-muted-foreground mt-1">80% operational</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Battery className="h-4 w-4 text-primary" />
              Avg Battery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">61.6%</div>
            <div className="text-sm text-yellow-600 mt-1">2 low batteries</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wifi className="h-4 w-4 text-primary" />
              Avg Signal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">68.6%</div>
            <div className="text-sm text-green-600 mt-1">Good coverage</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Avg Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">99.4%</div>
            <div className="text-sm text-green-600 mt-1">Excellent</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricChart
          title="Battery Levels (24h)"
          data={batteryData}
          unit="%"
          color="hsl(var(--primary))"
          type="area"
        />
        <MetricChart
          title="System Uptime"
          data={uptimeData}
          unit="%"
          color="hsl(var(--accent))"
          type="line"
        />
      </div>

      {/* Individual System Health */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Individual System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {buoyHealthData.map((buoy) => (
              <div key={buoy.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300 hover-scale">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {getStatusIcon(buoy.status)}
                    </div>
                    <div>
                      <p className="font-semibold">{buoy.name}</p>
                      <p className="text-sm text-muted-foreground">{buoy.id} • Last maintenance: {buoy.lastMaintenance}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(buoy.status)} className="animate-pulse">
                    {buoy.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Battery</span>
                    </div>
                    <Progress value={buoy.battery} className="h-2" />
                    <p className={`text-sm mt-1 ${getHealthColor(buoy.battery, "battery")}`}>
                      {buoy.battery}%
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Signal className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Signal</span>
                    </div>
                    <Progress value={buoy.signal} className="h-2" />
                    <p className={`text-sm mt-1 ${getHealthColor(buoy.signal, "signal")}`}>
                      {buoy.signal}%
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Temp</span>
                    </div>
                    <Progress value={(buoy.temperature / 70) * 100} className="h-2" />
                    <p className={`text-sm mt-1 ${getHealthColor(buoy.temperature, "temperature")}`}>
                      {buoy.temperature}°C
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Storage</span>
                    </div>
                    <Progress value={buoy.storage} className="h-2" />
                    <p className={`text-sm mt-1 ${getHealthColor(buoy.storage, "storage")}`}>
                      {buoy.storage}%
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Uptime</span>
                    </div>
                    <Progress value={buoy.uptime} className="h-2" />
                    <p className={`text-sm mt-1 ${getHealthColor(buoy.uptime, "uptime")}`}>
                      {buoy.uptime}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.buoy} • {alert.time}</p>
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