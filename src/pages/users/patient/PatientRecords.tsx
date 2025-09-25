import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Heart, 
  Activity, 
  Download,
  Eye,
  Calendar,
  Stethoscope,
  Pill,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail
} from "lucide-react";

const PatientRecords = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'patient';
  const providerType = location.state?.providerType || 'Patient';

  const [searchQuery, setSearchQuery] = useState('');

  const medicalHistory = [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      diagnosis: "Hypertension - Well controlled",
      treatment: "Lisinopril 10mg daily",
      notes: "Blood pressure within normal range. Continue current medication.",
      status: "active"
    },
    {
      id: 2,
      date: "2024-01-10",
      doctor: "Dr. Michael Brown",
      specialty: "General Medicine",
      diagnosis: "Annual Physical - Normal",
      treatment: "Continue healthy lifestyle",
      notes: "All vitals normal. Recommended annual flu vaccine.",
      status: "completed"
    },
    {
      id: 3,
      date: "2023-12-20",
      doctor: "Dr. Emily White",
      specialty: "Dermatology",
      diagnosis: "Mild eczema",
      treatment: "Hydrocortisone cream 2.5%",
      notes: "Apply twice daily. Condition improving.",
      status: "resolved"
    }
  ];

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-06-15",
      endDate: null,
      doctor: "Dr. Sarah Johnson",
      status: "active",
      instructions: "Take with or without food, preferably at the same time each day"
    },
    {
      id: 2,
      name: "Hydrocortisone Cream",
      dosage: "2.5%",
      frequency: "Twice daily",
      startDate: "2023-12-20",
      endDate: "2024-02-20",
      doctor: "Dr. Emily White",
      status: "active",
      instructions: "Apply thin layer to affected areas"
    }
  ];

  const labResults = [
    {
      id: 1,
      date: "2024-01-15",
      test: "Complete Blood Count (CBC)",
      results: "All values within normal range",
      status: "normal",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      date: "2024-01-15",
      test: "Lipid Panel",
      results: "Total Cholesterol: 185 mg/dL (Normal)",
      status: "normal",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: 3,
      date: "2024-01-10",
      test: "Blood Pressure",
      results: "120/80 mmHg",
      status: "normal",
      doctor: "Dr. Michael Brown"
    }
  ];

  const allergies = [
    {
      id: 1,
      allergen: "Penicillin",
      reaction: "Rash",
      severity: "Moderate",
      dateRecorded: "2020-03-15"
    },
    {
      id: 2,
      allergen: "Shellfish",
      reaction: "Hives and difficulty breathing",
      severity: "Severe",
      dateRecorded: "2019-08-22"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'outline';
      case 'resolved': return 'secondary';
      case 'normal': return 'default';
      default: return 'secondary';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'outline';
      case 'Moderate': return 'secondary';
      case 'Severe': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
          <p className="text-muted-foreground">Your complete medical history, medications, and test results</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Medical History</p>
                  <p className="text-2xl font-bold text-primary">{medicalHistory.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Medications</p>
                  <p className="text-2xl font-bold text-blue-600">{medications.filter(m => m.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lab Results</p>
                  <p className="text-2xl font-bold text-green-600">{labResults.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Allergies</p>
                  <p className="text-2xl font-bold text-orange-600">{allergies.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="labresults">Lab Results</TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Medical History
                </CardTitle>
                <CardDescription>Your complete medical history and diagnoses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalHistory.map((record) => (
                    <div key={record.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{record.doctor} - {record.specialty}</h3>
                          <Badge variant={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <p><strong>Date:</strong> {record.date}</p>
                            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          </div>
                          <div>
                            <p><strong>Treatment:</strong> {record.treatment}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Notes:</strong> {record.notes}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Current Medications
                </CardTitle>
                <CardDescription>Your current and past medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication) => (
                    <div key={medication.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{medication.name}</h3>
                          <Badge variant={getStatusColor(medication.status)}>
                            {medication.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <p><strong>Dosage:</strong> {medication.dosage}</p>
                            <p><strong>Frequency:</strong> {medication.frequency}</p>
                          </div>
                          <div>
                            <p><strong>Start Date:</strong> {medication.startDate}</p>
                            <p><strong>End Date:</strong> {medication.endDate || 'Ongoing'}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Prescribed by:</strong> {medication.doctor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Instructions:</strong> {medication.instructions}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labresults" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Lab Results
                </CardTitle>
                <CardDescription>Your laboratory test results and vital signs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((result) => (
                    <div key={result.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{result.test}</h3>
                          <Badge variant={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <p><strong>Date:</strong> {result.date}</p>
                            <p><strong>Doctor:</strong> {result.doctor}</p>
                          </div>
                          <div>
                            <p><strong>Results:</strong> {result.results}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allergies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Allergies & Reactions
                </CardTitle>
                <CardDescription>Your known allergies and adverse reactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy) => (
                    <div key={allergy.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{allergy.allergen}</h3>
                          <Badge variant={getSeverityColor(allergy.severity)}>
                            {allergy.severity}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Reaction:</strong> {allergy.reaction}</p>
                            <p><strong>Severity:</strong> {allergy.severity}</p>
                          </div>
                          <div>
                            <p><strong>Date Recorded:</strong> {allergy.dateRecorded}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Emergency Contact</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> John Smith</p>
                  <p><strong>Relationship:</strong> Spouse</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Primary Care Physician</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> Dr. Michael Brown</p>
                  <p><strong>Phone:</strong> (555) 987-6543</p>
                  <p><strong>Clinic:</strong> City Medical Center</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientRecords;
