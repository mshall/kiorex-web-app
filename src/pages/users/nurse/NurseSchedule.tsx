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
  Users, 
  MapPin, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  MessageSquare,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

const NurseSchedule = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'nurse';
  const providerType = location.state?.providerType || 'Nurse';

  const [schedule, setSchedule] = useState([
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      time: "09:00 AM", 
      date: "2024-01-16",
      type: "Home Visit", 
      status: "scheduled",
      location: "123 Main St, New York, NY",
      duration: "60 min",
      task: "Blood pressure check and medication administration",
      priority: "medium",
      notes: "Patient has mobility issues"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      time: "11:00 AM", 
      date: "2024-01-16",
      type: "Clinic Visit", 
      status: "in-progress",
      location: "City Medical Center",
      duration: "45 min",
      task: "Wound care and dressing change",
      priority: "high",
      notes: "Post-surgical care"
    },
    { 
      id: 3, 
      patient: "Emily White", 
      time: "02:00 PM", 
      date: "2024-01-16",
      type: "Home Visit", 
      status: "completed",
      location: "789 Pine Rd, Manhattan, NY",
      duration: "30 min",
      task: "Vital signs monitoring",
      priority: "low",
      notes: "Routine check-up"
    },
    { 
      id: 4, 
      patient: "John Smith", 
      time: "04:00 PM", 
      date: "2024-01-16",
      type: "Home Visit", 
      status: "pending",
      location: "321 Elm St, Queens, NY",
      duration: "90 min",
      task: "Physical therapy assistance",
      priority: "medium",
      notes: "Stroke recovery patient"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const handleStatusChange = (scheduleId: number, newStatus: string) => {
    setSchedule(prev => prev.map(item => 
      item.id === scheduleId ? { ...item, status: newStatus } : item
    ));
  };

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const filteredSchedule = schedule.filter(item => {
    const matchesSearch = item.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.task.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'in-progress': return 'secondary';
      case 'completed': return 'outline';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Home Visit' ? MapPin : Users;
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Nursing Schedule</h1>
          <p className="text-muted-foreground">Manage your patient visits and care tasks</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients or tasks..."
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
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Home Visit">Home Visit</SelectItem>
              <SelectItem value="Clinic Visit">Clinic Visit</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Visit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Visit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient1">Sarah Johnson</SelectItem>
                      <SelectItem value="patient2">Michael Brown</SelectItem>
                      <SelectItem value="patient3">Emily White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Visit Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Visit</SelectItem>
                      <SelectItem value="clinic">Clinic Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div>
                  <Label>Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Task Description</Label>
                  <Input placeholder="Enter task description" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Input placeholder="Additional notes" />
                </div>
                <Button className="w-full">Schedule Visit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Schedule List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule ({filteredSchedule.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSchedule.map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{item.patient}</h3>
                            <div className="flex space-x-2">
                              <Badge variant={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                              <Badge variant={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p><strong>Task:</strong> {item.task}</p>
                              <p><strong>Type:</strong> {item.type}</p>
                            </div>
                            <div>
                              <p><strong>Time:</strong> {item.time}</p>
                              <p><strong>Duration:</strong> {item.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="flex items-center">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {item.location}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <strong>Notes:</strong> {item.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          {item.status === 'scheduled' && (
                            <Button size="sm" onClick={() => handleStatusChange(item.id, 'in-progress')}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                          )}
                          {item.status === 'in-progress' && (
                            <Button size="sm" onClick={() => handleStatusChange(item.id, 'completed')}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Message
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Visits</span>
                    <span className="font-semibold">{schedule.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold text-green-600">
                      {schedule.filter(item => item.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">In Progress</span>
                    <span className="font-semibold text-blue-600">
                      {schedule.filter(item => item.status === 'in-progress').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-semibold text-yellow-600">
                      {schedule.filter(item => item.status === 'pending').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visit Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Home Visits</span>
                    <span className="font-semibold">
                      {schedule.filter(item => item.type === 'Home Visit').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clinic Visits</span>
                    <span className="font-semibold">
                      {schedule.filter(item => item.type === 'Clinic Visit').length}
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
                    Schedule New Visit
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Patient List
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Care Plans
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
                    <span>Visit with Sarah Johnson completed</span>
                    <span className="text-muted-foreground ml-auto">30 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Started visit with Michael Brown</span>
                    <span className="text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>New visit scheduled</span>
                    <span className="text-muted-foreground ml-auto">2 hours ago</span>
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

export default NurseSchedule;
