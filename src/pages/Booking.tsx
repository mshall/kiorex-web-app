import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Stethoscope,
  MapPin,
  Star,
  DollarSign,
  User,
  Phone,
  MessageCircle,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Award,
  Languages
} from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const doctor = location.state?.doctor || {
    id: 1,
    name: "Dr. Emily Smith",
    specialty: "Cardiology",
    rating: 4.9,
    consultationFee: 150,
    location: "New York, NY",
    languages: ["English", "Spanish"],
    consultationTypes: ["Video Call", "In-Person"],
    experience: "12 years",
    education: "MD, Harvard Medical School"
  };

  const [bookingData, setBookingData] = useState({
    consultationType: 'Video Call',
    date: '',
    time: '',
    duration: '30',
    symptoms: '',
    previousHistory: '',
    insuranceInfo: '',
    paymentMethod: 'card',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const availableSlots = {
    'Video Call': [
      { date: 'Today', time: '2:30 PM', duration: '30 min', available: true },
      { date: 'Today', time: '4:00 PM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '10:00 AM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '2:00 PM', duration: '30 min', available: true },
      { date: 'Dec 26', time: '11:00 AM', duration: '30 min', available: true },
      { date: 'Dec 26', time: '3:00 PM', duration: '30 min', available: false }
    ],
    'In-Person': [
      { date: 'Tomorrow', time: '9:00 AM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '1:00 PM', duration: '45 min', available: true },
      { date: 'Dec 26', time: '10:00 AM', duration: '45 min', available: true },
      { date: 'Dec 26', time: '2:00 PM', duration: '45 min', available: true }
    ]
  };

  const steps = [
    { id: 1, title: 'Select Slot', description: 'Choose date and time' },
    { id: 2, title: 'Symptoms', description: 'Describe your condition' },
    { id: 3, title: 'Payment', description: 'Complete booking' }
  ];

  const handleBookingChange = (field: string, value: string | boolean) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleConfirmBooking();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    // Simulate booking process
    setTimeout(() => {
      navigate('/booking-confirmation', { 
        state: { doctor, bookingData } 
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label>Consultation Type</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    bookingData.consultationType === 'Video Call' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleBookingChange('consultationType', 'Video Call')}
                >
                  <CardContent className="p-4 text-center">
                    <Video className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Video Call</h3>
                    <p className="text-sm text-muted-foreground">30 minutes</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    bookingData.consultationType === 'In-Person' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleBookingChange('consultationType', 'In-Person')}
                >
                  <CardContent className="p-4 text-center">
                    <Stethoscope className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <h3 className="font-semibold">In-Person</h3>
                    <p className="text-sm text-muted-foreground">45 minutes</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {availableSlots[bookingData.consultationType as keyof typeof availableSlots].map((slot, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-300 ${
                      bookingData.date === slot.date && bookingData.time === slot.time
                        ? 'ring-2 ring-primary shadow-lg' 
                        : slot.available ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => slot.available ? handleBookingChange('date', slot.date) || handleBookingChange('time', slot.time) : null}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-sm font-medium">{slot.date}</div>
                      <div className="text-lg font-semibold">{slot.time}</div>
                      <div className="text-xs text-muted-foreground">{slot.duration}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="symptoms">Describe your symptoms or reason for consultation *</Label>
              <Textarea
                id="symptoms"
                placeholder="Please describe your symptoms, concerns, or the reason for your consultation..."
                value={bookingData.symptoms}
                onChange={(e) => handleBookingChange('symptoms', e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="previousHistory">Previous medical history (optional)</Label>
              <Textarea
                id="previousHistory"
                placeholder="Any relevant medical history, current medications, or allergies..."
                value={bookingData.previousHistory}
                onChange={(e) => handleBookingChange('previousHistory', e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="insuranceInfo">Insurance information (optional)</Label>
              <Input
                id="insuranceInfo"
                placeholder="Insurance provider and policy number"
                value={bookingData.insuranceInfo}
                onChange={(e) => handleBookingChange('insuranceInfo', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold">Important:</p>
                  <p>Please provide accurate information to help the doctor better understand your condition. All information is kept confidential and secure.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Doctor</span>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Specialty</span>
                    <span className="font-medium">{doctor.specialty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{bookingData.consultationType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{bookingData.duration} minutes</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total Amount</span>
                      <span className="text-primary">${doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <div>
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    bookingData.paymentMethod === 'card' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleBookingChange('paymentMethod', 'card')}
                >
                  <CardContent className="p-4 text-center">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Credit/Debit Card</h3>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    bookingData.paymentMethod === 'wallet' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleBookingChange('paymentMethod', 'wallet')}
                >
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <h3 className="font-semibold">Digital Wallet</h3>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={bookingData.agreeToTerms}
                  onCheckedChange={(checked) => handleBookingChange('agreeToTerms', checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the terms and conditions and cancellation policy *
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToPrivacy"
                  checked={bookingData.agreeToPrivacy}
                  onCheckedChange={(checked) => handleBookingChange('agreeToPrivacy', checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToPrivacy" className="text-sm">
                    I consent to sharing my health information with the doctor for consultation purposes *
                  </Label>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-semibold">Secure Payment</p>
                  <p>Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-white' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && (!bookingData.date || !bookingData.time)) ||
                      (currentStep === 2 && !bookingData.symptoms) ||
                      (currentStep === 3 && (!bookingData.agreeToTerms || !bookingData.agreeToPrivacy))
                    }
                  >
                    {currentStep === 3 ? (
                      isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        'Confirm Booking'
                      )
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Doctor Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-primary">{doctor.specialty}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-muted-foreground" />
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>${doctor.consultationFee}/consultation</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Doctor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {currentStep > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{bookingData.consultationType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{bookingData.time}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span className="text-primary">${doctor.consultationFee}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
