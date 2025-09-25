import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, LogOut, Settings, Bell, LayoutDashboard, Stethoscope, Users, Pill, FileText, Calendar, Video, BarChart3, Package, Truck, DollarSign, LifeBuoy, ArrowLeft, ChevronRight } from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoleBasedNavigationProps {
  userType?: 'patient' | 'doctor' | 'nurse' | 'pharmacy' | 'admin';
  userName?: string;
  userFirstName?: string;
  userProfilePicture?: string;
}

const RoleBasedNavigation = ({ 
  userType = 'patient', 
  userName = 'User',
  userFirstName = 'User',
  userProfilePicture 
}: RoleBasedNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items based on user role
  const getNavigationItems = () => {
    switch (userType) {
      case 'patient':
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/patient-appointments", label: "Appointments" },
          { href: "/search/doctors", label: "Find Doctors" },
          { href: "/marketplace", label: "Services" },
          { href: "/notifications", label: "Notifications" }
        ];
      
      case 'doctor':
        return [
          { href: "/doctor-dashboard", label: "Dashboard" },
          { href: "/doctor-patients", label: "Patients" },
          { href: "/doctor-revenue", label: "Revenue" },
          { href: "/professional-calendar", label: "Calendar" },
          { href: "/provider-appointments", label: "Appointments" },
          { href: "/provider-ehr", label: "EHR" },
          { href: "/provider-teleconsult", label: "Teleconsult" },
          { href: "/provider-settings", label: "Settings" }
        ];
      
      case 'nurse':
        return [
          { href: "/nurse-dashboard", label: "Dashboard" },
          { href: "/nurse-schedule", label: "Schedule" },
          { href: "/nurse-patients", label: "Patients" },
          { href: "/nurse-care-plans", label: "Care Plans" },
          { href: "/professional-calendar", label: "Calendar" },
          { href: "/nurse-documents", label: "Documents" },
          { href: "/nurse-earnings", label: "Earnings" }
        ];
      
      case 'pharmacy':
        return [
          { href: "/pharmacy-dashboard", label: "Dashboard" },
          { href: "/pharmacy-orders", label: "Orders" },
          { href: "/pharmacy-revenues", label: "Revenues" },
          { href: "/pharmacy-pending", label: "Pending Approval" },
          { href: "/professional-calendar", label: "Calendar" },
          { href: "/pharmacy-inventory", label: "Inventory" },
          { href: "/pharmacy-delivery", label: "Delivery" }
        ];
      
      case 'clinic':
        return [
          { href: "/clinic-dashboard", label: "Dashboard" },
          { href: "/clinic-appointments", label: "Appointments" },
          { href: "/clinic-staff", label: "Staff" },
          { href: "/clinic-patients", label: "Patients" },
          { href: "/professional-calendar", label: "Calendar" },
          { href: "/clinic-billing", label: "Billing" },
          { href: "/clinic-analytics", label: "Analytics" }
        ];
      
      case 'admin':
        return [
          { href: "/admin-dashboard", label: "Dashboard" },
          { href: "/admin-users", label: "Users" },
          { href: "/admin-providers", label: "Providers" },
          { href: "/admin-transactions", label: "Transactions" },
          { href: "/professional-calendar", label: "Calendar" },
          { href: "/admin-analytics", label: "Analytics" },
          { href: "/admin-support", label: "Support" },
          { href: "/admin-settings", label: "Settings" }
        ];
      
      default:
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/marketplace", label: "Marketplace" }
        ];
    }
  };

  const getRoleDisplayName = () => {
    switch (userType) {
      case 'patient': return 'Patient';
      case 'doctor': return 'Doctor';
      case 'nurse': return 'Nurse';
      case 'pharmacy': return 'Pharmacy';
      case 'clinic': return 'Clinic';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const getRoleColor = () => {
    switch (userType) {
      case 'patient': return 'text-primary';
      case 'doctor': return 'text-blue-600';
      case 'nurse': return 'text-green-600';
      case 'pharmacy': return 'text-purple-600';
      case 'clinic': return 'text-orange-600';
      case 'admin': return 'text-red-600';
      default: return 'text-primary';
    }
  };

  const getMainDashboardPath = () => {
    switch (userType) {
      case 'patient': return '/dashboard';
      case 'doctor': return '/doctor-dashboard';
      case 'nurse': return '/nurse-dashboard';
      case 'pharmacy': return '/pharmacy-dashboard';
      case 'clinic': return '/clinic-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/dashboard';
    }
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    const dashboardPath = getMainDashboardPath();
    
    // If on main dashboard, no breadcrumb needed
    if (path === dashboardPath) return null;
    
    // Get the current page name from the navigation items
    const currentItem = navItems.find(item => item.href === path);
    if (currentItem) {
      return {
        current: currentItem.label,
        dashboard: getRoleDisplayName() + ' Dashboard'
      };
    }
    
    // Fallback for pages not in navigation
    const pathSegments = path.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    return {
      current: lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace('-', ' ') : 'Page',
      dashboard: getRoleDisplayName() + ' Dashboard'
    };
  };

  const navItems = getNavigationItems();
  const isActive = (path: string) => location.pathname === path;
  const breadcrumb = getBreadcrumb();

  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate(getMainDashboardPath());
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-4">
            {breadcrumb && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center">
                <KiorexLogo size="md" showText={true} />
              </Link>
              <Badge variant="secondary" className="text-xs">
                {getRoleDisplayName()}
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                state={link.href === '/professional-calendar' ? { userType, providerType: userName } : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Breadcrumb */}
          {breadcrumb && (
            <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
              <Link 
                to={getMainDashboardPath()} 
                className="hover:text-primary transition-colors"
              >
                {breadcrumb.dashboard}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">{breadcrumb.current}</span>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Link 
                    to="/notifications" 
                    className="text-xs text-primary hover:underline"
                  >
                    View All
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {/* Sample notifications */}
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New Message</p>
                        <p className="text-xs text-muted-foreground">You have a new message from Dr. Smith</p>
                        <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Appointment Reminder</p>
                        <p className="text-xs text-muted-foreground">Your appointment is scheduled for tomorrow</p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">System Update</p>
                        <p className="text-xs text-muted-foreground">Platform maintenance scheduled</p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment Received</p>
                        <p className="text-xs text-muted-foreground">Payment of $150.00 received</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link 
                    to="/notifications" 
                    className="cursor-pointer text-center justify-center"
                  >
                    View All Notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Calendar Dropdown - Only for professionals */}
            {(userType === 'doctor' || userType === 'nurse' || userType === 'clinic' || userType === 'pharmacy' || userType === 'admin') && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Calendar className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Today's Schedule</span>
                    <Link 
                      to="/professional-calendar" 
                      state={{ userType, providerType: userName }}
                      className="text-xs text-primary hover:underline"
                    >
                      View Calendar
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-96 overflow-y-auto">
                    {/* Sample appointments */}
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Consultation - Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">09:00 AM - 10:00 AM</p>
                          <p className="text-xs text-muted-foreground">Video Call</p>
                        </div>
                        <Badge variant="outline" className="text-xs">Confirmed</Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Check-up - Michael Brown</p>
                          <p className="text-xs text-muted-foreground">10:30 AM - 11:30 AM</p>
                          <p className="text-xs text-muted-foreground">In-Person Visit</p>
                        </div>
                        <Badge variant="outline" className="text-xs">Scheduled</Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Emergency - Emily Davis</p>
                          <p className="text-xs text-muted-foreground">02:00 PM - 03:00 PM</p>
                          <p className="text-xs text-muted-foreground">Video Call</p>
                        </div>
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Follow-up - Robert Wilson</p>
                          <p className="text-xs text-muted-foreground">03:30 PM - 04:30 PM</p>
                          <p className="text-xs text-muted-foreground">Phone Call</p>
                        </div>
                        <Badge variant="outline" className="text-xs">Pending</Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/professional-calendar" 
                      state={{ userType, providerType: userName }}
                      className="cursor-pointer text-center justify-center"
                    >
                      View Full Calendar
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-auto p-2 rounded-full">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center overflow-hidden">
                      {userProfilePicture ? (
                        <img 
                          src={userProfilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {userFirstName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-foreground">
                      {userFirstName}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userFirstName}</p>
                    <p className={`text-xs leading-none ${getRoleColor()}`}>
                      {getRoleDisplayName()}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link 
                    to={userType === 'patient' ? '/profile' : '/provider-profile'} 
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            {/* Mobile Breadcrumb */}
            {breadcrumb && (
              <div className="px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link 
                    to={getMainDashboardPath()} 
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {breadcrumb.dashboard}
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground font-medium">{breadcrumb.current}</span>
                </div>
              </div>
            )}
            
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  state={link.href === '/professional-calendar' ? { userType, providerType: userName } : undefined}
                  className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-md ${
                    isActive(link.href)
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default RoleBasedNavigation;
