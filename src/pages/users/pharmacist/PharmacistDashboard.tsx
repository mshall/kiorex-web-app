import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Heart, 
  Activity, 
  Users, 
  Clock,
  Video,
  FileText,
  Pill,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Package, // For inventory
  Truck, // For delivery
  DollarSign, // For earnings
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Phone,
  Stethoscope,
  ShoppingCart,
  TrendingUp,
  Clock3
} from "lucide-react";
import { Input } from "@/components/ui/input";

const PharmacistDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'pharmacist';
  const providerType = location.state?.providerType || 'Pharmacist';

  const [prescriptions] = useState([
    { id: 1, patient: "John Doe", medication: "Lisinopril 10mg", status: "pending", priority: "normal", date: "2024-01-15" },
    { id: 2, patient: "Jane Smith", medication: "Metformin 500mg", status: "ready", priority: "high", date: "2024-01-15" },
    { id: 3, patient: "Emily White", medication: "Atorvastatin 20mg", status: "dispensed", priority: "normal", date: "2024-01-14" },
  ]);

  const [inventory] = useState([
    { id: 1, name: "Lisinopril 10mg", stock: 45, threshold: 20, status: "good" },
    { id: 2, name: "Metformin 500mg", stock: 12, threshold: 15, status: "low" },
    { id: 3, name: "Atorvastatin 20mg", stock: 78, threshold: 25, status: "good" },
  ]);

  const [deliveries] = useState([
    { id: 1, patient: "John Doe", address: "123 Main St", status: "pending", time: "2:00 PM" },
    { id: 2, patient: "Jane Smith", address: "456 Oak Ave", status: "in-transit", time: "3:30 PM" },
    { id: 3, patient: "Emily White", address: "789 Pine Rd", status: "delivered", time: "1:15 PM" },
  ]);

  const quickActions = [
    { title: 'New Prescription', icon: Plus, action: () => console.log('New Prescription') },
    { title: 'Check Inventory', icon: Package, action: () => console.log('Check Inventory') },
    { title: 'Process Delivery', icon: Truck, action: () => console.log('Process Delivery') },
    { title: 'View Reports', icon: BarChart3, action: () => console.log('View Reports') },
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Pharmacist! 👋</h1>
          <p className="text-muted-foreground">Your pharmacy management overview for today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={action.action}>
              <CardContent className="flex items-center space-x-4 p-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <action.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prescriptions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2" /> Today's Prescriptions
              </CardTitle>
              <CardDescription>Overview of pending and processed prescriptions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{prescription.medication}</p>
                      <p className="text-sm text-muted-foreground">Patient: {prescription.patient}</p>
                    </div>
                    <Badge variant={prescription.status === 'pending' ? 'destructive' : prescription.status === 'ready' ? 'default' : 'secondary'}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View All Prescriptions</Button>
            </CardContent>
          </Card>

          {/* Inventory Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" /> Inventory Status
              </CardTitle>
              <CardDescription>Current stock levels and alerts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
                    <div className={`w-3 h-3 rounded-full ${item.status === 'low' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Stock: {item.stock} units</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">Manage Inventory</Button>
            </CardContent>
          </Card>
        </div>

        {/* Deliveries & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" /> Delivery Schedule
              </CardTitle>
              <CardDescription>Today's delivery assignments and status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{delivery.patient}</p>
                      <p className="text-sm text-muted-foreground">{delivery.address}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={delivery.status === 'pending' ? 'destructive' : delivery.status === 'in-transit' ? 'default' : 'secondary'}>
                        {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{delivery.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">Manage Deliveries</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" /> Today's Summary
              </CardTitle>
              <CardDescription>Key metrics and performance indicators.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Prescriptions Filled</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-green-600">$2,450</p>
                  <p className="text-sm text-muted-foreground">Revenue Today</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-blue-600">18</p>
                  <p className="text-sm text-muted-foreground">Deliveries Made</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-2xl font-bold text-orange-600">3</p>
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
