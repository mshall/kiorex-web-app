import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  Users, 
  Phone, 
  MessageSquare, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Heart,
  Activity,
  Clock,
  Mail,
  UserPlus,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  User,
  MapPin,
  ChevronDown
} from "lucide-react";

const DoctorPatients = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();
  const userType = location.state?.userType || 'doctor';
  const providerType = location.state?.providerType || 'Doctor';

  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      age: 45, 
      email: "sarah.j@email.com",
      phone: "+1-555-0123",
      lastVisit: "2024-01-10", 
      status: "active", 
      condition: "Hypertension",
      nextAppointment: "2024-01-20",
      address: "123 Main St, New York, NY",
      bloodPressure: "120/80",
      weight: "68kg",
      height: "165cm",
      medications: ["Lisinopril 10mg"],
      allergies: ["Penicillin"]
    },
    { 
      id: 2, 
      name: "Michael Brown", 
      age: 32, 
      email: "m.brown@email.com",
      phone: "+1-555-0124",
      lastVisit: "2024-01-08", 
      status: "active", 
      condition: "Diabetes Type 2",
      nextAppointment: "2024-01-18",
      address: "456 Oak Ave, Brooklyn, NY",
      bloodPressure: "125/82",
      weight: "85kg",
      height: "180cm",
      medications: ["Metformin 500mg"],
      allergies: ["None known"]
    },
    { 
      id: 3, 
      name: "Emily White", 
      age: 28, 
      email: "emily.w@email.com",
      phone: "+1-555-0125",
      lastVisit: "2024-01-05", 
      status: "inactive", 
      condition: "General Check-up",
      nextAppointment: null,
      address: "789 Pine Rd, Manhattan, NY",
      bloodPressure: "110/70",
      weight: "55kg",
      height: "160cm",
      medications: [],
      allergies: ["Shellfish"]
    },
    { 
      id: 4, 
      name: "David Chen", 
      age: 38, 
      email: "david.chen@email.com",
      phone: "+1-555-0126",
      lastVisit: "2024-01-12", 
      status: "active", 
      condition: "Asthma",
      nextAppointment: "2024-01-22",
      address: "321 Elm St, Queens, NY",
      bloodPressure: "118/75",
      weight: "72kg",
      height: "175cm",
      medications: ["Albuterol inhaler"],
      allergies: ["Dust mites"]
    },
    { 
      id: 5, 
      name: "Lisa Rodriguez", 
      age: 41, 
      email: "lisa.r@email.com",
      phone: "+1-555-0127",
      lastVisit: "2024-01-09", 
      status: "active", 
      condition: "Migraine",
      nextAppointment: "2024-01-19",
      address: "654 Maple Dr, Bronx, NY",
      bloodPressure: "115/78",
      weight: "62kg",
      height: "158cm",
      medications: ["Sumatriptan 50mg"],
      allergies: ["None known"]
    },
    { 
      id: 6, 
      name: "James Wilson", 
      age: 55, 
      email: "james.w@email.com",
      phone: "+1-555-0128",
      lastVisit: "2024-01-07", 
      status: "active", 
      condition: "Arthritis",
      nextAppointment: "2024-01-17",
      address: "987 Cedar Ln, Staten Island, NY",
      bloodPressure: "130/85",
      weight: "90kg",
      height: "185cm",
      medications: ["Ibuprofen 400mg"],
      allergies: ["Aspirin"]
    },
    { 
      id: 7, 
      name: "Maria Garcia", 
      age: 29, 
      email: "maria.g@email.com",
      phone: "+1-555-0129",
      lastVisit: "2024-01-11", 
      status: "inactive", 
      condition: "Pregnancy",
      nextAppointment: "2024-01-21",
      address: "147 Birch St, Manhattan, NY",
      bloodPressure: "105/65",
      weight: "58kg",
      height: "162cm",
      medications: ["Prenatal vitamins"],
      allergies: ["None known"]
    },
    { 
      id: 8, 
      name: "Robert Taylor", 
      age: 47, 
      email: "robert.t@email.com",
      phone: "+1-555-0130",
      lastVisit: "2024-01-06", 
      status: "active", 
      condition: "High Cholesterol",
      nextAppointment: "2024-01-16",
      address: "258 Spruce Ave, Brooklyn, NY",
      bloodPressure: "128/80",
      weight: "88kg",
      height: "178cm",
      medications: ["Atorvastatin 20mg"],
      allergies: ["None known"]
    },
    { 
      id: 9, 
      name: "Jennifer Lee", 
      age: 33, 
      email: "jennifer.l@email.com",
      phone: "+1-555-0131",
      lastVisit: "2024-01-13", 
      status: "active", 
      condition: "Anxiety",
      nextAppointment: "2024-01-23",
      address: "369 Willow Rd, Queens, NY",
      bloodPressure: "112/68",
      weight: "59kg",
      height: "163cm",
      medications: ["Sertraline 50mg"],
      allergies: ["None known"]
    },
    { 
      id: 10, 
      name: "Thomas Anderson", 
      age: 52, 
      email: "thomas.a@email.com",
      phone: "+1-555-0132",
      lastVisit: "2024-01-04", 
      status: "inactive", 
      condition: "Sleep Apnea",
      nextAppointment: null,
      address: "741 Poplar St, Bronx, NY",
      bloodPressure: "135/88",
      weight: "95kg",
      height: "182cm",
      medications: ["CPAP machine"],
      allergies: ["Latex"]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessagePatient = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const handleViewPatientProfile = (patientId: number) => {
    // Navigate to patient profile page
    navigate(`/patient-profile/${patientId}`, { 
      state: { 
        userType: 'doctor', 
        providerType: 'Doctor',
        patientId: patientId 
      } 
    });
  };

  const handleAddPatient = () => {
    console.log('Adding new patient');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedPatients,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredPatients,
    initialPage: 1,
    initialItemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'new': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('patients.title')}</h1>
          <p className="text-muted-foreground">{t('patients.managePatients')}</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name, email, or phone..."
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
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input placeholder="Enter last name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Age</Label>
                    <Input type="number" placeholder="Enter age" />
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <Input placeholder="Enter weight" />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input placeholder="Enter height" />
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input placeholder="Enter full address" />
                </div>
                <div>
                  <Label>Primary Condition</Label>
                  <Input placeholder="Enter primary medical condition" />
                </div>
                <Button className="w-full" onClick={handleAddPatient}>Add Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Patient Overview Cards - Smaller and above table */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                      <p className="text-2xl font-bold">{patients.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold text-green-600">
                        {patients.filter(p => p.status === 'active').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Inactive</p>
                      <p className="text-2xl font-bold text-gray-600">
                        {patients.filter(p => p.status === 'inactive').length}
                      </p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">New This Month</p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                    <UserPlus className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Full Width Table */}
                <Card>
                  <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                    {t('navigation.patients')} ({totalItems})
                    </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search patients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                  </CardHeader>
                  <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                              <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                              </div>
                              </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="w-3 h-3 mr-2 text-muted-foreground" />
                              <span className="truncate max-w-32">{patient.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="w-3 h-3 mr-2 text-muted-foreground" />
                              <span>{patient.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{patient.condition}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Heart className="w-3 h-3 mr-1" />
                              <span>BP: {patient.bloodPressure}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm">{patient.lastVisit}</p>
                            {patient.nextAppointment && (
                              <p className="text-xs text-muted-foreground">
                                Next: {patient.nextAppointment}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(patient.status)} className="capitalize">
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewPatientProfile(patient.id)}
                              className="h-8"
                            >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCallPatient(patient.phone)}
                              className="h-8"
                            >
                              <Phone className="w-3 h-3" />
                              </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMessagePatient(patient.email)}
                              className="h-8"
                            >
                              <MessageSquare className="w-3 h-3" />
                              </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                              </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  itemsPerPageOptions={[5, 10, 15, 20, 25]}
                />
                  </CardContent>
                </Card>
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {patients.map((patient) => (
                <Card key={patient.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{patient.name}</span>
                      <Badge variant={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Vital Signs</p>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>BP: {patient.bloodPressure}</p>
                            <p>Weight: {patient.weight}</p>
                            <p>Height: {patient.height}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Conditions</p>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Current Medications</p>
                        <div className="space-y-1">
                          {patient.medications.length > 0 ? (
                            patient.medications.map((med, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {med}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No medications</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Allergies</p>
                        <div className="space-y-1">
                          {patient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive" className="mr-2">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="w-3 h-3 mr-1" />
                          View Records
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Visit History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <Badge variant={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Last Visit</p>
                          <p className="text-muted-foreground">{patient.lastVisit}</p>
                        </div>
                        <div>
                          <p className="font-medium">Next Appointment</p>
                          <p className="text-muted-foreground">{patient.nextAppointment || 'Not scheduled'}</p>
                        </div>
                        <div>
                          <p className="font-medium">Total Visits</p>
                          <p className="text-muted-foreground">12</p>
                        </div>
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

export default DoctorPatients;
