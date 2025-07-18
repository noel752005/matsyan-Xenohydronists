import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Wifi, Battery, Signal, Activity, Thermometer, Waves, Wind, ArrowUpRight, Eye } from "lucide-react";

interface BuoyData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: "online" | "warning" | "offline";
  battery: number;
  signal: number;
  lastUpdate: string;
  sensors: {
    temperature: number;
    humidity: number;
    waveHeight: number;
    windSpeed: number;
  };
}

interface BuoyStatusProps {
  buoy: BuoyData;
  onInspect: (buoyId: string) => void;
  interactive?: boolean;
}

export function BuoyStatus({ buoy, onInspect, interactive = false }: BuoyStatusProps) {
  const statusConfig = {
    online: { 
      color: "bg-emerald-500", 
      text: "Online", 
      badgeClass: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
      ringClass: "ring-emerald-500/20"
    },
    warning: { 
      color: "bg-yellow-500", 
      text: "Warning", 
      badgeClass: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
      ringClass: "ring-yellow-500/20"
    },
    offline: { 
      color: "bg-red-500", 
      text: "Offline", 
      badgeClass: "bg-red-500/20 text-red-600 border-red-500/30",
      ringClass: "ring-red-500/20"
    },
  };

  const config = statusConfig[buoy.status];

  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-emerald-500";
    if (level > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSignalBars = (level: number) => {
    const bars = Math.ceil((level / 100) * 4);
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-sm transition-all duration-300 ${
          i < bars ? 'bg-primary' : 'bg-muted'
        }`}
        style={{ height: `${(i + 1) * 3 + 2}px` }}
      />
    ));
  };

  return (
    <Card className={`group transition-all duration-300 hover:shadow-2xl ${
      interactive ? 'cursor-pointer hover:-translate-y-2 hover:scale-105' : ''
    } bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 hover:border-primary/50 ${config.ringClass} hover:ring-4`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
            {buoy.name}
            {interactive && (
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </CardTitle>
          <Badge className={`font-semibold ${config.badgeClass}`}>
            <div className={`w-2 h-2 rounded-full ${config.color} mr-2 ${
              buoy.status === 'online' ? 'animate-pulse' : ''
            }`} />
            {config.text}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {buoy.location.lat.toFixed(4)}, {buoy.location.lng.toFixed(4)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Enhanced System Health */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Battery Level</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{buoy.battery}%</span>
              <div className={`w-2 h-2 rounded-full ${getBatteryColor(buoy.battery)}`} />
            </div>
          </div>
          <Progress value={buoy.battery} className="h-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Signal Strength</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{buoy.signal}%</span>
              <div className="flex items-end gap-0.5">
                {getSignalBars(buoy.signal)}
              </div>
            </div>
          </div>
          <Progress value={buoy.signal} className="h-3" />
        </div>

        {/* Enhanced Sensor Readings */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Temperature</span>
            </div>
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{buoy.sensors.temperature}°C</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Humidity</span>
            </div>
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">{buoy.sensors.humidity}%</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="h-4 w-4 text-cyan-500" />
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Wave Height</span>
            </div>
            <span className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{buoy.sensors.waveHeight}m</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Wind Speed</span>
            </div>
            <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{buoy.sensors.windSpeed} km/h</span>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex flex-col gap-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Last update: {buoy.lastUpdate}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {buoy.id}
            </Badge>
          </div>
          
          <Button 
            className="w-full group/btn bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => onInspect(buoy.id)}
          >
            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            Inspect Details
            <ArrowUpRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}