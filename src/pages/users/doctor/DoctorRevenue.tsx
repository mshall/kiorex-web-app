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
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Send,
  Printer,
  BarChart3,
  PieChart
} from "lucide-react";

const DoctorRevenue = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'doctor';
  const providerType = location.state?.providerType || 'Doctor';

  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      service: "Consultation", 
      amount: 150, 
      date: "2024-01-15", 
      status: "paid",
      invoiceNumber: "INV-001",
      paymentMethod: "Credit Card",
      clinic: "City Heart Center"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      service: "Follow-up", 
      amount: 120, 
      date: "2024-01-14", 
      status: "pending",
      invoiceNumber: "INV-002",
      paymentMethod: "Insurance",
      clinic: "Metro Medical Clinic"
    },
    { 
      id: 3, 
      patient: "Emily White", 
      service: "Teleconsultation", 
      amount: 100, 
      date: "2024-01-13", 
      status: "paid",
      invoiceNumber: "INV-003",
      paymentMethod: "Cash",
      clinic: "Downtown Health Center"
    },
    { 
      id: 4, 
      patient: "John Smith", 
      service: "Procedure", 
      amount: 350, 
      date: "2024-01-12", 
      status: "paid",
      invoiceNumber: "INV-004",
      paymentMethod: "Insurance",
      clinic: "City Heart Center"
    },
    { 
      id: 5, 
      patient: "Robert Wilson", 
      service: "Consultation", 
      amount: 200, 
      date: "2024-01-05", 
      status: "outstanding",
      invoiceNumber: "INV-005",
      paymentMethod: "Pending",
      clinic: "City Heart Center"
    },
    { 
      id: 6, 
      patient: "Maria Garcia", 
      service: "Teleconsultation", 
      amount: 120, 
      date: "2024-01-03", 
      status: "outstanding",
      invoiceNumber: "INV-006",
      paymentMethod: "Pending",
      clinic: "City Heart Center"
    }
  ]);

  const [timeRange, setTimeRange] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedTransactions,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredTransactions,
    initialPage: 1,
    initialItemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'outstanding': return 'destructive';
      case 'overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const paidAmount = transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const outstandingAmount = transactions.filter(t => t.status === 'outstanding').reduce((sum, t) => sum + t.amount, 0);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const revenueByService = {
    'Consultation': transactions.filter(t => t.service === 'Consultation').reduce((sum, t) => sum + t.amount, 0),
    'Follow-up': transactions.filter(t => t.service === 'Follow-up').reduce((sum, t) => sum + t.amount, 0),
    'Teleconsultation': transactions.filter(t => t.service === 'Teleconsultation').reduce((sum, t) => sum + t.amount, 0),
    'Procedure': transactions.filter(t => t.service === 'Procedure').reduce((sum, t) => sum + t.amount, 0)
  };

  const revenueByClinic = {
    'City Heart Center': transactions.filter(t => t.clinic === 'City Heart Center').reduce((sum, t) => sum + t.amount, 0),
    'Metro Medical Clinic': transactions.filter(t => t.clinic === 'Metro Medical Clinic').reduce((sum, t) => sum + t.amount, 0),
    'Downtown Health Center': transactions.filter(t => t.clinic === 'Downtown Health Center').reduce((sum, t) => sum + t.amount, 0)
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Revenue Management</h1>
            <p className="text-muted-foreground">Track your earnings, transactions, and financial performance</p>
          </div>
          <div className="flex space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Revenue Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatusFilter('all')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatusFilter('paid')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paid Amount</p>
                  <p className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">94%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatusFilter('pending')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-yellow-600 mr-1" />
                    <span className="text-sm text-yellow-600">6%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatusFilter('all')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg per Patient</p>
                  <p className="text-2xl font-bold text-blue-600">${Math.round(totalRevenue / transactions.length)}</p>
                  <div className="flex items-center mt-1">
                    <Users className="w-3 h-3 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">{transactions.length} patients</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatusFilter('outstanding')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="text-2xl font-bold text-orange-600">${outstandingAmount.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <AlertCircle className="w-3 h-3 text-orange-600 mr-1" />
                    <span className="text-sm text-orange-600">Overdue</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  Transactions ({totalItems})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{transaction.patient}</h3>
                          <Badge variant={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Service:</strong> {transaction.service}</p>
                            <p><strong>Invoice:</strong> {transaction.invoiceNumber}</p>
                          </div>
                          <div>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <p><strong>Clinic:</strong> {transaction.clinic}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold">${transaction.amount}</p>
                          <p className="text-sm text-muted-foreground">{transaction.paymentMethod}</p>
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
                          <Button size="sm" variant="outline">
                            <Printer className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Revenue by Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(revenueByService).map(([service, amount]) => (
                      <div key={service} className="flex justify-between items-center">
                        <span className="text-sm">{service}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(amount / totalRevenue) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-16 text-right">${amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Revenue by Clinic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(revenueByClinic).map(([clinic, amount]) => (
                      <div key={clinic} className="flex justify-between items-center">
                        <span className="text-sm">{clinic}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(amount / totalRevenue) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-16 text-right">${amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Credit Card</span>
                      <span className="text-sm font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Insurance</span>
                      <span className="text-sm font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cash</span>
                      <span className="text-sm font-semibold">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">January</span>
                      <span className="text-sm font-semibold">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">December</span>
                      <span className="text-sm font-semibold">$11,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">November</span>
                      <span className="text-sm font-semibold">$10,800</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Growth</span>
                      <span className="text-sm font-semibold text-green-600">+11.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-semibold">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Month</span>
                      <span className="font-semibold">$11,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Growth</span>
                      <span className="font-semibold text-green-600">+11.2%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Gross Income</span>
                      <span className="font-semibold">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tax Deductions</span>
                      <span className="font-semibold">$1,245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Net Income</span>
                      <span className="font-semibold text-green-600">$11,205</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Tax Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorRevenue;
