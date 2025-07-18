import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DivideIcon as LucideIcon } from "lucide-react";
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: "online" | "warning" | "offline";
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  buoyId?: string;
  interactive?: boolean;
  route?: string;
}

export function SensorCard({
  title,
  value,
  unit,
  status,
  icon: Icon,
  trend,
  trendValue,
  buoyId,
  interactive = false,
  route,
}: SensorCardProps) {
  const statusColors = {
    online: "bg-emerald-500",
    warning: "bg-yellow-500",
    offline: "bg-red-500",
  };

  const statusBadgeColors = {
    online: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
    warning: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    offline: "bg-red-500/20 text-red-600 border-red-500/30",
  };

  const trendColors = {
    up: "text-emerald-500",
    down: "text-red-500",
    stable: "text-yellow-500",
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3" />;
      case "down": return <TrendingDown className="h-3 w-3" />;
      default: return <Minus className="h-3 w-3" />;
    }
  };

  return (
    <Card className={`group transition-all duration-300 hover:shadow-xl ${
      interactive ? 'cursor-pointer hover:-translate-y-2 hover:scale-105' : ''
    } bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 hover:border-primary/50`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]} ${
            status === 'online' ? 'animate-pulse' : ''
          }`} />
          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          {interactive && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
            {value}
          </span>
          {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
        </div>
        
        <div className="flex items-center justify-between">
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trendColors[trend]}`}>
              {getTrendIcon()}
              <span>{trendValue}</span>
            </div>
          )}
          
          <Badge className={`text-xs font-medium ${statusBadgeColors[status]}`}>
            {status.toUpperCase()}
          </Badge>
        </div>

        {buoyId && (
          <Badge variant="outline" className="text-xs">
            {buoyId}
          </Badge>
        )}

        {/* Status indicator bar */}
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              status === 'online' ? 'bg-emerald-500 w-full' :
              status === 'warning' ? 'bg-yellow-500 w-3/4' :
              'bg-red-500 w-1/4'
            }`} 
          />
        </div>

        {interactive && (
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}