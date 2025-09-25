import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { useRTL } from "@/hooks/useRTL";
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
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();

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
      notes: "Follow-up consultation"
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Brown", 
      specialty: "Dermatology", 
      time: "2:30 PM", 
      date: "2024-01-22",
      type: "In-Person", 
      status: "pending",
      location: "Main Clinic",
      notes: "Skin examination"
    },
    { 
      id: 3, 
      doctor: "Dr. Emily White", 
      specialty: "General Medicine", 
      time: "9:00 AM", 
      date: "2024-01-25",
      type: "Video Call", 
      status: "confirmed",
      location: "Teleconsultation",
      notes: "Annual checkup"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? Video : MapPin;
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('navigation.appointments')}</h1>
          <p className="text-muted-foreground">{t('dashboard.manageAppointments')}</p>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">{t('appointments.upcoming')}</TabsTrigger>
            <TabsTrigger value="today">{t('appointments.today')}</TabsTrigger>
            <TabsTrigger value="completed">{t('appointments.completed')}</TabsTrigger>
            <TabsTrigger value="cancelled">{t('appointments.cancelled')}</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('appointments.searchDoctors')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('appointments.filterByStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('appointments.allStatus')}</SelectItem>
                <SelectItem value="confirmed">{t('appointments.confirmed')}</SelectItem>
                <SelectItem value="pending">{t('appointments.pending')}</SelectItem>
                <SelectItem value="completed">{t('appointments.completed')}</SelectItem>
                <SelectItem value="cancelled">{t('appointments.cancelled')}</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('appointments.bookAppointment')}
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('appointments.bookAppointment')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('health.specialty')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('appointments.selectSpecialty')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">{t('health.cardiology')}</SelectItem>
                      <SelectItem value="dermatology">{t('health.dermatology')}</SelectItem>
                      <SelectItem value="general">{t('health.generalMedicine')}</SelectItem>
                      <SelectItem value="neurology">{t('health.neurology')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('auth.doctor')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('appointments.selectDoctor')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor1">{t('common.dr')} Sarah Johnson</SelectItem>
                      <SelectItem value="doctor2">{t('common.dr')} Michael Brown</SelectItem>
                      <SelectItem value="doctor3">{t('common.dr')} Emily White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('common.date')}</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>{t('common.time')}</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div>
                  <Label>{t('common.type')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('appointments.selectType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inperson">{t('appointments.inPerson')}</SelectItem>
                      <SelectItem value="video">{t('appointments.videoCall')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('appointments.appointmentReason')}</Label>
                  <Input placeholder={t('appointments.appointmentReason')} />
                </div>
                <Button className="w-full">{t('appointments.bookAppointment')}</Button>
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
                                  className="ml-2"
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                              <p className="text-sm text-muted-foreground mb-1">{appointment.specialty}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                {appointment.time} • {appointment.date}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <TypeIcon className="w-4 h-4 mr-1" />
                                {appointment.type} • {appointment.location}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                    <CardTitle className="flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Quick Actions
                    </CardTitle>
              </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule New
                  </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <History className="w-4 h-4 mr-2" />
                      View History
                  </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Records
                  </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock3 className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Appointment confirmed</span>
                        <span className="text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                      <div className="flex items-center justify-between text-sm">
                    <span>Prescription refilled</span>
                    <span className="text-muted-foreground ml-auto">1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-6">
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No appointments today</h3>
              <p className="text-muted-foreground">You don't have any appointments scheduled for today.</p>
            </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No completed appointments</h3>
              <p className="text-muted-foreground">Your completed appointments will appear here.</p>
              </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
            <div className="text-center py-8">
              <X className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No cancelled appointments</h3>
              <p className="text-muted-foreground">Your cancelled appointments will appear here.</p>
              </div>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientAppointments;