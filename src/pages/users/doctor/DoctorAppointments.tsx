import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  ChevronRight
} from "lucide-react";

const DoctorAppointments = () => {
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();
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
    }
  ];

  // Quick stats
  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
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
    return type === 'Video Call' ? Video : MapPin;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesDate = dateFilter === "all" || appointment.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getDateOptions = () => {
    const dates = [...new Set(appointments.map(a => a.date))].sort();
    return dates.map(date => ({
      value: date,
      label: new Date(date).toLocaleDateString()
    }));
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType="doctor" userName="Dr. Smith" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('navigation.appointments')}</h1>
          <p className="text-muted-foreground">Manage your patient appointments and consultations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients or specialties..."
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
              {getDateOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Patient Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                {filteredAppointments.map((appointment) => {
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedAppointment(appointment)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
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
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Edit Appointment</Button>
                                  <Button>View Patient Record</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorAppointments;
