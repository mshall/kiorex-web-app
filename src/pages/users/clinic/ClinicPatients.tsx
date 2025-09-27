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
  MapPin,
  Clock,
  Mail,
  UserPlus,
  Activity,
  UserCheck,
  UserX,
  UserPlus as NewUser
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";

const ClinicPatients = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

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
      doctor: "Dr. Smith",
      nextAppointment: "2024-01-20",
      address: "123 Main St, New York, NY"
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
      doctor: "Dr. Johnson",
      nextAppointment: "2024-01-18",
      address: "456 Oak Ave, Brooklyn, NY"
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
      doctor: "Dr. Brown",
      nextAppointment: null,
      address: "789 Pine Rd, Manhattan, NY"
    },
    { 
      id: 4, 
      name: "John Smith", 
      age: 55, 
      email: "john.s@email.com",
      phone: "+1-555-0126",
      lastVisit: "2024-01-12", 
      status: "active", 
      condition: "Cardiovascular",
      doctor: "Dr. Smith",
      nextAppointment: "2024-01-22",
      address: "321 Elm St, Queens, NY"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter patients
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
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessagePatient = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const handleViewPatientProfile = (patientId: number) => {
    // Navigate to patient profile with clinic context
    window.location.href = `/patient-profile/${patientId}?userType=clinic&providerType=Clinic`;
  };

  const handleDeletePatient = (patientId: number) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
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
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Management</h1>
          <p className="text-muted-foreground">Manage all clinic patients and their information</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Age</Label>
                    <Input type="number" placeholder="Enter age" />
                  </div>
                  <div>
                    <Label>Assigned Doctor</Label>
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
                </div>
                <div>
                  <Label>Address</Label>
                  <Input placeholder="Enter full address" />
                </div>
                <div>
                  <Label>Medical Condition</Label>
                  <Input placeholder="Enter primary condition" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Add Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Patient Overview Cards - Smaller and above table */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
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
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
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
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <UserX className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <NewUser className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Width Patients Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Patients ({totalItems})
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
                  <TableHead>Doctor</TableHead>
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
                          <span>Last: {patient.lastVisit}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{patient.doctor}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate max-w-24">{patient.address}</span>
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
                          <Calendar className="w-3 h-3" />
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
      </div>
    </div>
  );
};

export default ClinicPatients;
