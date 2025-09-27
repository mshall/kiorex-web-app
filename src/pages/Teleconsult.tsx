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
  Video, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Filter, 
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneCall,
  MessageSquare
} from "lucide-react";

const Teleconsult = () => {
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  // Sample teleconsultations data
  const consultations = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientId: "P001",
      date: "2024-01-15",
      time: "09:00 AM",
      type: "Video Call",
      status: "scheduled",
      specialty: "Cardiology",
      duration: "30 minutes",
      reason: "Follow-up consultation",
      notes: "Patient reports improvement in symptoms",
      meetingId: "TC-001",
      meetingLink: "https://meet.kiorex.com/tc-001"
    },
    {
      id: 2,
      patientName: "Michael Brown",
      patientId: "P002",
      date: "2024-01-15",
      time: "10:30 AM",
      type: "Phone Call",
      status: "in-progress",
      specialty: "General Medicine",
      duration: "45 minutes",
      reason: "Initial consultation",
      notes: "New patient consultation",
      meetingId: "TC-002",
      meetingLink: "https://meet.kiorex.com/tc-002"
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
      duration: "20 minutes",
      reason: "Skin condition consultation",
      notes: "Prescribed topical treatment",
      meetingId: "TC-003",
      meetingLink: "https://meet.kiorex.com/tc-003"
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      patientId: "P004",
      date: "2024-01-16",
      time: "11:00 AM",
      type: "Video Call",
      status: "cancelled",
      specialty: "Neurology",
      duration: "30 minutes",
      reason: "Headache evaluation",
      notes: "Patient cancelled due to emergency",
      meetingId: "TC-004",
      meetingLink: "https://meet.kiorex.com/tc-004"
    }
  ];

  // Quick stats
  const stats = {
    total: consultations.length,
    scheduled: consultations.filter(c => c.status === 'scheduled').length,
    inProgress: consultations.filter(c => c.status === 'in-progress').length,
    completed: consultations.filter(c => c.status === 'completed').length,
    cancelled: consultations.filter(c => c.status === 'cancelled').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'in-progress': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Calendar;
      case 'in-progress': return Play;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? Video : Phone;
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultation.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
    const matchesType = typeFilter === "all" || consultation.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const startConsultation = (consultation: any) => {
    // In a real app, this would start the video/audio call
    console.log("Starting consultation:", consultation);
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType="doctor" userName="Dr. Smith" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('navigation.teleconsult')}</h1>
          <p className="text-muted-foreground">Manage your teleconsultation sessions with patients</p>
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
                <Video className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-green-600">{stats.inProgress}</p>
                </div>
                <Play className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
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
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Video Call">Video Call</SelectItem>
              <SelectItem value="Phone Call">Phone Call</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Consultations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Teleconsultations
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
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultations.map((consultation) => {
                  const StatusIcon = getStatusIcon(consultation.status);
                  const TypeIcon = getTypeIcon(consultation.type);
                  
                  return (
                    <TableRow key={consultation.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {consultation.patientName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{consultation.patientName}</p>
                            <p className="text-sm text-muted-foreground">ID: {consultation.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{consultation.date}</p>
                          <p className="text-sm text-muted-foreground">{consultation.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="w-4 h-4" />
                          <span>{consultation.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{consultation.specialty}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(consultation.status)} className="flex items-center space-x-1">
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{consultation.status.replace('-', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {consultation.status === 'scheduled' && (
                            <Button 
                              size="sm"
                              onClick={() => startConsultation(consultation)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Start
                            </Button>
                          )}
                          {consultation.status === 'in-progress' && (
                            <Button 
                              size="sm"
                              onClick={() => startConsultation(consultation)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Join
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedConsultation(consultation)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Consultation Details</DialogTitle>
                              </DialogHeader>
                              {selectedConsultation && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Patient Information</h4>
                                      <div className="space-y-2">
                                        <p><span className="text-muted-foreground">Name:</span> {selectedConsultation.patientName}</p>
                                        <p><span className="text-muted-foreground">ID:</span> {selectedConsultation.patientId}</p>
                                        <p><span className="text-muted-foreground">Meeting ID:</span> {selectedConsultation.meetingId}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Consultation Details</h4>
                                      <div className="space-y-2">
                                        <p><span className="text-muted-foreground">Date:</span> {selectedConsultation.date}</p>
                                        <p><span className="text-muted-foreground">Time:</span> {selectedConsultation.time}</p>
                                        <p><span className="text-muted-foreground">Type:</span> {selectedConsultation.type}</p>
                                        <p><span className="text-muted-foreground">Duration:</span> {selectedConsultation.duration}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Medical Information</h4>
                                    <div className="space-y-2">
                                      <p><span className="text-muted-foreground">Specialty:</span> {selectedConsultation.specialty}</p>
                                      <p><span className="text-muted-foreground">Reason:</span> {selectedConsultation.reason}</p>
                                      <p><span className="text-muted-foreground">Notes:</span> {selectedConsultation.notes}</p>
                                    </div>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Reschedule</Button>
                                    <Button>Start Consultation</Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Video Call Interface (for demonstration) */}
        {stats.inProgress > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="w-5 h-5 mr-2" />
                Active Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-8 text-center">
                <div className="text-white mb-4">
                  <h3 className="text-xl font-semibold">Video Call in Progress</h3>
                  <p className="text-gray-300">Patient: Michael Brown</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant={isVideoOn ? "default" : "destructive"}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Camera className="w-4 h-4 mr-2" /> : <CameraOff className="w-4 h-4 mr-2" />}
                    {isVideoOn ? "Video On" : "Video Off"}
                  </Button>
                  <Button
                    variant={isMicOn ? "default" : "destructive"}
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                    {isMicOn ? "Mic On" : "Mic Off"}
                  </Button>
                  <Button variant="destructive">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    End Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teleconsult;
