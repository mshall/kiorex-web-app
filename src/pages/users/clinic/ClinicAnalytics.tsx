import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Star,
  Activity,
  Heart,
  Download,
  RefreshCw
} from "lucide-react";

const ClinicAnalytics = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [timeRange, setTimeRange] = useState('30days');

  const analyticsData = {
    overview: {
      totalPatients: 1247,
      totalAppointments: 3421,
      totalRevenue: 125430,
      avgRating: 4.8,
      patientGrowth: 12.5,
      appointmentGrowth: 8.3,
      revenueGrowth: 15.2,
      ratingGrowth: 2.1
    },
    patientMetrics: [
      { metric: "New Patients", value: 89, change: "+15%", trend: "up" },
      { metric: "Returning Patients", value: 156, change: "+8%", trend: "up" },
      { metric: "Patient Retention", value: "87%", change: "+3%", trend: "up" },
      { metric: "Avg Visit Frequency", value: "2.3/month", change: "+0.2", trend: "up" }
    ],
    appointmentMetrics: [
      { metric: "Total Appointments", value: 3421, change: "+8%", trend: "up" },
      { metric: "Completed", value: 3245, change: "+7%", trend: "up" },
      { metric: "Cancelled", value: 89, change: "-12%", trend: "down" },
      { metric: "No Shows", value: 87, change: "-5%", trend: "down" }
    ],
    revenueMetrics: [
      { metric: "Monthly Revenue", value: "$125,430", change: "+15%", trend: "up" },
      { metric: "Avg Revenue/Patient", value: "$101", change: "+8%", trend: "up" },
      { metric: "Collection Rate", value: "94%", change: "+2%", trend: "up" },
      { metric: "Outstanding Amount", value: "$7,520", change: "-18%", trend: "down" }
    ],
    staffPerformance: [
      { name: "Dr. Smith", patients: 245, rating: 4.9, revenue: 45230 },
      { name: "Dr. Johnson", patients: 189, rating: 4.7, revenue: 32100 },
      { name: "Dr. Brown", patients: 156, rating: 4.8, revenue: 28900 },
      { name: "Dr. Wilson", patients: 134, rating: 4.6, revenue: 19200 }
    ],
    expenseMetrics: [
      { metric: "Staff Salaries", value: "$45,200", change: "+5%", trend: "up" },
      { metric: "Clinic Bills", value: "$8,500", change: "+12%", trend: "up" },
      { metric: "Inventory Materials", value: "$3,200", change: "-8%", trend: "down" },
      { metric: "Total Expenses", value: "$56,900", change: "+6%", trend: "up" }
    ]
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Clinic Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into clinic performance and metrics</p>
          </div>
          <div className="flex space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-primary">{analyticsData.overview.totalPatients.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{analyticsData.overview.patientGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.overview.totalAppointments.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{analyticsData.overview.appointmentGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${analyticsData.overview.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{analyticsData.overview.revenueGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{analyticsData.overview.avgRating}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{analyticsData.overview.ratingGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Patient Metrics</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.patientMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Age Groups</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">18-30</span>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">31-50</span>
                        <span className="text-sm font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">51-70</span>
                        <span className="text-sm font-semibold">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">70+</span>
                        <span className="text-sm font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Gender Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Female</span>
                        <span className="text-sm font-semibold">58%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Male</span>
                        <span className="text-sm font-semibold">42%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Insurance Types</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Private</span>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Medicare</span>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Medicaid</span>
                        <span className="text-sm font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.appointmentMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                      <div className="flex items-center">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Service Types</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Consultations</span>
                        <span className="text-sm font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Follow-ups</span>
                        <span className="text-sm font-semibold">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Check-ups</span>
                        <span className="text-sm font-semibold">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Procedures</span>
                        <span className="text-sm font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Appointment Methods</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">In-Person</span>
                        <span className="text-sm font-semibold">70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Video Call</span>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Phone Call</span>
                        <span className="text-sm font-semibold">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.revenueMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Payment Methods</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Credit Card</span>
                        <span className="text-sm font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Insurance</span>
                        <span className="text-sm font-semibold">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cash</span>
                        <span className="text-sm font-semibold">20%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Revenue Sources</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Consultations</span>
                        <span className="text-sm font-semibold">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Procedures</span>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Lab Tests</span>
                        <span className="text-sm font-semibold">15%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Monthly Trends</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Jan</span>
                        <span className="text-sm font-semibold">$98,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Feb</span>
                        <span className="text-sm font-semibold">$112,300</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Mar</span>
                        <span className="text-sm font-semibold">$125,430</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.expenseMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                        )}
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Staff Salaries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Monthly</span>
                      <span className="font-semibold">$45,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average per Staff</span>
                      <span className="font-semibold">$9,040</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Growth</span>
                      <span className="text-red-600 font-semibold">+5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Clinic Bills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Utilities</span>
                      <span className="font-semibold">$2,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rent</span>
                      <span className="font-semibold">$4,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Insurance</span>
                      <span className="font-semibold">$2,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium">Total</span>
                      <span className="font-semibold">$8,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Inventory Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medical Supplies</span>
                      <span className="font-semibold">$1,800</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Equipment</span>
                      <span className="font-semibold">$900</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medications</span>
                      <span className="font-semibold">$500</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium">Total</span>
                      <span className="font-semibold">$3,200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyticsData.staffPerformance.map((staff, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{staff.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{staff.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Patients</p>
                          <p className="text-xl font-semibold">{staff.patients}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-xl font-semibold">${staff.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(staff.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Performance</span>
                        <span>{Math.round((staff.rating / 5) * 100)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClinicAnalytics;
