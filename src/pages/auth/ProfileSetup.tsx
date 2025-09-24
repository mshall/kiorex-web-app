import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Plus,
  X
} from "lucide-react";

const ProfileSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Medical Information
    bloodType: '',
    allergies: [] as string[],
    chronicConditions: [] as string[],
    medications: [] as string[],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    
    // Insurance Information
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    
    // Preferences
    language: 'en',
    timezone: 'UTC',
    communicationPreferences: {
      email: true,
      sms: true,
      push: true,
      calls: false
    },
    
    // Consent
    dataSharing: false,
    marketing: false,
    research: false
  });
  
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const email = location.state?.email || 'user@example.com';
  const userType = location.state?.userType || 'patient';
  const providerData = location.state?.providerData;
  const providerType = providerData?.providerType || 'Provider';

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Medical History', description: 'Health background' },
    { id: 3, title: 'Emergency Contact', description: 'Emergency information' },
    { id: 4, title: 'Insurance', description: 'Insurance details' },
    { id: 5, title: 'Preferences', description: 'Settings & consent' }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addToList = (listName: 'allergies' | 'chronicConditions' | 'medications', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [listName]: [...prev[listName], value.trim()]
      }));
      if (listName === 'allergies') setNewAllergy('');
      if (listName === 'chronicConditions') setNewCondition('');
      if (listName === 'medications') setNewMedication('');
    }
  };

  const removeFromList = (listName: 'allergies' | 'chronicConditions' | 'medications', index: number) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        // Navigate to appropriate dashboard based on user type and provider type
        let dashboardPath = '/dashboard'; // Default to patient dashboard
        
        if (userType === 'patient') {
          dashboardPath = '/dashboard';
        } else if (userType === 'provider') {
          if (providerType === 'Nurse') {
            dashboardPath = '/nurse-dashboard';
          } else {
            dashboardPath = '/doctor-dashboard'; // Default provider dashboard
          }
        }
        
        const navigationState = userType === 'patient' ? { userType } : { userType, providerType };
        navigate(dashboardPath, { state: navigationState });
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Profile Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Your healthcare profile has been successfully created. Welcome to Kiorex!
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="pl-10"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10"
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleInputChange('bloodType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Allergies</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add an allergy"
                    onKeyPress={(e) => e.key === 'Enter' && addToList('allergies', newAllergy)}
                  />
                  <Button onClick={() => addToList('allergies', newAllergy)} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {allergy}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeFromList('allergies', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Chronic Conditions</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add a condition"
                    onKeyPress={(e) => e.key === 'Enter' && addToList('chronicConditions', newCondition)}
                  />
                  <Button onClick={() => addToList('chronicConditions', newCondition)} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.chronicConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {condition}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeFromList('chronicConditions', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Current Medications</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add a medication"
                    onKeyPress={(e) => e.key === 'Enter' && addToList('medications', newMedication)}
                  />
                  <Button onClick={() => addToList('medications', newMedication)} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.medications.map((medication, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {medication}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeFromList('medications', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Emergency Contact Information</h4>
              </div>
              <p className="text-sm text-blue-800">
                This information will be used in case of emergencies. Please ensure the contact person is easily reachable.
              </p>
            </div>

            <div>
              <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
              <Input
                id="emergencyName"
                value={formData.emergencyContact.name}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                placeholder="Full name of emergency contact"
              />
            </div>

            <div>
              <Label htmlFor="emergencyRelationship">Relationship *</Label>
              <Select 
                value={formData.emergencyContact.relationship} 
                onValueChange={(value) => handleInputChange('emergencyContact.relationship', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                  className="pl-10"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyEmail">Emergency Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="emergencyEmail"
                  type="email"
                  value={formData.emergencyContact.email}
                  onChange={(e) => handleInputChange('emergencyContact.email', e.target.value)}
                  className="pl-10"
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">Insurance Information</h4>
              </div>
              <p className="text-sm text-green-800">
                This information helps us process your claims and coordinate with your insurance provider.
              </p>
            </div>

            <div>
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                placeholder="Name of insurance provider"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  value={formData.policyNumber}
                  onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                  placeholder="Policy number"
                />
              </div>
              <div>
                <Label htmlFor="groupNumber">Group Number</Label>
                <Input
                  id="groupNumber"
                  value={formData.groupNumber}
                  onChange={(e) => handleInputChange('groupNumber', e.target.value)}
                  placeholder="Group number"
                />
              </div>
            </div>

            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                You can update your insurance information anytime in your profile settings.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Communication Preferences</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={formData.communicationPreferences.email}
                    onCheckedChange={(checked) => handleInputChange('communicationPreferences.email', checked)}
                  />
                  <Label htmlFor="email" className="text-sm">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={formData.communicationPreferences.sms}
                    onCheckedChange={(checked) => handleInputChange('communicationPreferences.sms', checked)}
                  />
                  <Label htmlFor="sms" className="text-sm">SMS notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push"
                    checked={formData.communicationPreferences.push}
                    onCheckedChange={(checked) => handleInputChange('communicationPreferences.push', checked)}
                  />
                  <Label htmlFor="push" className="text-sm">Push notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="calls"
                    checked={formData.communicationPreferences.calls}
                    onCheckedChange={(checked) => handleInputChange('communicationPreferences.calls', checked)}
                  />
                  <Label htmlFor="calls" className="text-sm">Phone calls</Label>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-3">Consent & Privacy</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dataSharing"
                    checked={formData.dataSharing}
                    onCheckedChange={(checked) => handleInputChange('dataSharing', checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="dataSharing" className="text-sm">
                      I consent to sharing my health data with healthcare providers for treatment purposes
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketing}
                    onCheckedChange={(checked) => handleInputChange('marketing', checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="marketing" className="text-sm">
                      I agree to receive marketing communications about health services and wellness tips
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="research"
                    checked={formData.research}
                    onCheckedChange={(checked) => handleInputChange('research', checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="research" className="text-sm">
                      I consent to my anonymized data being used for medical research and improving healthcare services
                    </Label>
                  </div>
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
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <User className="w-4 h-4 mr-2" />
              Profile Setup
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Complete Your Health Profile</h1>
            <p className="text-muted-foreground">
              Help us provide you with personalized healthcare services
            </p>
          </div>

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

          <Card className="shadow-lg">
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
                <Button onClick={handleNext}>
                  {currentStep === 5 ? 'Complete Setup' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
