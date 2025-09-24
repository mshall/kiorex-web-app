import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Calendar,
  Clock,
  User,
  FileText,
  Camera,
  Settings,
  MessageCircle,
  Share2
} from "lucide-react";

export default function Telemedicine() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [activeCall, setActiveCall] = useState(false);

  const upcomingConsultations = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "2:00 PM",
      date: "Today",
      type: "Follow-up",
      avatar: "SJ",
      duration: "30 min"
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "3:30 PM", 
      date: "Today",
      type: "Initial Consultation",
      avatar: "MC",
      duration: "45 min"
    },
    {
      id: 3,
      patient: "Emma Wilson",
      time: "10:00 AM",
      date: "Tomorrow",
      type: "Mental Health",
      avatar: "EW",
      duration: "60 min"
    }
  ];

  const consultationHistory = [
    {
      id: 1,
      patient: "David Brown",
      date: "Dec 22, 2024",
      time: "1:00 PM",
      duration: "25 min",
      status: "Completed",
      notes: "Routine checkup, prescribed medication"
    },
    {
      id: 2,
      patient: "Lisa Garcia",
      date: "Dec 21, 2024", 
      time: "4:15 PM",
      duration: "40 min",
      status: "Completed",
      notes: "Follow-up on treatment progress"
    }
  ];

  const startCall = () => {
    setActiveCall(true);
  };

  const endCall = () => {
    setActiveCall(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Telemedicine Center</h1>
          <p className="text-muted-foreground text-lg">Secure video consultations and virtual care</p>
        </div>

        {activeCall ? (
          // Active Video Call Interface
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <CardContent className="p-0 h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-4xl font-bold mb-4">
                        SJ
                      </div>
                      <h3 className="text-2xl font-semibold">Sarah Johnson</h3>
                      <p className="text-slate-300">Connected - 15:42</p>
                    </div>
                  </div>
                  
                  {/* Self Video */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-slate-700 rounded-lg border-2 border-white">
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <User size={48} />
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <Button 
                      size="lg" 
                      variant={isVideoOn ? "secondary" : "destructive"}
                      className="rounded-full w-16 h-16"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant={isAudioOn ? "secondary" : "destructive"}
                      className="rounded-full w-16 h-16"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
                    </Button>

                    <Button 
                      size="lg" 
                      variant="destructive"
                      className="rounded-full w-16 h-16"
                      onClick={endCall}
                    >
                      <PhoneOff size={24} />
                    </Button>

                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="rounded-full w-16 h-16"
                    >
                      <Share2 size={24} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Age: 32, Female</p>
                  </div>
                  <div>
                    <p className="font-medium">Reason for Visit</p>
                    <p className="text-sm text-muted-foreground">Follow-up consultation</p>
                  </div>
                  <div>
                    <p className="font-medium">Last Visit</p>
                    <p className="text-sm text-muted-foreground">Dec 15, 2024</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Medical History
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Screenshot
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Main Dashboard
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Consultations</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 completed, 1 upcoming</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">127</div>
                    <p className="text-xs text-muted-foreground">+12 new this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">35 min</div>
                    <p className="text-xs text-muted-foreground">+5 min from last week</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Consultations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                            {consultation.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{consultation.patient}</p>
                            <p className="text-sm text-muted-foreground">
                              {consultation.date} at {consultation.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{consultation.type}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{consultation.duration}</p>
                          <Button size="sm" className="mt-2" onClick={startCall}>
                            <Video className="mr-2 h-4 w-4" />
                            Start Call
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start Consultation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                      <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Ready to start?</h3>
                      <p className="text-muted-foreground mb-4">
                        Start an instant consultation or join a scheduled appointment
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full" onClick={startCall}>
                          <Video className="mr-2 h-4 w-4" />
                          Start Instant Consultation
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="mr-2 h-4 w-4" />
                          Audio Only Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center p-2 font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => (
                      <div key={i} className="aspect-square p-2 border rounded hover:bg-accent cursor-pointer">
                        <div className="text-sm">{((i % 31) + 1)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultationHistory.map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{consultation.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.date} at {consultation.time} • {consultation.duration}
                          </p>
                          <p className="text-sm mt-1">{consultation.notes}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {consultation.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="mt-2 ml-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Telemedicine Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Video & Audio</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Default video quality</span>
                        <Button variant="outline">HD (720p)</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Auto-start video</span>
                        <Button variant="outline">Enabled</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Noise cancellation</span>
                        <Button variant="outline">Enabled</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Consultation reminders</span>
                        <Button variant="outline">5 minutes before</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Patient join notifications</span>
                        <Button variant="outline">Enabled</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}