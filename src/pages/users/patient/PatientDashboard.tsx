import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { useRTL } from "@/hooks/useRTL";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  ArrowUp,
  ArrowDown,
  Sparkles,
  Stethoscope,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Timer,
  User,
  Shield,
  ShoppingCart,
  Microscope,
  Home,
  MessageCircle,
  Camera,
  Download,
  Upload,
  Eye
} from "lucide-react";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();
  const [notifications] = useState([
    { id: 1, title: "Appointment Reminder", message: "Dr. Smith consultation in 30 minutes", time: "2 min ago", type: "warning", unread: true },
    { id: 2, title: "Lab Results Ready", message: "Your blood test results are available", time: "1 hour ago", type: "info", unread: true },
    { id: 3, title: "Medication Reminder", message: "Time to take your prescribed medication", time: "3 hours ago", type: "success", unread: false },
    { id: 4, title: "Prescription Ready", message: "Your prescription is ready for pickup", time: "5 hours ago", type: "info", unread: false }
  ]);

  const [appointments] = useState([
    { id: 1, doctor: "Dr. Emily Smith", specialty: "Cardiology", time: "2:30 PM", date: "Today", status: "upcoming", type: "Video Call", duration: "30 min" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "General Medicine", time: "10:00 AM", date: "Tomorrow", status: "scheduled", type: "In-Person", duration: "45 min" },
    { id: 3, doctor: "Dr. Sarah Johnson", specialty: "Dermatology", time: "3:00 PM", date: "Dec 28", status: "pending", type: "Video Call", duration: "20 min" }
  ]);

  const [recentConsultations] = useState([
    { id: 1, doctor: "Dr. Lisa Wang", specialty: "Pediatrics", date: "Dec 20, 2024", status: "completed", prescription: true, notes: "Follow-up in 2 weeks" },
    { id: 2, doctor: "Dr. James Wilson", specialty: "Orthopedics", date: "Dec 15, 2024", status: "completed", prescription: false, notes: "X-ray scheduled" }
  ]);

  const [quickActions] = useState([
    { title: "Book Appointment", icon: Calendar, color: "primary", action: () => navigate('/search/doctors') },
    { title: "Doctor Now", icon: Video, color: "secondary", action: () => navigate('/doctor-on-demand') },
    { title: "Order Medicine", icon: Pill, color: "accent", action: () => navigate('/pharmacy') },
    { title: "Lab Tests", icon: Microscope, color: "info", action: () => navigate('/marketplace/lab-tests') },
    { title: "Upload Records", icon: Upload, color: "warning", action: () => navigate('/medical-records') },
    { title: "Emergency", icon: AlertCircle, color: "destructive", action: () => navigate('/emergency') }
  ]);

  const [healthMetrics] = useState({
    heartRate: { value: 72, unit: "BPM", status: "normal", trend: "up" },
    bloodPressure: { value: "120/80", unit: "mmHg", status: "optimal", trend: "stable" },
    weight: { value: 68, unit: "kg", status: "healthy", trend: "down" },
    steps: { value: 8542, unit: "steps", status: "good", trend: "up" }
  });

  const [upcomingTasks] = useState([
    { id: 1, title: "Take morning medication", time: "8:00 AM", completed: true },
    { id: 2, title: "Blood pressure check", time: "6:00 PM", completed: false },
    { id: 3, title: "Exercise routine", time: "7:00 PM", completed: false }
  ]);

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName="Patient User" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard.welcome')}, {t('auth.patient')}! 👋</h1>
          <p className="text-muted-foreground">Here's your comprehensive health overview</p>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
            <TabsTrigger value="appointments">{t('navigation.appointments')}</TabsTrigger>
            <TabsTrigger value="health">{t('navigation.health')}</TabsTrigger>
            <TabsTrigger value="records">{t('navigation.records')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-300 group" onClick={action.action}>
              <CardContent className="pt-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform ${
                  action.color === 'primary' ? 'bg-primary/10' :
                  action.color === 'secondary' ? 'bg-secondary/10' :
                  action.color === 'accent' ? 'bg-accent/10' :
                  action.color === 'info' ? 'bg-info/10' :
                  action.color === 'warning' ? 'bg-warning/10' :
                  'bg-destructive/10'
                }`}>
                  <action.icon className={`w-6 h-6 ${
                    action.color === 'primary' ? 'text-primary' :
                    action.color === 'secondary' ? 'text-secondary' :
                    action.color === 'accent' ? 'text-accent' :
                    action.color === 'info' ? 'text-info' :
                    action.color === 'warning' ? 'text-warning' :
                    'text-destructive'
                  }`} />
                </div>
                <p className="text-sm font-medium">{action.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-2xl font-bold text-primary">{healthMetrics.heartRate.value} {healthMetrics.heartRate.unit}</p>
                  <div className="flex items-center text-sm text-success">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    Normal
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-2xl font-bold text-secondary">{healthMetrics.bloodPressure.value}</p>
                  <div className="flex items-center text-sm text-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Optimal
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="text-2xl font-bold text-info">{healthMetrics.weight.value} {healthMetrics.weight.unit}</p>
                  <div className="flex items-center text-sm text-success">
                    <ArrowDown className="w-3 h-3 mr-1" />
                    Healthy
                  </div>
                </div>
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Steps Today</p>
                  <p className="text-2xl font-bold text-accent">{healthMetrics.steps.value.toLocaleString()}</p>
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
                <Button variant="medical" size="sm" onClick={() => navigate('/search/doctors')}>
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
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{appointment.date} at {appointment.time}</span>
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
                          <Button variant="medical" size="sm" onClick={() => navigate('/consultation')}>
                            Join Call
                          </Button>
                        )}
                        {appointment.status === "scheduled" && (
                          <Button variant="outline" size="sm" onClick={() => navigate('/appointment-details')}>
                            View Details
                          </Button>
                        )}
                        {appointment.status === "pending" && (
                          <Button variant="ghost" size="sm" onClick={() => navigate('/reschedule')}>
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Consultations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>Your completed medical consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{consultation.doctor}</p>
                          <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                          <p className="text-xs text-muted-foreground">{consultation.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {consultation.prescription && (
                          <Badge variant="secondary" className="text-xs">
                            <Pill className="w-3 h-3 mr-1" />
                            Prescription
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" onClick={() => navigate('/consultation-summary')}>
                          View Summary
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Health Analytics</CardTitle>
                <CardDescription>Track your health trends and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vitals">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="vitals">Vitals</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="vitals" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Heart Rate Trend</span>
                          <Heart className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-primary">72 BPM</div>
                        <div className="text-sm text-success">Normal range</div>
                      </div>
                      <div className="p-4 bg-gradient-secondary/5 rounded-lg border border-secondary/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Blood Pressure</span>
                          <Activity className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="text-2xl font-bold text-secondary">120/80</div>
                        <div className="text-sm text-success">Optimal</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4 mt-6">
                    <div className="text-center text-muted-foreground">
                      Activity tracking charts and insights would be displayed here
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medications" className="space-y-4 mt-6">
                    <div className="text-center text-muted-foreground">
                      Medication adherence tracking would be displayed here
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
                  <Button variant="medical" size="sm" className="w-full" onClick={() => navigate('/ai-health-insights')}>
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
                  {notifications.slice(0, 3).map((notification) => (
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
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/notifications')}>
                    View All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Health Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          task.completed ? 'bg-success border-success' : 'border-muted-foreground'
                        }`}>
                          {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{task.time}</p>
                        </div>
                      </div>
                      <Timer className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col" onClick={() => navigate('/medical-records')}>
                    <FileText className="w-4 h-4 mb-1" />
                    <span className="text-xs">Medical Records</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col" onClick={() => navigate('/prescriptions')}>
                    <Pill className="w-4 h-4 mb-1" />
                    <span className="text-xs">Prescriptions</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col" onClick={() => navigate('/lab-results')}>
                    <Microscope className="w-4 h-4 mb-1" />
                    <span className="text-xs">Lab Results</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex-col" onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mb-1" />
                    <span className="text-xs">Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
          {/* Appointments Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Recent Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{consultation.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                        <p className="text-sm text-muted-foreground mt-1">{consultation.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Completed</Badge>
                        {consultation.prescription && (
                          <Badge variant="secondary">Prescription</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          {/* Health Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Heart Rate</p>
                    <p className="text-2xl font-bold text-primary">{healthMetrics.heartRate.value}</p>
                    <p className="text-sm text-muted-foreground">{healthMetrics.heartRate.unit}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    <p className="text-2xl font-bold text-primary">{healthMetrics.bloodPressure.value}</p>
                    <p className="text-sm text-muted-foreground">{healthMetrics.bloodPressure.unit}</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-2xl font-bold text-primary">{healthMetrics.weight.value}</p>
                    <p className="text-sm text-muted-foreground">{healthMetrics.weight.unit}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Steps Today</p>
                    <p className="text-2xl font-bold text-primary">{healthMetrics.steps.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{healthMetrics.steps.unit}</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox checked={task.completed} />
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.time}</p>
                      </div>
                    </div>
                    <Badge variant={task.completed ? 'default' : 'secondary'}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          {/* Records Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Medical Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Blood Test Results</h3>
                      <p className="text-sm text-muted-foreground">December 15, 2024</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">X-Ray Report</h3>
                      <p className="text-sm text-muted-foreground">December 10, 2024</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Prescription History</h3>
                      <p className="text-sm text-muted-foreground">December 8, 2024</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Metformin</h3>
                      <p className="text-sm text-muted-foreground">500mg - Twice daily</p>
                      <p className="text-sm text-muted-foreground">Dr. Smith</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Lisinopril</h3>
                      <p className="text-sm text-muted-foreground">10mg - Once daily</p>
                      <p className="text-sm text-muted-foreground">Dr. Johnson</p>
                    </div>
                    <Badge variant="default">Active</Badge>
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

export default PatientDashboard;
