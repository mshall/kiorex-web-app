import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
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
  ChevronDown,
  Eye,
  Video,
  ArrowLeft,
  SortAsc,
  SortDesc,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  X
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
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [serviceDetailSearch, setServiceDetailSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setSelectedCategory(service.category);
    setShowServiceDetail(true);
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

  // Service-specific data based on category
  const getServiceSpecificData = () => {
    switch (selectedCategory) {
      case 'surgery':
        return [
          { 
            id: 1, 
            name: "Dr. Michael Thompson", 
            specialty: "Cardiac Surgeon", 
            rating: 4.9, 
            reviews: 89, 
            price: 2500, 
            location: "Heart Surgery Center",
            experience: "18 years",
            nextAvailable: "Tomorrow 8:00 AM",
            profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Cardiac Surgery",
            clinic: "Downtown Medical Center",
            country: "United States",
            city: "New York",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 2, 
            name: "Dr. Sarah Williams", 
            specialty: "Orthopedic Surgeon", 
            rating: 4.8, 
            reviews: 76, 
            price: 2200, 
            location: "Sports Medicine Center",
            experience: "15 years",
            nextAvailable: "Today 3:00 PM",
            profileImage: "https://images.unsplash.com/photo-1594824713406-9a9d4a2e8a6d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "Orthopedic Surgery",
            clinic: "Sports Medicine Center",
            country: "United States",
            city: "Los Angeles",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 3, 
            name: "Dr. James Rodriguez", 
            specialty: "Neurosurgeon", 
            rating: 4.9, 
            reviews: 124, 
            price: 3500, 
            location: "Neuroscience Institute",
            experience: "22 years",
            nextAvailable: "Next Week",
            profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Neurosurgery",
            clinic: "Advanced Medical Center",
            country: "United States",
            city: "Chicago",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 4, 
            name: "Dr. Emily Chen", 
            specialty: "Plastic Surgeon", 
            rating: 4.7, 
            reviews: 98, 
            price: 1800, 
            location: "Aesthetic Surgery Center",
            experience: "12 years",
            nextAvailable: "Today 2:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Mandarin"],
            serviceType: "Plastic Surgery",
            clinic: "Beauty & Health Clinic",
            country: "United States",
            city: "Miami",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 5, 
            name: "Dr. Robert Johnson", 
            specialty: "General Surgeon", 
            rating: 4.6, 
            reviews: 67, 
            price: 1500, 
            location: "City General Hospital",
            experience: "14 years",
            nextAvailable: "Tomorrow 10:00 AM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "General Surgery",
            clinic: "City General Hospital",
            country: "United States",
            city: "Seattle",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 6, 
            name: "Dr. Maria Garcia", 
            specialty: "Pediatric Surgeon", 
            rating: 4.8, 
            reviews: 112, 
            price: 2000, 
            location: "Children's Medical Center",
            experience: "16 years",
            nextAvailable: "This Week",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Pediatric Surgery",
            clinic: "Children's Medical Center",
            country: "United States",
            city: "San Francisco",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 7, 
            name: "Dr. David Kim", 
            specialty: "Vascular Surgeon", 
            rating: 4.9, 
            reviews: 95, 
            price: 2800, 
            location: "Vascular Institute",
            experience: "20 years",
            nextAvailable: "Today 4:00 PM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Korean"],
            serviceType: "Vascular Surgery",
            clinic: "Heart & Vascular Center",
            country: "United States",
            city: "Boston",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 8, 
            name: "Dr. Lisa Anderson", 
            specialty: "Ophthalmologic Surgeon", 
            rating: 4.8, 
            reviews: 143, 
            price: 1200, 
            location: "Eye Surgery Center",
            experience: "13 years",
            nextAvailable: "Tomorrow 1:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "Eye Surgery",
            clinic: "Vision Care Institute",
            country: "United States",
            city: "Phoenix",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 9, 
            name: "Dr. Ahmed Hassan", 
            specialty: "Urological Surgeon", 
            rating: 4.7, 
            reviews: 78, 
            price: 1900, 
            location: "Urology Center",
            experience: "17 years",
            nextAvailable: "This Week",
            profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Arabic"],
            serviceType: "Urological Surgery",
            clinic: "Advanced Urology Clinic",
            country: "United States",
            city: "Houston",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 10, 
            name: "Dr. Jennifer Taylor", 
            specialty: "Gynecological Surgeon", 
            rating: 4.9, 
            reviews: 156, 
            price: 2100, 
            location: "Women's Health Center",
            experience: "19 years",
            nextAvailable: "Today 11:00 AM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "French"],
            serviceType: "Gynecological Surgery",
            clinic: "Women's Wellness Center",
            country: "United States",
            city: "Denver",
            consultationTypes: ["Video Call", "In-Person"]
          }
        ];
      case 'physio':
        return [
          { 
            id: 1, 
            name: "Alex Johnson", 
            specialty: "Physical Therapist", 
            rating: 4.9, 
            reviews: 124, 
            price: 110, 
            location: "Rehabilitation Center",
            experience: "12 years",
            nextAvailable: "Today 2:00 PM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "French"],
            serviceType: "Physical Therapy",
            clinic: "Elite Rehabilitation",
            country: "United States",
            city: "Chicago",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 2, 
            name: "Maria Rodriguez", 
            specialty: "Sports Physiotherapist", 
            rating: 4.8, 
            reviews: 98, 
            price: 125, 
            location: "Sports Therapy Clinic",
            experience: "10 years",
            nextAvailable: "Tomorrow 9:00 AM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Sports Therapy",
            clinic: "Athletic Performance Center",
            country: "United States",
            city: "Miami",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 3, 
            name: "Dr. Sarah Mitchell", 
            specialty: "Orthopedic Physiotherapist", 
            rating: 4.9, 
            reviews: 156, 
            price: 130, 
            location: "Orthopedic Rehab Center",
            experience: "15 years",
            nextAvailable: "Today 4:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "Orthopedic Therapy",
            clinic: "Bone & Joint Rehab",
            country: "United States",
            city: "Seattle",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 4, 
            name: "James Wilson", 
            specialty: "Neurological Physiotherapist", 
            rating: 4.7, 
            reviews: 87, 
            price: 140, 
            location: "Neuro Rehab Institute",
            experience: "11 years",
            nextAvailable: "Tomorrow 1:00 PM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "German"],
            serviceType: "Neurological Therapy",
            clinic: "Brain Recovery Center",
            country: "United States",
            city: "Boston",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 5, 
            name: "Dr. Lisa Chen", 
            specialty: "Pediatric Physiotherapist", 
            rating: 4.8, 
            reviews: 112, 
            price: 120, 
            location: "Children's Rehab Center",
            experience: "13 years",
            nextAvailable: "This Week",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Mandarin"],
            serviceType: "Pediatric Therapy",
            clinic: "Kids Wellness Center",
            country: "United States",
            city: "San Francisco",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 6, 
            name: "Michael Brown", 
            specialty: "Cardiopulmonary Physiotherapist", 
            rating: 4.6, 
            reviews: 73, 
            price: 115, 
            location: "Heart & Lung Rehab",
            experience: "9 years",
            nextAvailable: "Today 3:00 PM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "Cardiopulmonary Therapy",
            clinic: "Cardiac Rehab Center",
            country: "United States",
            city: "Phoenix",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 7, 
            name: "Dr. Emma Davis", 
            specialty: "Women's Health Physiotherapist", 
            rating: 4.9, 
            reviews: 134, 
            price: 135, 
            location: "Women's Wellness Center",
            experience: "14 years",
            nextAvailable: "Tomorrow 10:00 AM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "French"],
            serviceType: "Women's Health Therapy",
            clinic: "Pelvic Health Center",
            country: "United States",
            city: "Denver",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 8, 
            name: "Robert Taylor", 
            specialty: "Geriatric Physiotherapist", 
            rating: 4.7, 
            reviews: 95, 
            price: 105, 
            location: "Senior Care Center",
            experience: "16 years",
            nextAvailable: "Today 11:00 AM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Geriatric Therapy",
            clinic: "Golden Years Rehab",
            country: "United States",
            city: "Houston",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 9, 
            name: "Dr. Anna Kowalski", 
            specialty: "Vestibular Physiotherapist", 
            rating: 4.8, 
            reviews: 78, 
            price: 145, 
            location: "Balance & Dizziness Center",
            experience: "12 years",
            nextAvailable: "This Week",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Polish"],
            serviceType: "Vestibular Therapy",
            clinic: "Balance Institute",
            country: "United States",
            city: "Detroit",
            consultationTypes: ["Video Call", "In-Person"]
          },
          { 
            id: 10, 
            name: "David Lee", 
            specialty: "Aquatic Physiotherapist", 
            rating: 4.6, 
            reviews: 89, 
            price: 125, 
            location: "Aquatic Therapy Center",
            experience: "8 years",
            nextAvailable: "Tomorrow 2:00 PM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Korean"],
            serviceType: "Aquatic Therapy",
            clinic: "Water Wellness Center",
            country: "United States",
            city: "Los Angeles",
            consultationTypes: ["Video Call", "In-Person"]
          }
        ];
      case 'nurse':
        return [
          { 
            id: 1, 
            name: "Jennifer Smith", 
            specialty: "Registered Nurse", 
            rating: 4.9, 
            reviews: 156, 
            price: 45, 
            location: "Home Care Services",
            experience: "8 years",
            nextAvailable: "Today 1:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "Home Nursing",
            clinic: "ComfortCare Nursing",
            country: "United States",
            city: "Seattle",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 2, 
            name: "Robert Chen", 
            specialty: "Critical Care Nurse", 
            rating: 4.8, 
            reviews: 89, 
            price: 50, 
            location: "Medical Center",
            experience: "6 years",
            nextAvailable: "Tomorrow 10:00 AM",
            profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Mandarin"],
            serviceType: "Critical Care",
            clinic: "Metro Health Services",
            country: "United States",
            city: "San Francisco",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 3, 
            name: "Dr. Sarah Johnson", 
            specialty: "Nurse Practitioner", 
            rating: 4.9, 
            reviews: 178, 
            price: 75, 
            location: "Family Health Clinic",
            experience: "12 years",
            nextAvailable: "Today 3:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Primary Care",
            clinic: "Community Health Center",
            country: "United States",
            city: "Chicago",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 4, 
            name: "Michael Rodriguez", 
            specialty: "Pediatric Nurse", 
            rating: 4.8, 
            reviews: 134, 
            price: 55, 
            location: "Children's Hospital",
            experience: "9 years",
            nextAvailable: "Tomorrow 2:00 PM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Pediatric Care",
            clinic: "Kids Health Center",
            country: "United States",
            city: "Miami",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 5, 
            name: "Dr. Lisa Wang", 
            specialty: "Geriatric Nurse", 
            rating: 4.7, 
            reviews: 112, 
            price: 60, 
            location: "Senior Living Center",
            experience: "14 years",
            nextAvailable: "This Week",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Mandarin"],
            serviceType: "Geriatric Care",
            clinic: "Golden Years Health",
            country: "United States",
            city: "Boston",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 6, 
            name: "Emma Thompson", 
            specialty: "Mental Health Nurse", 
            rating: 4.9, 
            reviews: 145, 
            price: 65, 
            location: "Mental Health Center",
            experience: "11 years",
            nextAvailable: "Today 4:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "French"],
            serviceType: "Mental Health Care",
            clinic: "Wellness Institute",
            country: "United States",
            city: "Denver",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 7, 
            name: "David Kim", 
            specialty: "Oncology Nurse", 
            rating: 4.8, 
            reviews: 98, 
            price: 70, 
            location: "Cancer Treatment Center",
            experience: "13 years",
            nextAvailable: "Tomorrow 9:00 AM",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Korean"],
            serviceType: "Oncology Care",
            clinic: "Hope Cancer Center",
            country: "United States",
            city: "Houston",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 8, 
            name: "Dr. Maria Garcia", 
            specialty: "Cardiac Nurse", 
            rating: 4.9, 
            reviews: 167, 
            price: 80, 
            location: "Heart Institute",
            experience: "15 years",
            nextAvailable: "Today 11:00 AM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Cardiac Care",
            clinic: "Heart Health Center",
            country: "United States",
            city: "Phoenix",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 9, 
            name: "James Wilson", 
            specialty: "Emergency Nurse", 
            rating: 4.7, 
            reviews: 123, 
            price: 55, 
            location: "Emergency Department",
            experience: "10 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English"],
            serviceType: "Emergency Care",
            clinic: "City Emergency Center",
            country: "United States",
            city: "Detroit",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 10, 
            name: "Dr. Anna Kowalski", 
            specialty: "Wound Care Nurse", 
            rating: 4.8, 
            reviews: 89, 
            price: 60, 
            location: "Wound Care Center",
            experience: "12 years",
            nextAvailable: "Tomorrow 1:00 PM",
            profileImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
            verified: true,
            languages: ["English", "Polish"],
            serviceType: "Wound Care",
            clinic: "Advanced Wound Center",
            country: "United States",
            city: "Los Angeles",
            consultationTypes: ["In-Person"]
          }
        ];
      case 'lab':
        return [
          { 
            id: 1, 
            name: "LabCorp Diagnostics", 
            specialty: "Full Service Laboratory", 
            rating: 4.7, 
            reviews: 234, 
            price: 89, 
            location: "Multiple Locations",
            experience: "25 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Blood Tests",
            clinic: "LabCorp Network",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 2, 
            name: "Quest Diagnostics", 
            specialty: "Advanced Testing Lab", 
            rating: 4.6, 
            reviews: 189, 
            price: 95, 
            location: "Medical District",
            experience: "30 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Diagnostic Tests",
            clinic: "Quest Medical Center",
            country: "United States",
            city: "Boston",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 3, 
            name: "BioReference Laboratories", 
            specialty: "Specialized Testing Lab", 
            rating: 4.8, 
            reviews: 156, 
            price: 120, 
            location: "Research District",
            experience: "20 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "French"],
            serviceType: "Specialized Tests",
            clinic: "BioReference Center",
            country: "United States",
            city: "New York",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 4, 
            name: "ARUP Laboratories", 
            specialty: "University Lab Services", 
            rating: 4.9, 
            reviews: 198, 
            price: 110, 
            location: "University Medical Center",
            experience: "35 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Research Testing",
            clinic: "ARUP Research Lab",
            country: "United States",
            city: "Salt Lake City",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 5, 
            name: "Mayo Clinic Laboratories", 
            specialty: "Comprehensive Lab Services", 
            rating: 4.9, 
            reviews: 267, 
            price: 130, 
            location: "Mayo Clinic Campus",
            experience: "40 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Comprehensive Testing",
            clinic: "Mayo Clinic Lab",
            country: "United States",
            city: "Rochester",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 6, 
            name: "Cleveland Clinic Labs", 
            specialty: "Cardiac & Specialty Testing", 
            rating: 4.8, 
            reviews: 189, 
            price: 115, 
            location: "Cleveland Clinic",
            experience: "30 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Cardiac Testing",
            clinic: "Cleveland Clinic Lab",
            country: "United States",
            city: "Cleveland",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 7, 
            name: "Johns Hopkins Lab", 
            specialty: "Research & Clinical Testing", 
            rating: 4.9, 
            reviews: 223, 
            price: 125, 
            location: "Johns Hopkins Hospital",
            experience: "45 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "German"],
            serviceType: "Clinical Research",
            clinic: "Johns Hopkins Lab",
            country: "United States",
            city: "Baltimore",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 8, 
            name: "Stanford Health Care Labs", 
            specialty: "Advanced Molecular Testing", 
            rating: 4.8, 
            reviews: 167, 
            price: 140, 
            location: "Stanford Medical Center",
            experience: "25 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Mandarin"],
            serviceType: "Molecular Testing",
            clinic: "Stanford Lab Services",
            country: "United States",
            city: "Palo Alto",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 9, 
            name: "UCLA Health Labs", 
            specialty: "Comprehensive Diagnostic Lab", 
            rating: 4.7, 
            reviews: 145, 
            price: 105, 
            location: "UCLA Medical Center",
            experience: "28 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Diagnostic Services",
            clinic: "UCLA Lab Network",
            country: "United States",
            city: "Los Angeles",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 10, 
            name: "Mount Sinai Labs", 
            specialty: "Specialized Medical Testing", 
            rating: 4.8, 
            reviews: 178, 
            price: 135, 
            location: "Mount Sinai Hospital",
            experience: "32 years",
            nextAvailable: "Available Today",
            profileImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Hebrew"],
            serviceType: "Specialized Testing",
            clinic: "Mount Sinai Lab",
            country: "United States",
            city: "New York",
            consultationTypes: ["In-Person"]
          }
        ];
      case 'pharmacy':
        return [
          { 
            id: 1, 
            name: "CVS Pharmacy", 
            specialty: "Community Pharmacy", 
            rating: 4.5, 
            reviews: 567, 
            price: 0, 
            location: "24/7 Service",
            experience: "40 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Prescription & OTC",
            clinic: "CVS Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 2, 
            name: "Walgreens Pharmacy", 
            specialty: "Health & Wellness", 
            rating: 4.4, 
            reviews: 445, 
            price: 0, 
            location: "Health Centers",
            experience: "35 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Pharmacy Services",
            clinic: "Walgreens Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 3, 
            name: "Rite Aid Pharmacy", 
            specialty: "Full Service Pharmacy", 
            rating: 4.3, 
            reviews: 389, 
            price: 0, 
            location: "Community Locations",
            experience: "30 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "French"],
            serviceType: "Community Pharmacy",
            clinic: "Rite Aid Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 4, 
            name: "Target Pharmacy", 
            specialty: "Retail Pharmacy Services", 
            rating: 4.4, 
            reviews: 298, 
            price: 0, 
            location: "Target Stores",
            experience: "25 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Retail Pharmacy",
            clinic: "Target Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 5, 
            name: "Walmart Pharmacy", 
            specialty: "Affordable Healthcare", 
            rating: 4.2, 
            reviews: 456, 
            price: 0, 
            location: "Walmart Supercenters",
            experience: "20 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Affordable Pharmacy",
            clinic: "Walmart Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 6, 
            name: "Kroger Pharmacy", 
            specialty: "Grocery Store Pharmacy", 
            rating: 4.3, 
            reviews: 234, 
            price: 0, 
            location: "Kroger Stores",
            experience: "28 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Grocery Pharmacy",
            clinic: "Kroger Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 7, 
            name: "Costco Pharmacy", 
            specialty: "Wholesale Pharmacy", 
            rating: 4.6, 
            reviews: 178, 
            price: 0, 
            location: "Costco Warehouses",
            experience: "22 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Wholesale Pharmacy",
            clinic: "Costco Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 8, 
            name: "Safeway Pharmacy", 
            specialty: "Grocery Chain Pharmacy", 
            rating: 4.4, 
            reviews: 156, 
            price: 0, 
            location: "Safeway Stores",
            experience: "26 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Grocery Pharmacy",
            clinic: "Safeway Health",
            country: "United States",
            city: "Nationwide",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 9, 
            name: "Publix Pharmacy", 
            specialty: "Regional Pharmacy Chain", 
            rating: 4.7, 
            reviews: 189, 
            price: 0, 
            location: "Publix Super Markets",
            experience: "32 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English", "Spanish"],
            serviceType: "Regional Pharmacy",
            clinic: "Publix Health",
            country: "United States",
            city: "Southeast",
            consultationTypes: ["In-Person"]
          },
          { 
            id: 10, 
            name: "Meijer Pharmacy", 
            specialty: "Midwest Pharmacy Chain", 
            rating: 4.5, 
            reviews: 167, 
            price: 0, 
            location: "Meijer Stores",
            experience: "24 years",
            nextAvailable: "Available 24/7",
            profileImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center",
            verified: true,
            languages: ["English"],
            serviceType: "Regional Pharmacy",
            clinic: "Meijer Health",
            country: "United States",
            city: "Midwest",
            consultationTypes: ["In-Person"]
          }
        ];
      default:
        return [];
    }
  };

  // Get filtered and sorted data for service detail view
  const filteredAndSortedData = useMemo(() => {
    const data = getServiceSpecificData();
    
    // Return empty array if no data or if 'all' category is selected
    if (!data || data.length === 0 || selectedCategory === 'all') {
      return [];
    }
    
    let filtered = data.filter(provider => {
      const matchesSearch = serviceDetailSearch === '' || 
        provider.name.toLowerCase().includes(serviceDetailSearch.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(serviceDetailSearch.toLowerCase()) ||
        provider.location.toLowerCase().includes(serviceDetailSearch.toLowerCase());
      
      const matchesPrice = priceFilter === 'all' || 
        (priceFilter === 'low' && provider.price < 100) ||
        (priceFilter === 'medium' && provider.price >= 100 && provider.price < 1000) ||
        (priceFilter === 'high' && provider.price >= 1000);
      
      const matchesCountry = countryFilter === 'all' || provider.country === countryFilter;
      const matchesCity = cityFilter === 'all' || provider.city === cityFilter;
      
      return matchesSearch && matchesPrice && matchesCountry && matchesCity;
    });

    // Sort data
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'experience':
          comparison = parseInt(a.experience) - parseInt(b.experience);
          break;
        default:
          comparison = a.rating - b.rating;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [selectedCategory, serviceDetailSearch, priceFilter, countryFilter, cityFilter, sortBy, sortOrder]);

  // Pagination hook
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData,
    setCurrentPage,
    setItemsPerPage
  } = usePagination(filteredAndSortedData || [], { initialItemsPerPage: 6 });

  // Handle booking appointment
  const handleBookAppointment = (provider: any) => {
    navigate('/booking', { 
      state: { 
        userType, 
        providerType, 
        doctor: provider,
        serviceType: selectedCategory
      } 
    });
  };

  // Handle view details
  const handleViewDetails = (provider: any) => {
    setSelectedProvider(provider);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />

      {!showServiceDetail ? (
        // Marketplace View
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
        {selectedCategory !== 'all' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {categories.find(c => c.id === selectedCategory)?.name}
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
        )}

        {/* All Services Message */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid3X3 className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Browse Healthcare Services</h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Select a specific category above to view available providers and services. 
                  Choose from surgery, lab tests, pharmacy, nursing care, or physiotherapy.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.filter(c => c.id !== 'all').map((category) => (
                    <Button 
                      key={category.id}
                      variant="outline" 
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center space-x-2"
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
      ) : (
        // Service Detail View
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceDetail(false)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Marketplace</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedCategory === 'surgery' ? 'Available Surgeons' :
                   selectedCategory === 'physio' ? 'Available Physiotherapists' :
                   selectedCategory === 'nurse' ? 'Available Nurses' :
                   selectedCategory === 'lab' ? 'Available Labs' :
                   selectedCategory === 'pharmacy' ? 'Available Pharmacies' :
                   'Available Providers'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Choose from our verified {selectedCategory === 'surgery' ? 'surgeons' :
                   selectedCategory === 'physio' ? 'physiotherapists' :
                   selectedCategory === 'nurse' ? 'nurses' :
                   selectedCategory === 'lab' ? 'laboratories' :
                   selectedCategory === 'pharmacy' ? 'pharmacies' :
                   'providers'}
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search providers..."
                  value={serviceDetailSearch}
                  onChange={(e) => setServiceDetailSearch(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="price-filter">Price Range</Label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">Under $100</SelectItem>
                    <SelectItem value="medium">$100 - $1000</SelectItem>
                    <SelectItem value="high">Over $1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="country-filter">Country</Label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city-filter">City</Label>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Houston">Houston</SelectItem>
                    <SelectItem value="Miami">Miami</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="Boston">Boston</SelectItem>
                    <SelectItem value="Nationwide">Nationwide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sort-by">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sort-order">Order</Label>
                <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">High to Low</SelectItem>
                    <SelectItem value="asc">Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {paginatedData.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      {provider.profileImage ? (
                        <img 
                          src={provider.profileImage} 
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-xl">
                          {provider.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{provider.name}</h3>
                          <p className="text-muted-foreground">{provider.specialty}</p>
                        </div>
                        {provider.verified && (
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            <Shield className="w-3 h-3" />
                            <span>Verified</span>
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{provider.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{provider.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{provider.nextAvailable}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">
                            {provider.price === 0 ? 'Free' : `$${provider.price}${selectedCategory === 'nurse' ? '/hour' : selectedCategory === 'lab' || selectedCategory === 'pharmacy' ? '' : ''}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {provider.consultationTypes.map((type: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type === 'Video Call' ? (
                                <><Video className="w-3 h-3 mr-1" /> Video Call</>
                              ) : (
                                <><Stethoscope className="w-3 h-3 mr-1" /> In-Person</>
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <Button 
                          onClick={() => handleBookAppointment(provider)}
                          className="flex-1"
                        >
                          {selectedCategory === 'surgery' ? 'Book Surgery' :
                           selectedCategory === 'physio' ? 'Book Session' :
                           selectedCategory === 'nurse' ? 'Book Nurse' :
                           selectedCategory === 'lab' ? 'Book Test' :
                           selectedCategory === 'pharmacy' ? 'Visit Pharmacy' :
                           'Book Appointment'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewDetails(provider)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[6, 9, 12, 15, 20]}
          />

          {/* Provider Details Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Provider Details</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDialogOpen(false)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              {selectedProvider && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      {selectedProvider.profileImage ? (
                        <img 
                          src={selectedProvider.profileImage} 
                          alt={selectedProvider.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-2xl">
                          {selectedProvider.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{selectedProvider.name}</h3>
                      <p className="text-muted-foreground">{selectedProvider.specialty}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{selectedProvider.rating}</span>
                          <span className="text-muted-foreground">({selectedProvider.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{selectedProvider.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Experience</Label>
                      <p className="font-medium">{selectedProvider.experience}</p>
                    </div>
                    <div>
                      <Label>Next Available</Label>
                      <p className="font-medium">{selectedProvider.nextAvailable}</p>
                    </div>
                    <div>
                      <Label>Price</Label>
                      <p className="font-medium text-primary">
                        {selectedProvider.price === 0 ? 'Free' : `$${selectedProvider.price}${selectedCategory === 'nurse' ? '/hour' : ''}`}
                      </p>
                    </div>
                    <div>
                      <Label>Languages</Label>
                      <p className="font-medium">{selectedProvider.languages?.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={() => {
                        handleBookAppointment(selectedProvider);
                        setIsDialogOpen(false);
                      }}
                      className="flex-1"
                    >
                      {selectedCategory === 'surgery' ? 'Book Surgery' :
                       selectedCategory === 'physio' ? 'Book Session' :
                       selectedCategory === 'nurse' ? 'Book Nurse' :
                       selectedCategory === 'lab' ? 'Book Test' :
                       selectedCategory === 'pharmacy' ? 'Visit Pharmacy' :
                       'Book Now'}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default MarketplaceHub;
