import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, BarChart3 } from "lucide-react";

const insights = [
  {
    type: "prediction",
    title: "Weather Pattern Analysis",
    description: "Based on current sensor data, weather models predict increased wave activity in the next 6-8 hours across sectors 4-7.",
    confidence: 87,
    impact: "medium",
    action: "Recommend adjusting buoy sensitivity settings and preparing maintenance crews.",
    timestamp: "2 minutes ago"
  },
  {
    type: "anomaly",
    title: "Temperature Anomaly Detection",
    description: "BOY-003 showing unusual temperature readings (3°C below average) compared to historical data and nearby buoys.",
    confidence: 94,
    impact: "high",
    action: "Investigate sensor calibration and check for potential hardware issues.",
    timestamp: "15 minutes ago"
  },
  {
    type: "optimization",
    title: "Energy Efficiency Opportunity",
    description: "Analysis suggests 12% energy savings possible by optimizing data transmission schedules during low-activity periods.",
    confidence: 78,
    impact: "low",
    action: "Implement adaptive transmission protocol for non-critical sensors.",
    timestamp: "1 hour ago"
  },
  {
    type: "trend",
    title: "Seasonal Migration Pattern",
    description: "Marine life activity correlation suggests optimal timing for reduced sensor sensitivity to minimize false readings.",
    confidence: 82,
    impact: "medium",
    action: "Schedule sensitivity adjustments for periods of high marine activity.",
    timestamp: "3 hours ago"
  }
];

const initialPredictions = [
  { metric: "Wave Height", current: "1.2m", predicted: "2.4m", timeframe: "Next 6h", trend: "up" },
  { metric: "Wind Speed", current: "11.2 km/h", predicted: "22.1 km/h", timeframe: "Next 4h", trend: "up" },
  { metric: "Temperature", current: "12.5°C", predicted: "21.8°C", timeframe: "Next 12h", trend: "down" },
  { metric: "System Load", current: "47%", predicted: "45%", timeframe: "Next 2h", trend: "down" },
];

export default function AIInsights() {
  const [predictions, setPredictions] = useState(initialPredictions);

  useEffect(() => {
    // Example sensor input data to send to the API
    const sensorInput = {
      humidity: 50,
      pressure: 1013,
      wind_direction: 180,
      solar_radiation: 200,
      prev_wave_height: 1.8,
      prev_wind_speed: 15.2,
      prev_temp: 22.5,
      system_cpu_usage: 67,
    };

    async function fetchPredictions() {
      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sensorInput),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch predictions");
        }
        const data = await response.json();

        const updatedPredictions = predictions.map((pred) => {
          let newPredicted = pred.predicted;
          let newTrend = pred.trend;

          if (pred.metric === "Wave Height" && data.wave_height !== undefined) {
            newPredicted = `${data.wave_height.toFixed(2)}m`;
            newTrend = data.wave_height > parseFloat(pred.current) ? "up" : "down";
          } else if (pred.metric === "Wind Speed" && data.wind_speed !== undefined) {
            newPredicted = `${data.wind_speed.toFixed(2)} km/h`;
            newTrend = data.wind_speed > parseFloat(pred.current) ? "up" : "down";
          } else if (pred.metric === "Temperature" && data.temperature !== undefined) {
            newPredicted = `${data.temperature.toFixed(2)}°C`;
            newTrend = data.temperature > parseFloat(pred.current) ? "up" : "down";
          } else if (pred.metric === "System Load" && data.system_load !== undefined) {
            newPredicted = `${data.system_load.toFixed(0)}%`;
            newTrend = data.system_load > parseFloat(pred.current) ? "up" : "down";
          }

          return {
            ...pred,
            predicted: newPredicted,
            trend: newTrend,
          };
        });

        setPredictions(updatedPredictions);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    }

    fetchPredictions();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction": return TrendingUp;
      case "anomaly": return AlertTriangle;
      case "optimization": return Target;
      case "trend": return BarChart3;
      default: return Lightbulb;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "low": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            AI-Powered Insights
          </h1>
          <p className="text-muted-foreground">Advanced analytics and predictions from your marine sensor network</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {insights.length} Active Insights
        </Badge>
      </div>

      {/* AI Analysis Summary */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            System Intelligence Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Continuous Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">15</div>
              <div className="text-sm text-muted-foreground">Data Sources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">3</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insights Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Latest Insights
          </h2>
          
          {insights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <Card key={index} className="ocean-card hover:shadow-wave transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                    <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{insight.timestamp}</div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold">{insight.confidence}%</span>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>Recommended Action:</strong></p>
                    <p className="text-sm text-muted-foreground">{insight.action}</p>
                  </div>
                  
                  <Button size="sm" variant="marine" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Predictions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Predictive Analytics
          </h2>
          
          <Card className="ocean-card">
            <CardHeader>
              <CardTitle>Environmental Forecasts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{prediction.metric}</span>
                    <Badge variant="outline" className="text-xs">
                      {prediction.timeframe}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <span className="ml-1 font-semibold">{prediction.current}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Predicted:</span>
                      <span className={`ml-1 font-semibold ${
                        prediction.trend === "up" ? "text-red-400" : "text-emerald-400"
                      }`}>
                        {prediction.trend === "up" ? "↗" : "↘"} {prediction.predicted}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Model Performance */}
          <Card className="ocean-card">
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weather Prediction</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="w-[94%] h-2 rounded-full bg-primary"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Anomaly Detection</span>
                  <span className="font-semibold">89%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="w-[89%] h-2 rounded-full bg-accent"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trend Analysis</span>
                  <span className="font-semibold">91%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="w-[91%] h-2 rounded-full bg-emerald-500"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}