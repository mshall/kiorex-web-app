import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, LogOut, Settings, Bell, LayoutDashboard, Stethoscope, Users, Pill, FileText, Calendar, Video, BarChart3, Package, Truck, DollarSign, LifeBuoy, ArrowLeft, ChevronRight, Globe } from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRTL } from "@/hooks/useRTL";
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
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();

  // Navigation items based on user role
  const getNavigationItems = () => {
    switch (userType) {
      case 'patient':
        return [
          { href: "/dashboard", label: t('navigation.dashboard') },
          { href: "/patient-appointments", label: t('navigation.appointments') },
          { href: "/search/doctors", label: t('navigation.doctors') },
          { href: "/marketplace", label: t('navigation.services') },
          { href: "/notifications", label: t('navigation.notifications') }
        ];
      
      case 'doctor':
        return [
          { href: "/doctor-dashboard", label: t('navigation.dashboard') },
          { href: "/doctor-patients", label: t('navigation.patients') },
          { href: "/doctor-revenue", label: t('navigation.revenue') },
          { href: "/professional-calendar", label: t('navigation.calendar') },
          { href: "/provider-appointments", label: t('navigation.appointments') },
          { href: "/provider-ehr", label: t('navigation.ehr') },
          { href: "/provider-teleconsult", label: t('navigation.teleconsult') },
          { href: "/provider-settings", label: t('navigation.settings') }
        ];
      
      case 'nurse':
        return [
          { href: "/nurse-dashboard", label: t('navigation.dashboard') },
          { href: "/nurse-schedule", label: t('navigation.schedule') },
          { href: "/nurse-patients", label: t('navigation.patients') },
          { href: "/nurse-care-plans", label: t('navigation.carePlans') },
          { href: "/professional-calendar", label: t('navigation.calendar') },
          { href: "/nurse-documents", label: t('navigation.documents') },
          { href: "/nurse-earnings", label: t('navigation.earnings') }
        ];
      
      case 'pharmacy':
        return [
          { href: "/pharmacy-dashboard", label: t('navigation.dashboard') },
          { href: "/pharmacy-orders", label: t('navigation.orders') },
          { href: "/pharmacy-revenues", label: t('navigation.revenues') },
          { href: "/pharmacy-pending", label: t('navigation.pendingApproval') },
          { href: "/professional-calendar", label: t('navigation.calendar') },
          { href: "/pharmacy-inventory", label: t('navigation.inventory') },
          { href: "/pharmacy-delivery", label: t('navigation.delivery') }
        ];
      
      case 'clinic':
        return [
          { href: "/clinic-dashboard", label: t('navigation.dashboard') },
          { href: "/clinic-appointments", label: t('navigation.appointments') },
          { href: "/clinic-staff", label: t('navigation.staff') },
          { href: "/clinic-patients", label: t('navigation.patients') },
          { href: "/professional-calendar", label: t('navigation.calendar') },
          { href: "/clinic-billing", label: t('navigation.billing') },
          { href: "/clinic-analytics", label: t('navigation.analytics') }
        ];
      
      case 'admin':
        return [
          { href: "/admin-dashboard", label: t('navigation.dashboard') },
          { href: "/admin-users", label: t('navigation.users') },
          { href: "/admin-providers", label: t('navigation.providers') },
          { href: "/admin-transactions", label: t('navigation.transactions') },
          { href: "/professional-calendar", label: t('navigation.calendar') },
          { href: "/admin-analytics", label: t('navigation.analytics') },
          { href: "/admin-support", label: t('navigation.support') },
          { href: "/admin-settings", label: t('navigation.settings') }
        ];
      
      default:
        return [
          { href: "/dashboard", label: t('navigation.dashboard') },
          { href: "/marketplace", label: t('navigation.marketplace') }
        ];
    }
  };

  const getRoleDisplayName = () => {
    switch (userType) {
      case 'patient': return t('auth.patient');
      case 'doctor': return t('auth.doctor');
      case 'nurse': return t('auth.nurse');
      case 'pharmacy': return t('auth.pharmacy');
      case 'clinic': return t('auth.clinic');
      case 'admin': return t('auth.admin');
      default: return t('common.user');
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
      // Don't show breadcrumb for navigation items - they're already in the nav
      return null;
    }
    
    // Fallback for pages not in navigation
    const pathSegments = path.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    return {
      current: lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace('-', ' ') : t('common.page'),
      dashboard: getRoleDisplayName() + ' ' + t('navigation.dashboard')
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
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo and Back Button */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            {breadcrumb && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToDashboard}
                className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
              >
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                <span className="hidden sm:inline">{t('common.back')}</span>
              </Button>
            )}
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Link to="/" className="flex items-center">
                <KiorexLogo size="md" showText={true} />
              </Link>
              <Badge variant="secondary" className="text-xs">
                {getRoleDisplayName()}
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
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
            <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-muted-foreground`}>
              <Link 
                to={getMainDashboardPath()} 
                className="hover:text-primary transition-colors"
              >
                {breadcrumb.dashboard}
              </Link>
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-foreground font-medium">{breadcrumb.current}</span>
            </div>
          )}

          {/* User Menu */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            {/* Language Indicator Badge */}
            <div className="hidden sm:flex items-center">
              <Badge variant="outline" className="text-xs font-medium">
                {i18n.language.toUpperCase()}
              </Badge>
            </div>
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
                  <span>{t('navigation.notifications')}</span>
                  <Link 
                    to="/notifications" 
                    className="text-xs text-primary hover:underline"
                  >
                    {t('notifications.viewAll')}
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {/* Sample notifications */}
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t('notifications.newMessage')}</p>
                        <p className="text-xs text-muted-foreground">You have a new message from Dr. Smith</p>
                        <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t('notifications.appointmentReminder')}</p>
                        <p className="text-xs text-muted-foreground">Your appointment is scheduled for tomorrow</p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t('notifications.systemUpdate')}</p>
                        <p className="text-xs text-muted-foreground">Platform maintenance scheduled</p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t('notifications.paymentReceived')}</p>
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
{t('notifications.viewAll')} {t('navigation.notifications')}
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
                    <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-3 h-3 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center`}>
                      3
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>{t('calendar.today')} {t('calendar.schedule')}</span>
                    <Link 
                      to="/professional-calendar" 
                      state={{ userType, providerType: userName }}
                      className="text-xs text-primary hover:underline"
                    >
                      {t('calendar.viewCalendar')}
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-96 overflow-y-auto">
                    {/* Sample appointments */}
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Consultation - Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">09:00 AM - 10:00 AM</p>
                          <p className="text-xs text-muted-foreground">{t('appointments.videoCall')}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{t('appointments.confirmed')}</Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Check-up - Michael Brown</p>
                          <p className="text-xs text-muted-foreground">10:30 AM - 11:30 AM</p>
                          <p className="text-xs text-muted-foreground">{t('appointments.inPerson')}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{t('appointments.scheduled')}</Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Emergency - Emily Davis</p>
                          <p className="text-xs text-muted-foreground">02:00 PM - 03:00 PM</p>
                          <p className="text-xs text-muted-foreground">{t('appointments.videoCall')}</p>
                        </div>
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                      <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Follow-up - Robert Wilson</p>
                          <p className="text-xs text-muted-foreground">03:30 PM - 04:30 PM</p>
                          <p className="text-xs text-muted-foreground">{t('appointments.phoneCall')}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{t('appointments.pending')}</Badge>
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
                      {t('calendar.viewFullCalendar')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-auto p-2 rounded-full">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
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
                    <User className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    <span>{t('navigation.profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    <span>{t('navigation.settings')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                  <span>{t('navigation.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switcher - Rightmost Position */}
            <LanguageSwitcher />

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
          <div className="md:hidden border-t border-border" dir={direction}>
            {/* Mobile Breadcrumb */}
            {breadcrumb && (
              <div className="px-4 py-3 bg-muted/50 border-b border-border">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-muted-foreground`}>
                  <Link 
                    to={getMainDashboardPath()} 
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {breadcrumb.dashboard}
                  </Link>
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
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
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Indicator */}
              <div className="px-3 py-2 border-t border-border mt-2">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Globe className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground">{t('settings.language')}:</span>
                  <Badge variant="outline" className="text-xs font-medium">
                    {i18n.language.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default RoleBasedNavigation;
