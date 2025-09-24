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
  Shield, // For admin functions
  UserCheck, // For user management
  DollarSign, // For transactions
  AlertTriangle, // For system alerts
  MessageSquare,
  Stethoscope,
  TrendingUp,
  Clock3,
  Database,
  Server,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'admin';
  const providerType = location.state?.providerType || 'Admin';

  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "patient", status: "active", joinDate: "2024-01-01" },
    { id: 2, name: "Dr. Smith", email: "smith@clinic.com", role: "doctor", status: "active", joinDate: "2024-01-02" },
    { id: 3, name: "Nurse Jane", email: "jane@hospital.com", role: "nurse", status: "pending", joinDate: "2024-01-03" },
  ]);

  const [providers] = useState([
    { id: 1, name: "City Heart Center", type: "clinic", status: "verified", patients: 1250 },
    { id: 2, name: "MediFast Pharmacy", type: "pharmacy", status: "verified", patients: 890 },
    { id: 3, name: "RecoveryPlus Clinic", type: "clinic", status: "pending", patients: 0 },
  ]);

  const [transactions] = useState([
    { id: 1, user: "John Doe", provider: "Dr. Smith", amount: "$150", status: "completed", date: "2024-01-15" },
    { id: 2, user: "Jane Smith", provider: "MediFast Pharmacy", amount: "$89", status: "pending", date: "2024-01-15" },
    { id: 3, user: "Emily White", provider: "RecoveryPlus Clinic", amount: "$120", status: "completed", date: "2024-01-14" },
  ]);

  const [systemAlerts] = useState([
    { id: 1, type: "warning", message: "High server load detected", timestamp: "2 minutes ago" },
    { id: 2, type: "info", message: "New provider registration pending", timestamp: "15 minutes ago" },
    { id: 3, type: "success", message: "Backup completed successfully", timestamp: "1 hour ago" },
  ]);

  const quickActions = [
    { title: 'User Management', icon: Users, action: () => console.log('User Management') },
    { title: 'Provider Verification', icon: Shield, action: () => console.log('Provider Verification') },
    { title: 'Transaction Review', icon: DollarSign, action: () => console.log('Transaction Review') },
    { title: 'System Monitoring', icon: Server, action: () => console.log('System Monitoring') },
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, System Admin! 👋</h1>
          <p className="text-muted-foreground">Your platform management overview.</p>
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
          {/* User Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" /> User Management
              </CardTitle>
              <CardDescription>Manage platform users and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email} • {user.role}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View All Users</Button>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" /> System Alerts
              </CardTitle>
              <CardDescription>Recent system notifications and alerts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.type === 'warning' ? 'bg-yellow-500' : 
                      alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View All Alerts</Button>
            </CardContent>
          </Card>
        </div>

        {/* Provider Management & Transaction Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" /> Provider Management
              </CardTitle>
              <CardDescription>Manage healthcare providers and verify credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">{provider.type} • {provider.patients} patients</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={provider.status === 'verified' ? 'default' : 'destructive'}>
                        {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View All Providers</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" /> Transaction Overview
              </CardTitle>
              <CardDescription>Recent transactions and payment status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{transaction.user} → {transaction.provider}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transaction.amount}</p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'destructive'}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View All Transactions</Button>
            </CardContent>
          </Card>
        </div>

        {/* Platform Analytics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" /> Platform Analytics
            </CardTitle>
            <CardDescription>Key platform metrics and performance indicators.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <p className="text-2xl font-bold text-primary">2,456</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <p className="text-2xl font-bold text-green-600">$125,430</p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <p className="text-2xl font-bold text-blue-600">98.5%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-md">
                <p className="text-2xl font-bold text-orange-600">156</p>
                <p className="text-sm text-muted-foreground">Active Providers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
