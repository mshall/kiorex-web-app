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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  History,
  Clock3,
  CheckCircle2,
  X,
  FileText
} from "lucide-react";

const PatientAppointments = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';

  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      doctor: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      time: "10:00 AM", 
      date: "2024-01-20",
      type: "Video Call", 
      status: "confirmed",
      location: "Teleconsultation",
      duration: "30 min",
      reason: "Follow-up consultation",
      notes: "Discuss test results"
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Brown", 
      specialty: "General Medicine", 
      time: "02:30 PM", 
      date: "2024-01-22",
      type: "In-Person", 
      status: "pending",
      location: "City Medical Center, Room 205",
      duration: "45 min",
      reason: "Annual check-up",
      notes: "Bring previous test results"
    },
    { 
      id: 3, 
      doctor: "Dr. Emily White", 
      specialty: "Dermatology", 
      time: "11:15 AM", 
      date: "2024-01-18",
      type: "Video Call", 
      status: "completed",
      location: "Teleconsultation",
      duration: "20 min",
      reason: "Skin consultation",
      notes: "Prescription provided"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleJoinCall = (appointmentId: number) => {
    // Handle joining video call
    console.log('Joining call for appointment:', appointmentId);
  };

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  const handleRescheduleAppointment = (appointmentId: number) => {
    // Handle rescheduling
    console.log('Rescheduling appointment:', appointmentId);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchQuery.toLowerCase());
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

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? Video : MapPin;
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
          <p className="text-muted-foreground">Manage your medical appointments and consultations</p>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors or specialties..."
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
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Specialty</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
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
                      <SelectItem value="doctor1">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="doctor2">Dr. Michael Brown</SelectItem>
                      <SelectItem value="doctor3">Dr. Emily White</SelectItem>
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
                      <SelectItem value="inperson">In-Person</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Reason</Label>
                  <Input placeholder="Appointment reason" />
                </div>
                <Button className="w-full">Book Appointment</Button>
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
                  {filteredAppointments.map((appointment) => {
                    const TypeIcon = getTypeIcon(appointment.type);
                    return (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{appointment.doctor}</h3>
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
                              <p><strong>Specialty:</strong> {appointment.specialty}</p>
                              <p><strong>Type:</strong> {appointment.type}</p>
                            </div>
                            <div>
                              <p><strong>Date:</strong> {appointment.date}</p>
                              <p><strong>Time:</strong> {appointment.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="flex items-center">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {appointment.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.duration}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Reason:</strong> {appointment.reason}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          {appointment.status === 'confirmed' && appointment.type === 'Video Call' && (
                            <Button size="sm" onClick={() => handleJoinCall(appointment.id)}>
                              <Video className="w-3 h-3 mr-1" />
                              Join Call
                            </Button>
                          )}
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => handleRescheduleAppointment(appointment.id)}>
                                  <Edit className="w-3 h-3 mr-1" />
                                  Reschedule
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleCancelAppointment(appointment.id)}>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                          {appointment.status === 'completed' && (
                            <Button size="sm" variant="outline">
                              <Star className="w-3 h-3 mr-1" />
                              Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Scheduled</span>
                    <span className="font-semibold">{appointments.filter(apt => apt.status !== 'completed' && apt.status !== 'cancelled').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Week</span>
                    <span className="font-semibold text-blue-600">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Video Calls</span>
                    <span className="font-semibold text-green-600">
                      {appointments.filter(apt => apt.type === 'Video Call').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">In-Person</span>
                    <span className="font-semibold text-orange-600">
                      {appointments.filter(apt => apt.type === 'In-Person').length}
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
                    Book New Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Find Doctors
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Appointment with Dr. Johnson completed</span>
                    <span className="text-muted-foreground ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New appointment scheduled</span>
                    <span className="text-muted-foreground ml-auto">1 week ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Prescription refilled</span>
                    <span className="text-muted-foreground ml-auto">1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-6">
          {/* Today's Appointments */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search today's appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Select Doctor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-smith">Dr. Sarah Smith</SelectItem>
                        <SelectItem value="dr-johnson">Dr. Michael Johnson</SelectItem>
                        <SelectItem value="dr-brown">Dr. Emily Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Appointment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="in-person">In-Person Visit</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Book Appointment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock3 className="w-5 h-5 mr-2" />
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.filter(apt => apt.status === 'confirmed' || apt.status === 'scheduled').map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Specialty:</strong> {appointment.specialty}</p>
                          <p><strong>Time:</strong> {appointment.time}</p>
                        </div>
                        <div>
                          <p><strong>Duration:</strong> {appointment.duration}</p>
                          <p><strong>Location:</strong> {appointment.location}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Reason:</strong> {appointment.reason}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRescheduleAppointment(appointment.id)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCancelAppointment(appointment.id)}>
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                      {appointment.type === 'Video Call' && (
                        <Button size="sm" onClick={() => handleJoinCall(appointment.id)}>
                          <Video className="w-3 h-3 mr-1" />
                          Join Call
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {/* Completed Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Completed Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.filter(apt => apt.status === 'completed').map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">Completed</Badge>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Specialty:</strong> {appointment.specialty}</p>
                          <p><strong>Date:</strong> {appointment.date}</p>
                        </div>
                        <div>
                          <p><strong>Time:</strong> {appointment.time}</p>
                          <p><strong>Duration:</strong> {appointment.duration}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Prescription
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {/* Cancelled Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <X className="w-5 h-5 mr-2" />
                Cancelled Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.filter(apt => apt.status === 'cancelled').map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">Cancelled</Badge>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Specialty:</strong> {appointment.specialty}</p>
                          <p><strong>Date:</strong> {appointment.date}</p>
                        </div>
                        <div>
                          <p><strong>Time:</strong> {appointment.time}</p>
                          <p><strong>Duration:</strong> {appointment.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientAppointments;
