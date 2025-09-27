import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import PatientPortal from "./pages/PatientPortal";
import { DoctorDashboard, ProviderProfile, DoctorPatients, DoctorRevenue } from "./pages/users/doctor";
import DoctorAppointments from "./pages/users/doctor/DoctorAppointments";
import Teleconsult from "./pages/Teleconsult";
import { NurseDashboard, NurseSchedule, NursePatients, NurseCarePlans, NurseDocuments, NurseEarnings } from "./pages/users/nurse";
import { PatientDashboard, PatientProfile, PatientAppointments, PatientRecords } from "./pages/users/patient";
import { ClinicDashboard, ClinicManagement, ClinicAppointments, ClinicPatients, ClinicBilling, ClinicAnalytics, ClinicInventory, ClinicStaff, ClinicAttendance } from "./pages/users/clinic";
import { PharmacyDashboard, PharmacyOrders, PharmacyRevenues, PharmacyPending } from "./pages/users/pharmacy";
import { AdminDashboard, AdminUsers } from "./pages/users/admin";
import ProfessionalCalendarPage from "./pages/ProfessionalCalendarPage";
import NotificationsPage from "./components/NotificationsPage";
import Analytics from "./pages/Analytics";
import Telemedicine from "./pages/Telemedicine";
import SmartScheduling from "./pages/SmartScheduling";
import EHR from "./pages/EHR";
import Pharmacy from "./pages/Pharmacy";
import NotFound from "./pages/NotFound";

// Authentication Pages
import Welcome from "./pages/auth/Welcome";
import RoleSelection from "./pages/auth/RoleSelection";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import PatientSignUp from "./pages/auth/PatientSignUp";
import PatientSignIn from "./pages/auth/PatientSignIn";
import ProviderSignUp from "./pages/auth/ProviderSignUp";
import ProviderSignIn from "./pages/auth/ProviderSignIn";
import VerifyEmail from "./pages/auth/VerifyEmail";
import MFASetup from "./pages/auth/MFASetup";
import ProfileSetup from "./pages/auth/ProfileSetup";

// Patient Pages
import DoctorSearch from "./pages/DoctorSearch";
import Booking from "./pages/Booking";
import Teleconsultation from "./pages/Teleconsultation";
import MarketplaceHub from "./pages/MarketplaceHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          
              {/* Authentication Routes */}
              <Route path="/auth/welcome" element={<Welcome />} />
              <Route path="/auth/role-selection" element={<RoleSelection />} />
              
              {/* Patient Authentication */}
          <Route path="/auth/patient-signup" element={<PatientSignUp />} />
          <Route path="/auth/patient-signin" element={<PatientSignIn />} />
          
          {/* Provider Authentication */}
          <Route path="/auth/provider-signup" element={<ProviderSignUp />} />
          <Route path="/auth/provider-signin" element={<ProviderSignIn />} />
          
          {/* Legacy Auth Routes */}
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          
          {/* Common Auth Routes */}
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/mfa-setup" element={<MFASetup />} />
          <Route path="/auth/profile-setup" element={<ProfileSetup />} />
          
              {/* Patient Routes */}
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/patient-profile" element={<PatientProfile />} />
              <Route path="/patient-profile/:id" element={<PatientProfile />} />
              <Route path="/search/doctors" element={<DoctorSearch />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/consultation" element={<Teleconsultation />} />
              <Route path="/marketplace" element={<MarketplaceHub />} />
          
              {/* Provider Routes */}
              <Route path="/provider-profile" element={<ProviderProfile />} />
              
              {/* User-specific Dashboard Routes */}
              <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
              <Route path="/clinic-dashboard" element={<ClinicDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Clinic-specific Routes */}
              <Route path="/clinic-appointments" element={<ClinicAppointments />} />
              <Route path="/clinic-patients" element={<ClinicPatients />} />
              <Route path="/clinic-billing" element={<ClinicBilling />} />
              <Route path="/clinic-analytics" element={<ClinicAnalytics />} />
              <Route path="/clinic-inventory" element={<ClinicInventory />} />
              <Route path="/clinic-staff" element={<ClinicStaff />} />
              <Route path="/clinic-attendance" element={<ClinicAttendance />} />
              
              {/* Patient-specific Routes */}
              <Route path="/patient-appointments" element={<PatientAppointments />} />
              <Route path="/patient-records" element={<PatientRecords />} />
              
              {/* Doctor-specific Routes */}
              <Route path="/doctor-patients" element={<DoctorPatients />} />
              <Route path="/doctor-revenue" element={<DoctorRevenue />} />
              <Route path="/provider-appointments" element={<DoctorAppointments />} />
              <Route path="/provider-teleconsult" element={<Teleconsult />} />
              
                {/* Nurse-specific Routes */}
                <Route path="/nurse-patients" element={<NursePatients />} />
                <Route path="/nurse-care-plans" element={<NurseCarePlans />} />
                <Route path="/nurse-documents" element={<NurseDocuments />} />
                <Route path="/nurse-earnings" element={<NurseEarnings />} />
                <Route path="/nurse-schedule" element={<NurseSchedule />} />
              
              {/* Pharmacy-specific Routes */}
              <Route path="/pharmacy-orders" element={<PharmacyOrders />} />
              <Route path="/pharmacy-revenues" element={<PharmacyRevenues />} />
              <Route path="/pharmacy-pending" element={<PharmacyPending />} />
              
                {/* Admin-specific Routes */}
                <Route path="/admin-users" element={<AdminUsers />} />
                
                {/* Professional Calendar Route */}
                <Route path="/professional-calendar" element={<ProfessionalCalendarPage />} />
                
                {/* Notifications Route */}
                <Route path="/notifications" element={<NotificationsPage userType="patient" userName="Patient" />} />
                
                {/* Legacy Routes */}
              <Route path="/patient-portal" element={<PatientPortal />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/nurse-dashboard" element={<NurseDashboard />} />
              <Route path="/clinic-management" element={<ClinicManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/scheduling" element={<SmartScheduling />} />
          <Route path="/ehr" element={<EHR />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
