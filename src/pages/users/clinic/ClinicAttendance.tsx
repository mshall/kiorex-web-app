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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserX,
  CalendarDays,
  BarChart3,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Download
} from "lucide-react";

const ClinicAttendance = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [attendance, setAttendance] = useState([
    { 
      id: 1, 
      staffId: 1,
      staffName: "Dr. Sarah Johnson", 
      date: "2024-01-15",
      checkIn: "08:30",
      checkOut: "17:45",
      status: "present",
      hoursWorked: 9.25,
      overtime: 0.25,
      notes: "On time"
    },
    { 
      id: 2, 
      staffId: 2,
      staffName: "Dr. Michael Chen", 
      date: "2024-01-15",
      checkIn: "09:15",
      checkOut: "18:00",
      status: "late",
      hoursWorked: 8.75,
      overtime: 0,
      notes: "Traffic delay"
    },
    { 
      id: 3, 
      staffId: 3,
      staffName: "Dr. Emily Rodriguez", 
      date: "2024-01-15",
      checkIn: "08:00",
      checkOut: "16:30",
      status: "present",
      hoursWorked: 8.5,
      overtime: 0,
      notes: "Left early for appointment"
    },
    { 
      id: 4, 
      staffId: 4,
      staffName: "Dr. James Wilson", 
      date: "2024-01-15",
      checkIn: null,
      checkOut: null,
      status: "absent",
      hoursWorked: 0,
      overtime: 0,
      notes: "Sick leave"
    },
    { 
      id: 5, 
      staffId: 5,
      staffName: "Dr. Lisa Thompson", 
      date: "2024-01-15",
      checkIn: "08:45",
      checkOut: "17:30",
      status: "present",
      hoursWorked: 8.75,
      overtime: 0,
      notes: "Regular day"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  // Filter attendance
  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.staffName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDate = dateFilter === 'all' || record.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination logic
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedAttendance,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredAttendance,
    initialPage: 1,
    initialItemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'default';
      case 'late': return 'secondary';
      case 'absent': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertTriangle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Calculate attendance insights
  const totalStaff = 5; // Total staff members
  const presentToday = attendance.filter(record => record.status === 'present').length;
  const lateToday = attendance.filter(record => record.status === 'late').length;
  const absentToday = attendance.filter(record => record.status === 'absent').length;
  const attendanceRate = ((presentToday + lateToday) / totalStaff) * 100;
  const totalHoursWorked = attendance.reduce((sum, record) => sum + record.hoursWorked, 0);
  const averageHoursPerStaff = totalHoursWorked / totalStaff;

  const handleAddAttendance = (newAttendance: any) => {
    const attendanceRecord = {
      ...newAttendance,
      id: attendance.length + 1,
      hoursWorked: newAttendance.checkIn && newAttendance.checkOut ? 
        calculateHours(newAttendance.checkIn, newAttendance.checkOut) : 0,
      overtime: 0
    };
    setAttendance([...attendance, attendanceRecord]);
    setIsAddDialogOpen(false);
  };

  const handleEditAttendance = (updatedAttendance: any) => {
    setAttendance(attendance.map(record => 
      record.id === updatedAttendance.id ? {
        ...updatedAttendance,
        hoursWorked: updatedAttendance.checkIn && updatedAttendance.checkOut ? 
          calculateHours(updatedAttendance.checkIn, updatedAttendance.checkOut) : 0
      } : record
    ));
    setIsEditDialogOpen(false);
    setSelectedAttendance(null);
  };

  const calculateHours = (checkIn: string, checkOut: string) => {
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    return (outMinutes - inMinutes) / 60;
  };

  const staffMembers = [
    { id: 1, name: "Dr. Sarah Johnson", department: "General Medicine" },
    { id: 2, name: "Dr. Michael Chen", department: "Cardiology" },
    { id: 3, name: "Dr. Emily Rodriguez", department: "Pediatrics" },
    { id: 4, name: "Dr. James Wilson", department: "Orthopedics" },
    { id: 5, name: "Dr. Lisa Thompson", department: "Dermatology" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userType={userType} providerType={providerType} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Staff Attendance</h1>
            <p className="text-muted-foreground">Track and manage staff attendance, working hours, and attendance insights</p>
          </div>

          {/* Attendance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Present Today</p>
                    <p className="text-2xl font-bold text-green-600">{presentToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Late Today</p>
                    <p className="text-2xl font-bold text-yellow-600">{lateToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Absent Today</p>
                    <p className="text-2xl font-bold text-red-600">{absentToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold text-blue-600">{attendanceRate.toFixed(1)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Working Hours Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Hours Today</span>
                    <span className="font-semibold">{totalHoursWorked.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average per Staff</span>
                    <span className="font-semibold">{averageHoursPerStaff.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overtime Hours</span>
                    <span className="font-semibold text-orange-600">2.5h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Monthly Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Working Days</span>
                    <span className="font-semibold">22</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Present Days</span>
                    <span className="font-semibold text-green-600">20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Absent Days</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-sm font-medium">Monthly Rate</span>
                    <span className="font-semibold text-blue-600">90.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Daily Attendance ({totalItems})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search staff..."
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
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="2024-01-15">Today</SelectItem>
                      <SelectItem value="2024-01-14">Yesterday</SelectItem>
                      <SelectItem value="2024-01-13">2 days ago</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Record
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Attendance Record</DialogTitle>
                      </DialogHeader>
                      <AddEditAttendanceForm onSubmit={handleAddAttendance} staffMembers={staffMembers} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours Worked</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAttendance.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {record.staffName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{record.staffName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{record.checkIn || '--'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{record.checkOut || '--'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{record.hoursWorked.toFixed(1)}h</p>
                          {record.overtime > 0 && (
                            <p className="text-sm text-orange-600">+{record.overtime}h OT</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)} className="flex items-center space-x-1">
                          {getStatusIcon(record.status)}
                          <span className="capitalize">{record.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{record.notes}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedAttendance(record);
                              setIsEditDialogOpen(true);
                            }}
                            className="h-8"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                          >
                            <Eye className="w-3 h-3" />
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

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Attendance Record</DialogTitle>
              </DialogHeader>
              <AddEditAttendanceForm 
                record={selectedAttendance} 
                onSubmit={handleEditAttendance} 
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedAttendance(null);
                }}
                staffMembers={staffMembers}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Attendance Form Component
const AddEditAttendanceForm = ({ record, onSubmit, onCancel, staffMembers }: { 
  record?: any, 
  onSubmit: (record: any) => void, 
  onCancel?: () => void,
  staffMembers: any[]
}) => {
  const [formData, setFormData] = useState({
    staffId: record?.staffId || '',
    date: record?.date || new Date().toISOString().split('T')[0],
    checkIn: record?.checkIn || '',
    checkOut: record?.checkOut || '',
    status: record?.status || 'present',
    notes: record?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const staffName = staffMembers.find(s => s.id === parseInt(formData.staffId))?.name || '';
    onSubmit({
      ...formData,
      staffId: parseInt(formData.staffId),
      staffName
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="staffId">Staff Member</Label>
          <Select value={formData.staffId} onValueChange={(value) => setFormData({...formData, staffId: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              {staffMembers.map(member => (
                <SelectItem key={member.id} value={member.id.toString()}>{member.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="checkIn">Check In Time</Label>
          <Input
            id="checkIn"
            type="time"
            value={formData.checkIn}
            onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="checkOut">Check Out Time</Label>
          <Input
            id="checkOut"
            type="time"
            value={formData.checkOut}
            onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="Optional notes..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {record ? 'Update Record' : 'Add Record'}
        </Button>
      </div>
    </form>
  );
};

export default ClinicAttendance;
