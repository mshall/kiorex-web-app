import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  Shield,
  Edit,
  Save,
  Camera,
  FileText,
  AlertCircle,
  CheckCircle,
  Bell,
  Lock,
  Globe,
  Eye,
  EyeOff,
  GraduationCap,
  Award,
  Building,
  DollarSign,
  Clock,
  Star,
  Upload,
  Activity,
  Pill
} from "lucide-react";

const ProviderProfile = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'doctor';
  const providerType = location.state?.providerType || 'Doctor';
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@kiorex.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-20',
    gender: 'Female',
    address: '456 Medical Plaza, Healthcare City, State 54321',
    
    // Professional Information
    providerType: providerType,
    specialty: 'Cardiology',
    licenseNumber: 'MD123456789',
    licenseExpiry: '2025-12-31',
    experience: '8',
    education: 'MD, Harvard Medical School',
    certifications: ['Board Certified Cardiologist', 'ACLS Certified', 'BLS Certified'],
    languages: ['English', 'Spanish'],
    
    // Practice Information
    hospital: 'Kiorex Medical Center',
    consultationFee: '150',
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    
    // Account Settings
    password: '',
    notifications: {
      appointmentReminders: true,
      patientMessages: true,
      systemUpdates: true,
      marketingEmails: false
    },
    privacy: {
      shareProfileWithPatients: true,
      allowPatientReviews: true,
      profileVisibility: 'Public'
    }
  });

  const [newCertification, setNewCertification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addItem = (type: 'certifications' | 'languages', newItem: string) => {
    if (newItem.trim()) {
      setProfileData(prev => ({
        ...prev,
        [type]: [...(prev[type] as string[]), newItem.trim()]
      }));
      
      if (type === 'certifications') setNewCertification('');
      if (type === 'languages') setNewLanguage('');
    }
  };

  const removeItem = (type: 'certifications' | 'languages', index: number) => {
    setProfileData(prev => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Simulate API call
    setIsEditing(false);
    // Show success message
  };

  const getProviderIcon = () => {
    switch (providerType) {
      case 'Doctor':
        return <Stethoscope className="w-12 h-12 text-primary" />;
      case 'Nurse':
        return <User className="w-12 h-12 text-primary" />;
      case 'Physiotherapist':
        return <Activity className="w-12 h-12 text-primary" />;
      case 'Pharmacist':
        return <Pill className="w-12 h-12 text-primary" />;
      default:
        return <Stethoscope className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your professional and personal information</p>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    {getProviderIcon()}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={profileData.gender} 
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information */}
          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Your professional credentials, education, and certifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Professional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="providerType">Provider Type</Label>
                    <Input
                      id="providerType"
                      value={profileData.providerType}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={profileData.specialty}
                      onChange={(e) => handleInputChange('specialty', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={profileData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseExpiry">License Expiry</Label>
                    <Input
                      id="licenseExpiry"
                      type="date"
                      value={profileData.licenseExpiry}
                      onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <Label>Certifications</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {profileData.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {cert}
                        {isEditing && (
                          <button
                            onClick={() => removeItem('certifications', index)}
                            className="ml-1 hover:text-white"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new certification"
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('certifications', newCertification)}
                      />
                      <Button onClick={() => addItem('certifications', newCertification)} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                {/* Languages */}
                <div>
                  <Label>Languages Spoken</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {profileData.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {language}
                        {isEditing && (
                          <button
                            onClick={() => removeItem('languages', index)}
                            className="ml-1 hover:text-white"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new language"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('languages', newLanguage)}
                      />
                      <Button onClick={() => addItem('languages', newLanguage)} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                {/* Document Upload */}
                {isEditing && (
                  <div>
                    <Label>Upload Documents</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload license documents, certifications, or other credentials
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Information */}
          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Practice Information
                </CardTitle>
                <CardDescription>
                  Your practice details and consultation fees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="hospital">Hospital/Clinic</Label>
                    <Input
                      id="hospital"
                      value={profileData.hospital}
                      onChange={(e) => handleInputChange('hospital', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="consultationFee"
                        type="number"
                        value={profileData.consultationFee}
                        onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Availability Schedule
                </CardTitle>
                <CardDescription>
                  Set your working days and availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(profileData.availability).map(([day, available]) => (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={day}
                        checked={available}
                        onChange={(e) => handleNestedInputChange('availability', day, e.target.checked)}
                        disabled={!isEditing}
                        className="rounded"
                      />
                      <Label htmlFor={day} className="capitalize">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div>
                  <Label htmlFor="password">Change Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      disabled={!isEditing}
                      className="pl-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h4 className="font-medium mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    {Object.entries(profileData.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <input
                          type="checkbox"
                          id={key}
                          checked={value}
                          onChange={(e) => handleNestedInputChange('notifications', key, e.target.checked)}
                          disabled={!isEditing}
                          className="rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div>
                  <h4 className="font-medium mb-4">Privacy Settings</h4>
                  <div className="space-y-3">
                    {Object.entries(profileData.privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        {typeof value === 'boolean' ? (
                          <input
                            type="checkbox"
                            id={key}
                            checked={value}
                            onChange={(e) => handleNestedInputChange('privacy', key, e.target.checked)}
                            disabled={!isEditing}
                            className="rounded"
                          />
                        ) : (
                          <Select 
                            value={value} 
                            onValueChange={(newValue) => handleNestedInputChange('privacy', key, newValue)}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Public">Public</SelectItem>
                              <SelectItem value="Private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderProfile;
