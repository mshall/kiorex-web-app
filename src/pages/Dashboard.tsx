import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
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
  ArrowUp,
  ArrowDown,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const [notifications] = useState([
    { id: 1, title: "Appointment Reminder", message: "Dr. Smith consultation in 30 minutes", time: "2 min ago", type: "warning" },
    { id: 2, title: "Lab Results Ready", message: "Your blood test results are available", time: "1 hour ago", type: "info" },
    { id: 3, title: "Medication Reminder", message: "Time to take your prescribed medication", time: "3 hours ago", type: "success" }
  ]);

  const [appointments] = useState([
    { id: 1, doctor: "Dr. Emily Smith", specialty: "Cardiology", time: "2:30 PM", status: "upcoming", type: "Video Call" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "General Medicine", time: "Tomorrow 10:00 AM", status: "scheduled", type: "In-Person" },
    { id: 3, doctor: "Dr. Sarah Johnson", specialty: "Dermatology", time: "Next Week", status: "pending", type: "Video Call" }
  ]);

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-muted-foreground">Here's your health overview for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Appointment</p>
                  <p className="text-2xl font-bold text-primary">2:30 PM</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-2xl font-bold text-secondary">72 BPM</p>
                  <div className="flex items-center text-sm text-success">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    Normal
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-2xl font-bold text-info">120/80</p>
                  <div className="flex items-center text-sm text-success">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    Optimal
                  </div>
                </div>
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Steps Today</p>
                  <p className="text-2xl font-bold text-accent">8,542</p>
                  <div className="flex items-center text-sm text-success">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    85% of goal
                  </div>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled medical consultations</CardDescription>
                </div>
                <Button variant="medical" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {appointment.doctor.split(' ')[1][0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.doctor}</p>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{appointment.time}</span>
                            {appointment.type === "Video Call" && (
                              <Badge variant="secondary" className="text-xs">
                                <Video className="w-3 h-3 mr-1" />
                                Video
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointment.status === "upcoming" && (
                          <Button variant="medical" size="sm">Join Call</Button>
                        )}
                        {appointment.status === "scheduled" && (
                          <Button variant="outline" size="sm">View Details</Button>
                        )}
                        {appointment.status === "pending" && (
                          <Button variant="ghost" size="sm">Reschedule</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Track your vital signs and health trends</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vitals">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="vitals">Vitals</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="sleep">Sleep</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="vitals" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Heart Rate</span>
                          <Heart className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-primary">72 BPM</div>
                        <div className="text-sm text-success">Normal range</div>
                      </div>
                      <div className="p-4 bg-gradient-secondary/5 rounded-lg border border-secondary/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Blood Oxygen</span>
                          <Activity className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="text-2xl font-bold text-secondary">98%</div>
                        <div className="text-sm text-success">Excellent</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4 mt-6">
                    <div className="text-center text-muted-foreground">
                      Activity tracking chart would go here
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sleep" className="space-y-4 mt-6">
                    <div className="text-center text-muted-foreground">
                      Sleep analysis would go here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Health Assistant */}
            <Card className="border-gradient-primary/20 bg-gradient-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-white/50 rounded-lg">
                    <p className="text-sm">Your sleep quality has improved by 15% this week. Consider maintaining your current bedtime routine.</p>
                  </div>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <p className="text-sm">Based on your activity levels, you might benefit from adding 10 minutes of meditation daily.</p>
                  </div>
                  <Button variant="medical" size="sm" className="w-full">
                    Get Personalized Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'warning' ? 'bg-warning' :
                        notification.type === 'info' ? 'bg-info' : 'bg-success'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
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
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                    <Calendar className="w-4 h-4 mb-1" />
                    <span className="text-xs">Book Appointment</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                    <Pill className="w-4 h-4 mb-1" />
                    <span className="text-xs">Order Medicine</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                    <FileText className="w-4 h-4 mb-1" />
                    <span className="text-xs">View Records</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                    <Video className="w-4 h-4 mb-1" />
                    <span className="text-xs">Start Video Call</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;