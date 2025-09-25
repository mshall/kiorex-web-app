import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  MessageSquare, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Video,
  MapPin,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

const ClinicAppointments = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      doctor: "Dr. Smith", 
      time: "09:00 AM", 
      date: "2024-01-16",
      type: "Consultation", 
      status: "confirmed",
      phone: "+1-555-0123",
      email: "sarah.j@email.com",
      reason: "Follow-up consultation",
      duration: "30 min"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      doctor: "Dr. Johnson", 
      time: "10:30 AM", 
      date: "2024-01-16",
      type: "Check-up", 
      status: "pending",
      phone: "+1-555-0124",
      email: "m.brown@email.com",
      reason: "Annual physical",
      duration: "45 min"
    },
    { 
      id: 3, 
      patient: "Emily White", 
      doctor: "Dr. Brown", 
      time: "02:00 PM", 
      date: "2024-01-16",
      type: "Video Call", 
      status: "completed",
      phone: "+1-555-0125",
      email: "emily.w@email.com",
      reason: "Teleconsultation",
      duration: "20 min"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessagePatient = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'destructive'; // Orange color using destructive variant
      case 'completed': return 'default'; // Green color using default variant
      case 'cancelled': return 'destructive'; // Red color using destructive variant
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Appointment Management</h1>
          <p className="text-muted-foreground">Manage all clinic appointments and patient communications</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients or doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient1">Sarah Johnson</SelectItem>
                      <SelectItem value="patient2">Michael Brown</SelectItem>
                      <SelectItem value="patient3">Emily White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor1">Dr. Smith</SelectItem>
                      <SelectItem value="doctor2">Dr. Johnson</SelectItem>
                      <SelectItem value="doctor3">Dr. Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="checkup">Check-up</SelectItem>
                      <SelectItem value="videocall">Video Call</SelectItem>
                      <SelectItem value="procedure">Procedure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Reason</Label>
                  <Input placeholder="Appointment reason" />
                </div>
                <Button className="w-full">Create Appointment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Appointments ({filteredAppointments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <Badge 
                            variant={getStatusColor(appointment.status)}
                            className={
                              appointment.status === 'pending' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                              appointment.status === 'completed' ? 'bg-green-500 hover:bg-green-600 text-white' :
                              appointment.status === 'cancelled' ? 'bg-red-500 hover:bg-red-600 text-white' :
                              ''
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Doctor:</strong> {appointment.doctor}</p>
                            <p><strong>Type:</strong> {appointment.type}</p>
                          </div>
                          <div>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Duration:</strong> {appointment.duration}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Reason:</strong> {appointment.reason}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleCallPatient(appointment.phone)}>
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleMessagePatient(appointment.email)}>
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Select value={appointment.status} onValueChange={(value) => handleStatusChange(appointment.id, value)}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Appointments</span>
                    <span className="font-semibold">{appointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confirmed</span>
                    <span className="font-semibold text-green-600">
                      {appointments.filter(apt => apt.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-semibold text-yellow-600">
                      {appointments.filter(apt => apt.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold text-blue-600">
                      {appointments.filter(apt => apt.status === 'completed').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Patients
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Manage Staff
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

export default ClinicAppointments;
