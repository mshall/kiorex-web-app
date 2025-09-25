import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Banknote,
  PieChart,
  BarChart3,
  Activity,
  User,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

const NurseEarnings = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'nurse';
  const providerType = location.state?.providerType || 'Nurse';

  const [earnings, setEarnings] = useState([
    { 
      id: 1, 
      patientName: "Sarah Johnson", 
      service: "Home Visit - Diabetes Care",
      date: "2024-01-20",
      duration: "2 hours",
      amount: 150.00,
      status: "completed",
      paymentMethod: "Direct Deposit",
      hourlyRate: 75.00,
      type: "Home Visit"
    },
    { 
      id: 2, 
      patientName: "Michael Brown", 
      service: "Post-Surgery Care",
      date: "2024-01-19",
      duration: "1.5 hours",
      amount: 112.50,
      status: "completed",
      paymentMethod: "Direct Deposit",
      hourlyRate: 75.00,
      type: "Home Visit"
    },
    { 
      id: 3, 
      patientName: "Emily Davis", 
      service: "Prenatal Care Visit",
      date: "2024-01-18",
      duration: "1 hour",
      amount: 75.00,
      status: "pending",
      paymentMethod: "Direct Deposit",
      hourlyRate: 75.00,
      type: "Clinic Visit"
    },
    { 
      id: 4, 
      patientName: "Robert Wilson", 
      service: "Emergency Care",
      date: "2024-01-17",
      duration: "3 hours",
      amount: 225.00,
      status: "completed",
      paymentMethod: "Direct Deposit",
      hourlyRate: 75.00,
      type: "Emergency"
    },
    { 
      id: 5, 
      patientName: "Lisa Anderson", 
      service: "Medication Administration",
      date: "2024-01-16",
      duration: "0.5 hours",
      amount: 37.50,
      status: "completed",
      paymentMethod: "Direct Deposit",
      hourlyRate: 75.00,
      type: "Home Visit"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleExportEarnings = () => {
    console.log('Exporting earnings data');
  };

  const handleRequestPayment = () => {
    console.log('Requesting payment');
  };

  const filteredEarnings = earnings.filter(earning => {
    const matchesSearch = earning.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         earning.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || earning.status === statusFilter;
    const matchesType = typeFilter === 'all' || earning.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Home Visit': return 'text-blue-600';
      case 'Clinic Visit': return 'text-green-600';
      case 'Emergency': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0);
  const completedEarnings = earnings.filter(e => e.status === 'completed').reduce((sum, earning) => sum + earning.amount, 0);
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, earning) => sum + earning.amount, 0);

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Earnings & Payments</h1>
          <p className="text-muted-foreground">Track your earnings and manage payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">${completedEarnings.toFixed(2)}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">${pendingEarnings.toFixed(2)}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold text-blue-600">$75.00</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Home Visit">Home Visit</SelectItem>
                <SelectItem value="Clinic Visit">Clinic Visit</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportEarnings}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleRequestPayment}>
              <CreditCard className="w-4 h-4 mr-2" />
              Request Payment
            </Button>
          </div>
        </div>

        {/* Earnings Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Earnings History ({filteredEarnings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEarnings.map((earning) => (
                    <div key={earning.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{earning.patientName}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(earning.status)}>
                              {earning.status}
                            </Badge>
                            <Badge variant="outline" className={getTypeColor(earning.type)}>
                              {earning.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Service:</strong> {earning.service}</p>
                            <p><strong>Date:</strong> {earning.date}</p>
                          </div>
                          <div>
                            <p><strong>Duration:</strong> {earning.duration}</p>
                            <p><strong>Rate:</strong> ${earning.hourlyRate}/hour</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {earning.paymentMethod}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            ${earning.amount.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Invoice
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
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Home Visits</span>
                    <span className="font-semibold">
                      ${earnings.filter(e => e.type === 'Home Visit').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clinic Visits</span>
                    <span className="font-semibold">
                      ${earnings.filter(e => e.type === 'Clinic Visit').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Care</span>
                    <span className="font-semibold">
                      ${earnings.filter(e => e.type === 'Emergency').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Hours</span>
                    <span className="font-semibold">
                      {earnings.reduce((sum, e) => sum + parseFloat(e.duration), 0)} hrs
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
                    <CreditCard className="w-4 h-4 mr-2" />
                    Request Payment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Earnings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Payment received - $412.50</span>
                    <span className="text-muted-foreground ml-auto">Jan 15</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Payment received - $375.00</span>
                    <span className="text-muted-foreground ml-auto">Jan 8</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Payment pending - $187.50</span>
                    <span className="text-muted-foreground ml-auto">Jan 20</span>
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

export default NurseEarnings;
