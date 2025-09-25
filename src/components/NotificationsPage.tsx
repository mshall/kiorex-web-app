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
  Bell,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Trash2,
  Calendar,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  Video,
  Phone,
  Mail,
  MapPin,
  Pill,
  Activity,
  DollarSign,
  Star,
  Shield,
  Settings
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'appointment' | 'payment' | 'system';
  category: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
  relatedId?: string;
  relatedType?: string;
}

interface NotificationsPageProps {
  userType: string;
  userName: string;
}

const NotificationsPage = ({ userType, userName }: NotificationsPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample notifications based on user type
  const getNotificationsForUserType = (): Notification[] => {
    const baseNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Message',
        message: 'You have received a new message from Dr. Smith',
        type: 'info',
        category: 'Messages',
        timestamp: '2 minutes ago',
        read: false,
        priority: 'medium',
        actionRequired: true,
        relatedId: 'msg_123',
        relatedType: 'message'
      },
      {
        id: '2',
        title: 'Appointment Reminder',
        message: 'Your appointment with Dr. Johnson is scheduled for tomorrow at 2:00 PM',
        type: 'appointment',
        category: 'Appointments',
        timestamp: '1 hour ago',
        read: false,
        priority: 'high',
        actionRequired: true,
        relatedId: 'apt_456',
        relatedType: 'appointment'
      },
      {
        id: '3',
        title: 'System Update',
        message: 'The platform will undergo maintenance on Sunday from 2:00 AM to 4:00 AM',
        type: 'system',
        category: 'System',
        timestamp: '3 hours ago',
        read: true,
        priority: 'low',
        actionRequired: false
      }
    ];

    // Add user-specific notifications
    if (userType === 'patient') {
      return [
        ...baseNotifications,
        {
          id: '4',
          title: 'Lab Results Ready',
          message: 'Your blood test results from December 15th are now available',
          type: 'success',
          category: 'Medical Records',
          timestamp: '1 day ago',
          read: true,
          priority: 'medium',
          actionRequired: true,
          relatedId: 'lab_789',
          relatedType: 'lab_results'
        },
        {
          id: '5',
          title: 'Prescription Refill',
          message: 'Your prescription for Metformin is ready for pickup',
          type: 'info',
          category: 'Prescriptions',
          timestamp: '2 days ago',
          read: false,
          priority: 'medium',
          actionRequired: true,
          relatedId: 'rx_101',
          relatedType: 'prescription'
        }
      ];
    } else if (userType === 'doctor') {
      return [
        ...baseNotifications,
        {
          id: '4',
          title: 'New Patient Registration',
          message: 'Sarah Johnson has registered and requested an appointment',
          type: 'info',
          category: 'Patients',
          timestamp: '30 minutes ago',
          read: false,
          priority: 'medium',
          actionRequired: true,
          relatedId: 'pt_202',
          relatedType: 'patient'
        },
        {
          id: '5',
          title: 'Payment Received',
          message: 'Payment of $150.00 received for consultation with Michael Brown',
          type: 'success',
          category: 'Payments',
          timestamp: '4 hours ago',
          read: true,
          priority: 'low',
          actionRequired: false,
          relatedId: 'pay_303',
          relatedType: 'payment'
        }
      ];
    } else if (userType === 'nurse') {
      return [
        ...baseNotifications,
        {
          id: '4',
          title: 'New Care Plan Assignment',
          message: 'You have been assigned to manage the care plan for Emily Davis',
          type: 'info',
          category: 'Care Plans',
          timestamp: '45 minutes ago',
          read: false,
          priority: 'high',
          actionRequired: true,
          relatedId: 'cp_404',
          relatedType: 'care_plan'
        },
        {
          id: '5',
          title: 'Vital Signs Alert',
          message: 'Patient Robert Wilson\'s blood pressure readings require attention',
          type: 'warning',
          category: 'Patient Care',
          timestamp: '1 hour ago',
          read: false,
          priority: 'high',
          actionRequired: true,
          relatedId: 'vs_505',
          relatedType: 'vital_signs'
        }
      ];
    } else if (userType === 'clinic') {
      return [
        ...baseNotifications,
        {
          id: '4',
          title: 'Staff Schedule Update',
          message: 'Dr. Smith has updated their availability for next week',
          type: 'info',
          category: 'Staff',
          timestamp: '1 hour ago',
          read: true,
          priority: 'medium',
          actionRequired: false,
          relatedId: 'staff_606',
          relatedType: 'staff'
        },
        {
          id: '5',
          title: 'Equipment Maintenance',
          message: 'X-ray machine maintenance scheduled for Friday',
          type: 'warning',
          category: 'Equipment',
          timestamp: '2 days ago',
          read: false,
          priority: 'medium',
          actionRequired: true,
          relatedId: 'eq_707',
          relatedType: 'equipment'
        }
      ];
    } else if (userType === 'pharmacy') {
      return [
        ...baseNotifications,
        {
          id: '4',
          title: 'New Prescription Order',
          message: 'New prescription order received from Dr. Wilson for patient Lisa Anderson',
          type: 'info',
          category: 'Orders',
          timestamp: '20 minutes ago',
          read: false,
          priority: 'high',
          actionRequired: true,
          relatedId: 'ord_808',
          relatedType: 'order'
        },
        {
          id: '5',
          title: 'Inventory Low',
          message: 'Stock for Metformin 500mg is running low (15 tablets remaining)',
          type: 'warning',
          category: 'Inventory',
          timestamp: '3 hours ago',
          read: true,
          priority: 'medium',
          actionRequired: true,
          relatedId: 'inv_909',
          relatedType: 'inventory'
        }
      ];
    } else if (userType === 'admin') {
      return [
        ...baseNotifications,
        {
          id: '4',
          title: 'User Verification Required',
          message: '5 new healthcare providers are pending verification',
          type: 'info',
          category: 'User Management',
          timestamp: '1 hour ago',
          read: false,
          priority: 'medium',
          actionRequired: true,
          relatedId: 'verify_1010',
          relatedType: 'verification'
        },
        {
          id: '5',
          title: 'System Performance Alert',
          message: 'Server response time is slower than usual',
          type: 'warning',
          category: 'System',
          timestamp: '2 hours ago',
          read: true,
          priority: 'high',
          actionRequired: true,
          relatedId: 'perf_1111',
          relatedType: 'performance'
        }
      ];
    }

    return baseNotifications;
  };

  const [notifications, setNotifications] = useState<Notification[]>(getNotificationsForUserType());

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <X className="w-5 h-5 text-red-600" />;
      case 'appointment': return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'payment': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'system': return <Settings className="w-5 h-5 text-gray-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={userName} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your latest activities and important alerts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Notifications</p>
                  <p className="text-2xl font-bold text-primary">{notifications.length}</p>
                </div>
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                  <p className="text-2xl font-bold text-red-600">{actionRequiredCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-red-600" />
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
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="appointment">Appointment</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Messages">Messages</SelectItem>
                <SelectItem value="Appointments">Appointments</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="Medical Records">Medical Records</SelectItem>
                <SelectItem value="Prescriptions">Prescriptions</SelectItem>
                <SelectItem value="Patients">Patients</SelectItem>
                <SelectItem value="Payments">Payments</SelectItem>
                <SelectItem value="Care Plans">Care Plans</SelectItem>
                <SelectItem value="Patient Care">Patient Care</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Orders">Orders</SelectItem>
                <SelectItem value="Inventory">Inventory</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Notifications ({filteredNotifications.length})</span>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount} unread</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications found</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                      notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-primary' : ''}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <Badge variant="outline">
                              {notification.category}
                            </Badge>
                            {notification.actionRequired && (
                              <Badge variant="destructive">
                                Action Required
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
