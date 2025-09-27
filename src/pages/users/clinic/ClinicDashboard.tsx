import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Building2, // For clinic management
  UserCheck, // For staff management
  DollarSign, // For billing
  Phone, // For patient contact
  MessageSquare,
  Stethoscope,
  TrendingUp,
  Clock3,
  Shield,
  MapPin,
  Star,
  UserPlus,
  CheckCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

const ClinicDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [appointments] = useState([
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "9:00 AM", status: "confirmed", type: "consultation" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", time: "10:30 AM", status: "upcoming", type: "follow-up" },
    { id: 3, patient: "Emily White", doctor: "Dr. Brown", time: "2:00 PM", status: "completed", type: "check-up" },
  ]);

  const [staff] = useState([
    { id: 1, name: "Dr. Smith", role: "Cardiologist", status: "active", patients: 45 },
    { id: 2, name: "Dr. Johnson", role: "General Medicine", status: "active", patients: 32 },
    { id: 3, name: "Dr. Brown", role: "Pediatrician", status: "on-leave", patients: 28 },
  ]);

  const [patients] = useState([
    { id: 1, name: "John Doe", lastVisit: "2024-01-10", status: "active", phone: "+1-555-0123" },
    { id: 2, name: "Jane Smith", lastVisit: "2024-01-08", status: "active", phone: "+1-555-0124" },
    { id: 3, name: "Emily White", lastVisit: "2024-01-05", status: "inactive", phone: "+1-555-0125" },
  ]);

  const quickActions = [
    { title: 'New Appointment', icon: Plus, action: () => console.log('New Appointment') },
    { title: 'Manage Staff', icon: UserCheck, action: () => console.log('Manage Staff') },
    { title: 'Patient Contact', icon: Phone, action: () => console.log('Patient Contact') },
    { title: 'View Analytics', icon: BarChart3, action: () => console.log('View Analytics') },
  ];

  // Helper functions for status display
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return CheckCircle;
      case 'upcoming':
        return Clock;
      case 'completed':
        return CheckCircle2;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500 text-white border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 hover:text-white/90 transition-all duration-200';
      case 'upcoming':
        return 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 hover:text-white/90 transition-all duration-200';
      case 'completed':
        return 'bg-green-500 text-white border-green-500 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/50 hover:text-white/90 transition-all duration-200';
      case 'cancelled':
        return 'bg-red-500 text-white border-red-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 hover:text-white/90 transition-all duration-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-200/50 hover:text-gray-800/90 transition-all duration-200';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Clinic Manager! 👋</h1>
          <p className="text-muted-foreground">Your clinic management overview for today.</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Today's Appointments */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> Today's Appointments
              </CardTitle>
              <CardDescription>Overview of scheduled appointments and status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Patient</th>
                      <th className="text-left p-3 font-medium">Doctor</th>
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-muted/25">
                        <td className="p-3 font-medium">{appointment.patient}</td>
                        <td className="p-3">{appointment.doctor}</td>
                        <td className="p-3">{appointment.time}</td>
                        <td className="p-3">{appointment.type}</td>
                        <td className="p-3">
                          <Badge className={`flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                            {(() => {
                              const StatusIcon = getStatusIcon(appointment.status);
                              return <StatusIcon className="w-3 h-3" />;
                            })()}
                            <span className="capitalize">{appointment.status}</span>
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button variant="link" className="mt-4 px-0" onClick={() => navigate('/clinic-appointments', { state: { userType: 'clinic', providerType: 'Clinic' } })}>View All Appointments</Button>
            </CardContent>
          </Card>


          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Management & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" /> Patient Management
              </CardTitle>
              <CardDescription>Contact patients and manage relationships.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">Last visit: {patient.lastVisit}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View All Patients</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" /> Clinic Analytics
              </CardTitle>
              <CardDescription>Key performance metrics and insights.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-green-600">$45,230</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-blue-600">89%</p>
                  <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-orange-600">24</p>
                  <p className="text-sm text-muted-foreground">Appointments Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;
