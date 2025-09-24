import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, LogOut, Settings, Bell, LayoutDashboard, Stethoscope, Users, Pill, FileText, Calendar, Video, BarChart3, Package, Truck, DollarSign, LifeBuoy } from "lucide-react";
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
  userType?: 'patient' | 'doctor' | 'nurse' | 'pharmacist' | 'admin';
  userName?: string;
}

const RoleBasedNavigation = ({ userType = 'patient', userName = 'User' }: RoleBasedNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items based on user role
  const getNavigationItems = () => {
    switch (userType) {
      case 'patient':
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/search/doctors", label: "Find Doctors" },
          { href: "/marketplace", label: "Services" },
          { href: "/medical-records", label: "Records" },
          { href: "/prescriptions", label: "Prescriptions" },
          { href: "/lab-results", label: "Lab Results" },
          { href: "/notifications", label: "Notifications" }
        ];
      
      case 'doctor':
        return [
          { href: "/provider-dashboard", label: "Dashboard" },
          { href: "/provider-appointments", label: "Appointments" },
          { href: "/provider-patients", label: "Patients" },
          { href: "/provider-ehr", label: "EHR" },
          { href: "/provider-teleconsult", label: "Teleconsult" },
          { href: "/provider-earnings", label: "Earnings" },
          { href: "/provider-settings", label: "Settings" }
        ];
      
      case 'nurse':
        return [
          { href: "/nurse-dashboard", label: "Dashboard" },
          { href: "/nurse-schedule", label: "Schedule" },
          { href: "/nurse-patients", label: "Patients" },
          { href: "/nurse-care-plans", label: "Care Plans" },
          { href: "/nurse-documents", label: "Documents" },
          { href: "/nurse-earnings", label: "Earnings" }
        ];
      
      case 'pharmacist':
        return [
          { href: "/pharmacist-dashboard", label: "Dashboard" },
          { href: "/pharmacist-orders", label: "Orders" },
          { href: "/pharmacist-inventory", label: "Inventory" },
          { href: "/pharmacist-prescriptions", label: "Prescriptions" },
          { href: "/pharmacist-delivery", label: "Delivery" },
          { href: "/pharmacist-analytics", label: "Analytics" }
        ];
      
      case 'clinic':
        return [
          { href: "/clinic-dashboard", label: "Dashboard" },
          { href: "/clinic-appointments", label: "Appointments" },
          { href: "/clinic-staff", label: "Staff" },
          { href: "/clinic-patients", label: "Patients" },
          { href: "/clinic-billing", label: "Billing" },
          { href: "/clinic-analytics", label: "Analytics" }
        ];
      
      case 'admin':
        return [
          { href: "/admin-dashboard", label: "Dashboard" },
          { href: "/admin-users", label: "Users" },
          { href: "/admin-providers", label: "Providers" },
          { href: "/admin-transactions", label: "Transactions" },
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
      case 'pharmacist': return 'Pharmacist';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const getRoleColor = () => {
    switch (userType) {
      case 'patient': return 'text-primary';
      case 'doctor': return 'text-blue-600';
      case 'nurse': return 'text-green-600';
      case 'pharmacist': return 'text-purple-600';
      case 'admin': return 'text-red-600';
      default: return 'text-primary';
    }
  };

  const navItems = getNavigationItems();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
              <KiorexLogo size="md" showText={true} />
            <Badge variant="secondary" className="ml-2 text-xs">
              {getRoleDisplayName()}
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
              <Link
                key={link.href}
                to={link.href}
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

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
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
