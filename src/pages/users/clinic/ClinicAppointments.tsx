import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import ProfessionalCalendar from "@/components/ProfessionalCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Video, 
  Filter, 
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Edit
} from "lucide-react";

const ClinicAppointments = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientId: "P001",
      date: "2024-01-15",
      time: "09:00 AM",
      type: "Video Call",
      status: "confirmed",
      specialty: "Cardiology",
      clinic: "Main Clinic",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      reason: "Follow-up consultation",
      notes: "Patient reports improvement in symptoms",
      duration: "30 minutes"
    },
    {
      id: 2,
      patientName: "Michael Brown",
      patientId: "P002",
      date: "2024-01-15",
      time: "10:30 AM",
      type: "In-Person",
      status: "pending",
      specialty: "General Medicine",
      clinic: "Downtown Clinic",
      phone: "+1 (555) 234-5678",
      email: "michael.brown@email.com",
      reason: "Annual checkup",
      notes: "First time patient",
      duration: "45 minutes"
    },
    {
      id: 3,
      patientName: "Emily Davis",
      patientId: "P003",
      date: "2024-01-15",
      time: "02:00 PM",
      type: "Video Call",
      status: "completed",
      specialty: "Dermatology",
      clinic: "No Clinic",
      phone: "+1 (555) 345-6789",
      email: "emily.davis@email.com",
      reason: "Skin condition consultation",
      notes: "Prescribed topical treatment",
      duration: "20 minutes"
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      patientId: "P004",
      date: "2024-01-16",
      time: "11:00 AM",
      type: "In-Person",
      status: "cancelled",
      specialty: "Neurology",
      clinic: "Main Clinic",
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@email.com",
      reason: "Headache evaluation",
      notes: "Patient cancelled due to emergency",
      duration: "30 minutes"
    },
    {
      id: 5,
      patientName: "Lisa Rodriguez",
      patientId: "P005",
      date: "2024-01-16",
      time: "03:30 PM",
      type: "Video Call",
      status: "confirmed",
      specialty: "Pediatrics",
      clinic: "Children's Clinic",
      phone: "+1 (555) 567-8901",
      email: "lisa.rodriguez@email.com",
      reason: "Child vaccination",
      notes: "Routine immunization schedule",
      duration: "25 minutes"
    },
    {
      id: 6,
      patientName: "David Chen",
      patientId: "P006",
      date: "2024-01-17",
      time: "08:30 AM",
      type: "In-Person",
      status: "pending",
      specialty: "Orthopedics",
      clinic: "Sports Medicine Center",
      phone: "+1 (555) 678-9012",
      email: "david.chen@email.com",
      reason: "Knee injury follow-up",
      notes: "Post-surgery rehabilitation",
      duration: "40 minutes"
    },
    {
      id: 7,
      patientName: "Maria Garcia",
      patientId: "P007",
      date: "2024-01-17",
      time: "01:15 PM",
      type: "Video Call",
      status: "completed",
      specialty: "Gynecology",
      clinic: "Women's Health Center",
      phone: "+1 (555) 789-0123",
      email: "maria.garcia@email.com",
      reason: "Prenatal checkup",
      notes: "Second trimester examination",
      duration: "35 minutes"
    },
    {
      id: 8,
      patientName: "James Taylor",
      patientId: "P008",
      date: "2024-01-18",
      time: "10:00 AM",
      type: "In-Person",
      status: "confirmed",
      specialty: "Urology",
      clinic: "Main Clinic",
      phone: "+1 (555) 890-1234",
      email: "james.taylor@email.com",
      reason: "Prostate screening",
      notes: "Annual preventive care",
      duration: "30 minutes"
    },
    {
      id: 9,
      patientName: "Jennifer Lee",
      patientId: "P009",
      date: "2024-01-18",
      time: "04:45 PM",
      type: "Video Call",
      status: "pending",
      specialty: "Psychiatry",
      clinic: "Mental Health Center",
      phone: "+1 (555) 901-2345",
      email: "jennifer.lee@email.com",
      reason: "Therapy session",
      notes: "Weekly counseling appointment",
      duration: "50 minutes"
    },
    {
      id: 10,
      patientName: "Thomas Anderson",
      patientId: "P010",
      date: "2024-01-19",
      time: "02:30 PM",
      type: "In-Person",
      status: "cancelled",
      specialty: "Ophthalmology",
      clinic: "Eye Care Center",
      phone: "+1 (555) 012-3456",
      email: "thomas.anderson@email.com",
      reason: "Eye exam",
      notes: "Patient rescheduled for next week",
      duration: "45 minutes"
    }
  ];

  // Quick stats - merged from both appointments and calendar
  const stats = {
    // Appointments stats
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    // Calendar stats
    todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    completedToday: appointments.filter(a => a.date === new Date().toISOString().split('T')[0] && a.status === 'completed').length,
    totalAppointments: appointments.length,
    videoCalls: appointments.filter(a => a.type === 'Video Call').length,
    inPersonVisits: appointments.filter(a => a.type === 'In-Person').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return AlertCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call': return Video;
      case 'In-Person': return MapPin;
      default: return Calendar;
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.clinic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = dateFilter === 'all' || appointment.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination logic
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedAppointments,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredAppointments,
    initialPage: 1,
    initialItemsPerPage: 5
  });

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessagePatient = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Appointment Management</h1>
          <p className="text-muted-foreground">Manage all clinic appointments and patient communications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search patients, specialties, or clinics..."
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
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="2024-01-15">Today</SelectItem>
                      <SelectItem value="2024-01-16">Tomorrow</SelectItem>
                      <SelectItem value="2024-01-17">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Appointments Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Appointments ({filteredAppointments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Clinic</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAppointments.map((appointment) => {
                        const StatusIcon = getStatusIcon(appointment.status);
                        const TypeIcon = getTypeIcon(appointment.type);
                        
                        return (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{appointment.patientName}</p>
                                  <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{appointment.date}</p>
                                <p className="text-sm text-muted-foreground">{appointment.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <TypeIcon className="w-4 h-4" />
                                <span>{appointment.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>{appointment.specialty}</TableCell>
                            <TableCell>
                              <Badge variant={appointment.clinic === "No Clinic" ? "secondary" : "default"}>
                                {appointment.clinic}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(appointment.status)} className="flex items-center space-x-1">
                                <StatusIcon className="w-3 h-3" />
                                <span className="capitalize">{appointment.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMessagePatient(appointment.email)}
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Message
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedAppointment(appointment)}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Appointment Details</DialogTitle>
                                    </DialogHeader>
                                    {selectedAppointment && (
                                      <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h4 className="font-semibold mb-2">Patient Information</h4>
                                            <div className="space-y-2">
                                              <p><span className="text-muted-foreground">Name:</span> {selectedAppointment.patientName}</p>
                                              <p><span className="text-muted-foreground">ID:</span> {selectedAppointment.patientId}</p>
                                              <p><span className="text-muted-foreground">Phone:</span> {selectedAppointment.phone}</p>
                                              <p><span className="text-muted-foreground">Email:</span> {selectedAppointment.email}</p>
                                            </div>
                                          </div>
                                          <div>
                                            <h4 className="font-semibold mb-2">Appointment Details</h4>
                                            <div className="space-y-2">
                                              <p><span className="text-muted-foreground">Date:</span> {selectedAppointment.date}</p>
                                              <p><span className="text-muted-foreground">Time:</span> {selectedAppointment.time}</p>
                                              <p><span className="text-muted-foreground">Type:</span> {selectedAppointment.type}</p>
                                              <p><span className="text-muted-foreground">Duration:</span> {selectedAppointment.duration}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-semibold mb-2">Medical Information</h4>
                                          <div className="space-y-2">
                                            <p><span className="text-muted-foreground">Specialty:</span> {selectedAppointment.specialty}</p>
                                            <p><span className="text-muted-foreground">Clinic:</span> {selectedAppointment.clinic}</p>
                                            <p><span className="text-muted-foreground">Reason:</span> {selectedAppointment.reason}</p>
                                            <p><span className="text-muted-foreground">Notes:</span> {selectedAppointment.notes}</p>
                                          </div>
                                        </div>
                                        <div className="flex space-x-2">
                                          <Button 
                                            variant="outline" 
                                            onClick={() => handleCallPatient(selectedAppointment.phone)}
                                          >
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call Patient
                                          </Button>
                                          <Button 
                                            variant="outline" 
                                            onClick={() => handleMessagePatient(selectedAppointment.email)}
                                          >
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Send Message
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Select value={appointment.status} onValueChange={(value) => {
                                  // Handle status change
                                  const updatedAppointments = appointments.map(apt => 
                                    apt.id === appointment.id ? { ...apt, status: value } : apt
                                  );
                                  // Update appointments state here
                                }}>
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
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={[5, 10, 15, 20, 25]}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProfessionalCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClinicAppointments;
