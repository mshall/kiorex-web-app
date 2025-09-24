import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { 
  User,
  FileText,
  Heart,
  Pill,
  TestTube,
  Activity,
  Stethoscope,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  Calendar,
  Clock,
  Shield,
  Lock,
  Users
} from "lucide-react";

export default function EHR() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      mrn: "MRN001234",
      lastVisit: "Dec 20, 2024",
      status: "Active",
      avatar: "SJ",
      conditions: ["Hypertension", "Diabetes Type 2"],
      allergies: ["Penicillin", "Shellfish"]
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 45,
      gender: "Male", 
      mrn: "MRN001235",
      lastVisit: "Dec 18, 2024",
      status: "Active",
      avatar: "MC",
      conditions: ["Asthma"],
      allergies: ["None known"]
    },
    {
      id: 3,
      name: "Emma Wilson",
      age: 28,
      gender: "Female",
      mrn: "MRN001236", 
      lastVisit: "Dec 15, 2024",
      status: "Active",
      avatar: "EW",
      conditions: ["Anxiety", "Migraine"],
      allergies: ["Latex"]
    }
  ];

  const medicalHistory = [
    {
      id: 1,
      date: "Dec 20, 2024",
      type: "Consultation",
      provider: "Dr. Smith",
      diagnosis: "Hypertension follow-up",
      notes: "Blood pressure stable, continue current medication",
      status: "Completed"
    },
    {
      id: 2,
      date: "Nov 15, 2024",
      type: "Lab Results",
      provider: "Lab Tech",
      diagnosis: "Routine blood work",
      notes: "All values within normal range",
      status: "Reviewed"
    },
    {
      id: 3,
      date: "Oct 10, 2024",
      type: "Procedure",
      provider: "Dr. Johnson",
      diagnosis: "Annual physical exam",
      notes: "Complete physical examination performed",
      status: "Completed"
    }
  ];

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescriber: "Dr. Smith",
      startDate: "Jan 15, 2024",
      status: "Active",
      refills: 5
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescriber: "Dr. Smith", 
      startDate: "Mar 10, 2024",
      status: "Active",
      refills: 3
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once daily",
      prescriber: "Dr. Johnson",
      startDate: "Jun 5, 2024",
      status: "Active",
      refills: 0
    }
  ];

  const labResults = [
    {
      id: 1,
      test: "Complete Blood Count (CBC)",
      date: "Dec 15, 2024",
      status: "Normal",
      provider: "Quest Diagnostics",
      values: [
        { name: "White Blood Cells", value: "7.2", unit: "K/uL", range: "4.0-10.8", status: "normal" },
        { name: "Red Blood Cells", value: "4.5", unit: "M/uL", range: "4.2-5.4", status: "normal" },
        { name: "Hemoglobin", value: "13.8", unit: "g/dL", range: "12.0-15.5", status: "normal" },
        { name: "Hematocrit", value: "41.2", unit: "%", range: "36.0-46.0", status: "normal" }
      ]
    },
    {
      id: 2,
      test: "Comprehensive Metabolic Panel",
      date: "Dec 15, 2024",
      status: "Abnormal",
      provider: "Quest Diagnostics",
      values: [
        { name: "Glucose", value: "110", unit: "mg/dL", range: "70-99", status: "high" },
        { name: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.6-1.1", status: "normal" },
        { name: "eGFR", value: ">60", unit: "mL/min", range: ">60", status: "normal" }
      ]
    }
  ];

  const vitals = [
    {
      date: "Dec 20, 2024",
      bloodPressure: "128/82",
      heartRate: "72",
      temperature: "98.6",
      weight: "165",
      height: "5'6\"",
      bmi: "26.6",
      o2Sat: "98%"
    },
    {
      date: "Nov 15, 2024", 
      bloodPressure: "130/85",
      heartRate: "75",
      temperature: "98.4",
      weight: "167",
      height: "5'6\"",
      bmi: "26.9",
      o2Sat: "99%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Electronic Health Records</h1>
          <p className="text-muted-foreground text-lg">Comprehensive patient data management and clinical documentation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Patients</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search patients..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {patients.map((patient) => (
                  <div 
                    key={patient.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                      selectedPatient?.id === patient.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                        {patient.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.mrn}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {patient.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{patient.age}y</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
                          {selectedPatient.avatar}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span>{selectedPatient.age} years old • {selectedPatient.gender}</span>
                            <span>MRN: {selectedPatient.mrn}</span>
                            <span>Last visit: {selectedPatient.lastVisit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div>
                        <h4 className="font-medium mb-2">Conditions</h4>
                        <div className="space-y-1">
                          {selectedPatient.conditions.map((condition, index) => (
                            <Badge key={index} variant="secondary">{condition}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Allergies</h4>
                        <div className="space-y-1">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Emergency Contact</h4>
                        <p className="text-sm text-muted-foreground">John Johnson (Spouse)</p>
                        <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Patient Data Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="labs">Lab Results</TabsTrigger>
                    <TabsTrigger value="vitals">Vitals</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Vitals
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {vitals[0] && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Blood Pressure:</span>
                                <p className="font-medium">{vitals[0].bloodPressure} mmHg</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Heart Rate:</span>
                                <p className="font-medium">{vitals[0].heartRate} bpm</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Weight:</span>
                                <p className="font-medium">{vitals[0].weight} lbs</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">BMI:</span>
                                <p className="font-medium">{vitals[0].bmi}</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Pill className="h-5 w-5" />
                            Active Medications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {medications.slice(0, 3).map((med) => (
                            <div key={med.id} className="flex justify-between items-center p-2 border rounded">
                              <div>
                                <p className="font-medium">{med.name}</p>
                                <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                              </div>
                              <Badge variant="outline">{med.status}</Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TestTube className="h-5 w-5" />
                            Recent Lab Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {labResults.slice(0, 2).map((lab) => (
                            <div key={lab.id} className="flex justify-between items-center p-2 border rounded">
                              <div>
                                <p className="font-medium">{lab.test}</p>
                                <p className="text-sm text-muted-foreground">{lab.date}</p>
                              </div>
                              <Badge variant={lab.status === 'Normal' ? 'outline' : 'secondary'}>
                                {lab.status}
                              </Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Clinical Alerts
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="font-medium text-yellow-800">Medication Review Due</p>
                            <p className="text-sm text-yellow-600">Annual medication review needed</p>
                          </div>
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="font-medium text-blue-800">Preventive Care</p>
                            <p className="text-sm text-blue-600">Mammogram screening due in 3 months</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Medical History</h3>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Entry
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {medicalHistory.map((entry) => (
                        <Card key={entry.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="outline">{entry.type}</Badge>
                                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                                  <span className="text-sm text-muted-foreground">by {entry.provider}</span>
                                </div>
                                <h4 className="font-medium mb-1">{entry.diagnosis}</h4>
                                <p className="text-sm text-muted-foreground">{entry.notes}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="medications" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Medications</h3>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Prescribe
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {medications.map((med) => (
                        <Card key={med.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-medium">{med.name}</h4>
                                  <Badge variant={med.status === 'Active' ? 'default' : 'secondary'}>
                                    {med.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Dosage:</span>
                                    <p className="font-medium">{med.dosage}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Frequency:</span>
                                    <p className="font-medium">{med.frequency}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Prescribed by:</span>
                                    <p className="font-medium">{med.prescriber}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Refills:</span>
                                    <p className="font-medium">{med.refills} remaining</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="labs" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Laboratory Results</h3>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Order Labs
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {labResults.map((lab) => (
                        <Card key={lab.id}>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div>
                                <CardTitle className="text-lg">{lab.test}</CardTitle>
                                <p className="text-sm text-muted-foreground">{lab.date} • {lab.provider}</p>
                              </div>
                              <Badge variant={lab.status === 'Normal' ? 'default' : 'secondary'}>
                                {lab.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {lab.values.map((value, index) => (
                                <div key={index} className="flex justify-between items-center p-2 border rounded">
                                  <span className="font-medium">{value.name}</span>
                                  <div className="text-right">
                                    <span className={`font-medium ${
                                      value.status === 'high' ? 'text-red-600' :
                                      value.status === 'low' ? 'text-blue-600' : 'text-green-600'
                                    }`}>
                                      {value.value} {value.unit}
                                    </span>
                                    <p className="text-xs text-muted-foreground">Range: {value.range}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="vitals" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Vital Signs</h3>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vitals
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {vitals.map((vital, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{vital.date}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-3 border rounded-lg">
                                <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                                <p className="text-sm text-muted-foreground">Blood Pressure</p>
                                <p className="font-bold">{vital.bloodPressure}</p>
                                <p className="text-xs text-muted-foreground">mmHg</p>
                              </div>
                              <div className="text-center p-3 border rounded-lg">
                                <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                <p className="text-sm text-muted-foreground">Heart Rate</p>
                                <p className="font-bold">{vital.heartRate}</p>
                                <p className="text-xs text-muted-foreground">bpm</p>
                              </div>
                              <div className="text-center p-3 border rounded-lg">
                                <Stethoscope className="w-6 h-6 mx-auto mb-2 text-green-500" />
                                <p className="text-sm text-muted-foreground">Temperature</p>
                                <p className="font-bold">{vital.temperature}</p>
                                <p className="text-xs text-muted-foreground">°F</p>
                              </div>
                              <div className="text-center p-3 border rounded-lg">
                                <Users className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                                <p className="text-sm text-muted-foreground">Weight</p>
                                <p className="font-bold">{vital.weight}</p>
                                <p className="text-xs text-muted-foreground">lbs</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Documents</h3>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>

                    <div className="text-center p-12 border-2 border-dashed border-border rounded-lg">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No documents uploaded</h3>
                      <p className="text-muted-foreground mb-4">Upload medical documents, images, and reports</p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a Patient</h3>
                  <p className="text-muted-foreground">Choose a patient from the list to view their electronic health record</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}