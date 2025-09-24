import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  AlertCircle,
  Users,
  Calendar,
  Activity,
  FileText,
  Stethoscope
} from "lucide-react";

const PatientSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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
      if (formData.email && formData.password) {
        navigate('/dashboard', { state: { userType: 'patient' } });
      }
      setIsLoading(false);
    }, 1500);
  };

  const quickActions = [
    { title: 'Book Appointment', icon: Calendar, action: () => navigate('/search/doctors') },
    { title: 'View Records', icon: FileText, action: () => navigate('/medical-records') },
    { title: 'Health Metrics', icon: Activity, action: () => navigate('/health-metrics') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Kiorex
              </span>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Login Form */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <Badge variant="secondary" className="mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  Patient Portal
                </Badge>
                <h1 className="text-3xl font-bold mb-2">Welcome Back, Patient</h1>
                <p className="text-muted-foreground">
                  Sign in to access your health records, book appointments, and manage your care
                </p>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Patient Sign In
                  </CardTitle>
                  <CardDescription>
                    Access your personal health dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                          <p>Use any valid email and password to sign in as a patient. Example: patient@kiorex.com</p>
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
                        'Sign In to Patient Portal'
                      )}
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-muted-foreground">
                      Don't have a patient account?{" "}
                      <Link to="/auth/patient-signup" className="text-primary hover:underline">
                        Create one here
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
                      <p className="text-sm text-muted-foreground">Are you a healthcare provider?</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link to="/auth/provider-signin" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Stethoscope className="w-4 h-4 mr-2" />
                            Provider Sign In
                          </Button>
                        </Link>
                        <Link to="/auth/provider-signup" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Stethoscope className="w-4 h-4 mr-2" />
                            Provider Sign Up
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Features & Quick Actions */}
            <div className="space-y-8">
              {/* Patient Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Patient Features</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Easy Appointment Booking</h3>
                      <p className="text-sm text-muted-foreground">Book appointments with verified doctors in seconds</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Digital Health Records</h3>
                      <p className="text-sm text-muted-foreground">Access your medical records anytime, anywhere</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Health Analytics</h3>
                      <p className="text-sm text-muted-foreground">Track your health metrics and get insights</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-4"
                      onClick={action.action}
                    >
                      <action.icon className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold">Secure & HIPAA Compliant</p>
                    <p>Your health data is protected with enterprise-grade security and HIPAA compliance.</p>
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

export default PatientSignIn;
