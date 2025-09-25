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
  UserPlus, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  UserCheck,
  UserX
} from "lucide-react";

const AdminUsers = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'admin';
  const providerType = location.state?.providerType || 'Admin';

  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      email: "sarah.j@email.com",
      phone: "+1-555-0123",
      role: "patient",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-16 09:30",
      location: "New York, NY",
      verified: true
    },
    { 
      id: 2, 
      name: "Dr. Michael Brown", 
      email: "dr.brown@email.com",
      phone: "+1-555-0124",
      role: "doctor",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-16 08:45",
      location: "Brooklyn, NY",
      verified: true
    },
    { 
      id: 3, 
      name: "Emily White", 
      email: "emily.w@email.com",
      phone: "+1-555-0125",
      role: "nurse",
      status: "inactive",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-14 16:20",
      location: "Manhattan, NY",
      verified: false
    },
    { 
      id: 4, 
      name: "John Smith", 
      email: "john.s@email.com",
      phone: "+1-555-0126",
      role: "pharmacy",
      status: "active",
      joinDate: "2024-01-08",
      lastLogin: "2024-01-16 10:15",
      location: "Queens, NY",
      verified: true
    },
    { 
      id: 5, 
      name: "City Medical Center", 
      email: "admin@citymedical.com",
      phone: "+1-555-0127",
      role: "clinic",
      status: "active",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-16 11:00",
      location: "New York, NY",
      verified: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleVerifyUser = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, verified: !user.verified } : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'primary';
      case 'doctor': return 'blue';
      case 'nurse': return 'green';
      case 'pharmacy': return 'purple';
      case 'clinic': return 'orange';
      case 'admin': return 'red';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'patient': return Users;
      case 'doctor': return Shield;
      case 'nurse': return Activity;
      case 'pharmacy': return Shield;
      case 'clinic': return Shield;
      case 'admin': return Shield;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage all platform users, roles, and permissions</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
              <SelectItem value="clinic">Clinic</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
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
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="Enter location" />
                </div>
                <Button className="w-full">Add User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="clinics">Clinics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Users ({filteredUsers.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredUsers.map((user) => {
                        const RoleIcon = getRoleIcon(user.role);
                        return (
                          <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{user.name}</h3>
                                <div className="flex space-x-2">
                                  <Badge variant={getRoleColor(user.role) as any}>
                                    <RoleIcon className="w-3 h-3 mr-1" />
                                    {user.role}
                                  </Badge>
                                  <Badge variant={getStatusColor(user.status)}>
                                    {user.status}
                                  </Badge>
                                  {user.verified ? (
                                    <Badge variant="outline" className="text-green-600">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-yellow-600">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Unverified
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <p><strong>Email:</strong> {user.email}</p>
                                  <p><strong>Phone:</strong> {user.phone}</p>
                                </div>
                                <div>
                                  <p><strong>Joined:</strong> {user.joinDate}</p>
                                  <p><strong>Last Login:</strong> {user.lastLogin}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {user.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2 ml-4">
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
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleVerifyUser(user.id)}
                                >
                                  {user.verified ? (
                                    <>
                                      <UserX className="w-3 h-3 mr-1" />
                                      Unverify
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="w-3 h-3 mr-1" />
                                      Verify
                                    </>
                                  )}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                                >
                                  {user.status === 'active' ? (
                                    <>
                                      <Ban className="w-3 h-3 mr-1" />
                                      Suspend
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Activate
                                    </>
                                  )}
                                </Button>
                              </div>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
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
                    <CardTitle>User Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Users</span>
                        <span className="font-semibold">{users.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active</span>
                        <span className="font-semibold text-green-600">
                          {users.filter(user => user.status === 'active').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Inactive</span>
                        <span className="font-semibold text-gray-600">
                          {users.filter(user => user.status === 'inactive').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Verified</span>
                        <span className="font-semibold text-blue-600">
                          {users.filter(user => user.verified).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Patients</span>
                        <span className="font-semibold">
                          {users.filter(user => user.role === 'patient').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Doctors</span>
                        <span className="font-semibold">
                          {users.filter(user => user.role === 'doctor').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Nurses</span>
                        <span className="font-semibold">
                          {users.filter(user => user.role === 'nurse').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pharmacies</span>
                        <span className="font-semibold">
                          {users.filter(user => user.role === 'pharmacy').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Clinics</span>
                        <span className="font-semibold">
                          {users.filter(user => user.role === 'clinic').length}
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
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add New User
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Manage Roles
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="w-4 h-4 mr-2" />
                        User Activity
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Notifications
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
                        <span>New user registered: Dr. Sarah Wilson</span>
                        <span className="text-muted-foreground ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>User verified: Emily White</span>
                        <span className="text-muted-foreground ml-auto">4 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>User suspended: John Doe</span>
                        <span className="text-muted-foreground ml-auto">6 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs would have similar content but filtered by role */}
          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Patient users will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Provider users will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clinic Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Clinic users will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUsers;
