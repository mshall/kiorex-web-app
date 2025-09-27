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
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Clock,
  Star,
  TrendingUp
} from "lucide-react";

const ClinicStaff = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [staff, setStaff] = useState([
    { 
      id: 1, 
      name: "Dr. Sarah Johnson", 
      role: "Chief Medical Officer", 
      department: "General Medicine",
      email: "sarah.johnson@clinic.com",
      phone: "+1-555-0101",
      hireDate: "2020-03-15",
      salary: 120000,
      status: "active",
      patients: 45,
      rating: 4.8,
      address: "123 Main St, New York, NY"
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      role: "Cardiologist", 
      department: "Cardiology",
      email: "michael.chen@clinic.com",
      phone: "+1-555-0102",
      hireDate: "2019-08-20",
      salary: 135000,
      status: "active",
      patients: 38,
      rating: 4.9,
      address: "456 Oak Ave, New York, NY"
    },
    { 
      id: 3, 
      name: "Dr. Emily Rodriguez", 
      role: "Pediatrician", 
      department: "Pediatrics",
      email: "emily.rodriguez@clinic.com",
      phone: "+1-555-0103",
      hireDate: "2021-01-10",
      salary: 110000,
      status: "active",
      patients: 52,
      rating: 4.7,
      address: "789 Pine St, New York, NY"
    },
    { 
      id: 4, 
      name: "Dr. James Wilson", 
      role: "Orthopedic Surgeon", 
      department: "Orthopedics",
      email: "james.wilson@clinic.com",
      phone: "+1-555-0104",
      hireDate: "2018-06-05",
      salary: 150000,
      status: "on-leave",
      patients: 28,
      rating: 4.6,
      address: "321 Elm St, New York, NY"
    },
    { 
      id: 5, 
      name: "Dr. Lisa Thompson", 
      role: "Dermatologist", 
      department: "Dermatology",
      email: "lisa.thompson@clinic.com",
      phone: "+1-555-0105",
      hireDate: "2022-02-14",
      salary: 125000,
      status: "active",
      patients: 41,
      rating: 4.8,
      address: "654 Maple Dr, New York, NY"
    },
    { 
      id: 6, 
      name: "Dr. Robert Garcia", 
      role: "Neurologist", 
      department: "Neurology",
      email: "robert.garcia@clinic.com",
      phone: "+1-555-0106",
      hireDate: "2017-11-08",
      salary: 140000,
      status: "active",
      patients: 33,
      rating: 4.9,
      address: "987 Cedar Ln, New York, NY"
    },
    { 
      id: 7, 
      name: "Dr. Jennifer Lee", 
      role: "Gynecologist", 
      department: "Gynecology",
      email: "jennifer.lee@clinic.com",
      phone: "+1-555-0107",
      hireDate: "2020-09-12",
      salary: 130000,
      status: "active",
      patients: 47,
      rating: 4.7,
      address: "147 Birch St, New York, NY"
    },
    { 
      id: 8, 
      name: "Dr. David Kim", 
      role: "Psychiatrist", 
      department: "Psychiatry",
      email: "david.kim@clinic.com",
      phone: "+1-555-0108",
      hireDate: "2019-04-22",
      salary: 115000,
      status: "on-leave",
      patients: 25,
      rating: 4.5,
      address: "258 Spruce Ave, New York, NY"
    },
    { 
      id: 9, 
      name: "Dr. Maria Santos", 
      role: "Ophthalmologist", 
      department: "Ophthalmology",
      email: "maria.santos@clinic.com",
      phone: "+1-555-0109",
      hireDate: "2021-07-03",
      salary: 128000,
      status: "active",
      patients: 39,
      rating: 4.8,
      address: "369 Willow Rd, New York, NY"
    },
    { 
      id: 10, 
      name: "Dr. Thomas Anderson", 
      role: "Urologist", 
      department: "Urology",
      email: "thomas.anderson@clinic.com",
      phone: "+1-555-0110",
      hireDate: "2018-12-18",
      salary: 142000,
      status: "active",
      patients: 31,
      rating: 4.6,
      address: "741 Poplar St, New York, NY"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Filter staff
  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Pagination logic
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedStaff,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredStaff,
    initialPage: 1,
    initialItemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'on-leave': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <UserCheck className="w-4 h-4" />;
      case 'on-leave': return <Clock className="w-4 h-4" />;
      case 'inactive': return <UserX className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalStaff = staff.length;
  const activeStaff = staff.filter(member => member.status === 'active').length;
  const totalSalary = staff.reduce((sum, member) => sum + member.salary, 0);
  const averageSalary = totalSalary / staff.length;
  const totalPatients = staff.reduce((sum, member) => sum + member.patients, 0);

  const handleAddStaff = (newStaff: any) => {
    const staffMember = {
      ...newStaff,
      id: staff.length + 1,
      patients: 0,
      rating: 5.0
    };
    setStaff([...staff, staffMember]);
    setIsAddDialogOpen(false);
  };

  const handleEditStaff = (updatedStaff: any) => {
    setStaff(staff.map(member => 
      member.id === updatedStaff.id ? updatedStaff : member
    ));
    setIsEditDialogOpen(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (staffId: number) => {
    setStaff(staff.filter(member => member.id !== staffId));
  };

  const departments = [...new Set(staff.map(member => member.department))];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userType={userType} providerType={providerType} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
            <p className="text-muted-foreground">Manage clinic staff, salaries, and performance</p>
          </div>

          {/* Staff Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Staff</p>
                    <p className="text-2xl font-bold">{totalStaff}</p>
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
                    <p className="text-sm text-muted-foreground">Active Staff</p>
                    <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
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
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-2xl font-bold text-purple-600">{totalPatients}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Salary</p>
                    <p className="text-2xl font-bold text-orange-600">${averageSalary.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Staff Members ({totalItems})
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
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(department => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Staff
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Staff Member</DialogTitle>
                      </DialogHeader>
                      <AddEditStaffForm onSubmit={handleAddStaff} />
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
                    <TableHead>Role & Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Patients</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStaff.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Hired: {new Date(member.hireDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.role}</p>
                          <Badge variant="outline">{member.department}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-2 text-muted-foreground" />
                            <span className="truncate max-w-32">{member.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-2 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">${member.salary.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Annual</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{member.patients}</span>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{member.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(member.status)} className="flex items-center space-x-1">
                          {getStatusIcon(member.status)}
                          <span className="capitalize">{member.status.replace('-', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedStaff(member);
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
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteStaff(member.id)}
                            className="h-8"
                          >
                            <Trash2 className="w-3 h-3" />
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
                <DialogTitle>Edit Staff Member</DialogTitle>
              </DialogHeader>
              <AddEditStaffForm 
                staff={selectedStaff} 
                onSubmit={handleEditStaff} 
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedStaff(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Staff Form Component
const AddEditStaffForm = ({ staff, onSubmit, onCancel }: { 
  staff?: any, 
  onSubmit: (staff: any) => void, 
  onCancel?: () => void 
}) => {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    role: staff?.role || '',
    department: staff?.department || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    hireDate: staff?.hireDate || new Date().toISOString().split('T')[0],
    salary: staff?.salary || 0,
    status: staff?.status || 'active',
    address: staff?.address || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Role/Position</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Medicine">General Medicine</SelectItem>
              <SelectItem value="Cardiology">Cardiology</SelectItem>
              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
              <SelectItem value="Orthopedics">Orthopedics</SelectItem>
              <SelectItem value="Dermatology">Dermatology</SelectItem>
              <SelectItem value="Neurology">Neurology</SelectItem>
              <SelectItem value="Emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hireDate">Hire Date</Label>
          <Input
            id="hireDate"
            type="date"
            value={formData.hireDate}
            onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="salary">Annual Salary ($)</Label>
          <Input
            id="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value) || 0})}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {staff ? 'Update Staff' : 'Add Staff'}
        </Button>
      </div>
    </form>
  );
};

export default ClinicStaff;
