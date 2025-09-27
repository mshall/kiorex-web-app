import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Filter,
  Home,
  Stethoscope,
  Plus,
  Activity,
  Users,
  Calendar,
  Video,
  Phone,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Scissors,
  Pill,
  Microscope,
  Shield,
  ArrowRight
} from "lucide-react";

const Marketplace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  
  // Service categories with dummy data
  const serviceCategories = [
    {
      id: 'surgery',
      name: 'Surgery',
      icon: Scissors,
      description: 'Advanced surgical procedures',
      providers: 25,
      avgPrice: 2500,
      color: 'bg-red-500'
    },
    {
      id: 'cardiology',
      name: 'Cardiology',
      icon: Heart,
      description: 'Heart and cardiovascular care',
      providers: 18,
      avgPrice: 200,
      color: 'bg-red-500'
    },
    {
      id: 'neurology',
      name: 'Neurology',
      icon: Brain,
      description: 'Brain and nervous system care',
      providers: 12,
      avgPrice: 180,
      color: 'bg-purple-500'
    },
    {
      id: 'orthopedics',
      name: 'Orthopedics',
      icon: Bone,
      description: 'Bone and joint treatment',
      providers: 22,
      avgPrice: 220,
      color: 'bg-blue-500'
    },
    {
      id: 'ophthalmology',
      name: 'Ophthalmology',
      icon: Eye,
      description: 'Eye care and vision treatment',
      providers: 15,
      avgPrice: 150,
      color: 'bg-green-500'
    },
    {
      id: 'pediatrics',
      name: 'Pediatrics',
      icon: Baby,
      description: 'Children's healthcare',
      providers: 20,
      avgPrice: 120,
      color: 'bg-pink-500'
    },
    {
      id: 'dermatology',
      name: 'Dermatology',
      icon: Shield,
      description: 'Skin care and treatment',
      providers: 16,
      avgPrice: 130,
      color: 'bg-yellow-500'
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: Pill,
      description: 'Medication and prescriptions',
      providers: 30,
      avgPrice: 50,
      color: 'bg-indigo-500'
    },
    {
      id: 'lab-tests',
      name: 'Lab Tests',
      icon: Microscope,
      description: 'Diagnostic testing services',
      providers: 14,
      avgPrice: 80,
      color: 'bg-teal-500'
    }
  ];

  const doctors = [
    { 
      id: 1, 
      name: "Dr. Emily Richardson", 
      specialty: "Cardiologist", 
      rating: 4.9, 
      reviews: 156, 
      price: 150, 
      location: "Downtown Medical Center",
      experience: "15 years",
      nextAvailable: "Today 2:30 PM",
      image: "ER",
      verified: true,
      languages: ["English", "Spanish"]
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      specialty: "General Physician", 
      rating: 4.8, 
      reviews: 203, 
      price: 100, 
      location: "City Health Clinic",
      experience: "12 years",
      nextAvailable: "Today 4:00 PM",
      image: "MC",
      verified: true,
      languages: ["English", "Mandarin"]
    },
    { 
      id: 3, 
      name: "Dr. Sarah Johnson", 
      specialty: "Dermatologist", 
      rating: 4.7, 
      reviews: 134, 
      price: 120, 
      location: "Skin Care Specialists",
      experience: "10 years",
      nextAvailable: "Tomorrow 10:00 AM",
      image: "SJ",
      verified: true,
      languages: ["English"]
    }
  ];

  const nurses = [
    {
      id: 1,
      name: "Maria Rodriguez",
      specialty: "Home Care Nurse",
      rating: 4.9,
      reviews: 89,
      price: 45,
      location: "Available citywide",
      experience: "8 years",
      nextAvailable: "Today 6:00 PM",
      image: "MR",
      verified: true,
      services: ["Medication Management", "Wound Care", "Vital Signs Monitoring"]
    },
    {
      id: 2,
      name: "James Thompson",
      specialty: "Critical Care Nurse",
      rating: 4.8,
      reviews: 67,
      price: 60,
      location: "Available 24/7",
      experience: "12 years",
      nextAvailable: "Today 8:00 PM",
      image: "JT",
      verified: true,
      services: ["Post-Surgery Care", "IV Therapy", "Patient Monitoring"]
    }
  ];

  const physiotherapists = [
    {
      id: 1,
      name: "Dr. Alex Kumar",
      specialty: "Sports Physiotherapist",
      rating: 4.9,
      reviews: 112,
      price: 80,
      location: "Rehab Plus Center",
      experience: "9 years",
      nextAvailable: "Today 3:00 PM",
      image: "AK",
      verified: true,
      specializations: ["Sports Injuries", "Spinal Therapy", "Joint Mobilization"]
    },
    {
      id: 2,
      name: "Lisa Wang",
      specialty: "Pediatric Physiotherapist",
      rating: 4.8,
      reviews: 94,
      price: 75,
      location: "Children's Wellness Center",
      experience: "7 years",
      nextAvailable: "Tomorrow 11:00 AM",
      image: "LW",
      verified: true,
      specializations: ["Developmental Delays", "Neurological Conditions", "Posture Correction"]
    }
  ];

  const ServiceCard = ({ service }: { service: any }) => {
    const IconComponent = service.icon;
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center text-white`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {service.providers} providers
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    From ${service.avgPrice}
                  </div>
                </div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button 
              variant="medical" 
              className="flex-1"
              onClick={() => navigate('/service-detail', { 
                state: { 
                  userType, 
                  providerType, 
                  serviceType: 'doctors',
                  serviceCategory: service.id
                } 
              })}
            >
              <Users className="w-4 h-4 mr-2" />
              View Providers
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/service-detail', { 
                state: { 
                  userType, 
                  providerType, 
                  serviceType: 'doctors',
                  serviceCategory: service.id
                } 
              })}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProviderCard = ({ provider, type }: { provider: any; type: string }) => (
    <Card className="group hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {provider.image}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{provider.name}</h3>
                {provider.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Activity className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{provider.specialty}</p>
              <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-warning mr-1" />
                  {provider.rating} ({provider.reviews} reviews)
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {provider.experience}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${provider.price}
              <span className="text-sm text-muted-foreground">/{type === 'doctor' ? 'session' : 'hour'}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 inline mr-1" />
              {provider.location}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-success font-medium">
              <Calendar className="w-4 h-4 inline mr-1" />
              Next available: {provider.nextAvailable}
            </p>
          </div>

          {type === 'nurse' && provider.services && (
            <div>
              <p className="text-sm font-medium mb-2">Services:</p>
              <div className="flex flex-wrap gap-1">
                {provider.services.map((service: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {type === 'physiotherapist' && provider.specializations && (
            <div>
              <p className="text-sm font-medium mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-1">
                {provider.specializations.map((spec: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {provider.languages && (
            <div>
              <p className="text-sm font-medium mb-1">Languages:</p>
              <p className="text-sm text-muted-foreground">{provider.languages.join(", ")}</p>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-4">
          <Button variant="medical" className="flex-1">
            <Video className="w-4 h-4 mr-2" />
            Book Video Call
          </Button>
          <Button variant="outline" className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Phone Call
          </Button>
          {type !== 'doctor' && (
            <Button variant="outline" className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Home Visit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">On-Demand Healthcare Providers</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with verified doctors, nurses, and physiotherapists instantly
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by specialty, name, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="px-8">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Verified Doctors</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">200+</div>
              <p className="text-sm text-muted-foreground">Home Care Nurses</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">150+</div>
              <p className="text-sm text-muted-foreground">Physiotherapists</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-info" />
              </div>
              <div className="text-2xl font-bold text-info">24/7</div>
              <p className="text-sm text-muted-foreground">Availability</p>
            </CardContent>
          </Card>
        </div>

        {/* Provider Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="services">Healthcare Services</TabsTrigger>
            <TabsTrigger value="doctors">Doctors On-Demand</TabsTrigger>
            <TabsTrigger value="nurses">Nurses On-Demand</TabsTrigger>
            <TabsTrigger value="physiotherapists">Physiotherapists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Healthcare Services</h2>
              <p className="text-muted-foreground">Choose a service to find providers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Available Doctors</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Join as Doctor
              </Button>
            </div>
            <div className="grid gap-6">
              {doctors.map((doctor) => (
                <ProviderCard key={doctor.id} provider={doctor} type="doctor" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nurses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Available Nurses</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Join as Nurse
              </Button>
            </div>
            <div className="grid gap-6">
              {nurses.map((nurse) => (
                <ProviderCard key={nurse.id} provider={nurse} type="nurse" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="physiotherapists" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Available Physiotherapists</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Join as Physiotherapist
              </Button>
            </div>
            <div className="grid gap-6">
              {physiotherapists.map((physio) => (
                <ProviderCard key={physio.id} provider={physio} type="physiotherapist" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;