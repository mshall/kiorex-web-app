import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  AlertCircle,
  Stethoscope,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  Clock,
  Award,
  FileText
} from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";

const ProviderSignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    providerType: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const providerTypes = [
    'Doctor',
    'Nurse', 
    'Physiotherapist',
    'Pharmacist',
    'Clinic',
    'Admin',
    'Lab Technician',
    'Radiologist',
    'Dentist',
    'Psychologist',
    'Dietitian',
    'Other'
  ];

  // Map role IDs to provider types
  const roleToProviderType: Record<string, string> = {
    'doctor': 'Doctor',
    'nurse': 'Nurse',
    'physiotherapist': 'Physiotherapist',
    'pharmacist': 'Pharmacist',
    'clinic': 'Clinic',
    'admin': 'Admin'
  };

  // Pre-select provider type based on URL parameter
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && roleToProviderType[typeParam]) {
      setFormData(prev => ({ ...prev, providerType: roleToProviderType[typeParam] }));
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.providerType) newErrors.providerType = 'Provider type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo login - accept any valid email/password
      if (formData.email && formData.password && formData.providerType) {
        // Map provider type to userType for navigation
        const userType = formData.providerType.toLowerCase().replace(' ', '');
        
            // Navigate to appropriate dashboard based on provider type
            let dashboardPath = '/doctor-dashboard'; // Default to doctor dashboard
            
            if (formData.providerType === 'Nurse') {
              dashboardPath = '/nurse-dashboard';
            } else if (formData.providerType === 'Physiotherapist') {
              dashboardPath = '/doctor-dashboard'; // Use doctor dashboard for now
            } else if (formData.providerType === 'Pharmacist') {
              dashboardPath = '/pharmacist-dashboard';
            } else if (formData.providerType === 'Doctor') {
              dashboardPath = '/doctor-dashboard';
            } else if (formData.providerType === 'Clinic') {
              dashboardPath = '/clinic-dashboard';
            } else if (formData.providerType === 'Admin') {
              dashboardPath = '/admin-dashboard';
            }
        
        navigate(dashboardPath, { state: { userType, providerType: formData.providerType } });
      }
      setIsLoading(false);
    }, 1500);
  };

  const providerTypeStats = [
    { type: 'Doctor', icon: Stethoscope, color: 'primary', count: '2,000+' },
    { type: 'Nurse', icon: Users, color: 'secondary', count: '1,500+' },
    { type: 'Physiotherapist', icon: Award, color: 'accent', count: '800+' },
    { type: 'Pharmacist', icon: FileText, color: 'info', count: '600+' }
  ];

  const quickStats = [
    { label: 'Active Providers', value: '5,000+', icon: Users },
    { label: 'Monthly Consultations', value: '50K+', icon: Calendar },
    { label: 'Average Rating', value: '4.8', icon: Award },
    { label: 'Platform Revenue', value: '$2M+', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <KiorexLogo size="md" showText={true} />
            </div>
            <Link to="/auth/welcome">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Side - Login Form */}
            <div className="lg:col-span-1">
              <div className="text-center lg:text-left mb-8">
                <Badge variant="secondary" className="mb-4">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Provider Portal
                </Badge>
                <h1 className="text-3xl font-bold mb-2">Welcome Back, Provider</h1>
                <p className="text-muted-foreground">
                  Access your practice dashboard and manage your patients
                </p>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-primary" />
                    Provider Sign In
                  </CardTitle>
                  <CardDescription>
                    Access your professional dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
              {/* Demo Credentials */}
              <div className="bg-muted/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2 flex items-center">
                  <KiorexLogo size="sm" showText={false} />
                  <span className="ml-2">Demo Credentials</span>
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Email:</strong> test@test.com</p>
                  <p><strong>Password:</strong> 123</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your professional email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Provider Type */}
                    <div>
                      <Label htmlFor="providerType">Provider Type *</Label>
                      <Select value={formData.providerType} onValueChange={(value) => handleInputChange('providerType', value)}>
                        <SelectTrigger className={errors.providerType ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your provider type" />
                        </SelectTrigger>
                        <SelectContent>
                          {providerTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.providerType && <p className="text-red-500 text-sm mt-1">{errors.providerType}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                        />
                        <Label htmlFor="rememberMe" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    {/* Demo Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold">Demo Mode:</p>
                          <p>Use any valid email and password. Examples:</p>
                          <ul className="mt-1 text-xs space-y-1">
                            <li>• doctor@kiorex.com → Doctor Dashboard</li>
                            <li>• nurse@kiorex.com → Nurse Dashboard</li>
                            <li>• pharmacist@kiorex.com → Pharmacist Dashboard</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing in...
                        </>
                      ) : (
                        'Sign In to Provider Portal'
                      )}
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-muted-foreground">
                      New to our platform?{" "}
                      <Link to="/auth/provider-signup" className="text-primary hover:underline">
                        Register as a provider
                      </Link>
                    </div>

                    {/* Role Switching */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">Are you a patient looking for care?</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link to="/auth/patient-signin" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Users className="w-4 h-4 mr-2" />
                            Patient Sign In
                          </Button>
                        </Link>
                        <Link to="/auth/patient-signup" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Users className="w-4 h-4 mr-2" />
                            Patient Sign Up
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Provider Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Provider Types */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Join Our Network</h2>
                <div className="grid grid-cols-2 gap-4">
                  {providerTypeStats.map((provider, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          provider.color === 'primary' ? 'bg-primary/10' :
                          provider.color === 'secondary' ? 'bg-secondary/10' :
                          provider.color === 'accent' ? 'bg-accent/10' :
                          'bg-info/10'
                        }`}>
                          <provider.icon className={`w-6 h-6 ${
                            provider.color === 'primary' ? 'text-primary' :
                            provider.color === 'secondary' ? 'text-secondary' :
                            provider.color === 'accent' ? 'text-accent' :
                            'text-info'
                          }`} />
                        </div>
                        <h3 className="font-semibold">{provider.type}</h3>
                        <p className="text-sm text-muted-foreground">{provider.count} active</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Platform Stats */}
              <div>
                <h3 className="text-xl font-bold mb-4">Platform Statistics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 text-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <stat.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-lg font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Provider Benefits */}
              <div>
                <h3 className="text-xl font-bold mb-4">Why Join Kiorex?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Flexible Scheduling</h4>
                      <p className="text-sm text-muted-foreground">Set your own hours and manage your availability</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Competitive Rates</h4>
                      <p className="text-sm text-muted-foreground">Set your own consultation fees and earn more</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Analytics Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Track your performance and patient satisfaction</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-info" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure Platform</h4>
                      <p className="text-sm text-muted-foreground">HIPAA-compliant with enterprise-grade security</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold">Verified Provider Network</p>
                    <p>All providers undergo thorough credential verification and background checks to ensure the highest quality of care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSignIn;
