import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  Video,
  Calendar,
  Stethoscope,
  Users,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
  Award,
  Languages,
  DollarSign,
  Eye,
  BookOpen
} from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";

const DoctorSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const [searchFilters, setSearchFilters] = useState({
    specialty: 'all',
    location: '',
    language: 'all',
    availability: '',
    consultationType: 'all',
    priceRange: '',
    rating: '',
    gender: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const specialties = [
    'Cardiology', 'Dermatology', 'General Medicine', 'Pediatrics', 
    'Orthopedics', 'Neurology', 'Gynecology', 'Psychiatry', 
    'Ophthalmology', 'ENT', 'Oncology', 'Endocrinology'
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Smith",
      specialty: "Cardiology",
      rating: 4.9,
      reviewCount: 127,
      experience: "12 years",
      consultationFee: 150,
      location: "New York, NY",
      languages: ["English", "Spanish"],
      availability: "Available today",
      nextSlot: "2:30 PM",
      consultationTypes: ["Video Call", "In-Person"],
      image: "/api/placeholder/100/100",
      verified: true,
      responseTime: "< 5 min",
      education: "MD, Harvard Medical School",
      hospital: "NYC Medical Center"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Medicine",
      rating: 4.8,
      reviewCount: 89,
      experience: "8 years",
      consultationFee: 120,
      location: "Los Angeles, CA",
      languages: ["English", "Mandarin"],
      availability: "Available tomorrow",
      nextSlot: "10:00 AM",
      consultationTypes: ["Video Call", "In-Person"],
      image: "/api/placeholder/100/100",
      verified: true,
      responseTime: "< 10 min",
      education: "MD, Stanford University",
      hospital: "UCLA Medical Center"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Dermatology",
      rating: 4.7,
      reviewCount: 156,
      experience: "15 years",
      consultationFee: 180,
      location: "Chicago, IL",
      languages: ["English"],
      availability: "Available next week",
      nextSlot: "3:00 PM",
      consultationTypes: ["Video Call", "In-Person"],
      image: "/api/placeholder/100/100",
      verified: true,
      responseTime: "< 15 min",
      education: "MD, Johns Hopkins",
      hospital: "Northwestern Memorial"
    },
    {
      id: 4,
      name: "Dr. David Wilson",
      specialty: "Pediatrics",
      rating: 4.9,
      reviewCount: 203,
      experience: "10 years",
      consultationFee: 140,
      location: "Houston, TX",
      languages: ["English", "Spanish"],
      availability: "Available today",
      nextSlot: "4:00 PM",
      consultationTypes: ["Video Call", "In-Person"],
      image: "/api/placeholder/100/100",
      verified: true,
      responseTime: "< 8 min",
      education: "MD, Baylor College",
      hospital: "Texas Children's Hospital"
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      specialty: "Neurology",
      rating: 4.8,
      reviewCount: 94,
      experience: "14 years",
      consultationFee: 200,
      location: "Seattle, WA",
      languages: ["English", "Mandarin"],
      availability: "Available tomorrow",
      nextSlot: "11:00 AM",
      consultationTypes: ["Video Call", "In-Person"],
      image: "/api/placeholder/100/100",
      verified: true,
      responseTime: "< 12 min",
      education: "MD, University of Washington",
      hospital: "UW Medical Center"
    },
    {
      id: 6,
      name: "Dr. James Rodriguez",
      specialty: "Orthopedics",
      rating: 4.6,
      reviewCount: 78,
      experience: "11 years",
      consultationFee: 160,
      location: "Miami, FL",
      languages: ["English", "Spanish"],
      availability: "Available next week",
      nextSlot: "1:00 PM",
      consultationTypes: ["Video Call", "In-Person"],
      image: "/api/placeholder/100/100",
      verified: true,
      responseTime: "< 20 min",
      education: "MD, University of Miami",
      hospital: "Jackson Memorial"
    }
  ];

  const handleFilterChange = (filter: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [filter]: value }));
  };

  const filteredDoctors = doctors.filter(doctor => {
    if (searchFilters.specialty && searchFilters.specialty !== 'all' && doctor.specialty !== searchFilters.specialty) return false;
    if (searchFilters.location && !doctor.location.toLowerCase().includes(searchFilters.location.toLowerCase())) return false;
    if (searchFilters.language && searchFilters.language !== 'all' && !doctor.languages.includes(searchFilters.language)) return false;
    if (searchFilters.consultationType && searchFilters.consultationType !== 'all' && !doctor.consultationTypes.includes(searchFilters.consultationType)) return false;
    return true;
  });

  const handleBookAppointment = (doctor: any) => {
    navigate('/booking', { state: { doctor } });
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find the Right Doctor for You</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name, specialty, or condition..."
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10 w-full md:w-64"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label>Specialty</Label>
                    <Select value={searchFilters.specialty} onValueChange={(value) => handleFilterChange('specialty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {specialties.map(specialty => (
                          <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Language</Label>
                    <Select value={searchFilters.language} onValueChange={(value) => handleFilterChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="Mandarin">Mandarin</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Consultation Type</Label>
                    <Select value={searchFilters.consultationType} onValueChange={(value) => handleFilterChange('consultationType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Video Call">Video Call</SelectItem>
                        <SelectItem value="In-Person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                        <SelectItem value="availability">Availability</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredDoctors.length} doctors found
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Doctor Image */}
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">{doctor.name}</h3>
                          {doctor.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-muted-foreground">{doctor.education}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviewCount})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{doctor.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>${doctor.consultationFee}/consultation</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Languages className="w-3 h-3" />
                        <span>{doctor.languages.join(', ')}</span>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {doctor.availability}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Next slot: {doctor.nextSlot}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {doctor.consultationTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type === "Video Call" ? <Video className="w-3 h-3 mr-1" /> : <Stethoscope className="w-3 h-3 mr-1" />}
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="medical" 
                        size="sm" 
                        onClick={() => handleBookAppointment(doctor)}
                        className="flex-1"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredDoctors.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Doctors
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button variant="outline" onClick={() => setSearchFilters({
                specialty: '', location: '', language: '', availability: '',
                consultationType: '', priceRange: '', rating: '', gender: ''
              })}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
