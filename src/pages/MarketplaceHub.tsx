import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Users,
  Shield,
  Award,
  TrendingUp,
  DollarSign,
  Calendar,
  Microscope,
  Pill,
  Home,
  Stethoscope,
  Scissors,
  Activity,
  FileText,
  Phone,
  MessageCircle,
  Filter,
  Grid3X3,
  List,
  ChevronDown
} from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";

const MarketplaceHub = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Services', icon: Grid3X3, color: 'primary' },
    { id: 'surgery', name: 'Surgery', icon: Scissors, color: 'destructive' },
    { id: 'lab', name: 'Lab Tests', icon: Microscope, color: 'info' },
    { id: 'pharmacy', name: 'Pharmacy', icon: Pill, color: 'secondary' },
    { id: 'nurse', name: 'Home Care', icon: Home, color: 'accent' },
    { id: 'physio', name: 'Physiotherapy', icon: Activity, color: 'warning' }
  ];

  const services = [
    {
      id: 1,
      category: 'surgery',
      title: 'Cardiac Surgery',
      description: 'Advanced cardiac procedures performed by experienced surgeons',
      provider: 'City Heart Center',
      location: 'New York, NY',
      rating: 4.9,
      reviewCount: 127,
      price: '$15,000 - $25,000',
      duration: '3-5 hours',
      availability: 'Available next week',
      features: ['Minimally invasive', 'Expert surgeons', 'Post-op care'],
      image: '/api/placeholder/300/200',
      icon: Scissors
    },
    {
      id: 2,
      category: 'lab',
      title: 'Comprehensive Blood Panel',
      description: 'Complete blood count, lipid profile, and metabolic panel',
      provider: 'LabCorp Diagnostics',
      location: 'Multiple locations',
      rating: 4.8,
      reviewCount: 89,
      price: '$89',
      duration: 'Results in 24 hours',
      availability: 'Available today',
      features: ['Home collection', 'Fast results', 'Digital reports'],
      image: '/api/placeholder/300/200',
      icon: Microscope
    },
    {
      id: 3,
      category: 'pharmacy',
      title: 'Prescription Delivery',
      description: 'Same-day prescription delivery to your doorstep',
      provider: 'MediFast Pharmacy',
      location: 'Nationwide',
      rating: 4.7,
      reviewCount: 203,
      price: 'Free delivery',
      duration: 'Same day',
      availability: 'Available now',
      features: ['Same-day delivery', 'Insurance accepted', 'Generic options'],
      image: '/api/placeholder/300/200',
      icon: Pill
    },
    {
      id: 4,
      category: 'nurse',
      title: 'Private Nursing Care',
      description: 'Professional nursing care for elderly and post-surgical patients',
      provider: 'CarePlus Nursing',
      location: 'Chicago, IL',
      rating: 4.9,
      reviewCount: 156,
      price: '$45/hour',
      duration: 'Flexible hours',
      availability: 'Available tomorrow',
      features: ['Licensed nurses', '24/7 care', 'Specialized care'],
      image: '/api/placeholder/300/200',
      icon: Home
    },
    {
      id: 5,
      category: 'physio',
      title: 'Physical Therapy Sessions',
      description: 'Rehabilitation and physical therapy for injury recovery',
      provider: 'RecoveryPlus Clinic',
      location: 'Los Angeles, CA',
      rating: 4.8,
      reviewCount: 94,
      price: '$120/session',
      duration: '45-60 minutes',
      availability: 'Available this week',
      features: ['Home visits', 'Expert therapists', 'Customized plans'],
      image: '/api/placeholder/300/200',
      icon: Activity
    },
    {
      id: 6,
      category: 'surgery',
      title: 'Laparoscopic Surgery',
      description: 'Minimally invasive surgical procedures',
      provider: 'Advanced Surgery Center',
      location: 'Houston, TX',
      rating: 4.7,
      reviewCount: 78,
      price: '$8,000 - $12,000',
      duration: '1-2 hours',
      availability: 'Available next month',
      features: ['Minimally invasive', 'Quick recovery', 'Expert team'],
      image: '/api/placeholder/300/200',
      icon: Scissors
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleServiceClick = (service: any) => {
    // Remove icon from service data to avoid DataCloneError
    const { icon, ...serviceData } = service;
    navigate(`/marketplace/${service.category}`, { state: { service: serviceData } });
  };

  const getCategoryStats = () => {
    return {
      surgery: { count: 25, avgRating: 4.8, avgPrice: '$12,000' },
      lab: { count: 45, avgRating: 4.7, avgPrice: '$85' },
      pharmacy: { count: 150, avgRating: 4.6, avgPrice: '$25' },
      nurse: { count: 80, avgRating: 4.9, avgPrice: '$40/hour' },
      physio: { count: 35, avgRating: 4.8, avgPrice: '$110/session' }
    };
  };

  const stats = getCategoryStats();

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Comprehensive <span className="text-primary">Healthcare Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Access a wide range of healthcare services from verified providers. 
            From surgeries to lab tests, we connect you with the best care available.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for services, providers, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    category.color === 'primary' ? 'bg-primary/10' :
                    category.color === 'destructive' ? 'bg-destructive/10' :
                    category.color === 'info' ? 'bg-info/10' :
                    category.color === 'secondary' ? 'bg-secondary/10' :
                    category.color === 'accent' ? 'bg-accent/10' :
                    'bg-warning/10'
                  }`}>
                    <category.icon className={`w-6 h-6 ${
                      category.color === 'primary' ? 'text-primary' :
                      category.color === 'destructive' ? 'text-destructive' :
                      category.color === 'info' ? 'text-info' :
                      category.color === 'secondary' ? 'text-secondary' :
                      category.color === 'accent' ? 'text-accent' :
                      'text-warning'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  {category.id !== 'all' && stats[category.id as keyof typeof stats] && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats[category.id as keyof typeof stats].count} services
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All Services' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <ChevronDown className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 group" onClick={() => handleServiceClick(service)}>
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      {service.icon ? <service.icon className="w-12 h-12 mx-auto mb-2" /> : <Stethoscope className="w-12 h-12 mx-auto mb-2" />}
                      <span className="text-lg font-semibold">{service.title}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-sm text-muted-foreground">({service.reviewCount})</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{service.price}</p>
                        <p className="text-xs text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.features.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.availability}
                      </Badge>
                      <Button size="sm" className="group-hover:bg-primary">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <Card key={service.id} className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => handleServiceClick(service)}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary text-lg">{service.price}</p>
                            <p className="text-xs text-muted-foreground">{service.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{service.rating} ({service.reviewCount})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{service.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {service.availability}
                            </Badge>
                            <Button size="sm">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse different categories
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Trusted by Thousands</h2>
            <p className="text-muted-foreground">
              Join our community of satisfied patients and healthcare providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Active Patients</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold mb-1">2K+</div>
                <div className="text-sm text-muted-foreground">Verified Providers</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold mb-1">100K+</div>
                <div className="text-sm text-muted-foreground">Services Booked</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-warning" />
                </div>
                <div className="text-2xl font-bold mb-1">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHub;
