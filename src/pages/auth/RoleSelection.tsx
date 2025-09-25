import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Users,
  Stethoscope,
  Shield,
  Pill,
  Activity,
  Building,
  UserCheck,
  ArrowRight,
  CheckCircle,
  Star,
  Award
} from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const userRoles = [
    {
      id: 'patient',
      title: 'Patient',
      description: 'Access healthcare services, book appointments, and manage your health records',
      icon: Users,
      color: 'primary',
      features: ['Book appointments', 'View medical records', 'Video consultations', 'Order medicines'],
      stats: { count: '50K+', rating: '4.9' },
      authLinks: {
        signin: '/auth/patient-signin',
        signup: '/auth/patient-signup'
      }
    },
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Provide medical consultations, manage patients, and grow your practice',
      icon: Stethoscope,
      color: 'blue',
      features: ['Video consultations', 'Patient management', 'EHR access', 'Earnings tracking'],
      stats: { count: '2K+', rating: '4.8' },
      authLinks: {
        signin: '/auth/provider-signin',
        signup: '/auth/provider-signup'
      }
    },
    {
      id: 'nurse',
      title: 'Nurse',
      description: 'Provide nursing care, manage patient care plans, and track health progress',
      icon: Shield,
      color: 'green',
      features: ['Patient care plans', 'Health monitoring', 'Documentation', 'Care coordination'],
      stats: { count: '1.5K+', rating: '4.9' },
      authLinks: {
        signin: '/auth/provider-signin',
        signup: '/auth/provider-signup'
      }
    },
    {
      id: 'physiotherapist',
      title: 'Physiotherapist',
      description: 'Provide rehabilitation services and physical therapy treatments',
      icon: Activity,
      color: 'orange',
      features: ['Exercise prescriptions', 'Progress tracking', 'Home visits', 'Rehabilitation plans'],
      stats: { count: '800+', rating: '4.7' },
      authLinks: {
        signin: '/auth/provider-signin',
        signup: '/auth/provider-signup'
      }
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      description: 'Manage pharmacy operations, prescriptions, and medication delivery',
      icon: Pill,
      color: 'purple',
      features: ['Prescription management', 'Inventory control', 'Delivery tracking', 'Medication counseling'],
      stats: { count: '600+', rating: '4.8' },
      authLinks: {
        signin: '/auth/provider-signin',
        signup: '/auth/provider-signup'
      }
    },
    {
      id: 'clinic',
      title: 'Clinic/Hospital',
      description: 'Manage multiple providers, patients, and administrative operations',
      icon: Building,
      color: 'indigo',
      features: ['Provider management', 'Patient scheduling', 'Administrative tools', 'Analytics dashboard'],
      stats: { count: '200+', rating: '4.6' },
      authLinks: {
        signin: '/auth/provider-signin',
        signup: '/auth/provider-signup'
      }
    },
    {
      id: 'admin',
      title: 'System Admin',
      description: 'Manage platform operations, users, and system administration',
      icon: UserCheck,
      color: 'red',
      features: ['User management', 'System monitoring', 'Platform analytics', 'Support management'],
      stats: { count: '50+', rating: '5.0' },
      authLinks: {
        signin: '/auth/admin-signin',
        signup: '/auth/admin-signup'
      }
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary/10 text-primary border-primary/20';
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      case 'orange': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'red': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getHoverColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'hover:bg-primary/5 hover:border-primary/30';
      case 'blue': return 'hover:bg-blue-50 hover:border-blue-300';
      case 'green': return 'hover:bg-green-50 hover:border-green-300';
      case 'orange': return 'hover:bg-orange-50 hover:border-orange-300';
      case 'purple': return 'hover:bg-purple-50 hover:border-purple-300';
      case 'indigo': return 'hover:bg-indigo-50 hover:border-indigo-300';
      case 'red': return 'hover:bg-red-50 hover:border-red-300';
      default: return 'hover:bg-primary/5 hover:border-primary/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <KiorexLogo size="sm" showText={false} />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Kiorex
              </span>
            </div>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6">
              <UserCheck className="w-4 h-4 mr-2" />
              Choose Your Role
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              How would you like to access <span className="text-primary">Kiorex</span>?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select your role to access the appropriate authentication portal and features
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {userRoles.map((role) => (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg group ${
                  selectedRole === role.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : ''
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getColorClasses(role.color)}`}>
                      <role.icon className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{role.stats.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{role.stats.count} active</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {role.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedRole === role.id && (
                      <div className="pt-4 border-t border-border">
                        <div className="flex space-x-2">
                          <Link to={`${role.authLinks.signin}?type=${role.id}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              Sign In
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                          <Link to={`${role.authLinks.signup}?type=${role.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Sign Up
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selection Instructions */}
          {!selectedRole && (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select Your Role</h3>
                <p className="text-muted-foreground">
                  Click on any role card above to see authentication options and access the appropriate portal for your needs.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Platform Statistics */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Trusted by Healthcare Professionals</h2>
              <p className="text-muted-foreground">
                Join thousands of healthcare providers and patients using our platform
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Active Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">5K+</div>
                <div className="text-sm text-muted-foreground">Healthcare Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100K+</div>
                <div className="text-sm text-muted-foreground">Consultations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info mb-2">4.8</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  Average Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
