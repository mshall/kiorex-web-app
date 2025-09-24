import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Activity, 
  Users, 
  DollarSign,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Target,
  Brain,
  Zap,
  Award,
  AlertCircle,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  const metrics = [
    {
      title: "Total Patients",
      value: "15,842",
      change: "+12%",
      trend: "up",
      timeframe: "this month",
      icon: Users,
      color: "primary"
    },
    {
      title: "Active Consultations",
      value: "3,456",
      change: "+8%",
      trend: "up",
      timeframe: "this week",
      icon: Activity,
      color: "secondary"
    },
    {
      title: "Revenue (MTD)",
      value: "$485K",
      change: "+15%",
      trend: "up",
      timeframe: "vs target",
      icon: DollarSign,
      color: "accent"
    },
    {
      title: "Satisfaction Score",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      timeframe: "points",
      icon: Award,
      color: "success"
    }
  ];

  const healthMetrics = [
    {
      title: "Average Recovery Time",
      value: "12.3 days",
      change: "-2.1 days",
      trend: "down",
      benchmark: "Industry: 14.5 days"
    },
    {
      title: "Treatment Success Rate",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      benchmark: "Target: 92%"
    },
    {
      title: "Readmission Rate",
      value: "3.4%",
      change: "-0.7%",
      trend: "down",
      benchmark: "National avg: 4.1%"
    },
    {
      title: "Patient Adherence",
      value: "87.9%",
      change: "+5.2%",
      trend: "up",
      benchmark: "Previous: 82.7%"
    }
  ];

  const aiInsights = [
    {
      title: "Predictive Risk Alert",
      description: "15 patients identified with high cardiovascular risk based on recent vitals",
      priority: "high",
      actionable: true,
      icon: AlertCircle
    },
    {
      title: "Seasonal Trend Analysis",
      description: "Respiratory complaints expected to increase by 25% in next 2 weeks",
      priority: "medium",
      actionable: true,
      icon: Brain
    },
    {
      title: "Efficiency Opportunity",
      description: "Appointment scheduling can be optimized to reduce wait times by 18%",
      priority: "low",
      actionable: true,
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Kiorex
                </span>
              </div>
              <span className="text-muted-foreground">Analytics Dashboard</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Healthcare Analytics Dashboard 📊</h1>
            <p className="text-muted-foreground">Real-time insights and predictive analytics</p>
          </div>
          
          <div className="flex space-x-2">
            {["24h", "7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={timeRange === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="group hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className={`flex items-center text-sm ${
                        metric.trend === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {metric.change} {metric.timeframe}
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-${metric.color}/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-6 h-6 text-${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
            <TabsTrigger value="clinical">Clinical Outcomes</TabsTrigger>
            <TabsTrigger value="financial">Financial Reports</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Volume Trends</CardTitle>
                  <CardDescription>Daily patient visits over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-primary/5 rounded-lg flex items-center justify-center border border-primary/20">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold text-primary">Patient Volume Chart</p>
                      <p className="text-sm text-muted-foreground">Interactive chart showing daily/weekly/monthly views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Revenue breakdown by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-accent/5 rounded-lg flex items-center justify-center border border-accent/20">
                    <div className="text-center">
                      <DollarSign className="w-16 h-16 text-accent mx-auto mb-4" />
                      <p className="text-lg font-semibold text-accent">Revenue Breakdown</p>
                      <p className="text-sm text-muted-foreground">Service categories, payment methods, trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Activity Feed</CardTitle>
                <CardDescription>Live updates from across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New appointment booked</p>
                      <p className="text-xs text-muted-foreground">Dr. Smith - Sarah Johnson - 2:30 PM</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lab results uploaded</p>
                      <p className="text-xs text-muted-foreground">Patient ID: PAT-001 - Blood work completed</p>
                    </div>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Inventory alert</p>
                      <p className="text-xs text-muted-foreground">Medication stock running low - Paracetamol</p>
                    </div>
                    <span className="text-xs text-muted-foreground">12 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demographics</CardTitle>
                  <CardDescription>Patient age and gender distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-secondary/5 rounded-lg flex items-center justify-center border border-secondary/20">
                    <div className="text-center">
                      <Users className="w-12 h-12 text-secondary mx-auto mb-2" />
                      <p className="text-sm font-medium text-secondary">Demographics Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Patient locations and coverage areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-info/5 rounded-lg flex items-center justify-center border border-info/20">
                    <div className="text-center">
                      <Target className="w-12 h-12 text-info mx-auto mb-2" />
                      <p className="text-sm font-medium text-info">Geographic Map</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Patterns</CardTitle>
                  <CardDescription>Booking trends and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-primary/5 rounded-lg flex items-center justify-center border border-primary/20">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-primary">Booking Patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clinical" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {healthMetrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{metric.title}</h3>
                      <div className={`flex items-center text-sm ${
                        metric.trend === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">{metric.value}</div>
                    <p className="text-sm text-muted-foreground">{metric.benchmark}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Clinical Outcomes Dashboard</CardTitle>
                <CardDescription>Treatment success rates and patient outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-success/5 rounded-lg flex items-center justify-center border border-success/20">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-success mx-auto mb-4" />
                    <p className="text-lg font-semibold text-success">Clinical Outcomes Analytics</p>
                    <p className="text-sm text-muted-foreground">Treatment success rates, recovery times, readmission rates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Streams</CardTitle>
                  <CardDescription>Income by service category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consultations</span>
                      <span className="font-semibold">$245K (50%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Procedures</span>
                      <span className="font-semibold">$146K (30%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lab Tests</span>
                      <span className="font-semibold">$73K (15%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pharmacy</span>
                      <span className="font-semibold">$24K (5%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Analysis</CardTitle>
                  <CardDescription>Payment methods and collection rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Insurance</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cash/Card</span>
                      <span className="font-semibold">24%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Digital Payments</span>
                      <span className="font-semibold">8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Operational expenses breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Staff Salaries</span>
                      <span className="font-semibold">$186K (45%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Equipment</span>
                      <span className="font-semibold">$83K (20%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Supplies</span>
                      <span className="font-semibold">$62K (15%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overhead</span>
                      <span className="font-semibold">$83K (20%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6 mt-6">
            <div className="grid gap-6">
              <Card className="border-gradient-primary/20 bg-gradient-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-primary" />
                    AI-Powered Health Insights
                  </CardTitle>
                  <CardDescription>
                    Machine learning analytics and predictive health insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => {
                      const IconComponent = insight.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            insight.priority === "high" ? "bg-destructive/10" :
                            insight.priority === "medium" ? "bg-warning/10" : "bg-info/10"
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              insight.priority === "high" ? "text-destructive" :
                              insight.priority === "medium" ? "text-warning" : "text-info"
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold">{insight.title}</h4>
                              <Badge 
                                variant={
                                  insight.priority === "high" ? "destructive" :
                                  insight.priority === "medium" ? "default" : "secondary"
                                }
                                className="text-xs"
                              >
                                {insight.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                            {insight.actionable && (
                              <Button variant="outline" size="sm">
                                Take Action
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Health Analytics</CardTitle>
                    <CardDescription>AI-powered risk predictions and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-primary/5 rounded-lg flex items-center justify-center border border-primary/20">
                      <div className="text-center">
                        <Brain className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-primary">AI Risk Predictions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Treatment Recommendations</CardTitle>
                    <CardDescription>Evidence-based treatment suggestions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-secondary/5 rounded-lg flex items-center justify-center border border-secondary/20">
                      <div className="text-center">
                        <Target className="w-12 h-12 text-secondary mx-auto mb-2" />
                        <p className="text-sm font-medium text-secondary">AI Recommendations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;