import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Heart, 
  Activity, 
  Users, 
  DollarSign,
  FileText,
  Building,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Search,
  Filter,
  Clock,
  Stethoscope,
  Pill,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Input } from "@/components/ui/input";

const ClinicManagement = () => {
  const [appointments] = useState([
    { 
      id: 1, 
      time: "09:00 AM", 
      patient: "Sarah Johnson", 
      doctor: "Dr. Smith", 
      type: "Consultation",
      status: "confirmed",
      revenue: 150
    },
    { 
      id: 2, 
      time: "10:30 AM", 
      patient: "Michael Brown", 
      doctor: "Dr. Chen", 
      type: "Follow-up",
      status: "checked-in",
      revenue: 100
    }
  ]);

  const [staff] = useState([
    {
      id: 1,
      name: "Dr. Emily Smith",
      role: "Cardiologist",
      status: "active",
      patients: 12,
      schedule: "9 AM - 5 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "General Physician",
      status: "active",
      patients: 8,
      schedule: "10 AM - 6 PM"
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Nurse",
      status: "active",
      patients: 15,
      schedule: "8 AM - 4 PM"
    }
  ]);

  const [inventory] = useState([
    {
      id: 1,
      item: "Paracetamol 500mg",
      category: "Medication",
      stock: 150,
      minStock: 50,
      cost: 0.50,
      status: "in-stock"
    },
    {
      id: 2,
      item: "Blood Pressure Monitor",
      category: "Equipment",
      stock: 5,
      minStock: 3,
      cost: 120.00,
      status: "low-stock"
    },
    {
      id: 3,
      item: "Disposable Syringes",
      category: "Supplies",
      stock: 25,
      minStock: 100,
      cost: 0.25,
      status: "critical"
    }
  ]);

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Kiorex
                </span>
              </div>
              <span className="text-muted-foreground">Clinic Management</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">C</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">City Medical Center Dashboard 🏥</h1>
          <p className="text-muted-foreground">Complete clinic management and analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-primary">24</p>
                  <div className="flex items-center text-sm text-success">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from yesterday
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Staff</p>
                  <p className="text-2xl font-bold text-secondary">15</p>
                  <div className="flex items-center text-sm text-info">
                    <Users className="w-3 h-3 mr-1" />
                    3 on duty now
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Revenue</p>
                  <p className="text-2xl font-bold text-accent">$8,450</p>
                  <div className="flex items-center text-sm text-success">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% from target
                  </div>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Alerts</p>
                  <p className="text-2xl font-bold text-warning">3</p>
                  <div className="flex items-center text-sm text-warning">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Items low on stock
                  </div>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="ehr">EHR System</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Appointment Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="medical">
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Time</th>
                        <th className="text-left p-4 font-semibold">Patient</th>
                        <th className="text-left p-4 font-semibold">Doctor</th>
                        <th className="text-left p-4 font-semibold">Type</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Revenue</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-t hover:bg-muted/25">
                          <td className="p-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                              {appointment.time}
                            </div>
                          </td>
                          <td className="p-4 font-medium">{appointment.patient}</td>
                          <td className="p-4">{appointment.doctor}</td>
                          <td className="p-4">
                            <Badge variant="outline">{appointment.type}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={appointment.status === "confirmed" ? "secondary" : "default"}>
                              {appointment.status}
                            </Badge>
                          </td>
                          <td className="p-4 font-semibold text-accent">${appointment.revenue}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Staff Management</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </div>

            <div className="grid gap-4">
              {staff.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-muted-foreground">{member.role}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {member.schedule}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              <Users className="w-4 h-4 inline mr-1" />
                              {member.patients} patients today
                            </span>
                            <Badge variant={member.status === "active" ? "secondary" : "outline"}>
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Schedule</Button>
                        <Button variant="outline" size="sm">Edit Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Inventory Management</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Item</th>
                        <th className="text-left p-4 font-semibold">Category</th>
                        <th className="text-left p-4 font-semibold">Stock</th>
                        <th className="text-left p-4 font-semibold">Min Stock</th>
                        <th className="text-left p-4 font-semibold">Unit Cost</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/25">
                          <td className="p-4 font-medium">{item.item}</td>
                          <td className="p-4">{item.category}</td>
                          <td className="p-4">{item.stock}</td>
                          <td className="p-4">{item.minStock}</td>
                          <td className="p-4">${item.cost.toFixed(2)}</td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                item.status === "in-stock" ? "secondary" :
                                item.status === "low-stock" ? "default" : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Reorder</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Billing & Finance</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                Generate Invoice
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-accent" />
                    Revenue Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Today</span>
                      <span className="font-semibold">$8,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">This Week</span>
                      <span className="font-semibold">$45,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-semibold">$186,750</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Outstanding Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Payment</span>
                      <span className="font-semibold text-warning">$12,350</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Overdue</span>
                      <span className="font-semibold text-destructive">$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Outstanding</span>
                      <span className="font-semibold">$15,550</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-secondary" />
                    Insurance Claims
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Submitted</span>
                      <span className="font-semibold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Approved</span>
                      <span className="font-semibold text-success">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending</span>
                      <span className="font-semibold text-warning">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reports & Analytics</h2>
              <Button variant="medical">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Flow Analytics</CardTitle>
                  <CardDescription>Daily patient volume trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">📊 Patient Flow Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">💰 Revenue Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ehr" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Electronic Health Records</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                New Patient Record
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>EHR System Access</CardTitle>
                <CardDescription>Integrated electronic health records management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Electronic Health Records</h3>
                  <p className="text-muted-foreground mb-6">
                    Access patient records, medical history, and clinical documentation
                  </p>
                  <Button variant="medical" size="lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Launch EHR System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClinicManagement;