import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import ProfessionalCalendar from "@/components/ProfessionalCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Video,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

const ProfessionalCalendarPage = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'doctor';
  const providerType = location.state?.providerType || 'Doctor';

  const getRoleDisplayName = () => {
    switch (userType) {
      case 'doctor': return 'Doctor';
      case 'nurse': return 'Nurse';
      case 'clinic': return 'Clinic';
      case 'pharmacy': return 'Pharmacy';
      default: return 'Professional';
    }
  };

  const getRoleColor = () => {
    switch (userType) {
      case 'doctor': return 'text-blue-600';
      case 'nurse': return 'text-green-600';
      case 'clinic': return 'text-orange-600';
      case 'pharmacy': return 'text-purple-600';
      default: return 'text-primary';
    }
  };

  // Sample statistics for the calendar overview
  const stats = {
    totalAppointments: 24,
    todayAppointments: 6,
    completedToday: 4,
    pendingToday: 2,
    videoCalls: 12,
    inPersonVisits: 10,
    phoneCalls: 2
  };

  const recentAppointments = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      time: '09:00 AM',
      type: 'video',
      status: 'completed',
      duration: '30 min'
    },
    {
      id: '2',
      patientName: 'Michael Brown',
      time: '10:30 AM',
      type: 'in-person',
      status: 'completed',
      duration: '45 min'
    },
    {
      id: '3',
      patientName: 'Emily Davis',
      time: '02:00 PM',
      type: 'video',
      status: 'upcoming',
      duration: '30 min'
    },
    {
      id: '4',
      patientName: 'Robert Wilson',
      time: '03:30 PM',
      type: 'in-person',
      status: 'upcoming',
      duration: '60 min'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-600" />;
      case 'in-person': return <MapPin className="w-4 h-4 text-green-600" />;
      case 'phone': return <Phone className="w-4 h-4 text-purple-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getRoleDisplayName()} Calendar
          </h1>
          <p className="text-muted-foreground">
            Manage your appointments and schedule efficiently
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-primary">{stats.todayAppointments}</p>
                  <p className="text-sm text-success">{stats.completedToday} completed</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total This Month</p>
                  <p className="text-2xl font-bold text-secondary">{stats.totalAppointments}</p>
                  <p className="text-sm text-muted-foreground">appointments</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Video Calls</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.videoCalls}</p>
                  <p className="text-sm text-muted-foreground">this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In-Person Visits</p>
                  <p className="text-2xl font-bold text-green-600">{stats.inPersonVisits}</p>
                  <p className="text-sm text-muted-foreground">this month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProfessionalCalendar
                  userType={userType}
                  userName={providerType}
                  appointments={[]}
                />
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(appointment.status)}
                        <div>
                          <h3 className="font-semibold text-sm">{appointment.patientName}</h3>
                          <p className="text-xs text-muted-foreground">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(appointment.type)}
                        <Badge 
                          variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed Today</span>
                    <span className="font-semibold text-green-600">{stats.completedToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Today</span>
                    <span className="font-semibold text-yellow-600">{stats.pendingToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Video Calls</span>
                    <span className="font-semibold text-blue-600">{stats.videoCalls}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">In-Person</span>
                    <span className="font-semibold text-green-600">{stats.inPersonVisits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phone Calls</span>
                    <span className="font-semibold text-purple-600">{stats.phoneCalls}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Monday</span>
                    <Badge variant="outline">8 appointments</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Tuesday</span>
                    <Badge variant="outline">6 appointments</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Wednesday</span>
                    <Badge variant="outline">10 appointments</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Thursday</span>
                    <Badge variant="outline">7 appointments</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Friday</span>
                    <Badge variant="outline">5 appointments</Badge>
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

export default ProfessionalCalendarPage;
