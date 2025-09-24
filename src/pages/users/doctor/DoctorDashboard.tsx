import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Heart, 
  Activity, 
  Users, 
  Clock,
  Video,
  FileText,
  Pill,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Building2, // For clinic management
  DollarSign, // For revenue
  TrendingUp, // For analytics
  Eye, // For view details
  Stethoscope, // For medical tools
  Star, // For ratings
  ArrowRight // For navigation
} from "lucide-react";
import { Input } from "@/components/ui/input";

const DoctorDashboard = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'doctor'; // Get userType from state or default to 'doctor'
  const providerType = location.state?.providerType || 'Doctor'; // Get providerType from state
  
  const [todayAppointments] = useState([
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      time: "09:00 AM", 
      type: "Video Call", 
      reason: "Follow-up consultation",
      status: "confirmed",
      duration: "30 min"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      time: "10:30 AM", 
      type: "In-Person", 
      reason: "Initial consultation",
      status: "checked-in",
      duration: "45 min"
    },
    { 
      id: 3, 
      patient: "Emily Davis", 
      time: "02:00 PM", 
      type: "Video Call", 
      reason: "Lab result review",
      status: "upcoming",
      duration: "20 min"
    }
  ]);

  const [patients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      age: 45,
      lastVisit: "Dec 10, 2024",
      condition: "Hypertension",
      status: "stable",
      phone: "(555) 123-4567",
      email: "sarah.j@email.com"
    },
    {
      id: 2,
      name: "Michael Brown",
      age: 32,
      lastVisit: "Dec 8, 2024",
      condition: "Diabetes Type 2",
      status: "monitoring",
      phone: "(555) 987-6543",
      email: "m.brown@email.com"
    }
  ]);

  const [pendingTasks] = useState([
    { id: 1, task: "Review lab results for Sarah Johnson", priority: "high", dueTime: "11:00 AM" },
    { id: 2, task: "Complete prescription refill for Michael Brown", priority: "medium", dueTime: "2:00 PM" },
    { id: 3, task: "Follow up on Emily Davis treatment plan", priority: "low", dueTime: "Tomorrow" }
  ]);

  const [clinics] = useState([
    { id: 1, name: "City Heart Center", location: "New York, NY", patients: 245, rating: 4.8, status: "active" },
    { id: 2, name: "Metro Medical Clinic", location: "Brooklyn, NY", patients: 189, rating: 4.6, status: "active" },
    { id: 3, name: "Downtown Health Center", location: "Manhattan, NY", patients: 156, rating: 4.9, status: "active" }
  ]);

  const [revenueData] = useState([
    { id: 1, patient: "Sarah Johnson", service: "Consultation", amount: 150, date: "2024-01-15", status: "completed", clinic: "City Heart Center" },
    { id: 2, patient: "Michael Brown", service: "Follow-up", amount: 120, date: "2024-01-15", status: "completed", clinic: "Metro Medical Clinic" },
    { id: 3, patient: "Emily Davis", service: "Teleconsultation", amount: 100, date: "2024-01-14", status: "pending", clinic: "Downtown Health Center" },
    { id: 4, patient: "John Smith", service: "Procedure", amount: 350, date: "2024-01-14", status: "completed", clinic: "City Heart Center" }
  ]);

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName="Dr. Provider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {providerType}! 👨‍⚕️
          </h1>
          <p className="text-muted-foreground">You have 3 appointments scheduled today</p>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clinics">Clinics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-sm text-success">1 checked in</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                  <p className="text-2xl font-bold text-secondary">156</p>
                  <p className="text-sm text-info">12 new this month</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-bold text-warning">3</p>
                  <p className="text-sm text-warning">1 high priority</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                  <p className="text-2xl font-bold text-accent">$24.5K</p>
                  <p className="text-sm text-success">+8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Monday, December 16, 2024</CardDescription>
                </div>
                <Button variant="medical" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {appointment.patient.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.time} ({appointment.duration})
                            </div>
                            <Badge variant={appointment.type === "Video Call" ? "secondary" : "outline"} className="text-xs">
                              {appointment.type === "Video Call" ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <MapPin className="w-3 h-3 mr-1" />
                              )}
                              {appointment.type}
                            </Badge>
                            <Badge 
                              variant={
                                appointment.status === "checked-in" ? "default" :
                                appointment.status === "confirmed" ? "secondary" : "outline"
                              }
                              className="text-xs"
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === "checked-in" && (
                          <Button variant="medical" size="sm">Start Consultation</Button>
                        )}
                        {appointment.status === "upcoming" && appointment.type === "Video Call" && (
                          <Button variant="medical" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                        <Button variant="outline" size="sm">View Chart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Patient Management</CardTitle>
                  <CardDescription>Recent and active patients</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years old • {patient.condition}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Last visit: {patient.lastVisit}
                            </span>
                            <Badge 
                              variant={patient.status === "stable" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {patient.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">View Chart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-warning" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium">{task.task}</p>
                        <Badge 
                          variant={
                            task.priority === "high" ? "destructive" :
                            task.priority === "medium" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Due: {task.dueTime}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Write Prescription
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Order Lab Test
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Refer Patient
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Appointments Completed</span>
                    <span className="text-sm font-semibold">0/3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Consultation Time</span>
                    <span className="text-sm font-semibold">-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Patient Satisfaction</span>
                    <span className="text-sm font-semibold">4.9★</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasks Completed</span>
                    <span className="text-sm font-semibold">0/3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="clinics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Clinics Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" /> My Clinics
                  </CardTitle>
                  <CardDescription>Manage your clinic affiliations and patient load.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clinics.map((clinic) => (
                      <div key={clinic.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{clinic.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {clinic.location}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm">{clinic.patients} patients</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm">{clinic.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-3 h-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Clinic Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Clinic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">3</p>
                      <p className="text-sm text-muted-foreground">Active Clinics</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">590</p>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">4.8</p>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" /> Revenue Details
                  </CardTitle>
                  <CardDescription>Detailed transaction history and earnings breakdown.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{transaction.patient}</h3>
                          <p className="text-sm text-muted-foreground">{transaction.service} • {transaction.clinic}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${transaction.amount}</p>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                          <Button size="sm" variant="link" className="p-0 h-auto">
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Full Revenue Report
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Revenue Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">$720</p>
                      <p className="text-sm text-muted-foreground">Today's Earnings</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">$5,240</p>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">$18,650</p>
                      <p className="text-sm text-muted-foreground">This Month</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">87%</p>
                      <p className="text-sm text-muted-foreground">Collection Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" /> Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">4.9</p>
                      <p className="text-sm text-muted-foreground">Patient Rating</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">156</p>
                      <p className="text-sm text-muted-foreground">Active Patients</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">24</p>
                      <p className="text-sm text-muted-foreground">Hours/Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" /> Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">+12%</p>
                      <p className="text-sm text-muted-foreground">Patient Growth</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">+8%</p>
                      <p className="text-sm text-muted-foreground">Revenue Growth</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">+15%</p>
                      <p className="text-sm text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" /> Service Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">45%</p>
                      <p className="text-sm text-muted-foreground">Consultations</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">30%</p>
                      <p className="text-sm text-muted-foreground">Follow-ups</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">25%</p>
                      <p className="text-sm text-muted-foreground">Procedures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" /> Patient Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">78%</p>
                      <p className="text-sm text-muted-foreground">Retention Rate</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">2.3</p>
                      <p className="text-sm text-muted-foreground">Avg Visits/Month</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">15min</p>
                      <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;