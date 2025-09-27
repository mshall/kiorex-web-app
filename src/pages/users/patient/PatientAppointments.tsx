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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
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

  // Helper function to get dates
  const getDate = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toISOString().split('T')[0];
  };

  const [appointments, setAppointments] = useState([
    // UPCOMING APPOINTMENTS (Today and Future)
    { 
      id: 1, 
      doctor: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      time: "10:00 AM", 
      date: getDate(0), // Today
      type: "Video Call", 
      consultationType: "Consultation",
      status: "confirmed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/abc123",
      mapsLink: "https://maps.google.com/?q=Teleconsultation+Center",
      notes: "Follow-up consultation"
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Brown", 
      specialty: "Dermatology", 
      time: "2:30 PM", 
      date: getDate(1), // Tomorrow
      type: "In-Person", 
      consultationType: "Follow up",
      status: "confirmed",
      location: "Main Clinic - Room 201",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Main+Clinic+Room+201",
      notes: "Skin examination"
    },
    { 
      id: 3, 
      doctor: "Dr. Emily White", 
      specialty: "General Medicine", 
      time: "9:00 AM", 
      date: getDate(2), // Day after tomorrow
      type: "Video Call", 
      consultationType: "Check up",
      status: "confirmed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/def456",
      mapsLink: "https://maps.google.com/?q=Teleconsultation+Center",
      notes: "Annual checkup"
    },
    { 
      id: 4, 
      doctor: "Dr. David Chen", 
      specialty: "Orthopedics", 
      time: "11:30 AM", 
      date: getDate(3), // 3 days from now
      type: "In-Person", 
      consultationType: "Consultation",
      status: "confirmed",
      location: "Orthopedic Center - Room 105",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Orthopedic+Center+Room+105",
      notes: "Knee consultation"
    },
    { 
      id: 5, 
      doctor: "Dr. Lisa Rodriguez", 
      specialty: "Pediatrics", 
      time: "3:00 PM", 
      date: "2024-01-27",
      type: "Video Call", 
      consultationType: "Check up",
      status: "confirmed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/ghi789",
      mapsLink: "https://maps.google.com/?q=Teleconsultation+Center",
      notes: "Child wellness check"
    },
    { 
      id: 6, 
      doctor: "Dr. James Wilson", 
      specialty: "Neurology", 
      time: "1:00 PM", 
      date: "2024-01-28",
      type: "In-Person", 
      consultationType: "Follow up",
      status: "confirmed",
      location: "Neurology Clinic - Room 302",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Neurology+Clinic+Room+302",
      notes: "Headache evaluation"
    },
    { 
      id: 7, 
      doctor: "Dr. Maria Garcia", 
      specialty: "Gynecology", 
      time: "10:30 AM", 
      date: "2024-01-29",
      type: "Video Call", 
      status: "confirmed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/jkl012",
      mapsLink: "https://maps.google.com/?q=Teleconsultation+Center",
      notes: "Annual exam"
    },
    { 
      id: 8, 
      doctor: "Dr. Robert Kim", 
      specialty: "Psychiatry", 
      time: "4:00 PM", 
      date: "2024-01-30",
      type: "In-Person", 
      status: "confirmed",
      location: "Mental Health Center - Room 401",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Mental+Health+Center+Room+401",
      notes: "Therapy session"
    },
    { 
      id: 9, 
      doctor: "Dr. Jennifer Lee", 
      specialty: "Ophthalmology", 
      time: "2:00 PM", 
      date: "2024-01-31",
      type: "Video Call", 
      status: "confirmed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/mno345",
      mapsLink: "https://maps.google.com/?q=Teleconsultation+Center",
      notes: "Eye exam"
    },
    { 
      id: 10, 
      doctor: "Dr. Thomas Anderson", 
      specialty: "Urology", 
      time: "9:30 AM", 
      date: "2024-02-01",
      type: "In-Person", 
      status: "confirmed",
      location: "Urology Center - Room 203",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Urology+Center+Room+203",
      notes: "Prostate screening"
    },
    // Pending appointments (10)
    { 
      id: 11, 
      doctor: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      time: "11:00 AM", 
      date: "2024-02-02",
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/pqr678",
      mapsLink: "https://maps.google.com/?q=Teleconsultation+Center",
      notes: "Cardiac follow-up"
    },
    { 
      id: 12, 
      doctor: "Dr. Michael Brown", 
      specialty: "Dermatology", 
      time: "3:30 PM", 
      date: "2024-02-03",
      type: "In-Person", 
      status: "upcoming",
      location: "Main Clinic - Room 202",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Main+Clinic+Room+202",
      notes: "Mole check"
    },
    { 
      id: 13, 
      doctor: "Dr. Emily White", 
      specialty: "General Medicine", 
      time: "8:30 AM", 
      date: "2024-02-04",
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/stu901",
      notes: "Blood pressure check"
    },
    { 
      id: 14, 
      doctor: "Dr. David Chen", 
      specialty: "Orthopedics", 
      time: "1:30 PM", 
      date: "2024-02-05",
      type: "In-Person", 
      status: "upcoming",
      location: "Orthopedic Center - Room 106",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Orthopedic+Center+Room+106",
      notes: "Back pain consultation"
    },
    { 
      id: 15, 
      doctor: "Dr. Lisa Rodriguez", 
      specialty: "Pediatrics", 
      time: "2:00 PM", 
      date: "2024-02-06",
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/vwx234",
      notes: "Vaccination consultation"
    },
    { 
      id: 16, 
      doctor: "Dr. James Wilson", 
      specialty: "Neurology", 
      time: "10:00 AM", 
      date: "2024-02-07",
      type: "In-Person", 
      status: "upcoming",
      location: "Neurology Clinic - Room 303",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Neurology+Clinic+Room+303",
      notes: "Memory assessment"
    },
    { 
      id: 17, 
      doctor: "Dr. Maria Garcia", 
      specialty: "Gynecology", 
      time: "11:30 AM", 
      date: "2024-02-08",
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/yza567",
      notes: "Prenatal consultation"
    },
    { 
      id: 18, 
      doctor: "Dr. Robert Kim", 
      specialty: "Psychiatry", 
      time: "3:00 PM", 
      date: "2024-02-09",
      type: "In-Person", 
      status: "upcoming",
      location: "Mental Health Center - Room 402",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Mental+Health+Center+Room+402",
      notes: "Medication review"
    },
    { 
      id: 19, 
      doctor: "Dr. Jennifer Lee", 
      specialty: "Ophthalmology", 
      time: "1:00 PM", 
      date: "2024-02-10",
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/bcd890",
      notes: "Vision test"
    },
    { 
      id: 20, 
      doctor: "Dr. Thomas Anderson", 
      specialty: "Urology", 
      time: "10:30 AM", 
      date: "2024-02-11",
      type: "In-Person", 
      status: "upcoming",
      location: "Urology Center - Room 204",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Urology+Center+Room+204",
      notes: "Kidney stone follow-up"
    },
    // Completed appointments (10)
    { 
      id: 21, 
      doctor: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      time: "9:00 AM", 
      date: "2024-01-15",
      type: "Video Call", 
      status: "completed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/efg123",
      notes: "EKG review"
    },
    { 
      id: 22, 
      doctor: "Dr. Michael Brown", 
      specialty: "Dermatology", 
      time: "2:00 PM", 
      date: "2024-01-16",
      type: "In-Person", 
      status: "completed",
      location: "Main Clinic - Room 201",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Main+Clinic+Room+201",
      notes: "Skin biopsy"
    },
    { 
      id: 23, 
      doctor: "Dr. Emily White", 
      specialty: "General Medicine", 
      time: "11:00 AM", 
      date: "2024-01-17",
      type: "Video Call", 
      status: "completed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/hij456",
      notes: "Lab results review"
    },
    { 
      id: 24, 
      doctor: "Dr. David Chen", 
      specialty: "Orthopedics", 
      time: "3:00 PM", 
      date: "2024-01-18",
      type: "In-Person", 
      status: "completed",
      location: "Orthopedic Center - Room 105",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Orthopedic+Center+Room+105",
      notes: "Physical therapy consultation"
    },
    { 
      id: 25, 
      doctor: "Dr. Lisa Rodriguez", 
      specialty: "Pediatrics", 
      time: "10:30 AM", 
      date: "2024-01-19",
      type: "Video Call", 
      status: "completed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/klm789",
      notes: "Growth chart review"
    },
    { 
      id: 26, 
      doctor: "Dr. James Wilson", 
      specialty: "Neurology", 
      time: "1:30 PM", 
      date: "2024-01-20",
      type: "In-Person", 
      status: "completed",
      location: "Neurology Clinic - Room 302",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Neurology+Clinic+Room+302",
      notes: "MRI results discussion"
    },
    { 
      id: 27, 
      doctor: "Dr. Maria Garcia", 
      specialty: "Gynecology", 
      time: "9:30 AM", 
      date: "2024-01-21",
      type: "Video Call", 
      status: "completed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/nop012",
      notes: "Pap smear results"
    },
    { 
      id: 28, 
      doctor: "Dr. Robert Kim", 
      specialty: "Psychiatry", 
      time: "4:30 PM", 
      date: "2024-01-22",
      type: "In-Person", 
      status: "completed",
      location: "Mental Health Center - Room 401",
      callLink: null,
      notes: "Therapy session"
    },
    { 
      id: 29, 
      doctor: "Dr. Jennifer Lee", 
      specialty: "Ophthalmology", 
      time: "2:30 PM", 
      date: "2024-01-23",
      type: "Video Call", 
      status: "completed",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/qrs345",
      notes: "Glaucoma screening"
    },
    { 
      id: 30, 
      doctor: "Dr. Thomas Anderson", 
      specialty: "Urology", 
      time: "11:00 AM", 
      date: "2024-01-24",
      type: "In-Person", 
      status: "completed",
      location: "Urology Center - Room 203",
      callLink: null,
      notes: "Prostate exam"
    },
    // Today's appointments (10) - with upcoming status
    { 
      id: 31, 
      doctor: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      time: "9:00 AM", 
      date: new Date().toISOString().split('T')[0],
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/today001",
      notes: "Morning consultation"
    },
    { 
      id: 32, 
      doctor: "Dr. Michael Brown", 
      specialty: "Dermatology", 
      time: "10:30 AM", 
      date: new Date().toISOString().split('T')[0],
      type: "In-Person", 
      status: "upcoming",
      location: "Main Clinic - Room 201",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Main+Clinic+Room+201",
      notes: "Skin check"
    },
    { 
      id: 33, 
      doctor: "Dr. Emily White", 
      specialty: "General Medicine", 
      time: "11:00 AM", 
      date: new Date().toISOString().split('T')[0],
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/today002",
      notes: "Follow-up visit"
    },
    { 
      id: 34, 
      doctor: "Dr. David Chen", 
      specialty: "Orthopedics", 
      time: "2:00 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "In-Person", 
      status: "upcoming",
      location: "Orthopedic Center - Room 105",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Orthopedic+Center+Room+105",
      notes: "Knee examination"
    },
    { 
      id: 35, 
      doctor: "Dr. Lisa Rodriguez", 
      specialty: "Pediatrics", 
      time: "2:30 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/today003",
      notes: "Child wellness check"
    },
    { 
      id: 36, 
      doctor: "Dr. James Wilson", 
      specialty: "Neurology", 
      time: "3:00 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "In-Person", 
      status: "upcoming",
      location: "Neurology Clinic - Room 302",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Neurology+Clinic+Room+302",
      notes: "Headache consultation"
    },
    { 
      id: 37, 
      doctor: "Dr. Maria Garcia", 
      specialty: "Gynecology", 
      time: "3:30 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/today004",
      notes: "Annual exam"
    },
    { 
      id: 38, 
      doctor: "Dr. Robert Kim", 
      specialty: "Psychiatry", 
      time: "4:00 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "In-Person", 
      status: "upcoming",
      location: "Mental Health Center - Room 401",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Mental+Health+Center+Room+401",
      notes: "Therapy session"
    },
    { 
      id: 39, 
      doctor: "Dr. Jennifer Lee", 
      specialty: "Ophthalmology", 
      time: "4:30 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "Video Call", 
      status: "upcoming",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/today005",
      notes: "Eye examination"
    },
    { 
      id: 40, 
      doctor: "Dr. Thomas Anderson", 
      specialty: "Urology", 
      time: "5:00 PM", 
      date: new Date().toISOString().split('T')[0],
      type: "In-Person", 
      status: "upcoming",
      location: "Urology Center - Room 203",
      callLink: null,
      mapsLink: "https://maps.google.com/?q=Urology+Center+Room+203",
      notes: "Prostate screening"
    },
    // Cancelled appointments (10)
    { 
      id: 41, 
      doctor: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      time: "10:00 AM", 
      date: "2024-01-10",
      type: "Video Call", 
      status: "cancelled",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/tuv678",
      notes: "Patient cancelled"
    },
    { 
      id: 42, 
      doctor: "Dr. Michael Brown", 
      specialty: "Dermatology", 
      time: "3:00 PM", 
      date: "2024-01-11",
      type: "In-Person", 
      status: "cancelled",
      location: "Main Clinic - Room 201",
      callLink: null,
      notes: "Doctor unavailable"
    },
    { 
      id: 43, 
      doctor: "Dr. Emily White", 
      specialty: "General Medicine", 
      time: "8:00 AM", 
      date: "2024-01-12",
      type: "Video Call", 
      status: "cancelled",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/wxy901",
      notes: "Technical issues"
    },
    { 
      id: 44, 
      doctor: "Dr. David Chen", 
      specialty: "Orthopedics", 
      time: "2:00 PM", 
      date: "2024-01-13",
      type: "In-Person", 
      status: "cancelled",
      location: "Orthopedic Center - Room 105",
      callLink: null,
      notes: "Emergency reschedule"
    },
    { 
      id: 45, 
      doctor: "Dr. Lisa Rodriguez", 
      specialty: "Pediatrics", 
      time: "1:30 PM", 
      date: "2024-01-14",
      type: "Video Call", 
      status: "cancelled",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/zab234",
      notes: "Child sick"
    },
    { 
      id: 46, 
      doctor: "Dr. James Wilson", 
      specialty: "Neurology", 
      time: "11:30 AM", 
      date: "2024-01-15",
      type: "In-Person", 
      status: "cancelled",
      location: "Neurology Clinic - Room 302",
      callLink: null,
      notes: "Weather conditions"
    },
    { 
      id: 47, 
      doctor: "Dr. Maria Garcia", 
      specialty: "Gynecology", 
      time: "10:00 AM", 
      date: "2024-01-16",
      type: "Video Call", 
      status: "cancelled",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/cde567",
      notes: "Patient rescheduled"
    },
    { 
      id: 48, 
      doctor: "Dr. Robert Kim", 
      specialty: "Psychiatry", 
      time: "4:00 PM", 
      date: "2024-01-17",
      type: "In-Person", 
      status: "cancelled",
      location: "Mental Health Center - Room 401",
      callLink: null,
      notes: "Insurance issue"
    },
    { 
      id: 49, 
      doctor: "Dr. Jennifer Lee", 
      specialty: "Ophthalmology", 
      time: "1:00 PM", 
      date: "2024-01-18",
      type: "Video Call", 
      status: "cancelled",
      location: "Teleconsultation",
      callLink: "https://meet.kiorex.com/fgh890",
      notes: "Equipment malfunction"
    },
    { 
      id: 50, 
      doctor: "Dr. Thomas Anderson", 
      specialty: "Urology", 
      time: "9:30 AM", 
      date: "2024-01-19",
      type: "In-Person", 
      status: "cancelled",
      location: "Urology Center - Room 203",
      callLink: null,
      notes: "Doctor emergency"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    // Filter by tab
    let matchesTab = true;
    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = new Date(appointment.date);
    const todayDate = new Date(today);
    
    switch (activeTab) {
      case 'upcoming':
        matchesTab = appointment.status === 'confirmed' || appointment.status === 'upcoming';
        break;
      case 'completed':
        matchesTab = appointment.status === 'completed';
        break;
      case 'cancelled':
        matchesTab = appointment.status === 'cancelled';
        break;
      default:
        matchesTab = true;
    }
    
    return matchesSearch && matchesStatus && matchesTab;
  }).sort((a, b) => {
    // Sort by date with today's appointments first, then by date ascending
    const today = new Date().toISOString().split('T')[0];
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const isTodayA = a.date === today;
    const isTodayB = b.date === today;
    
    // Today's appointments come first
    if (isTodayA && !isTodayB) return -1;
    if (!isTodayA && isTodayB) return 1;
    
    // Then sort by date ascending (nearest to farthest)
    return dateA.getTime() - dateB.getTime();
  });

  // Pagination logic
  const {
    currentPage,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      case 'upcoming': return 'default';
      default: return 'outline';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500 text-white border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 hover:text-white/90 transition-all duration-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:shadow-lg hover:shadow-yellow-200/50 hover:text-yellow-800/90 transition-all duration-200';
      case 'completed': return 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary hover:shadow-lg hover:shadow-secondary/50 hover:text-secondary-foreground/90 transition-all duration-200';
      case 'cancelled': return 'bg-red-500 text-white border-red-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 hover:text-white/90 transition-all duration-200';
      case 'upcoming': return 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 hover:text-white/90 transition-all duration-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-200/50 hover:text-gray-800/90 transition-all duration-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'completed': return CheckCircle2;
      case 'cancelled': return XCircle;
      case 'upcoming': return Clock;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? Video : MapPin;
  };

  const getTypeIconComponent = (type: string, className: string) => {
    const IconComponent = getTypeIcon(type);
    return <IconComponent className={className} />;
  };

  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleJoinCall = (callLink: string) => {
    window.open(callLink, '_blank');
  };

  const getTypeColor = (type: string) => {
    return type === 'Video Call' ? 'text-blue-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('navigation.appointments')}</h1>
          <p className="text-muted-foreground">{t('dashboard.manageAppointments')}</p>
        </div>

        {/* Appointment Count Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">All Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {appointments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
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
                <DialogDescription>
                  Schedule a new appointment with your preferred doctor
                </DialogDescription>
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
                            <TypeIcon className={`w-4 h-4 mr-1 ${getTypeColor(appointment.type)}`} />
                            <span className={getTypeColor(appointment.type)}>
                              {appointment.type}
                            </span>
                            <span className="ml-2 text-blue-600 font-medium">
                              • {appointment.consultationType || "Consultation"}
                            </span>
                            {appointment.type === 'Video Call' ? (
                              appointment.callLink ? (
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => handleJoinCall(appointment.callLink)}
                                  className="p-0 h-auto text-blue-600 hover:text-blue-800 ml-2"
                                >
                                  • Join Call
                                </Button>
                              ) : (
                                <span className="ml-2">• Teleconsultation</span>
                              )
                            ) : (
                              <span className="ml-2">• {appointment.location}</span>
                          )}
                        </div>
                          {appointment.type === 'In-Person' && appointment.mapsLink && (
                            <div className="mt-2">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => window.open(appointment.mapsLink, '_blank')}
                                className="p-0 h-auto text-green-600 hover:text-green-800 text-xs"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                Google Maps
                            </Button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewAppointment(appointment)}
                          >
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
                    itemsPerPage={5}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={[5, 10, 15, 20]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          </div>
        </TabsContent>


        <TabsContent value="completed" className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No completed appointments</h3>
              <p className="text-muted-foreground">Your completed appointments will appear here.</p>
            </div>
          ) : (
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
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
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
                            <TypeIcon className={`w-4 h-4 mr-1 ${getTypeColor(appointment.type)}`} />
                            <span className={getTypeColor(appointment.type)}>
                              {appointment.type}
                    </span>
                            {appointment.type === 'Video Call' ? (
                              appointment.callLink ? (
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => handleJoinCall(appointment.callLink)}
                                  className="p-0 h-auto text-blue-600 hover:text-blue-800 ml-2"
                                >
                                  • Join Call
                                </Button>
                              ) : (
                                <span className="ml-2">• Teleconsultation</span>
                              )
                            ) : (
                              <span className="ml-2">• {appointment.location}</span>
                            )}
                  </div>
                          {appointment.type === 'In-Person' && appointment.mapsLink && (
                            <div className="mt-2">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => window.open(appointment.mapsLink, '_blank')}
                                className="p-0 h-auto text-green-600 hover:text-green-800 text-xs"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                Google Maps
                              </Button>
                  </div>
                          )}
                </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewAppointment(appointment)}
                              >
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
                        itemsPerPage={5}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                        itemsPerPageOptions={[5, 10, 15, 20]}
                      />
                </div>
              </CardContent>
            </Card>
          </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <X className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No cancelled appointments</h3>
              <p className="text-muted-foreground">Your cancelled appointments will appear here.</p>
              </div>
          ) : (
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
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
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
                            <TypeIcon className={`w-4 h-4 mr-1 ${getTypeColor(appointment.type)}`} />
                            <span className={getTypeColor(appointment.type)}>
                              {appointment.type}
                            </span>
                            {appointment.type === 'Video Call' ? (
                              appointment.callLink ? (
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => handleJoinCall(appointment.callLink)}
                                  className="p-0 h-auto text-blue-600 hover:text-blue-800 ml-2"
                                >
                                  • Join Call
                                </Button>
                              ) : (
                                <span className="ml-2">• Teleconsultation</span>
                              )
                            ) : (
                              <span className="ml-2">• {appointment.location}</span>
                            )}
                        </div>
                          {appointment.type === 'In-Person' && appointment.mapsLink && (
                            <div className="mt-2">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => window.open(appointment.mapsLink, '_blank')}
                                className="p-0 h-auto text-green-600 hover:text-green-800 text-xs"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                Google Maps
                              </Button>
                        </div>
                          )}
                      </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewAppointment(appointment)}
                              >
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
                        itemsPerPage={5}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                        itemsPerPageOptions={[5, 10, 15, 20]}
                      />
              </div>
            </CardContent>
          </Card>
              </div>
            </div>
          )}
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
                      {selectedAppointment.doctor.split(' ').map(n => n[0]).join('')}
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
                      <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedAppointment.date}</span>
                        <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                        <span>{selectedAppointment.time}</span>
                        </div>
                    </div>

                        <div>
                      <Label className="text-sm font-medium text-muted-foreground">Appointment Type</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getTypeIconComponent(selectedAppointment.type, `w-4 h-4 ${getTypeColor(selectedAppointment.type)}`)}
                        <span className={`font-medium ${getTypeColor(selectedAppointment.type)}`}>
                          {selectedAppointment.type}
                        </span>
                        </div>
                      </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                      <div className="mt-1">
                        {selectedAppointment.type === 'Video Call' ? (
                          selectedAppointment.callLink ? (
                            <Button
                              variant="outline"
                              onClick={() => handleJoinCall(selectedAppointment.callLink)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join Video Call
                            </Button>
                          ) : (
                            <span className="text-muted-foreground">Teleconsultation</span>
                          )
                        ) : (
                          <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{selectedAppointment.location}</span>
                    </div>
                            {selectedAppointment.mapsLink && (
                              <Button
                                variant="outline"
                                onClick={() => window.open(selectedAppointment.mapsLink, '_blank')}
                                className="text-green-600 hover:text-green-800"
                              >
                                <MapPin className="w-4 h-4 mr-2" />
                                Open in Google Maps
                      </Button>
                            )}
                    </div>
                        )}
                  </div>
              </div>
                  </div>

              <div className="space-y-4">
                        <div>
                      <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                      <p className="mt-1 text-sm">{selectedAppointment.notes}</p>
                        </div>

                        <div>
                      <Label className="text-sm font-medium text-muted-foreground">Appointment ID</Label>
                      <p className="mt-1 text-sm font-mono">#{selectedAppointment.id.toString().padStart(6, '0')}</p>
                        </div>
                      </div>
                    </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Close
                      </Button>
                  {selectedAppointment.type === 'Video Call' && selectedAppointment.callLink && (
                    <Button onClick={() => handleJoinCall(selectedAppointment.callLink)}>
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                      </Button>
                  )}
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