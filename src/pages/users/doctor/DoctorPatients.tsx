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
  CheckCircle
} from "lucide-react";

const DoctorPatients = () => {
  const location = useLocation();
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
          <p className="text-muted-foreground">Manage your patients and their medical information</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Patients ({filteredPatients.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{patient.name}</h3>
                              <Badge variant={getStatusColor(patient.status)}>
                                {patient.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div>
                                <p><strong>Age:</strong> {patient.age}</p>
                                <p><strong>Condition:</strong> {patient.condition}</p>
                                <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
                              </div>
                              <div>
                                <p><strong>Next Appointment:</strong> {patient.nextAppointment || 'Not scheduled'}</p>
                                <p><strong>Blood Pressure:</strong> {patient.bloodPressure}</p>
                                <p><strong>Weight:</strong> {patient.weight}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm">
                              <span className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {patient.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {patient.phone}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleCallPatient(patient.phone)}>
                                <Phone className="w-3 h-3 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleMessagePatient(patient.email)}>
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Email
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
                              <Button size="sm" variant="outline">
                                <Calendar className="w-3 h-3 mr-1" />
                                Schedule
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="w-3 h-3 mr-1" />
                                Records
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats and Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Patients</span>
                        <span className="font-semibold">{patients.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active</span>
                        <span className="font-semibold text-green-600">
                          {patients.filter(p => p.status === 'active').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Inactive</span>
                        <span className="font-semibold text-gray-600">
                          {patients.filter(p => p.status === 'inactive').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">New This Month</span>
                        <span className="font-semibold text-blue-600">8</span>
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
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add New Patient
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Appointment
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="w-4 h-4 mr-2" />
                        View Analytics
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
                        <span>Sarah Johnson checked in</span>
                        <span className="text-muted-foreground ml-auto">2 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>New patient registered</span>
                        <span className="text-muted-foreground ml-auto">15 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Prescription updated</span>
                        <span className="text-muted-foreground ml-auto">1 hour ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
