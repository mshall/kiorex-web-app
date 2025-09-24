import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Stethoscope, 
  Shield, 
  Users, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star
} from "lucide-react";

const Welcome = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'provider' | null>(null);

  const features = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "24/7 Telemedicine",
      description: "Connect with doctors anytime, anywhere"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Health Records",
      description: "HIPAA-compliant medical document storage"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Care Network",
      description: "Access to verified healthcare professionals"
    }
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
            <Link to="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to Kiorex Healthcare Platform
              </Badge>
              <h1 className="text-5xl font-bold mb-6">
                Your Health Journey <span className="text-primary">Starts Here</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Join thousands of patients and healthcare providers using our comprehensive 
                medical platform for better health outcomes.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Role Selection */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                How would you like to use Kiorex?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Patient Card */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedRole === 'patient' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedRole('patient')}
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">I'm a Patient</CardTitle>
                    <CardDescription className="text-base">
                      Access healthcare services, book appointments, manage your health records, 
                      and connect with medical professionals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Book doctor consultations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Manage medical documents
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Access marketplace services
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Track health analytics
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Provider Card */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedRole === 'provider' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedRole('provider')}
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">I'm a Healthcare Provider</CardTitle>
                    <CardDescription className="text-base">
                      Join our network of medical professionals to offer consultations, 
                      manage patients, and grow your practice.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Conduct virtual consultations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Manage patient records
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Set your availability
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Track earnings & analytics
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Continue Buttons */}
              {selectedRole && (
                <div className="text-center space-y-4">
                  <Link to={selectedRole === 'patient' ? '/auth/patient-signup' : '/auth/provider-signup'}>
                    <Button size="lg" className="px-8">
                      Create {selectedRole === 'patient' ? 'Patient' : 'Provider'} Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link 
                      to={selectedRole === 'patient' ? '/auth/patient-signin' : '/auth/provider-signin'} 
                      className="text-primary hover:underline"
                    >
                      Sign in as {selectedRole === 'patient' ? 'Patient' : 'Provider'}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Active Patients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2K+</div>
                <div className="text-muted-foreground">Verified Doctors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <div className="text-muted-foreground">Consultations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                <div className="text-muted-foreground flex items-center justify-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  Rating
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
