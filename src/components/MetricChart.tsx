import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Activity, ArrowUpRight, Maximize2 } from "lucide-react";

interface DataPoint {
  time: string;
  value: number;
  label?: string;
}

interface MetricChartProps {
  title: string;
  data: DataPoint[];
  unit?: string;
  color?: string;
  type?: "line" | "area";
  interactive?: boolean;
}

export function MetricChart({ 
  title, 
  data, 
  unit = "", 
  color = "hsl(var(--primary))",
  type = "line",
  interactive = false
}: MetricChartProps) {
  // Calculate trend
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const trend = lastValue > firstValue ? "up" : lastValue < firstValue ? "down" : "stable";
  const trendPercentage = firstValue !== 0 ? (((lastValue - firstValue) / firstValue) * 100).toFixed(1) : "0";

  // Calculate additional metrics
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const avgValue = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-border rounded-lg p-4 shadow-xl">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-lg font-bold text-foreground">
            {payload[0].value}{unit}
          </p>
          <div className="text-xs text-muted-foreground mt-1">
            Avg: {avgValue}{unit} | Max: {maxValue}{unit}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`group transition-all duration-300 hover:shadow-2xl ${
      interactive ? 'cursor-pointer hover:-translate-y-1 hover:scale-105' : ''
    } bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 hover:border-primary/50`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
            <Activity className="h-6 w-6" />
            {title}
            {interactive && (
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </CardTitle>
          <div className="flex items-center gap-4">
            {trend === "up" ? (
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            ) : trend === "down" ? (
              <TrendingDown className="h-5 w-5 text-red-500" />
            ) : (
              <Activity className="h-5 w-5 text-yellow-500" />
            )}
            <span className={`text-sm font-bold ${
              trend === "up" ? "text-emerald-500" : 
              trend === "down" ? "text-red-500" : "text-yellow-500"
            }`}>
              {trend === "up" ? "+" : trend === "down" ? "-" : ""}{Math.abs(parseFloat(trendPercentage))}%
            </span>
          </div>
        </div>
        
        {/* Enhanced metrics display */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Current</p>
            <p className="text-lg font-bold">{lastValue}{unit}</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-lg font-bold">{avgValue}{unit}</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Peak</p>
            <p className="text-lg font-bold">{maxValue}{unit}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            {type === "area" ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`colorGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  fill={`url(#colorGradient-${title})`}
                  dot={{ fill: color, strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: color, strokeWidth: 3, fill: "white" }}
                />
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  dot={{ fill: color, strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: color, strokeWidth: 3, fill: "white" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
          
          {interactive && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" className="bg-white/80 dark:bg-slate-800/80">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {interactive && (
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button variant="outline" className="w-full">
              View Detailed Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}