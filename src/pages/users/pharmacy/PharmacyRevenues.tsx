import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  Printer,
  Calendar,
  Users,
  Package,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";

const PharmacyRevenues = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'pharmacy';
  const providerType = location.state?.providerType || 'Pharmacy';

  const [timeRange, setTimeRange] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');

  const revenueData = [
    { 
      id: 1, 
      patient: "Sarah Johnson", 
      medication: "Lisinopril 10mg", 
      amount: 45.50, 
      date: "2024-01-16", 
      time: "09:30 AM",
      paymentMethod: "Insurance",
      status: "completed",
      prescriptionId: "RX-001"
    },
    { 
      id: 2, 
      patient: "Michael Brown", 
      medication: "Amoxicillin 500mg", 
      amount: 28.75, 
      date: "2024-01-16", 
      time: "11:15 AM",
      paymentMethod: "Credit Card",
      status: "completed",
      prescriptionId: "RX-002"
    },
    { 
      id: 3, 
      patient: "Emily White", 
      medication: "Hydrocortisone Cream 2.5%", 
      amount: 12.99, 
      date: "2024-01-16", 
      time: "02:00 PM",
      paymentMethod: "Cash",
      status: "completed",
      prescriptionId: "RX-003"
    },
    { 
      id: 4, 
      patient: "John Smith", 
      medication: "Atorvastatin 20mg", 
      amount: 67.25, 
      date: "2024-01-15", 
      time: "04:30 PM",
      paymentMethod: "Insurance",
      status: "completed",
      prescriptionId: "RX-004"
    },
    { 
      id: 5, 
      patient: "Jane Doe", 
      medication: "Metformin 500mg", 
      amount: 23.40, 
      date: "2024-01-15", 
      time: "10:20 AM",
      paymentMethod: "Credit Card",
      status: "completed",
      prescriptionId: "RX-005"
    }
  ];

  const filteredRevenue = revenueData.filter(item => {
    const matchesSearch = item.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.prescriptionId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const todayRevenue = revenueData.filter(item => item.date === "2024-01-16").reduce((sum, item) => sum + item.amount, 0);
  const monthlyRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  const revenueByPaymentMethod = {
    'Insurance': revenueData.filter(item => item.paymentMethod === 'Insurance').reduce((sum, item) => sum + item.amount, 0),
    'Credit Card': revenueData.filter(item => item.paymentMethod === 'Credit Card').reduce((sum, item) => sum + item.amount, 0),
    'Cash': revenueData.filter(item => item.paymentMethod === 'Cash').reduce((sum, item) => sum + item.amount, 0)
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pharmacy Revenues</h1>
            <p className="text-muted-foreground">Track your pharmacy's financial performance and revenue analytics</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+15.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${todayRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-3 h-3 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">5 transactions</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">${monthlyRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <Users className="w-3 h-3 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">{revenueData.length} sales</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold text-purple-600">${(totalRevenue / revenueData.length).toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    <Package className="w-3 h-3 text-purple-600 mr-1" />
                    <span className="text-sm text-purple-600">Per prescription</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
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
            {/* Search */}
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
            </div>

            {/* Transactions List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  Revenue Transactions ({filteredRevenue.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRevenue.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{transaction.patient}</h3>
                          <Badge variant="outline">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Medication:</strong> {transaction.medication}</p>
                            <p><strong>Prescription ID:</strong> {transaction.prescriptionId}</p>
                          </div>
                          <div>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <p><strong>Time:</strong> {transaction.time}</p>
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
                            <Printer className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Revenue by Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(revenueByPaymentMethod).map(([method, amount]) => (
                      <div key={method} className="flex justify-between items-center">
                        <span className="text-sm">{method}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(amount / totalRevenue) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-16 text-right">${amount.toFixed(2)}</span>
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
                    Daily Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Today (Jan 16)</span>
                      <span className="text-sm font-semibold">${todayRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Yesterday (Jan 15)</span>
                      <span className="text-sm font-semibold">$90.65</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Jan 14</span>
                      <span className="text-sm font-semibold">$78.30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Jan 13</span>
                      <span className="text-sm font-semibold">$112.45</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Atorvastatin 20mg</span>
                      <span className="text-sm font-semibold">$67.25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lisinopril 10mg</span>
                      <span className="text-sm font-semibold">$45.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Amoxicillin 500mg</span>
                      <span className="text-sm font-semibold">$28.75</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Metformin 500mg</span>
                      <span className="text-sm font-semibold">$23.40</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Order Value</span>
                      <span className="text-sm font-semibold">${(totalRevenue / revenueData.length).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Orders per Day</span>
                      <span className="text-sm font-semibold">2.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Customer Retention</span>
                      <span className="text-sm font-semibold">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Growth</span>
                      <span className="text-sm font-semibold text-green-600">+15.2%</span>
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
                  <CardTitle>Revenue Summary Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Revenue</span>
                      <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Number of Transactions</span>
                      <span className="font-semibold">{revenueData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Order Value</span>
                      <span className="font-semibold">${(totalRevenue / revenueData.length).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Growth Rate</span>
                      <span className="font-semibold text-green-600">+15.2%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download Revenue Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Gross Revenue</span>
                      <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tax Deductions</span>
                      <span className="font-semibold">${(totalRevenue * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Net Revenue</span>
                      <span className="font-semibold text-green-600">${(totalRevenue * 0.92).toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Receipt className="w-4 h-4 mr-2" />
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

export default PharmacyRevenues;
