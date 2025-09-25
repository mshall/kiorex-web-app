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
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Phone,
  MessageSquare,
  Calendar,
  User,
  MapPin,
  CreditCard,
  FileText,
  Download,
  Printer
} from "lucide-react";

const PharmacyOrders = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'pharmacy';
  const providerType = location.state?.providerType || 'Pharmacy';

  const [orders, setOrders] = useState([
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      doctor: "Dr. Smith", 
      medications: ["Lisinopril 10mg", "Metformin 500mg"], 
      date: "2024-01-16",
      time: "09:30 AM",
      status: "processing",
      priority: "medium",
      totalAmount: 45.50,
      paymentMethod: "Insurance",
      address: "123 Main St, New York, NY",
      phone: "+1-555-0123",
      notes: "Patient has mobility issues, needs home delivery"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      doctor: "Dr. Johnson", 
      medications: ["Amoxicillin 500mg", "Ibuprofen 200mg"], 
      date: "2024-01-16",
      time: "11:15 AM",
      status: "ready",
      priority: "high",
      totalAmount: 28.75,
      paymentMethod: "Credit Card",
      address: "456 Oak Ave, Brooklyn, NY",
      phone: "+1-555-0124",
      notes: "Urgent prescription, patient waiting"
    },
    { 
      id: 3, 
      patient: "Emily White", 
      doctor: "Dr. Brown", 
      medications: ["Hydrocortisone Cream 2.5%"], 
      date: "2024-01-16",
      time: "02:00 PM",
      status: "delivered",
      priority: "low",
      totalAmount: 12.99,
      paymentMethod: "Cash",
      address: "789 Pine Rd, Manhattan, NY",
      phone: "+1-555-0125",
      notes: "Delivered successfully"
    },
    { 
      id: 4, 
      patient: "John Smith", 
      doctor: "Dr. Wilson", 
      medications: ["Atorvastatin 20mg", "Omeprazole 20mg"], 
      date: "2024-01-16",
      time: "04:30 PM",
      status: "pending",
      priority: "medium",
      totalAmount: 67.25,
      paymentMethod: "Insurance",
      address: "321 Elm St, Queens, NY",
      phone: "+1-555-0126",
      notes: "Regular monthly refill"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.medications.some(med => med.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'ready': return 'outline';
      case 'delivered': return 'secondary';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'ready': return CheckCircle;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Prescription Orders</h1>
          <p className="text-muted-foreground">Manage prescription orders, processing, and delivery</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by patient, doctor, or medication..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
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
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Prescription Order</DialogTitle>
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
                  <Label>Doctor</Label>
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
                <div>
                  <Label>Medications</Label>
                  <Input placeholder="Enter medications (comma separated)" />
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
                  <Label>Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Input placeholder="Additional notes" />
                </div>
                <Button className="w-full">Create Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="ready">Ready for Pickup</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Orders ({filteredOrders.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                          <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{order.patient}</h3>
                                <div className="flex space-x-2">
                                  <Badge variant={getStatusColor(order.status)}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {order.status}
                                  </Badge>
                                  <Badge variant={getPriorityColor(order.priority)}>
                                    {order.priority}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <p><strong>Doctor:</strong> {order.doctor}</p>
                                  <p><strong>Time:</strong> {order.time}</p>
                                </div>
                                <div>
                                  <p><strong>Amount:</strong> ${order.totalAmount}</p>
                                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm font-medium">Medications:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {order.medications.map((med, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {med}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {order.address}
                                </span>
                                <span className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {order.phone}
                                </span>
                              </div>
                              {order.notes && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  <strong>Notes:</strong> {order.notes}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col space-y-2 ml-4">
                              {order.status === 'pending' && (
                                <Button size="sm" onClick={() => handleStatusChange(order.id, 'processing')}>
                                  <Package className="w-3 h-3 mr-1" />
                                  Start Processing
                                </Button>
                              )}
                              {order.status === 'processing' && (
                                <Button size="sm" onClick={() => handleStatusChange(order.id, 'ready')}>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Mark Ready
                                </Button>
                              )}
                              {order.status === 'ready' && (
                                <Button size="sm" onClick={() => handleStatusChange(order.id, 'delivered')}>
                                  <Truck className="w-3 h-3 mr-1" />
                                  Mark Delivered
                                </Button>
                              )}
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleCallPatient(order.phone)}>
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
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Printer className="w-3 h-3 mr-1" />
                                  Print Label
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-3 h-3 mr-1" />
                                  Receipt
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
                    <CardTitle>Order Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Orders</span>
                        <span className="font-semibold">{orders.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pending</span>
                        <span className="font-semibold text-yellow-600">
                          {orders.filter(order => order.status === 'pending').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Processing</span>
                        <span className="font-semibold text-blue-600">
                          {orders.filter(order => order.status === 'processing').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ready</span>
                        <span className="font-semibold text-green-600">
                          {orders.filter(order => order.status === 'ready').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Delivered</span>
                        <span className="font-semibold text-gray-600">
                          {orders.filter(order => order.status === 'delivered').length}
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
                        New Order
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Package className="w-4 h-4 mr-2" />
                        Inventory Check
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Truck className="w-4 h-4 mr-2" />
                        Delivery Schedule
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
                        <span>Order #3 delivered to Emily White</span>
                        <span className="text-muted-foreground ml-auto">30 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Order #2 marked ready</span>
                        <span className="text-muted-foreground ml-auto">1 hour ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>New order received from Dr. Wilson</span>
                        <span className="text-muted-foreground ml-auto">2 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs would have similar content but filtered by status */}
          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Pending orders will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Processing orders will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ready" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ready for Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Ready orders will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivered" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivered Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Delivered orders will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PharmacyOrders;
