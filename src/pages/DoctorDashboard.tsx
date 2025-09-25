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
  MapPin
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
      </div>
    </div>
  );
};

export default DoctorDashboard;