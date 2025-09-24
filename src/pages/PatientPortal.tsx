import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Heart, 
  Activity, 
  FileText, 
  Pill,
  Video,
  Phone,
  Download,
  Upload,
  Bell,
  Settings,
  Plus,
  Clock,
  MapPin,
  Star
} from "lucide-react";

const PatientPortal = () => {
  const [appointments] = useState([
    { 
      id: 1, 
      doctor: "Dr. Emily Smith", 
      specialty: "Cardiology", 
      date: "Today", 
      time: "2:30 PM", 
      type: "Video Call",
      status: "upcoming"
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Chen", 
      specialty: "General Medicine", 
      date: "Tomorrow", 
      time: "10:00 AM", 
      type: "In-Person",
      status: "confirmed"
    }
  ]);

  const [medications] = useState([
    { 
      id: 1, 
      name: "Lisinopril", 
      dosage: "10mg", 
      frequency: "Once daily", 
      remaining: 15,
      nextRefill: "Dec 25, 2024"
    },
    { 
      id: 2, 
      name: "Metformin", 
      dosage: "500mg", 
      frequency: "Twice daily", 
      remaining: 8,
      nextRefill: "Dec 20, 2024"
    }
  ]);

  const [labResults] = useState([
    { 
      id: 1, 
      test: "Complete Blood Count", 
      date: "Dec 10, 2024", 
      status: "Normal", 
      doctor: "Dr. Emily Smith"
    },
    { 
      id: 2, 
      test: "Lipid Panel", 
      date: "Dec 8, 2024", 
      status: "Attention Needed", 
      doctor: "Dr. Emily Smith"
    }
  ]);

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Kiorex
                </span>
              </div>
              <span className="text-muted-foreground">Patient Portal</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">S</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-muted-foreground">Your health journey at a glance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Appointment</p>
                  <p className="text-2xl font-bold text-primary">2:30 PM</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Medications</p>
                  <p className="text-2xl font-bold text-secondary">2</p>
                  <p className="text-sm text-warning">1 needs refill</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Lab Results</p>
                  <p className="text-2xl font-bold text-info">2</p>
                  <p className="text-sm text-warning">1 needs attention</p>
                </div>
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold text-accent">87</p>
                  <p className="text-sm text-success">Excellent</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
            <TabsTrigger value="health-records">Health Records</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Appointments</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                Book New Appointment
              </Button>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {appointment.doctor.split(' ')[1][0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {appointment.date} at {appointment.time}
                            </div>
                            <Badge variant={appointment.type === "Video Call" ? "secondary" : "outline"}>
                              {appointment.type === "Video Call" ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <MapPin className="w-3 h-3 mr-1" />
                              )}
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === "upcoming" && (
                          <Button variant="medical" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Medications</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </div>

            <div className="grid gap-4">
              {medications.map((medication) => (
                <Card key={medication.id} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Pill className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{medication.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage} • {medication.frequency}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {medication.remaining} pills remaining
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Next refill: {medication.nextRefill}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {medication.remaining < 10 && (
                          <Button variant="medical" size="sm">Request Refill</Button>
                        )}
                        <Button variant="outline" size="sm">Set Reminder</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lab-results" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Lab Results</h2>
              <Button variant="medical">
                <Upload className="w-4 h-4 mr-2" />
                Upload Result
              </Button>
            </div>

            <div className="grid gap-4">
              {labResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-info" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{result.test}</h3>
                          <p className="text-sm text-muted-foreground">
                            Ordered by {result.doctor}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-muted-foreground">{result.date}</span>
                            <Badge 
                              variant={result.status === "Normal" ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health-records" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Health Records</h2>
              <Button variant="medical">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Medical History</CardTitle>
                  <CardDescription>Complete medical background</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Allergies</CardTitle>
                  <CardDescription>Known allergies and reactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Allergies
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Family History</CardTitle>
                  <CardDescription>Hereditary health information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Update History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Insurance Information</h2>
              <Button variant="medical">
                <Plus className="w-4 h-4 mr-2" />
                Add Insurance
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Primary Insurance</CardTitle>
                <CardDescription>BlueCross BlueShield</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Member ID</p>
                    <p className="text-sm text-muted-foreground">BC123456789</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Group Number</p>
                    <p className="text-sm text-muted-foreground">GRP001</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Plan Type</p>
                    <p className="text-sm text-muted-foreground">PPO Gold</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Effective Date</p>
                    <p className="text-sm text-muted-foreground">Jan 1, 2024</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;