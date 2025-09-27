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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
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
  FileText,
  ExternalLink
} from "lucide-react";

const PatientAppointments = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();

  const [appointments, setAppointments] = useState([
    // Confirmed appointments (15)
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", time: "10:00 AM", date: "2024-01-20", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Follow-up consultation" },
    { id: 2, doctor: "Dr. Michael Brown", specialty: "Dermatology", time: "2:30 PM", date: "2024-01-22", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "Skin examination" },
    { id: 3, doctor: "Dr. Emily White", specialty: "General Medicine", time: "9:00 AM", date: "2024-01-25", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Annual checkup" },
    { id: 4, doctor: "Dr. James Wilson", specialty: "Orthopedics", time: "11:30 AM", date: "2024-01-28", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "Knee examination" },
    { id: 5, doctor: "Dr. Lisa Garcia", specialty: "Neurology", time: "3:00 PM", date: "2024-01-30", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Headache consultation" },
    { id: 6, doctor: "Dr. Robert Lee", specialty: "Cardiology", time: "8:30 AM", date: "2024-02-02", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "Heart checkup" },
    { id: 7, doctor: "Dr. Maria Rodriguez", specialty: "Dermatology", time: "1:00 PM", date: "2024-02-05", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Mole examination" },
    { id: 8, doctor: "Dr. David Kim", specialty: "General Medicine", time: "10:15 AM", date: "2024-02-08", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "General checkup" },
    { id: 9, doctor: "Dr. Jennifer Taylor", specialty: "Pediatrics", time: "2:45 PM", date: "2024-02-10", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Child wellness visit" },
    { id: 10, doctor: "Dr. Christopher Moore", specialty: "Orthopedics", time: "9:45 AM", date: "2024-02-12", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "Back pain consultation" },
    { id: 11, doctor: "Dr. Amanda Clark", specialty: "Neurology", time: "4:00 PM", date: "2024-02-15", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Sleep disorder consultation" },
    { id: 12, doctor: "Dr. Kevin Anderson", specialty: "Cardiology", time: "11:00 AM", date: "2024-02-18", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "Stress test follow-up" },
    { id: 13, doctor: "Dr. Rachel Green", specialty: "Dermatology", time: "3:30 PM", date: "2024-02-20", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Acne treatment" },
    { id: 14, doctor: "Dr. Mark Thompson", specialty: "General Medicine", time: "8:00 AM", date: "2024-02-22", type: "In-Person", status: "confirmed", location: "Main Clinic", notes: "Diabetes management" },
    { id: 15, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", time: "1:30 PM", date: "2024-02-25", type: "Video Call", status: "confirmed", location: "Teleconsultation", notes: "Medication review" },
    
    // Upcoming appointments (15) - changed from pending
    { id: 16, doctor: "Dr. Michael Brown", specialty: "Dermatology", time: "10:30 AM", date: "2024-02-28", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Follow-up examination" },
    { id: 17, doctor: "Dr. Emily White", specialty: "General Medicine", time: "2:00 PM", date: "2024-03-02", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Blood pressure check" },
    { id: 18, doctor: "Dr. James Wilson", specialty: "Orthopedics", time: "9:15 AM", date: "2024-03-05", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Physical therapy consultation" },
    { id: 19, doctor: "Dr. Lisa Garcia", specialty: "Neurology", time: "3:45 PM", date: "2024-03-08", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Memory assessment" },
    { id: 20, doctor: "Dr. Robert Lee", specialty: "Cardiology", time: "11:45 AM", date: "2024-03-10", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Echocardiogram" },
    { id: 21, doctor: "Dr. Maria Rodriguez", specialty: "Dermatology", time: "1:15 PM", date: "2024-03-12", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Skin cancer screening" },
    { id: 22, doctor: "Dr. David Kim", specialty: "General Medicine", time: "8:45 AM", date: "2024-03-15", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Vaccination appointment" },
    { id: 23, doctor: "Dr. Jennifer Taylor", specialty: "Pediatrics", time: "4:30 PM", date: "2024-03-18", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Growth monitoring" },
    { id: 24, doctor: "Dr. Christopher Moore", specialty: "Orthopedics", time: "10:00 AM", date: "2024-03-20", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Joint injection" },
    { id: 25, doctor: "Dr. Amanda Clark", specialty: "Neurology", time: "2:30 PM", date: "2024-03-22", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Seizure management" },
    { id: 26, doctor: "Dr. Kevin Anderson", specialty: "Cardiology", time: "9:30 AM", date: "2024-03-25", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Holter monitor review" },
    { id: 27, doctor: "Dr. Rachel Green", specialty: "Dermatology", time: "3:00 PM", date: "2024-03-28", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Psoriasis treatment" },
    { id: 28, doctor: "Dr. Mark Thompson", specialty: "General Medicine", time: "7:30 AM", date: "2024-03-30", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Annual physical" },
    { id: 29, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", time: "12:00 PM", date: "2024-04-02", type: "Video Call", status: "upcoming", location: "Teleconsultation", notes: "Medication adjustment" },
    { id: 30, doctor: "Dr. Michael Brown", specialty: "Dermatology", time: "1:45 PM", date: "2024-04-05", type: "In-Person", status: "upcoming", location: "Main Clinic", notes: "Biopsy results" },
    
    // Completed appointments (15)
    { id: 31, doctor: "Dr. Emily White", specialty: "General Medicine", time: "9:00 AM", date: "2024-01-15", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Cold symptoms consultation" },
    { id: 32, doctor: "Dr. James Wilson", specialty: "Orthopedics", time: "2:15 PM", date: "2024-01-18", type: "In-Person", status: "completed", location: "Main Clinic", notes: "X-ray review" },
    { id: 33, doctor: "Dr. Lisa Garcia", specialty: "Neurology", time: "10:30 AM", date: "2024-01-12", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Migraine consultation" },
    { id: 34, doctor: "Dr. Robert Lee", specialty: "Cardiology", time: "11:00 AM", date: "2024-01-10", type: "In-Person", status: "completed", location: "Main Clinic", notes: "EKG interpretation" },
    { id: 35, doctor: "Dr. Maria Rodriguez", specialty: "Dermatology", time: "3:30 PM", date: "2024-01-08", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Rash treatment" },
    { id: 36, doctor: "Dr. David Kim", specialty: "General Medicine", time: "8:30 AM", date: "2024-01-05", type: "In-Person", status: "completed", location: "Main Clinic", notes: "Lab results review" },
    { id: 37, doctor: "Dr. Jennifer Taylor", specialty: "Pediatrics", time: "1:00 PM", date: "2024-01-03", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Immunization update" },
    { id: 38, doctor: "Dr. Christopher Moore", specialty: "Orthopedics", time: "4:00 PM", date: "2024-01-01", type: "In-Person", status: "completed", location: "Main Clinic", notes: "Fracture follow-up" },
    { id: 39, doctor: "Dr. Amanda Clark", specialty: "Neurology", time: "9:45 AM", date: "2023-12-28", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Tremor evaluation" },
    { id: 40, doctor: "Dr. Kevin Anderson", specialty: "Cardiology", time: "2:00 PM", date: "2023-12-25", type: "In-Person", status: "completed", location: "Main Clinic", notes: "Stress test" },
    { id: 41, doctor: "Dr. Rachel Green", specialty: "Dermatology", time: "10:15 AM", date: "2023-12-22", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Eczema management" },
    { id: 42, doctor: "Dr. Mark Thompson", specialty: "General Medicine", time: "3:15 PM", date: "2023-12-20", type: "In-Person", status: "completed", location: "Main Clinic", notes: "Cholesterol check" },
    { id: 43, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", time: "11:30 AM", date: "2023-12-18", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Medication review" },
    { id: 44, doctor: "Dr. Michael Brown", specialty: "Dermatology", time: "1:30 PM", date: "2023-12-15", type: "In-Person", status: "completed", location: "Main Clinic", notes: "Skin biopsy" },
    { id: 45, doctor: "Dr. Emily White", specialty: "General Medicine", time: "8:00 AM", date: "2023-12-12", type: "Video Call", status: "completed", location: "Teleconsultation", notes: "Flu vaccination" },
    
    // Cancelled appointments (15)
    { id: 46, doctor: "Dr. James Wilson", specialty: "Orthopedics", time: "2:00 PM", date: "2024-01-14", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Patient cancelled" },
    { id: 47, doctor: "Dr. Lisa Garcia", specialty: "Neurology", time: "10:00 AM", date: "2024-01-16", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Doctor unavailable" },
    { id: 48, doctor: "Dr. Robert Lee", specialty: "Cardiology", time: "3:30 PM", date: "2024-01-19", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Emergency reschedule" },
    { id: 49, doctor: "Dr. Maria Rodriguez", specialty: "Dermatology", time: "11:15 AM", date: "2024-01-21", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Technical issues" },
    { id: 50, doctor: "Dr. David Kim", specialty: "General Medicine", time: "9:30 AM", date: "2024-01-24", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Patient no-show" },
    { id: 51, doctor: "Dr. Jennifer Taylor", specialty: "Pediatrics", time: "1:45 PM", date: "2024-01-26", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Child sick" },
    { id: 52, doctor: "Dr. Christopher Moore", specialty: "Orthopedics", time: "4:15 PM", date: "2024-01-29", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Weather conditions" },
    { id: 53, doctor: "Dr. Amanda Clark", specialty: "Neurology", time: "8:45 AM", date: "2024-01-31", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Equipment failure" },
    { id: 54, doctor: "Dr. Kevin Anderson", specialty: "Cardiology", time: "2:30 PM", date: "2024-02-01", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Patient emergency" },
    { id: 55, doctor: "Dr. Rachel Green", specialty: "Dermatology", time: "10:45 AM", date: "2024-02-03", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Internet issues" },
    { id: 56, doctor: "Dr. Mark Thompson", specialty: "General Medicine", time: "3:00 PM", date: "2024-02-06", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Clinic closure" },
    { id: 57, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", time: "12:30 PM", date: "2024-02-09", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Doctor sick" },
    { id: 58, doctor: "Dr. Michael Brown", specialty: "Dermatology", time: "1:15 PM", date: "2024-02-11", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Double booking" },
    { id: 59, doctor: "Dr. Emily White", specialty: "General Medicine", time: "9:15 AM", date: "2024-02-14", type: "Video Call", status: "cancelled", location: "Teleconsultation", notes: "Patient request" },
    { id: 60, doctor: "Dr. James Wilson", specialty: "Orthopedics", time: "4:30 PM", date: "2024-02-17", type: "In-Person", status: "cancelled", location: "Main Clinic", notes: "Insurance issue" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default to newest first
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter appointments based on active tab
  const getFilteredAppointments = (tab: string) => {
    return appointments
      .filter(appointment => {
        const matchesSearch = appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Filter by tab status
        let matchesTab = false;
        switch (tab) {
          case "upcoming":
            matchesTab = appointment.status === "confirmed" || appointment.status === "upcoming";
            break;
          case "completed":
            matchesTab = appointment.status === "completed";
            break;
          case "cancelled":
            matchesTab = appointment.status === "cancelled";
            break;
          default:
            matchesTab = true;
        }
        
        return matchesSearch && matchesTab;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  };

  const filteredAppointments = getFilteredAppointments(activeTab);

  // Pagination
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
    initialItemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'upcoming': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500 text-white border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 hover:text-white/90 transition-all duration-200';
      case 'upcoming': return 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 hover:text-white/90 transition-all duration-200';
      case 'completed': return 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary hover:shadow-lg hover:shadow-secondary/50 hover:text-secondary-foreground/90 transition-all duration-200';
      case 'cancelled': return 'bg-red-500 text-white border-red-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 hover:text-white/90 transition-all duration-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-200/50 hover:text-gray-800/90 transition-all duration-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'upcoming': return Clock;
      case 'completed': return CheckCircle2;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? Video : MapPin;
  };

  const getCallLink = (appointment: any) => {
    // Generate a mock call link - in real app, this would come from appointment data
    return `https://meet.kiorex.com/call/${appointment.id}`;
  };

  const getMapsLink = (appointment: any) => {
    // Generate Google Maps link for the clinic location
    const address = appointment.location === "Main Clinic" 
      ? "123 Healthcare St, Medical District, City" 
      : appointment.location;
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  };

  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('navigation.appointments')}</h1>
          <p className="text-muted-foreground">{t('dashboard.manageAppointments')}</p>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {appointments.filter(a => a.status === 'confirmed' || a.status === 'upcoming').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Appointments</p>
                  <p className="text-2xl font-bold text-green-600">
                    {appointments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cancelled Appointments</p>
                  <p className="text-2xl font-bold text-red-600">
                    {appointments.filter(a => a.status === 'cancelled').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">{t('appointments.upcoming')}</TabsTrigger>
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
          <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Date: Oldest First</SelectItem>
              <SelectItem value="desc">Date: Newest First</SelectItem>
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
        <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                Appointments ({totalItems})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                {paginatedAppointments.map((appointment) => {
                    const TypeIcon = getTypeIcon(appointment.type);
                    return (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 hover:shadow-lg transition-all duration-200">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{appointment.doctor}</h3>
                            <Badge 
                            className={`ml-2 flex items-center space-x-1 ${getStatusBadgeColor(appointment.status)}`}
                          >
                            {(() => {
                              const StatusIcon = getStatusIcon(appointment.status);
                              return <StatusIcon className="w-3 h-3" />;
                            })()}
                            <span>{appointment.status}</span>
                            </Badge>
                          </div>
                        <p className="text-sm text-muted-foreground mb-1">{appointment.specialty}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.time} • {appointment.date}
                            </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <TypeIcon className="w-4 h-4 mr-1" />
                          <span className="font-medium text-blue-600">{appointment.type}</span>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <span className="font-medium text-green-600">{appointment.location}</span>
                        </div>
                        {/* Call/Maps Links */}
                        <div className="mt-2">
                          {appointment.type === "Video Call" ? (
                            <a 
                              href={getCallLink(appointment)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <Video className="w-3 h-3 mr-1" />
                              Join Call
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          ) : (
                            <a 
                              href={getMapsLink(appointment)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-green-600 hover:text-green-800 hover:underline"
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              View on Maps
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                        <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment)}>
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
              
              {/* Pagination */}
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  itemsPerPageOptions={[5, 10, 15, 20]}
                />
                </div>
              </CardContent>
            </Card>
          </div>

        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {/* Same structure as upcoming tab */}
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
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Date: Oldest First</SelectItem>
                <SelectItem value="desc">Date: Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Completed Appointments ({totalItems})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedAppointments.map((appointment) => {
                    const TypeIcon = getTypeIcon(appointment.type);
                    return (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 hover:shadow-lg transition-all duration-200">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{appointment.doctor}</h3>
                            <Badge 
                              className={`ml-2 flex items-center space-x-1 ${getStatusBadgeColor(appointment.status)}`}
                            >
                              {(() => {
                                const StatusIcon = getStatusIcon(appointment.status);
                                return <StatusIcon className="w-3 h-3" />;
                              })()}
                              <span>{appointment.status}</span>
                            </Badge>
                  </div>
                          <p className="text-sm text-muted-foreground mb-1">{appointment.specialty}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time} • {appointment.date}
                  </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <TypeIcon className="w-4 h-4 mr-1" />
                            <span className="font-medium text-blue-600">{appointment.type}</span>
                            <span className="mx-1 text-muted-foreground">•</span>
                            <span className="font-medium text-green-600">{appointment.location}</span>
                  </div>
                          {/* Call/Maps Links */}
                          <div className="mt-2">
                            {appointment.type === "Video Call" ? (
                              <a 
                                href={getCallLink(appointment)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                <Video className="w-3 h-3 mr-1" />
                                Join Call
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            ) : (
                              <a 
                                href={getMapsLink(appointment)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-green-600 hover:text-green-800 hover:underline"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                View on Maps
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                  </div>
                </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment)}>
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
                
                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={[5, 10, 15, 20]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {/* Same structure as upcoming tab */}
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
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by date" />
                      </SelectTrigger>
                      <SelectContent>
                <SelectItem value="asc">Date: Oldest First</SelectItem>
                <SelectItem value="desc">Date: Newest First</SelectItem>
                      </SelectContent>
                    </Select>
          </div>

          <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Cancelled Appointments ({totalItems})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  {paginatedAppointments.map((appointment) => {
                    const TypeIcon = getTypeIcon(appointment.type);
                    return (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 hover:shadow-lg transition-all duration-200">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                            <Badge 
                              className={`ml-2 flex items-center space-x-1 ${getStatusBadgeColor(appointment.status)}`}
                            >
                              {(() => {
                                const StatusIcon = getStatusIcon(appointment.status);
                                return <StatusIcon className="w-3 h-3" />;
                              })()}
                              <span>{appointment.status}</span>
                          </Badge>
                        </div>
                          <p className="text-sm text-muted-foreground mb-1">{appointment.specialty}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time} • {appointment.date}
                      </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <TypeIcon className="w-4 h-4 mr-1" />
                            <span className="font-medium text-blue-600">{appointment.type}</span>
                            <span className="mx-1 text-muted-foreground">•</span>
                            <span className="font-medium text-green-600">{appointment.location}</span>
                        </div>
                          {/* Call/Maps Links */}
                          <div className="mt-2">
                            {appointment.type === "Video Call" ? (
                              <a 
                                href={getCallLink(appointment)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline"
                              >
                          <Video className="w-3 h-3 mr-1" />
                          Join Call
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            ) : (
                              <a 
                                href={getMapsLink(appointment)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-green-600 hover:text-green-800 hover:underline"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                View on Maps
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                      )}
                    </div>
                  </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment)}>
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
                
                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={[5, 10, 15, 20]}
                  />
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>
        </Tabs>

        {/* Appointment Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                View detailed information about your appointment
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-6">
                {/* Doctor Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedAppointment.doctor.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedAppointment.doctor}</h3>
                    <p className="text-primary font-medium">{selectedAppointment.specialty}</p>
                    <Badge className={`mt-2 flex items-center space-x-1 ${getStatusBadgeColor(selectedAppointment.status)}`}>
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedAppointment.status);
                        return <StatusIcon className="w-3 h-3" />;
                      })()}
                      <span>{selectedAppointment.status}</span>
                    </Badge>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Date & Time</h4>
                        <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedAppointment.date}</span>
                        </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedAppointment.time}</span>
                      </div>
                        </div>

                        <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Appointment Type</h4>
                      <div className="flex items-center space-x-2">
                        {(() => {
                          const TypeIcon = getTypeIcon(selectedAppointment.type);
                          return <TypeIcon className="w-4 h-4" />;
                        })()}
                        <span className="font-medium text-blue-600">{selectedAppointment.type}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-medium text-green-600">{selectedAppointment.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Appointment ID</h4>
                      <p className="text-sm font-mono bg-muted px-2 py-1 rounded">#{selectedAppointment.id}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Notes</h4>
                      <p className="text-sm">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  {selectedAppointment.type === "Video Call" ? (
                    <a 
                      href={getCallLink(selectedAppointment)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Video Call
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <a 
                      href={getMapsLink(selectedAppointment)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Google Maps
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                  
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Appointment
                  </Button>
                  
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancel Appointment
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PatientAppointments;