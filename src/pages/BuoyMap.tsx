import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Satellite, Navigation, Anchor, Waves, Thermometer, Activity, Wind, Droplets, Battery, Signal } from "lucide-react";

const EnhancedMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedBuoy, setSelectedBuoy] = useState<string | null>(null);

const buoys = [
  { id: "BOY-001", name: "Atlantic Pioneer", lat: 13.0905, lng: 80.32045, status: "online", temp: 23.1, wave: 1.9, battery: 87 },
  { id: "BOY-002", name: "Pacific Guardian", lat: 13.1215, lng: 80.35961, status: "warning", temp: 21.8, wave: 2.8, battery: 45 },
  { id: "BOY-003", name: "Arctic Sentinel", lat: 13.0531, lng: 80.40686, status:  "offline", temp: 18.5, wave: 0.8, battery: 12 },
  { id: "BOY-004", name: "Gulf Monitor", lat: 13.1096, lng: 80.45072, status: "online", temp: 26.2, wave: 1.5, battery: 91 },
  { id: "BOY-005", name: "Baltic Watcher", lat: 13.0544, lng: 80.36744, status: "online", temp: 19.7, wave: 1.2, battery: 73 },
];



useEffect(() => {
  if (!mapContainerRef.current) return;

  const map = new maplibregl.Map({
    container: mapContainerRef.current,
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    center: [80.4134238425889, 13.020807593858753],
    zoom: 10.5,
    attributionControl: false,
    dragPan: false,
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    interactive: false, // completely disables all user interaction
  });

  return () => map.remove();
}, []);


  return (
    <div className="relative rounded-lg h-96 overflow-hidden">
      {/* Real map tile background */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />

      {/* Buoy Markers Overlay */}
      {buoys.map((buoy, index) => (
        <div
          key={buoy.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
          style={{ 
            left: `${15 + (index * 16)}%`, 
            top: `${25 + (index % 2 === 0 ? 15 : -5)}%` 
          }}
          onClick={() => setSelectedBuoy(selectedBuoy === buoy.id ? null : buoy.id)}
        >
          <div className="relative" style={{ position: 'relative', top: '50px' }}>
            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-125 ${
              buoy.status === 'online' ? 'bg-emerald-500 pulse-glow' :
              buoy.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {buoy.status === 'online' && (
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
              )}
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-xl transition-all duration-300 z-10 min-w-48 ${
              selectedBuoy === buoy.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{buoy.name}</p>
                  <p className="text-xs text-muted-foreground">{buoy.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3 text-blue-400" />
                    <span>{buoy.temp}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Waves className="h-3 w-3 text-cyan-400" />
                    <span>{buoy.wave}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Battery className="h-3 w-3 text-green-400" />
                    <span>{buoy.battery}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3 text-purple-400" />
                    <span className={
                      buoy.status === 'online' ? 'text-emerald-400' :
                      buoy.status === 'warning' ? 'text-yellow-400' :
                      'text-red-400'
                    }>
                      {buoy.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Map controls */}
      <div className="absolute top-4 right-4 space-y-2 z-10">
        <Button size="sm" variant="marine" className="btn-enhanced">
          <Navigation className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="marine" className="btn-enhanced">
          <Satellite className="h-4 w-4" />
        </Button>
      </div>

      {/* Status legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-4 shadow-lg z-10">
        <p className="text-sm font-semibold mb-3 text-foreground">Buoy Status</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 pulse-glow"></div>
            <span className="text-foreground">Online (3)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-foreground">Warning (1)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-foreground">Offline (1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function BuoyMap() {
  const selectedBuoy = {
    id: "BOY-001",
    name: "Atlantic Pioneer",
    location: { lat: 40.7128, lng: -74.0060 },
    status: "online" as const,
    depth: "250m",
    deployment: "2024-01-15",
    lastMaintenance: "2024-11-01",
    sensors: {
      temperature: { value: 23.1, status: "normal" },
      humidity: { value: 65, status: "normal" },
      waveHeight: { value: 1.9, status: "elevated" },
      windSpeed: { value: 14.8, status: "normal" },
      gyroscope: { value: 2.1, status: "normal" },
      battery: { value: 87, status: "good" }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            Buoy Network Map
          </h1>
          <p className="text-muted-foreground">Monitor and inspect buoys across the marine network</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="default" className="text-lg px-4 py-2 bg-emerald-500/20 text-emerald-400">
            5 Active Buoys
          </Badge>
          <Button variant="marine" className="btn-enhanced">
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Map View */}
        <div className="lg:col-span-2">
          <Card className="ocean-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5 wave-animation" />
                Network Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedMap />
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Buoy Details */}
        <div className="space-y-4">
          <Card className="ocean-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Anchor className="h-5 w-5" />
                  {selectedBuoy.name}
                </span>
                <Badge variant="default" className="bg-emerald-500/20 text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 pulse-glow" />
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="ml-1 font-semibold text-foreground">{selectedBuoy.id}</span>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Depth:</span>
                  <span className="ml-1 font-semibold text-foreground">{selectedBuoy.depth}</span>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Deployed:</span>
                  <span className="ml-1 font-semibold text-foreground">{selectedBuoy.deployment}</span>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Maintenance:</span>
                  <span className="ml-1 font-semibold text-foreground">{selectedBuoy.lastMaintenance}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-semibold mb-4 text-foreground">Sensor Status</h4>
                <div className="space-y-3">
                  {Object.entries(selectedBuoy.sensors).map(([key, sensor]) => (
                    <div key={key} className="p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm capitalize font-medium text-foreground">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          sensor.status === 'normal' || sensor.status === 'good' ? 'bg-emerald-500 pulse-glow' :
                          sensor.status === 'elevated' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">{sensor.value}{
                          key === 'temperature' ? '°C' :
                          key === 'humidity' || key === 'battery' ? '%' :
                          key === 'waveHeight' ? 'm' :
                          key === 'windSpeed' ? ' km/h' :
                          key === 'gyroscope' ? '°/s' : ''
                        }</span>
                        <Badge variant="outline" className="text-xs">
                          {sensor.status}
                        </Badge>
                      </div>
                      {key === 'battery' && (
                        <Progress value={sensor.value} className="mt-2 h-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full btn-enhanced" variant="ocean">
                <Activity className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}