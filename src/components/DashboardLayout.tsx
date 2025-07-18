import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Waves, Wifi, Bell, Settings, Trophy, Star, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { Padding } from "maplibre-gl";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  achievements: number;
  streak: number;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    xp: 2450,
    maxXp: 3000,
    achievements: 8,
    streak: 15
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        xp: Math.min(prev.xp + Math.floor(Math.random() * 10), prev.maxXp)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    navigate('/insights');
    toast("Viewing AI Insights", {
      description: "Check out the latest system recommendations and alerts."
    });
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    toast("Opening Settings", {
      description: "Configure your dashboard preferences."
    });
  };

  const getPageTitle = () => {
    const path = location.pathname;
    const titles: { [key: string]: string } = {
      '/': 'Dashboard Overview',
      '/map': 'Network Map',
      '/insights': 'AI Insights',
      '/sensors/temperature': 'Temperature Monitoring',
      '/sensors/waves': 'Wave Analysis',
      '/sensors/wind': 'Wind Monitoring',
      '/sensors/gyro': 'Gyroscope Data',
      '/sensors/health': 'System Health',
      '/settings': 'System Settings'
    };
    return titles[path] || 'Marine IoT Dashboard';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Enhanced Header with Gamification */}
        <header className="fixed top-0 left-0 right-0 h-20 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 z-50 flex items-center px-6 shadow-xl">
          <SidebarTrigger className="mr-4 hover:scale-105 transition-transform" />
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Waves className="h-10 w-10 text-cyan-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">OceanWatch Pro</h1>
              <p className="text-sm text-cyan-300">{getPageTitle()}</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-6">
            {/* Gamification Stats */}
            {/* <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">Level {userStats.level}</span>
              </div>
              <div className="w-24">
                <Progress value={(userStats.xp / userStats.maxXp) * 100} className="h-2" />
              </div>
              <span className="text-xs text-slate-300">{userStats.xp}/{userStats.maxXp} XP</span>
            </div> */}

            {/* Achievements */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-white hover:text-yellow-400 transition-colors"
              onClick={() => {
                navigate('/insights');
                toast("Achievement Progress", {
                  description: `You have ${userStats.achievements} achievements unlocked!`
                });
              }}
            >
              {/* <Trophy className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-yellow-500 text-black">
                {userStats.achievements}
              </Badge> */}
            </Button>

            {/* System Status */}
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-700/50 rounded-lg">
              <Wifi className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-sm text-white">12 Buoys Online</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            </div>

            {/* Interactive Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-white hover:text-cyan-400 transition-colors"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 animate-bounce">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Settings */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-slate-300 transition-colors"
              onClick={handleSettingsClick}
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* Streak Counter */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-orange-500/20 rounded-lg">
              <Zap className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-orange-300">{userStats.streak} day streak</span>
            </div>

            {/* Last Update */}
            <div className="text-xs text-slate-400 hidden xl:block">
              Last Update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <AppSidebar />

        {/* Enhanced Main Content */}
        <main className="flex-1 pt-20 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}