import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SensorCard } from "@/components/SensorCard";
import { BuoyStatus } from "@/components/BuoyStatus";
import { MetricChart } from "@/components/MetricChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { 
  Thermometer, 
  Droplets, 
  Waves, 
  Wind, 
  Gauge, 
  Activity,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Zap,
  Shield,
  Database,
  Target,
  Award,
  Users,
  Clock,
  BarChart3,
  Eye,
  Download,
  RefreshCw,
  Play
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [missionProgress, setMissionProgress] = useState(75);
  const [dailyGoals, setDailyGoals] = useState({
    dataPoints: { current: 1847, target: 2000 },
    alerts: { current: 3, target: 5 },
    uptime: { current: 99.8, target: 99.5 }
  });

  // Enhanced mock data with real-time simulation
  const [sensorData, setSensorData] = useState([
    { title: "Avg Temperature", value: "22.5", unit: "°C", status: "online" as const, icon: Thermometer, trend: "up" as const, trendValue: "+0.3°", route: "/sensors/temperature" },
    { title: "Humidity", value: "68", unit: "%", status: "online" as const, icon: Droplets, trend: "stable" as const, trendValue: "±2%", route: "/sensors/temperature" },
    { title: "Wave Height", value: "1.8", unit: "m", status: "warning" as const, icon: Waves, trend: "up" as const, trendValue: "+0.4m", route: "/sensors/waves" },
    { title: "Wind Speed", value: "15.2", unit: "km/h", status: "online" as const, icon: Wind, trend: "down" as const, trendValue: "-2.1", route: "/sensors/wind" },
    { title: "System Health", value: "94", unit: "%", status: "online" as const, icon: Activity, trend: "up" as const, trendValue: "+2%", route: "/sensors/health" },
    { title: "Avg Gyro", value: "2.1", unit: "°/s", status: "online" as const, icon: Gauge, trend: "stable" as const, trendValue: "±0.1", route: "/sensors/gyro" },
  ]);

  const buoyData = [
    {
      id: "BOY-001",
      name: "Atlantic Pioneer",
      location: { lat: 40.7128, lng: -74.0060 },
      status: "online" as const,
      battery: 87,
      signal: 92,
      lastUpdate: "2 min ago",
      sensors: { temperature: 23.1, humidity: 65, waveHeight: 1.9, windSpeed: 14.8 }
    },
    {
      id: "BOY-002", 
      name: "Pacific Guardian",
      location: { lat: 34.0522, lng: -118.2437 },
      status: "warning" as const,
      battery: 45,
      signal: 78,
      lastUpdate: "5 min ago",
      sensors: { temperature: 21.8, humidity: 72, waveHeight: 2.1, windSpeed: 16.2 }
    },
    {
      id: "BOY-003",
      name: "Arctic Sentinel", 
      location: { lat: 71.0588, lng: -8.2275 },
      status: "offline" as const,
      battery: 12,
      signal: 0,
      lastUpdate: "2 hours ago",
      sensors: { temperature: 18.5, humidity: 85, waveHeight: 0.8, windSpeed: 8.5 }
    }
  ];

  const temperatureData = [
    { time: "00:00", value: 22.1 },
    { time: "04:00", value: 21.8 },
    { time: "08:00", value: 22.9 },
    { time: "12:00", value: 24.2 },
    { time: "16:00", value: 23.8 },
    { time: "20:00", value: 22.5 },
  ];

  const waveData = [
    { time: "00:00", value: 1.2 },
    { time: "04:00", value: 1.5 },
    { time: "08:00", value: 1.8 },
    { time: "12:00", value: 2.1 },
    { time: "16:00", value: 1.9 },
    { time: "20:00", value: 1.6 },
  ];

  const systemStats = [
    { 
      label: "Data Points Collected", 
      value: "2.4M", 
      icon: Database, 
      color: "text-blue-400",
      action: () => navigate('/insights'),
      description: "View data analytics"
    },
    { 
      label: "Active Connections", 
      value: "12", 
      icon: Zap, 
      color: "text-emerald-400",
      action: () => navigate('/map'),
      description: "View network map"
    },
    { 
      label: "Security Status", 
      value: "Secure", 
      icon: Shield, 
      color: "text-green-400",
      action: () => navigate('/settings'),
      description: "Security settings"
    },
    { 
      label: "Uptime", 
      value: "99.9%", 
      icon: Activity, 
      color: "text-purple-400",
      action: () => navigate('/sensors/health'),
      description: "System health"
    },
  ];

  const missions = [
    { title: "Daily Data Collection", progress: 85, reward: "50 XP", icon: Target },
    { title: "System Monitoring", progress: 92, reward: "Achievement", icon: Eye },
    { title: "Alert Response", progress: 67, reward: "Badge", icon: AlertTriangle },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.title === "Avg Temperature" 
          ? (parseFloat(sensor.value) + (Math.random() - 0.5) * 0.2).toFixed(1)
          : sensor.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast("Refreshing Data", {
      description: "Updating all sensor readings..."
    });
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Data Updated", {
        description: "All sensors have been refreshed successfully!"
      });
    }, 2000);
  };

  const handleInspectBuoy = (buoyId: string) => {
    navigate('/map');
    toast("Navigating to Map", {
      description: `Focusing on ${buoyId} location and details.`
    });
  };

  const handleSensorClick = (route: string) => {
    navigate(route);
    toast("Opening Sensor Details", {
      description: "Loading detailed sensor analytics..."
    });
  };

  const handleMissionClick = (mission: string) => {
    toast("Mission Progress", {
      description: `${mission} - Keep up the great work!`
    });
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section with Interactive Elements */}
      <div className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
          <div className="p-8 flex-1">
            <h1 className="text-5xl font-bold text-white mb-4 animate-in slide-in-from-left duration-700">
              Ocean Monitoring Command Center
            </h1>
            <p className="text-blue-100 text-xl mb-6 animate-in slide-in-from-left duration-700 delay-200">
              Real-time intelligence from 12 active marine sensors
            </p>
            <div className="flex gap-4 animate-in slide-in-from-left duration-700 delay-300">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
                onClick={() => navigate('/map')}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Network
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 font-semibold px-8"
                onClick={() => navigate('/insights')}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>
          
          {/* Mission Progress */}
          <div className="hidden lg:block p-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Daily Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{missionProgress}%</span>
                  </div>
                  <Progress value={missionProgress} className="h-2" />
                  <Button 
                    size="sm" 
                    className="w-full bg-white/20 hover:bg-white/30"
                    onClick={() => handleMissionClick("Daily Mission")}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue Mission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Interactive Alert Banner */}
      <Card className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-900/20 animate-in slide-in-from-top duration-500">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 animate-pulse" />
            <div className="flex-1">
              <p className="font-semibold text-orange-700 dark:text-orange-400">Weather Alert Active</p>
              <p className="text-sm text-orange-600 dark:text-orange-300">High wave conditions detected in sectors 7-9. Monitor buoy stability.</p>
            </div>
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => navigate('/sensors/waves')}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gamified System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700"
            onClick={stat.action}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className="relative">
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Goals & Missions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Daily Goals
            </CardTitle>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(dailyGoals).map(([key, goal]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{typeof goal.current === 'number' && goal.current % 1 !== 0 ? goal.current.toFixed(1) : goal.current}/{goal.target}</span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Team Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">Online now</p>
              </div>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tech Team</p>
                <p className="text-xs text-muted-foreground">2 min ago</p>
              </div>
              <Badge variant="secondary" className="text-xs">Away</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Sensor Overview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-primary" />
            Sensor Network
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-lg px-4 py-2">
              6 Active Sensors
            </Badge>
            <Button 
              variant="outline"
              onClick={() => navigate('/insights')}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensorData.map((sensor, index) => (
            <div key={index} onClick={() => handleSensorClick(sensor.route)}>
              <SensorCard
                title={sensor.title}
                value={sensor.value}
                unit={sensor.unit}
                status={sensor.status}
                icon={sensor.icon}
                trend={sensor.trend}
                trendValue={sensor.trendValue}
                interactive={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div onClick={() => navigate('/sensors/temperature')}>
          <MetricChart
            title="Temperature Trends (24h)"
            data={temperatureData}
            unit="°C"
            color="hsl(var(--primary))"
            type="area"
            interactive={true}
          />
        </div>
        <div onClick={() => navigate('/sensors/waves')}>
          <MetricChart
            title="Wave Height Analysis"
            data={waveData}
            unit="m"
            color="hsl(var(--accent))"
            type="line"
            interactive={true}
          />
        </div>
      </div>

      {/* Interactive Buoy Status */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Waves className="h-7 w-7 text-primary animate-pulse" />
            Buoy Network Status
          </h2>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-600">
                2 Online
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-600">
                1 Warning
              </Badge>
              <Badge className="bg-red-500/20 text-red-600">
                1 Offline
              </Badge>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/map')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              View Map
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buoyData.map((buoy) => (
            <BuoyStatus
              key={buoy.id}
              buoy={buoy}
              onInspect={handleInspectBuoy}
              interactive={true}
            />
          ))}
        </div>
      </div>

      {/* Mission Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Active Missions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missions.map((mission, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleMissionClick(mission.title)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <mission.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{mission.title}</span>
                  </div>
                  <Progress value={mission.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{mission.progress}% Complete</span>
                    <span className="text-primary font-medium">{mission.reward}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}