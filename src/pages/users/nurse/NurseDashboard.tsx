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
  Shield,
  ClipboardList,
  UserCheck,
  Clock3,
  Zap
} from "lucide-react";

const NurseDashboard = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'nurse';
  const providerType = location.state?.providerType || 'Nurse';
  
  const [todayTasks] = useState([
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      task: "Vital signs check", 
      time: "09:00 AM", 
      priority: "high",
      status: "pending"
    },
    { 
      id: 2, 
      patient: "Mike Wilson", 
      task: "Medication administration", 
      time: "10:30 AM", 
      priority: "medium",
      status: "pending"
    },
    { 
      id: 3, 
      patient: "Emily Davis", 
      task: "Wound care assessment", 
      time: "02:00 PM", 
      priority: "high",
      status: "completed"
    }
  ]);

  const [patientCare] = useState([
    { patient: "Sarah Johnson", condition: "Hypertension", lastVisit: "2 hours ago", nextTask: "Blood pressure check" },
    { patient: "Mike Wilson", condition: "Diabetes", lastVisit: "4 hours ago", nextTask: "Glucose monitoring" },
    { patient: "Emily Davis", condition: "Post-surgical", lastVisit: "1 hour ago", nextTask: "Incision assessment" }
  ]);

  const [healthMetrics] = useState([
    { metric: "Patients Monitored", value: "24", change: "+3", trend: "up", icon: Users },
    { metric: "Tasks Completed", value: "18", change: "+5", trend: "up", icon: CheckCircle },
    { metric: "Critical Alerts", value: "2", change: "-1", trend: "down", icon: AlertCircle },
    { metric: "Care Hours", value: "8.5", change: "+1.2", trend: "up", icon: Clock }
  ]);

  const [recentActivities] = useState([
    { action: "Completed vital signs for Sarah Johnson", time: "15 min ago", type: "task" },
    { action: "Updated care plan for Mike Wilson", time: "1 hour ago", type: "care" },
    { action: "Received new patient assignment", time: "2 hours ago", type: "assignment" },
    { action: "Medication administered to Emily Davis", time: "3 hours ago", type: "medication" }
  ]);

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {providerType}! 👩‍⚕️
          </h1>
          <p className="text-muted-foreground">You have 3 care tasks scheduled for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      {metric.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ml-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2" />
                  Today's Care Tasks
                </CardTitle>
                <CardDescription>
                  Manage your patient care responsibilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <h4 className="font-medium">{task.patient}</h4>
                          <p className="text-sm text-muted-foreground">{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                          {task.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {task.status === 'completed' ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Care Overview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Patient Care Overview
                </CardTitle>
                <CardDescription>
                  Current patient assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientCare.map((patient, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{patient.patient}</h4>
                        <Badge variant="outline">{patient.condition}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Last visit: {patient.lastVisit}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next: {patient.nextTask}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                Your latest care activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {activity.type === 'task' && <CheckCircle className="w-4 h-4 text-primary" />}
                      {activity.type === 'care' && <Heart className="w-4 h-4 text-primary" />}
                      {activity.type === 'assignment' && <Users className="w-4 h-4 text-primary" />}
                      {activity.type === 'medication' && <Pill className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common nursing tasks and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <ClipboardList className="w-6 h-6 mb-2" />
                  <span className="text-sm">Vital Signs</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Pill className="w-6 h-6 mb-2" />
                  <span className="text-sm">Medications</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="text-sm">Care Notes</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <AlertCircle className="w-6 h-6 mb-2" />
                  <span className="text-sm">Alerts</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
