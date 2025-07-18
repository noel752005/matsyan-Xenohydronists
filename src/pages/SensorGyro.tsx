import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricChart } from "@/components/MetricChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gauge, 
  RotateCw, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  Download,
  RefreshCw,
  Move3D,
  Compass
} from "lucide-react";

// Sample gyroscope data
const gyroXData = [
  { time: "00:00", value: 0.2 },
  { time: "02:00", value: 0.4 },
  { time: "04:00", value: 0.1 },
  { time: "06:00", value: 0.8 },
  { time: "08:00", value: 1.2 },
  { time: "10:00", value: 1.8 },
  { time: "12:00", value: 2.1 },
  { time: "14:00", value: 1.9 },
  { time: "16:00", value: 1.4 },
  { time: "18:00", value: 1.1 },
  { time: "20:00", value: 0.7 },
  { time: "22:00", value: 0.3 },
];

const gyroStabilityData = [
  { time: "00:00", value: 95.2 },
  { time: "02:00", value: 94.8 },
  { time: "04:00", value: 96.1 },
  { time: "06:00", value: 92.3 },
  { time: "08:00", value: 89.7 },
  { time: "10:00", value: 87.2 },
  { time: "12:00", value: 85.4 },
  { time: "14:00", value: 87.8 },
  { time: "16:00", value: 91.2 },
  { time: "18:00", value: 93.5 },
  { time: "20:00", value: 95.8 },
  { time: "22:00", value: 96.7 },
];

const buoyGyroData = [
  { 
    id: "BOY-001", 
    name: "Atlantic Pioneer", 
    roll: 2.1, 
    pitch: 1.8, 
    yaw: 0.5,
    stability: 91.2,
    status: "normal" 
  },
  { 
    id: "BOY-002", 
    name: "Pacific Guardian", 
    roll: 3.8, 
    pitch: 4.2, 
    yaw: 1.2,
    stability: 78.5,
    status: "unstable" 
  },
  { 
    id: "BOY-003", 
    name: "Arctic Sentinel", 
    roll: 0.8, 
    pitch: 0.6, 
    yaw: 0.2,
    stability: 97.8,
    status: "stable" 
  },
  { 
    id: "BOY-004", 
    name: "Gulf Monitor", 
    roll: 1.5, 
    pitch: 1.2, 
    yaw: 0.4,
    stability: 93.7,
    status: "normal" 
  },
  { 
    id: "BOY-005", 
    name: "Baltic Watcher", 
    roll: 2.3, 
    pitch: 2.1, 
    yaw: 0.7,
    stability: 89.4,
    status: "normal" 
  },
];

const motionEvents = [
  { time: "1 hour ago", buoy: "Pacific Guardian", event: "High roll motion detected", severity: "warning" },
  { time: "3 hours ago", buoy: "Atlantic Pioneer", event: "Stability normalized", severity: "success" },
  { time: "6 hours ago", buoy: "Gulf Monitor", event: "Minor pitch fluctuation", severity: "info" },
  { time: "12 hours ago", buoy: "Baltic Watcher", event: "Gyroscope calibration completed", severity: "success" },
];

export default function SensorGyro() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "unstable": return "destructive";
      case "stable": return "default";
      default: return "secondary";
    }
  };

  const getStabilityColor = (stability: number) => {
    if (stability >= 95) return "text-green-600";
    if (stability >= 85) return "text-yellow-600";
    return "text-destructive";
  };

  const getEventColor = (severity: string) => {
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
            <Gauge className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            Gyroscope Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time orientation, stability, and motion analysis of marine buoys
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <RefreshCw className="h-4 w-4 mr-2" />
            Calibrate All
          </Button>
          <Button variant="marine" className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Motion Report
          </Button>
        </div>
      </div>

      {/* Alert for Unstable Buoy */}
      <Card className="border-l-4 border-l-warning bg-warning/5 animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning animate-pulse" />
            <div>
              <p className="font-semibold text-warning">Stability Alert</p>
              <p className="text-sm text-muted-foreground">Pacific Guardian showing elevated motion levels. Check sea conditions and anchor status.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Stability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">90.1%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.3% improvement
            </div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Max Roll Angle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3.8°</div>
            <div className="text-sm text-muted-foreground mt-1">Pacific Guardian</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Motion Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">4</div>
            <div className="text-sm text-muted-foreground mt-1">Last 24 hours</div>
          </CardContent>
        </Card>

        <Card className="ocean-card hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Stable Buoys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">4/5</div>
            <div className="text-sm text-green-600 mt-1">80% stable</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricChart
          title="Roll Motion (24h)"
          data={gyroXData}
          unit="°"
          color="hsl(var(--primary))"
          type="area"
        />
        <MetricChart
          title="Stability Index"
          data={gyroStabilityData}
          unit="%"
          color="hsl(var(--accent))"
          type="line"
        />
      </div>

      {/* Motion Overview */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Move3D className="h-5 w-5" />
            3D Motion Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buoyGyroData.map((buoy) => (
              <div key={buoy.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300 hover-scale">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <RotateCw className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '2s' }} />
                    </div>
                    <div>
                      <p className="font-semibold">{buoy.name}</p>
                      <p className="text-sm text-muted-foreground">{buoy.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Stability</p>
                      <p className={`text-lg font-bold ${getStabilityColor(buoy.stability)}`}>
                        {buoy.stability}%
                      </p>
                    </div>
                    <Badge variant={getStatusColor(buoy.status)} className="animate-pulse">
                      {buoy.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Compass className="h-4 w-4 text-red-500" />
                      <p className="text-sm font-medium text-red-500">Roll</p>
                    </div>
                    <p className="text-lg font-bold">{buoy.roll}°</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Compass className="h-4 w-4 text-green-500" />
                      <p className="text-sm font-medium text-green-500">Pitch</p>
                    </div>
                    <p className="text-lg font-bold">{buoy.pitch}°</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Compass className="h-4 w-4 text-blue-500" />
                      <p className="text-sm font-medium text-blue-500">Yaw</p>
                    </div>
                    <p className="text-lg font-bold">{buoy.yaw}°</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Motion Events */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Motion Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {motionEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.event}</p>
                  <p className="text-xs text-muted-foreground">{event.buoy} • {event.time}</p>
                </div>
                <Badge variant={getEventColor(event.severity)} className="text-xs">
                  {event.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}