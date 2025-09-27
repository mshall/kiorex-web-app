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
  Heart,
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
  EyeOff
} from "lucide-react";

const PatientProfile = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';
  const patientId = location.state?.patientId || null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: '123 Main Street, City, State 12345',
    
    // Medical Information
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    
    // Account Settings
    password: '',
    notifications: {
      appointmentReminders: true,
      medicationReminders: true,
      labResults: true,
      healthTips: false
    },
    privacy: {
      shareDataWithProviders: true,
      allowMarketing: false,
      profileVisibility: 'Private'
    }
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newCondition, setNewCondition] = useState('');

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

  const addItem = (type: 'allergies' | 'medications' | 'conditions', newItem: string) => {
    if (newItem.trim()) {
      setProfileData(prev => ({
        ...prev,
        [type]: [...(prev[type] as string[]), newItem.trim()]
      }));
      
      if (type === 'allergies') setNewAllergy('');
      if (type === 'medications') setNewMedication('');
      if (type === 'conditions') setNewCondition('');
    }
  };

  const removeItem = (type: 'allergies' | 'medications' | 'conditions', index: number) => {
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

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Role-based Navigation */}
      <RoleBasedNavigation userType={userType} userName={providerType} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {userType === 'doctor' ? 'Patient Profile' : 'My Profile'}
              </h1>
              <p className="text-muted-foreground">
                {userType === 'doctor' 
                  ? 'View patient information and medical history' 
                  : 'Manage your personal and medical information'
                }
              </p>
            </div>
            {userType === 'patient' && (
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
            )}
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
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
                    <User className="w-12 h-12 text-primary" />
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
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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
                        disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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
                        disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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
                        disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={profileData.gender} 
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Information */}
          <TabsContent value="medical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Your medical history, conditions, and current medications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Medical Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select 
                      value={profileData.bloodType} 
                      onValueChange={(value) => handleInputChange('bloodType', value)}
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <Label>Allergies</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {profileData.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1">
                        {allergy}
                        {isEditing && (
                          <button
                            onClick={() => removeItem('allergies', index)}
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
                        placeholder="Add new allergy"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('allergies', newAllergy)}
                      />
                      <Button onClick={() => addItem('allergies', newAllergy)} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                {/* Current Medications */}
                <div>
                  <Label>Current Medications</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {profileData.medications.map((medication, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {medication}
                        {isEditing && (
                          <button
                            onClick={() => removeItem('medications', index)}
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
                        placeholder="Add new medication"
                        value={newMedication}
                        onChange={(e) => setNewMedication(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('medications', newMedication)}
                      />
                      <Button onClick={() => addItem('medications', newMedication)} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                {/* Medical Conditions */}
                <div>
                  <Label>Medical Conditions</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {profileData.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {condition}
                        {isEditing && (
                          <button
                            onClick={() => removeItem('conditions', index)}
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
                        placeholder="Add new condition"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('conditions', newCondition)}
                      />
                      <Button onClick={() => addItem('conditions', newCondition)} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contact */}
          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Emergency Contact
                </CardTitle>
                <CardDescription>
                  Contact information for emergency situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={profileData.emergencyContact.name}
                      onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyRelationship">Relationship</Label>
                    <Input
                      id="emergencyRelationship"
                      value={profileData.emergencyContact.relationship}
                      onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emergencyPhone"
                        value={profileData.emergencyContact.phone}
                        onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                        disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                        className="pl-10"
                      />
                    </div>
                  </div>
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
                      disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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
                          disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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
                            disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
                            className="rounded"
                          />
                        ) : (
                          <Select 
                            value={value} 
                            onValueChange={(newValue) => handleNestedInputChange('privacy', key, newValue)}
                            disabled={!isEditing || userType === 'doctor'}
                      readOnly={userType === 'doctor'}
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

export default PatientProfile;
