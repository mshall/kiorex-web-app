import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { useRTL } from "@/hooks/useRTL";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Filter,
  Home,
  Stethoscope,
  Video,
  Phone,
  ArrowLeft,
  SortAsc,
  SortDesc,
  Users,
  Calendar,
  Activity,
  Shield,
  Award,
  Eye,
  X,
  ArrowRight
} from "lucide-react";

const ServiceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const serviceType = location.state?.serviceType || 'doctors';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get service-specific data based on service category
  const getServiceSpecificData = () => {
    const serviceCategory = location.state?.serviceCategory || 'cardiology';
    
    // Surgery providers
    if (serviceCategory === 'surgery') {
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
          image: "MT",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Cardiac Surgery",
          clinic: "Downtown Medical Center"
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
          image: "SW",
          verified: true,
          languages: ["English"],
          serviceType: "Orthopedic Surgery",
          clinic: "City Orthopedic Clinic"
        },
        { 
          id: 3, 
          name: "Dr. David Chen", 
          specialty: "Neurosurgeon", 
          rating: 4.9, 
          reviews: 95, 
          price: 3000, 
          location: "Neurological Institute",
          experience: "20 years",
          nextAvailable: "Monday 9:00 AM",
          image: "DC",
          verified: true,
          languages: ["English", "Mandarin"],
          serviceType: "Neurosurgery",
          clinic: "Advanced Neuro Center"
        },
        { 
          id: 4, 
          name: "Dr. Lisa Rodriguez", 
          specialty: "Plastic Surgeon", 
          rating: 4.7, 
          reviews: 112, 
          price: 1800, 
          location: "Aesthetic Surgery Center",
          experience: "12 years",
          nextAvailable: "Today 5:00 PM",
          image: "LR",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Plastic Surgery",
          clinic: "Beauty & Wellness Clinic"
        },
        { 
          id: 5, 
          name: "Dr. James Wilson", 
          specialty: "General Surgeon", 
          rating: 4.6, 
          reviews: 134, 
          price: 1500, 
          location: "General Surgery Center",
          experience: "16 years",
          nextAvailable: "Tomorrow 10:30 AM",
          image: "JW",
          verified: true,
          languages: ["English"],
          serviceType: "General Surgery",
          clinic: "City General Hospital"
        },
        { 
          id: 6, 
          name: "Dr. Maria Garcia", 
          specialty: "Pediatric Surgeon", 
          rating: 4.9, 
          reviews: 67, 
          price: 2000, 
          location: "Children's Surgery Center",
          experience: "14 years",
          nextAvailable: "Today 2:00 PM",
          image: "MG",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Pediatric Surgery",
          clinic: "Children's Hospital"
        },
        { 
          id: 7, 
          name: "Dr. Robert Kim", 
          specialty: "Urological Surgeon", 
          rating: 4.8, 
          reviews: 89, 
          price: 1900, 
          location: "Urology Surgery Center",
          experience: "17 years",
          nextAvailable: "Monday 11:00 AM",
          image: "RK",
          verified: true,
          languages: ["English", "Korean"],
          serviceType: "Urological Surgery",
          clinic: "Urology Specialists"
        },
        { 
          id: 8, 
          name: "Dr. Jennifer Lee", 
          specialty: "Ophthalmic Surgeon", 
          rating: 4.7, 
          reviews: 78, 
          price: 1600, 
          location: "Eye Surgery Center",
          experience: "13 years",
          nextAvailable: "Today 4:30 PM",
          image: "JL",
          verified: true,
          languages: ["English"],
          serviceType: "Ophthalmic Surgery",
          clinic: "Vision Care Center"
        },
        { 
          id: 9, 
          name: "Dr. Thomas Anderson", 
          specialty: "Vascular Surgeon", 
          rating: 4.9, 
          reviews: 92, 
          price: 2400, 
          location: "Vascular Surgery Center",
          experience: "19 years",
          nextAvailable: "Tomorrow 1:00 PM",
          image: "TA",
          verified: true,
          languages: ["English"],
          serviceType: "Vascular Surgery",
          clinic: "Cardiovascular Institute"
        },
        { 
          id: 10, 
          name: "Dr. Amanda Davis", 
          specialty: "Gynecological Surgeon", 
          rating: 4.8, 
          reviews: 105, 
          price: 1700, 
          location: "Women's Surgery Center",
          experience: "15 years",
          nextAvailable: "Today 6:00 PM",
          image: "AD",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Gynecological Surgery",
          clinic: "Women's Health Center"
        }
      ];
    }
    
    // Cardiology providers
    if (serviceCategory === 'cardiology') {
      return [
        { 
          id: 1, 
          name: "Dr. Emily Richardson", 
          specialty: "Cardiologist", 
          rating: 4.9, 
          reviews: 156, 
          price: 200, 
          location: "Heart Care Center",
          experience: "15 years",
          nextAvailable: "Today 2:30 PM",
          image: "ER",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Cardiology",
          clinic: "Downtown Medical Center"
        },
        { 
          id: 2, 
          name: "Dr. Michael Chen", 
          specialty: "Interventional Cardiologist", 
          rating: 4.8, 
          reviews: 134, 
          price: 250, 
          location: "Cardiac Intervention Center",
          experience: "12 years",
          nextAvailable: "Today 4:00 PM",
          image: "MC",
          verified: true,
          languages: ["English", "Mandarin"],
          serviceType: "Cardiology",
          clinic: "City Heart Clinic"
        },
        { 
          id: 3, 
          name: "Dr. Sarah Johnson", 
          specialty: "Pediatric Cardiologist", 
          rating: 4.9, 
          reviews: 98, 
          price: 180, 
          location: "Children's Heart Center",
          experience: "10 years",
          nextAvailable: "Tomorrow 10:00 AM",
          image: "SJ",
          verified: true,
          languages: ["English"],
          serviceType: "Cardiology",
          clinic: "Children's Hospital"
        },
        { 
          id: 4, 
          name: "Dr. David Rodriguez", 
          specialty: "Electrophysiologist", 
          rating: 4.7, 
          reviews: 87, 
          price: 300, 
          location: "Heart Rhythm Center",
          experience: "14 years",
          nextAvailable: "Today 1:00 PM",
          image: "DR",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Cardiology",
          clinic: "Cardiac Specialists"
        },
        { 
          id: 5, 
          name: "Dr. Lisa Wang", 
          specialty: "Heart Failure Specialist", 
          rating: 4.8, 
          reviews: 112, 
          price: 220, 
          location: "Heart Failure Clinic",
          experience: "13 years",
          nextAvailable: "Tomorrow 9:00 AM",
          image: "LW",
          verified: true,
          languages: ["English", "Mandarin"],
          serviceType: "Cardiology",
          clinic: "Advanced Heart Center"
        },
        { 
          id: 6, 
          name: "Dr. James Thompson", 
          specialty: "Preventive Cardiologist", 
          rating: 4.6, 
          reviews: 76, 
          price: 150, 
          location: "Preventive Care Center",
          experience: "11 years",
          nextAvailable: "Today 3:30 PM",
          image: "JT",
          verified: true,
          languages: ["English"],
          serviceType: "Cardiology",
          clinic: "Wellness Heart Clinic"
        },
        { 
          id: 7, 
          name: "Dr. Maria Garcia", 
          specialty: "Cardiac Imaging Specialist", 
          rating: 4.9, 
          reviews: 89, 
          price: 280, 
          location: "Cardiac Imaging Center",
          experience: "16 years",
          nextAvailable: "Today 5:00 PM",
          image: "MG",
          verified: true,
          languages: ["English", "Spanish"],
          serviceType: "Cardiology",
          clinic: "Diagnostic Heart Center"
        },
        { 
          id: 8, 
          name: "Dr. Robert Kim", 
          specialty: "Adult Congenital Cardiologist", 
          rating: 4.7, 
          reviews: 65, 
          price: 240, 
          location: "Adult Congenital Center",
          experience: "9 years",
          nextAvailable: "Tomorrow 2:00 PM",
          image: "RK",
          verified: true,
          languages: ["English", "Korean"],
          serviceType: "Cardiology",
          clinic: "Specialized Heart Care"
        },
        { 
          id: 9, 
          name: "Dr. Jennifer Lee", 
          specialty: "Cardiac Rehabilitation Specialist", 
          rating: 4.8, 
          reviews: 103, 
          price: 160, 
          location: "Cardiac Rehab Center",
          experience: "8 years",
          nextAvailable: "Today 4:30 PM",
          image: "JL",
          verified: true,
          languages: ["English"],
          serviceType: "Cardiology",
          clinic: "Recovery Heart Center"
        },
        { 
          id: 10, 
          name: "Dr. Thomas Anderson", 
          specialty: "Cardiothoracic Surgeon", 
          rating: 4.9, 
          reviews: 124, 
          price: 350, 
          location: "Cardiothoracic Surgery Center",
          experience: "18 years",
          nextAvailable: "Monday 8:00 AM",
          image: "TA",
          verified: true,
          languages: ["English"],
          serviceType: "Cardiology",
          clinic: "Advanced Cardiac Surgery"
        }
      ];
    }
    
    // Nurse providers
    if (serviceCategory === 'nurse') {
      return [
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
          services: ["Medication Management", "Wound Care", "Vital Signs Monitoring"],
          serviceType: "Home Care",
          clinic: "CarePlus Nursing"
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
          services: ["Post-Surgery Care", "IV Therapy", "Patient Monitoring"],
          serviceType: "Critical Care",
          clinic: "City Medical Center"
        },
        {
          id: 3,
          name: "Sarah Wilson",
          specialty: "Pediatric Nurse",
          rating: 4.9,
          reviews: 78,
          price: 50,
          location: "Children's Hospital",
          experience: "10 years",
          nextAvailable: "Tomorrow 9:00 AM",
          image: "SW",
          verified: true,
          services: ["Child Development", "Vaccination", "Parent Education"],
          serviceType: "Pediatrics",
          clinic: "Children's Hospital"
        },
        {
          id: 4,
          name: "Michael Brown",
          specialty: "Geriatric Nurse",
          rating: 4.7,
          reviews: 65,
          price: 48,
          location: "Senior Care Center",
          experience: "9 years",
          nextAvailable: "Today 7:00 PM",
          image: "MB",
          verified: true,
          services: ["Elderly Care", "Medication Management", "Mobility Assistance"],
          serviceType: "Geriatrics",
          clinic: "Senior Care Center"
        },
        {
          id: 5,
          name: "Lisa Chen",
          specialty: "Mental Health Nurse",
          rating: 4.8,
          reviews: 72,
          price: 55,
          location: "Mental Health Clinic",
          experience: "11 years",
          nextAvailable: "Today 5:30 PM",
          image: "LC",
          verified: true,
          services: ["Crisis Intervention", "Therapy Support", "Medication Management"],
          serviceType: "Mental Health",
          clinic: "Mental Health Clinic"
        },
        {
          id: 6,
          name: "David Martinez",
          specialty: "Emergency Nurse",
          rating: 4.9,
          reviews: 95,
          price: 65,
          location: "Emergency Department",
          experience: "13 years",
          nextAvailable: "Today 9:00 PM",
          image: "DM",
          verified: true,
          services: ["Emergency Response", "Trauma Care", "Life Support"],
          serviceType: "Emergency",
          clinic: "City Emergency Center"
        },
        {
          id: 7,
          name: "Jennifer Taylor",
          specialty: "Oncology Nurse",
          rating: 4.6,
          reviews: 58,
          price: 52,
          location: "Cancer Treatment Center",
          experience: "8 years",
          nextAvailable: "Tomorrow 10:30 AM",
          image: "JT",
          verified: true,
          services: ["Chemotherapy Support", "Pain Management", "Patient Advocacy"],
          serviceType: "Oncology",
          clinic: "Cancer Treatment Center"
        },
        {
          id: 8,
          name: "Robert Johnson",
          specialty: "Cardiac Nurse",
          rating: 4.8,
          reviews: 81,
          price: 58,
          location: "Heart Institute",
          experience: "14 years",
          nextAvailable: "Today 6:30 PM",
          image: "RJ",
          verified: true,
          services: ["Cardiac Monitoring", "Post-Surgery Care", "Rehabilitation"],
          serviceType: "Cardiology",
          clinic: "Heart Institute"
        },
        {
          id: 9,
          name: "Amanda Davis",
          specialty: "Maternity Nurse",
          rating: 4.9,
          reviews: 76,
          price: 47,
          location: "Maternity Ward",
          experience: "7 years",
          nextAvailable: "Tomorrow 8:00 AM",
          image: "AD",
          verified: true,
          services: ["Labor Support", "Postpartum Care", "Breastfeeding Support"],
          serviceType: "Maternity",
          clinic: "Women's Health Center"
        },
        {
          id: 10,
          name: "Christopher Lee",
          specialty: "ICU Nurse",
          rating: 4.7,
          reviews: 69,
          price: 62,
          location: "Intensive Care Unit",
          experience: "15 years",
          nextAvailable: "Today 10:00 PM",
          image: "CL",
          verified: true,
          services: ["Critical Care", "Ventilator Management", "Family Support"],
          serviceType: "Intensive Care",
          clinic: "City Medical Center"
        }
      ];
    }
    
    // Default to general doctors if no specific category
    return getDefaultDoctors();
  };

  const getDefaultDoctors = () => [
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
      languages: ["English", "Spanish"],
      serviceType: "Cardiology"
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
      languages: ["English", "Mandarin"],
      serviceType: "General Medicine"
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
      languages: ["English"],
      serviceType: "Dermatology"
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
      services: ["Medication Management", "Wound Care", "Vital Signs Monitoring"],
      serviceType: "Home Care"
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
      services: ["Post-Surgery Care", "IV Therapy", "Patient Monitoring"],
      serviceType: "Critical Care"
    },
    {
      id: 3,
      name: "Sarah Wilson",
      specialty: "Pediatric Nurse",
      rating: 4.9,
      reviews: 78,
      price: 50,
      location: "Children's Hospital",
      experience: "10 years",
      nextAvailable: "Tomorrow 9:00 AM",
      image: "SW",
      verified: true,
      services: ["Child Development", "Vaccination", "Parent Education"],
      serviceType: "Pediatrics"
    },
    {
      id: 4,
      name: "Michael Brown",
      specialty: "Geriatric Nurse",
      rating: 4.7,
      reviews: 65,
      price: 48,
      location: "Senior Care Center",
      experience: "9 years",
      nextAvailable: "Today 7:00 PM",
      image: "MB",
      verified: true,
      services: ["Elderly Care", "Medication Management", "Mobility Assistance"],
      serviceType: "Geriatrics"
    },
    {
      id: 5,
      name: "Lisa Chen",
      specialty: "Mental Health Nurse",
      rating: 4.8,
      reviews: 72,
      price: 55,
      location: "Mental Health Clinic",
      experience: "11 years",
      nextAvailable: "Today 5:30 PM",
      image: "LC",
      verified: true,
      services: ["Crisis Intervention", "Therapy Support", "Medication Management"],
      serviceType: "Mental Health"
    },
    {
      id: 6,
      name: "David Martinez",
      specialty: "Emergency Nurse",
      rating: 4.9,
      reviews: 95,
      price: 65,
      location: "Emergency Department",
      experience: "13 years",
      nextAvailable: "Today 9:00 PM",
      image: "DM",
      verified: true,
      services: ["Emergency Response", "Trauma Care", "Life Support"],
      serviceType: "Emergency"
    },
    {
      id: 7,
      name: "Jennifer Taylor",
      specialty: "Oncology Nurse",
      rating: 4.6,
      reviews: 58,
      price: 52,
      location: "Cancer Treatment Center",
      experience: "8 years",
      nextAvailable: "Tomorrow 10:30 AM",
      image: "JT",
      verified: true,
      services: ["Chemotherapy Support", "Pain Management", "Patient Advocacy"],
      serviceType: "Oncology"
    },
    {
      id: 8,
      name: "Robert Johnson",
      specialty: "Cardiac Nurse",
      rating: 4.8,
      reviews: 81,
      price: 58,
      location: "Heart Institute",
      experience: "14 years",
      nextAvailable: "Today 6:30 PM",
      image: "RJ",
      verified: true,
      services: ["Cardiac Monitoring", "Post-Surgery Care", "Rehabilitation"],
      serviceType: "Cardiology"
    },
    {
      id: 9,
      name: "Amanda Davis",
      specialty: "Maternity Nurse",
      rating: 4.9,
      reviews: 76,
      price: 47,
      location: "Maternity Ward",
      experience: "7 years",
      nextAvailable: "Tomorrow 8:00 AM",
      image: "AD",
      verified: true,
      services: ["Labor Support", "Postpartum Care", "Breastfeeding Support"],
      serviceType: "Maternity"
    },
    {
      id: 10,
      name: "Christopher Lee",
      specialty: "ICU Nurse",
      rating: 4.7,
      reviews: 69,
      price: 62,
      location: "Intensive Care Unit",
      experience: "15 years",
      nextAvailable: "Today 10:00 PM",
      image: "CL",
      verified: true,
      services: ["Critical Care", "Ventilator Management", "Family Support"],
      serviceType: "Intensive Care"
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
      specializations: ["Sports Injuries", "Spinal Therapy", "Joint Mobilization"],
      serviceType: "Sports Medicine"
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
      specializations: ["Developmental Delays", "Neurological Conditions", "Posture Correction"],
      serviceType: "Pediatrics"
    },
    {
      id: 3,
      name: "Dr. Mark Thompson",
      specialty: "Orthopedic Physiotherapist",
      rating: 4.7,
      reviews: 87,
      price: 85,
      location: "Orthopedic Rehab Center",
      experience: "12 years",
      nextAvailable: "Today 4:00 PM",
      image: "MT",
      verified: true,
      specializations: ["Post-Surgery Rehab", "Joint Replacement", "Fracture Recovery"],
      serviceType: "Orthopedics"
    },
    {
      id: 4,
      name: "Dr. Sarah Mitchell",
      specialty: "Neurological Physiotherapist",
      rating: 4.9,
      reviews: 103,
      price: 90,
      location: "Neuro Rehab Institute",
      experience: "11 years",
      nextAvailable: "Tomorrow 2:30 PM",
      image: "SM",
      verified: true,
      specializations: ["Stroke Recovery", "Spinal Cord Injury", "Parkinson's Therapy"],
      serviceType: "Neurology"
    },
    {
      id: 5,
      name: "Dr. James Rodriguez",
      specialty: "Cardiopulmonary Physiotherapist",
      rating: 4.6,
      reviews: 76,
      price: 78,
      location: "Pulmonary Rehab Center",
      experience: "8 years",
      nextAvailable: "Today 5:30 PM",
      image: "JR",
      verified: true,
      specializations: ["Respiratory Therapy", "Cardiac Rehab", "COPD Management"],
      serviceType: "Cardiopulmonary"
    },
    {
      id: 6,
      name: "Dr. Maria Santos",
      specialty: "Women's Health Physiotherapist",
      rating: 4.8,
      reviews: 89,
      price: 82,
      location: "Women's Health Center",
      experience: "10 years",
      nextAvailable: "Tomorrow 9:30 AM",
      image: "MS",
      verified: true,
      specializations: ["Pelvic Floor Therapy", "Prenatal Care", "Postpartum Recovery"],
      serviceType: "Women's Health"
    },
    {
      id: 7,
      name: "Dr. David Chen",
      specialty: "Geriatric Physiotherapist",
      rating: 4.7,
      reviews: 71,
      price: 70,
      location: "Senior Wellness Center",
      experience: "13 years",
      nextAvailable: "Today 6:00 PM",
      image: "DC",
      verified: true,
      specializations: ["Fall Prevention", "Balance Training", "Mobility Enhancement"],
      serviceType: "Geriatrics"
    },
    {
      id: 8,
      name: "Dr. Jennifer Taylor",
      specialty: "Hand Therapy Specialist",
      rating: 4.9,
      reviews: 95,
      price: 88,
      location: "Hand Therapy Center",
      experience: "9 years",
      nextAvailable: "Tomorrow 1:00 PM",
      image: "JT",
      verified: true,
      specializations: ["Hand Injuries", "Carpal Tunnel", "Tendon Repair"],
      serviceType: "Hand Therapy"
    },
    {
      id: 9,
      name: "Dr. Robert Kim",
      specialty: "Vestibular Physiotherapist",
      rating: 4.6,
      reviews: 68,
      price: 85,
      location: "Balance & Dizziness Clinic",
      experience: "6 years",
      nextAvailable: "Today 7:00 PM",
      image: "RK",
      verified: true,
      specializations: ["Vertigo Treatment", "Balance Disorders", "Vestibular Rehabilitation"],
      serviceType: "Vestibular"
    },
    {
      id: 10,
      name: "Dr. Amanda Wilson",
      specialty: "Aquatic Physiotherapist",
      rating: 4.8,
      reviews: 83,
      price: 75,
      location: "Aquatic Therapy Center",
      experience: "8 years",
      nextAvailable: "Tomorrow 3:30 PM",
      image: "AW",
      verified: true,
      specializations: ["Water Therapy", "Hydrotherapy", "Pool Exercises"],
      serviceType: "Aquatic Therapy"
    }
  ];

  // Get the appropriate data based on service type
  const getServiceData = () => {
    // First try to get service-specific data
    const serviceSpecificData = getServiceSpecificData();
    const defaultDoctors = getDefaultDoctors();
    if (serviceSpecificData !== defaultDoctors) {
      return serviceSpecificData;
    }
    
    // Fallback to general service type data
    switch (serviceType) {
      case 'doctors': return defaultDoctors;
      case 'nurses': return nurses;
      case 'physiotherapists': return physiotherapists;
      default: return defaultDoctors;
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'doctors': return 'Doctors';
      case 'nurses': return 'Nurses';
      case 'physiotherapists': return 'Physiotherapists';
      default: return 'Healthcare Providers';
    }
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'doctors': return Stethoscope;
      case 'nurses': return Users;
      case 'physiotherapists': return Activity;
      default: return Stethoscope;
    }
  };

  const serviceData = getServiceData();
  const ServiceIcon = getServiceIcon();

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = serviceData.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           provider.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = priceFilter === "all" || 
        (priceFilter === "under-50" && provider.price < 50) ||
        (priceFilter === "50-100" && provider.price >= 50 && provider.price <= 100) ||
        (priceFilter === "100-150" && provider.price > 100 && provider.price <= 150) ||
        (priceFilter === "over-150" && provider.price > 150);
      
      const matchesLocation = locationFilter === "all" || 
        provider.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesServiceType = serviceTypeFilter === "all" || 
        provider.serviceType.toLowerCase().includes(serviceTypeFilter.toLowerCase());
      
      return matchesSearch && matchesPrice && matchesLocation && matchesServiceType;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "experience":
          aValue = parseInt(a.experience);
          bValue = parseInt(b.experience);
          break;
        case "reviews":
          aValue = a.reviews;
          bValue = b.reviews;
          break;
        default:
          aValue = a.rating;
          bValue = b.rating;
      }
      
      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [serviceData, searchQuery, priceFilter, locationFilter, serviceTypeFilter, sortBy, sortOrder]);

  // Pagination
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedProviders,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredAndSortedData,
    initialPage: 1,
    initialItemsPerPage: 6
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
  };

  const handleViewDetails = (provider: any) => {
    setSelectedProvider(provider);
    setIsDialogOpen(true);
  };

  const ProviderDetailsCard = ({ provider }: { provider: any }) => {
    if (!provider) return null;

    // Create features array from services/specializations
    const features = provider.services || provider.specializations || [];
    
    // Extract years from experience string
    const experienceYears = provider.experience ? parseInt(provider.experience) : 0;
    
    // Generate profession description based on specialty
    const getProfessionDescription = (specialty: string) => {
      const descriptions: { [key: string]: string } = {
        'Cardiologist': 'Specializes in heart and cardiovascular system conditions, providing comprehensive cardiac care and treatment.',
        'General Physician': 'Provides primary healthcare services, diagnosing and treating a wide range of medical conditions.',
        'Dermatologist': 'Expert in skin, hair, and nail conditions, offering advanced dermatological treatments and cosmetic procedures.',
        'Home Care Nurse': 'Delivers compassionate nursing care in the comfort of your home, ensuring personalized patient care.',
        'Critical Care Nurse': 'Specialized in intensive care nursing, providing expert care for critically ill patients.',
        'Pediatric Nurse': 'Dedicated to caring for children and adolescents, with expertise in pediatric healthcare needs.',
        'Sports Physiotherapist': 'Specializes in sports injury rehabilitation and performance optimization for athletes.',
        'Orthopedic Physiotherapist': 'Expert in musculoskeletal rehabilitation and post-surgical recovery treatments.'
      };
      return descriptions[specialty] || `Experienced ${specialty.toLowerCase()} providing specialized healthcare services.`;
    };
    
    return (
      <Card className="w-full max-w-md cursor-pointer hover:shadow-lg transition-all duration-300 group border border-primary/20">
        <CardContent className="p-6">
          {/* Professional Picture */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {provider.image}
              </span>
            </div>
          </div>
          
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{provider.specialty}</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{provider.location}</span>
              </div>
            </div>
          </div>

          {/* Experience and Description */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Award className="w-4 h-4" />
              <span>{experienceYears}+ years of experience</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {getProfessionDescription(provider.specialty)}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-sm text-muted-foreground">({provider.reviews})</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">${provider.price}</p>
              <p className="text-xs text-muted-foreground">per session</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {features.slice(0, 2).map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{features.length - 2} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Next available time slot</span>
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {provider.nextAvailable}
              </Badge>
            </div>
            <Button size="sm" className="group-hover:bg-primary">
              Book Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-muted/50" dir={direction}>
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <ServiceIcon className="w-8 h-8 text-primary" />
              <span>{getServiceTitle()}</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Find and book {getServiceTitle().toLowerCase()} in your area
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, specialty, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-150">$100 - $150</SelectItem>
                  <SelectItem value="over-150">Over $150</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="city">City Center</SelectItem>
                  <SelectItem value="available">Available Citywide</SelectItem>
                  <SelectItem value="24/7">Available 24/7</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {serviceType === 'doctors' && (
                    <>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="general medicine">General Medicine</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </>
                  )}
                  {serviceType === 'nurses' && (
                    <>
                      <SelectItem value="home care">Home Care</SelectItem>
                      <SelectItem value="critical care">Critical Care</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="geriatrics">Geriatrics</SelectItem>
                      <SelectItem value="mental health">Mental Health</SelectItem>
                    </>
                  )}
                  {serviceType === 'physiotherapists' && (
                    <>
                      <SelectItem value="sports medicine">Sports Medicine</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="cardiopulmonary">Cardiopulmonary</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Available {getServiceTitle()}</h2>
            <p className="text-muted-foreground">
              Showing {totalItems} {getServiceTitle().toLowerCase()} 
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSort("rating")}
              className="flex items-center space-x-1"
            >
              <Star className="w-4 h-4" />
              <span>Rating</span>
              {getSortIcon("rating")}
            </Button>
            <Button
              variant={sortBy === "price" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSort("price")}
              className="flex items-center space-x-1"
            >
              <DollarSign className="w-4 h-4" />
              <span>Price</span>
              {getSortIcon("price")}
            </Button>
            <Button
              variant={sortBy === "experience" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSort("experience")}
              className="flex items-center space-x-1"
            >
              <Award className="w-4 h-4" />
              <span>Experience</span>
              {getSortIcon("experience")}
            </Button>
          </div>
        </div>

        {/* Providers Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Next Available</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProviders.map((provider) => (
                    <TableRow key={provider.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {provider.image}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{provider.name}</p>
                              {provider.verified && (
                                <Shield className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{provider.serviceType}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline">{provider.specialty}</Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{provider.location}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">({provider.reviews})</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="font-medium">${provider.price}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{provider.experience}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{provider.nextAvailable}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="medical">
                            <Video className="w-4 h-4 mr-1" />
                            Book
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(provider)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="p-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[6, 9, 12, 15, 20]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Provider Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md p-0 border-0 shadow-none bg-transparent [&>button]:hidden">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsDialogOpen(false)}
                className="absolute -top-2 -right-2 z-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
              <ProviderDetailsCard provider={selectedProvider} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ServiceDetail;
