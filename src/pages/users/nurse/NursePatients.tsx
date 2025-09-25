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
  User,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  FileText
} from "lucide-react";

const NursePatients = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'nurse';
  const providerType = location.state?.providerType || 'Nurse';

  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      age: 45,
      condition: "Diabetes Management", 
      lastVisit: "2024-01-18",
      nextAppointment: "2024-01-25",
      status: "active",
      location: "Home Visit",
      priority: "medium",
      notes: "Requires daily insulin monitoring",
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6°F",
        bloodSugar: "140 mg/dL"
      }
    },
    { 
      id: 2, 
      name: "Michael Brown", 
      age: 67,
      condition: "Post-Surgery Care", 
      lastVisit: "2024-01-20",
      nextAppointment: "2024-01-22",
      status: "recovering",
      location: "Clinic Visit",
      priority: "high",
      notes: "Post-hip replacement surgery",
      vitalSigns: {
        bloodPressure: "135/85",
        heartRate: "68",
        temperature: "99.1°F",
        bloodSugar: "110 mg/dL"
      }
    },
    { 
      id: 3, 
      name: "Emily Davis", 
      age: 32,
      condition: "Prenatal Care", 
      lastVisit: "2024-01-19",
      nextAppointment: "2024-01-26",
      status: "stable",
      location: "Home Visit",
      priority: "medium",
      notes: "32 weeks pregnant, routine checkup",
      vitalSigns: {
        bloodPressure: "110/70",
        heartRate: "85",
        temperature: "98.4°F",
        bloodSugar: "95 mg/dL"
      }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleUpdateVitals = (patientId: number) => {
    console.log('Updating vitals for patient:', patientId);
  };

  const handleScheduleVisit = (patientId: number) => {
    console.log('Scheduling visit for patient:', patientId);
  };

  const handleViewHistory = (patientId: number) => {
    console.log('Viewing history for patient:', patientId);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || patient.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'recovering': return 'secondary';
      case 'stable': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Management</h1>
          <p className="text-muted-foreground">Manage your assigned patients and their care</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients or conditions..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="recovering">Recovering</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
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
                <div>
                  <Label>Age</Label>
                  <Input type="number" placeholder="Enter age" />
                </div>
                <div>
                  <Label>Condition</Label>
                  <Input placeholder="Enter medical condition" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Add Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Patients List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
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
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                            <Badge variant={getPriorityColor(patient.priority)}>
                              {patient.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Age:</strong> {patient.age}</p>
                            <p><strong>Condition:</strong> {patient.condition}</p>
                          </div>
                          <div>
                            <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
                            <p><strong>Next Appointment:</strong> {patient.nextAppointment}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {patient.location}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Notes:</strong> {patient.notes}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewHistory(patient.id)}>
                            <Eye className="w-3 h-3 mr-1" />
                            History
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleUpdateVitals(patient.id)}>
                            <Activity className="w-3 h-3 mr-1" />
                            Vitals
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleScheduleVisit(patient.id)}>
                            <Calendar className="w-3 h-3 mr-1" />
                            Schedule
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
                    <span className="text-sm">Active Cases</span>
                    <span className="font-semibold text-green-600">
                      {patients.filter(p => p.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Priority</span>
                    <span className="font-semibold text-red-600">
                      {patients.filter(p => p.priority === 'high').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Home Visits</span>
                    <span className="font-semibold text-blue-600">
                      {patients.filter(p => p.location === 'Home Visit').length}
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
                    Add New Patient
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Update Vitals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
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
                    <span>Vitals updated for Sarah Johnson</span>
                    <span className="text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Home visit scheduled</span>
                    <span className="text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>New patient assigned</span>
                    <span className="text-muted-foreground ml-auto">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursePatients;
