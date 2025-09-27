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
  Languages,
  ChevronLeft,
  Upload,
  FileText,
  Image,
  X,
  Paperclip
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
    education: "MD, Harvard Medical School",
    serviceType: "doctors",
    profileImage: null
  };

  // Determine professional type based on serviceType or name
  const getProfessionalType = () => {
    if (doctor.serviceType) {
      switch (doctor.serviceType.toLowerCase()) {
        case 'doctors':
          return 'Doctor Information';
        case 'nurses':
          return 'Nurse Information';
        case 'physiotherapists':
          return 'Physiotherapist Information';
        default:
          return 'Professional Information';
      }
    }
    
    // Fallback: check name prefix
    if (doctor.name.toLowerCase().includes('nurse')) {
      return 'Nurse Information';
    } else if (doctor.name.toLowerCase().includes('physiotherapist') || doctor.name.toLowerCase().includes('therapist')) {
      return 'Physiotherapist Information';
    } else if (doctor.name.toLowerCase().includes('dr.') || doctor.name.toLowerCase().includes('doctor')) {
      return 'Doctor Information';
    }
    
    return 'Professional Information';
  };

  const professionalType = getProfessionalType();

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

  const [attachments, setAttachments] = useState<Array<{
    id: string;
    file: File;
    type: 'image' | 'pdf';
    description: string;
    preview?: string;
  }>>([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTimeSlotPage, setCurrentTimeSlotPage] = useState(1);
  const timeSlotsPerPage = 6;

  const availableSlots = {
    'Video Call': [
      { date: 'Today', time: '9:00 AM', duration: '30 min', available: true },
      { date: 'Today', time: '10:30 AM', duration: '30 min', available: true },
      { date: 'Today', time: '12:00 PM', duration: '30 min', available: true },
      { date: 'Today', time: '1:30 PM', duration: '30 min', available: true },
      { date: 'Today', time: '3:00 PM', duration: '30 min', available: true },
      { date: 'Today', time: '4:30 PM', duration: '30 min', available: true },
      { date: 'Today', time: '6:00 PM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '8:00 AM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '9:30 AM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '11:00 AM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '12:30 PM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '2:00 PM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '3:30 PM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '5:00 PM', duration: '30 min', available: true },
      { date: 'Tomorrow', time: '6:30 PM', duration: '30 min', available: true }
    ],
    'In-Person': [
      { date: 'Today', time: '8:00 AM', duration: '45 min', available: true },
      { date: 'Today', time: '10:00 AM', duration: '45 min', available: true },
      { date: 'Today', time: '12:00 PM', duration: '45 min', available: true },
      { date: 'Today', time: '2:00 PM', duration: '45 min', available: true },
      { date: 'Today', time: '4:00 PM', duration: '45 min', available: true },
      { date: 'Today', time: '6:00 PM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '8:30 AM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '10:30 AM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '12:30 PM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '2:30 PM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '4:30 PM', duration: '45 min', available: true },
      { date: 'Tomorrow', time: '6:30 PM', duration: '45 min', available: true },
      { date: 'Dec 26', time: '9:00 AM', duration: '45 min', available: true },
      { date: 'Dec 26', time: '11:00 AM', duration: '45 min', available: true },
      { date: 'Dec 26', time: '1:00 PM', duration: '45 min', available: true }
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

  // Time slot pagination functions
  const getCurrentTimeSlots = () => {
    const slots = availableSlots[bookingData.consultationType as keyof typeof availableSlots];
    const startIndex = (currentTimeSlotPage - 1) * timeSlotsPerPage;
    const endIndex = startIndex + timeSlotsPerPage;
    return slots.slice(startIndex, endIndex);
  };

  const getTotalTimeSlotPages = () => {
    const slots = availableSlots[bookingData.consultationType as keyof typeof availableSlots];
    return Math.ceil(slots.length / timeSlotsPerPage);
  };

  const handleTimeSlotPageChange = (direction: 'next' | 'prev') => {
    const totalPages = getTotalTimeSlotPages();
    if (direction === 'next' && currentTimeSlotPage < totalPages) {
      setCurrentTimeSlotPage(currentTimeSlotPage + 1);
    } else if (direction === 'prev' && currentTimeSlotPage > 1) {
      setCurrentTimeSlotPage(currentTimeSlotPage - 1);
    }
  };

  // Reset time slot page when consultation type changes
  const handleConsultationTypeChange = (type: string) => {
    setCurrentTimeSlotPage(1);
    handleBookingChange('consultationType', type);
  };

  // File upload and attachment functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileType = file.type.startsWith('image/') ? 'image' : 'pdf';
      const id = Math.random().toString(36).substr(2, 9);
      
      let preview: string | undefined;
      if (fileType === 'image') {
        preview = URL.createObjectURL(file);
      }

      const newAttachment = {
        id,
        file,
        type: fileType as 'image' | 'pdf',
        description: '',
        preview
      };

      setAttachments(prev => [...prev, newAttachment]);
    });

    // Reset the input
    event.target.value = '';
  };

  const handleAttachmentDescriptionChange = (id: string, description: string) => {
    setAttachments(prev => 
      prev.map(attachment => 
        attachment.id === id 
          ? { ...attachment, description }
          : attachment
      )
    );
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === id);
      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview);
      }
      return prev.filter(att => att.id !== id);
    });
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
                  onClick={() => handleConsultationTypeChange('Video Call')}
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
                  onClick={() => handleConsultationTypeChange('In-Person')}
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
              <div className="flex items-center justify-between mb-2">
                <Label>Available Time Slots</Label>
                <div className="text-sm text-muted-foreground">
                  Page {currentTimeSlotPage} of {getTotalTimeSlotPages()}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {getCurrentTimeSlots().map((slot, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-300 ${
                      bookingData.date === slot.date && bookingData.time === slot.time
                        ? 'ring-2 ring-primary shadow-lg' 
                        : slot.available ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (slot.available) {
                        handleBookingChange('date', slot.date);
                        handleBookingChange('time', slot.time);
                      }
                    }}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-sm font-medium">{slot.date}</div>
                      <div className="text-lg font-semibold">{slot.time}</div>
                      <div className="text-xs text-muted-foreground">{slot.duration}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTimeSlotPageChange('prev')}
                  disabled={currentTimeSlotPage === 1}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Times</span>
                </Button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: getTotalTimeSlotPages() }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentTimeSlotPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentTimeSlotPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTimeSlotPageChange('next')}
                  disabled={currentTimeSlotPage === getTotalTimeSlotPages()}
                  className="flex items-center space-x-1"
                >
                  <span>More Times</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
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

            {/* Document Attachments Section */}
            <div>
              <Label>Attach Documents (optional)</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Upload pictures, X-rays, lab reports, or other medical documents to help with your consultation.
              </p>
              
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium text-primary">Click to upload</span>
                    <span className="text-sm text-muted-foreground"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pictures (PNG, JPG, GIF) and PDF files up to 10MB
                  </p>
                </label>
              </div>

              {/* Attached Files List */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Attached Files ({attachments.length})</h4>
                  {attachments.map((attachment) => (
                    <Card key={attachment.id} className="p-4">
                      <div className="flex items-start space-x-3">
                        {/* File Icon/Preview */}
                        <div className="flex-shrink-0">
                          {attachment.type === 'image' && attachment.preview ? (
                            <img
                              src={attachment.preview}
                              alt="Preview"
                              className="w-12 h-12 object-cover rounded border"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              {attachment.type === 'pdf' ? (
                                <FileText className="w-6 h-6 text-red-500" />
                              ) : (
                                <Image className="w-6 h-6 text-blue-500" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* File Info and Description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="text-sm font-medium truncate">{attachment.file.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {attachment.type.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {(attachment.file.size / 1024 / 1024).toFixed(1)}MB
                            </span>
                          </div>
                          
                          <Input
                            placeholder="Add a description for this file..."
                            value={attachment.description}
                            onChange={(e) => handleAttachmentDescriptionChange(attachment.id, e.target.value)}
                            className="text-sm"
                          />
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAttachment(attachment.id)}
                          className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
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
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Step
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
                        Next Step
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
                <CardTitle>{professionalType}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                      {doctor.profileImage ? (
                        <img 
                          src={doctor.profileImage} 
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-primary">{doctor.specialty}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        {doctor.reviews && (
                          <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                        )}
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
                      <span>${doctor.price || doctor.consultationFee}/consultation</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact {professionalType.includes('Doctor') ? 'Doctor' : professionalType.includes('Nurse') ? 'Nurse' : professionalType.includes('Physiotherapist') ? 'Physiotherapist' : 'Professional'}
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
                        <span className="text-primary">${doctor.price || doctor.consultationFee}</span>
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
