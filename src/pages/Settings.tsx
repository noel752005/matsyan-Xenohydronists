import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Wifi,
  Save,
  RefreshCw,
  Download,
  Upload,
  Moon,
  Sun,
  Monitor,
  MapPin,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // General Settings
    organizationName: "Marine IoT Solutions",
    contactEmail: "admin@marineiot.com",
    timezone: "UTC-5",
    language: "English",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    criticalAlerts: true,
    maintenanceReminders: true,
    weeklyReports: false,
    
    // Display Settings
    darkMode: false,
    compactView: false,
    autoRefresh: true,
    refreshInterval: 30,
    
    // Data Settings
    dataRetention: 365,
    autoBackup: true,
    backupFrequency: "daily",
    exportFormat: "csv",
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 60,
    requirePasswordChange: true,
    
    // System Settings
    maxConcurrentUsers: 50,
    apiRateLimit: 1000,
    logLevel: "info"
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
      variant: "destructive"
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your settings configuration is being exported.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your marine monitoring system preferences and options
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="hover-scale">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button variant="outline" onClick={handleExport} className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="marine" onClick={handleSave} className="hover-scale">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <Card className="ocean-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={settings.organizationName}
                onChange={(e) => updateSetting("organizationName", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting("contactEmail", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => updateSetting("timezone", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={settings.language}
                onChange={(e) => updateSetting("language", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="ocean-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser notifications</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Critical Alerts</Label>
                <p className="text-sm text-muted-foreground">Immediate emergency notifications</p>
              </div>
              <Switch
                checked={settings.criticalAlerts}
                onCheckedChange={(checked) => updateSetting("criticalAlerts", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Reminders</Label>
                <p className="text-sm text-muted-foreground">Scheduled maintenance alerts</p>
              </div>
              <Switch
                checked={settings.maintenanceReminders}
                onCheckedChange={(checked) => updateSetting("maintenanceReminders", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Automated weekly summaries</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="ocean-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Display & Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
              </div>
              <Switch
                checked={settings.compactView}
                onCheckedChange={(checked) => updateSetting("compactView", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Refresh</Label>
                <p className="text-sm text-muted-foreground">Automatically update data</p>
              </div>
              <Switch
                checked={settings.autoRefresh}
                onCheckedChange={(checked) => updateSetting("autoRefresh", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="refreshInterval">Refresh Interval (seconds)</Label>
              <Input
                id="refreshInterval"
                type="number"
                value={settings.refreshInterval}
                onChange={(e) => updateSetting("refreshInterval", parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="ocean-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="retention">Data Retention (days)</Label>
              <Input
                id="retention"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => updateSetting("dataRetention", parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatic data backups</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSetting("autoBackup", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backupFreq">Backup Frequency</Label>
              <Input
                id="backupFreq"
                value={settings.backupFrequency}
                onChange={(e) => updateSetting("backupFrequency", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exportFormat">Export Format</Label>
              <Input
                id="exportFormat"
                value={settings.exportFormat}
                onChange={(e) => updateSetting("exportFormat", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="ocean-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Enhanced login security</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting("sessionTimeout", parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Password Change</Label>
                <p className="text-sm text-muted-foreground">Force periodic password updates</p>
              </div>
              <Switch
                checked={settings.requirePasswordChange}
                onCheckedChange={(checked) => updateSetting("requirePasswordChange", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="ocean-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Concurrent Users</Label>
              <Input
                id="maxUsers"
                type="number"
                value={settings.maxConcurrentUsers}
                onChange={(e) => updateSetting("maxConcurrentUsers", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rateLimit">API Rate Limit (requests/hour)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => updateSetting("apiRateLimit", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logLevel">Log Level</Label>
              <Input
                id="logLevel"
                value={settings.logLevel}
                onChange={(e) => updateSetting("logLevel", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="ocean-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Current System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="default" className="animate-pulse">Online</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Last backup: 2 hours ago</p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">API Services</span>
                <Badge variant="default" className="animate-pulse">Healthy</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Response time: 45ms</p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Data Processing</span>
                <Badge variant="secondary" className="animate-pulse">Processing</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Queue: 23 items</p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">System Load</span>
                <Badge variant="default" className="animate-pulse">Normal</Badge>
              </div>
              <p className="text-xs text-muted-foreground">CPU: 34% | Memory: 58%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}