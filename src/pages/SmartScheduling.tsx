import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { 
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Bell,
  Video,
  Phone,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function SmartScheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");

  const appointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "confirmed",
      mode: "video",
      notes: "Follow-up appointment"
    },
    {
      id: 2,
      patient: "Michael Chen", 
      time: "10:30 AM",
      duration: "45 min",
      type: "Initial Consultation",
      status: "pending",
      mode: "in-person",
      notes: "New patient intake"
    },
    {
      id: 3,
      patient: "Emma Wilson",
      time: "02:00 PM", 
      duration: "60 min",
      type: "Therapy Session",
      status: "confirmed",
      mode: "video",
      notes: "Mental health consultation"
    },
    {
      id: 4,
      patient: "David Brown",
      time: "03:30 PM",
      duration: "30 min", 
      type: "Check-up",
      status: "cancelled",
      mode: "in-person",
      notes: "Routine check-up"
    }
  ];

  const availableSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM",
    "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const recurringPatterns = [
    { id: 1, patient: "John Smith", pattern: "Every Monday at 10:00 AM", type: "Therapy", next: "Dec 30, 2024" },
    { id: 2, patient: "Mary Davis", pattern: "Every 2 weeks on Friday at 2:00 PM", type: "Check-up", next: "Jan 3, 2025" },
    { id: 3, patient: "Robert Wilson", pattern: "Monthly on 15th at 3:00 PM", type: "Consultation", next: "Jan 15, 2025" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Smart Scheduling</h1>
          <p className="text-muted-foreground text-lg">AI-powered appointment management and scheduling optimization</p>
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>December 2024</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Today
                      </Button>
                      <Select value={viewMode} onValueChange={setViewMode}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      {Array.from({ length: 35 }, (_, i) => {
                        const day = (i % 31) + 1;
                        const hasAppointment = [5, 12, 19, 23].includes(day);
                        return (
                          <div 
                            key={i} 
                            className={`aspect-square p-2 border rounded cursor-pointer hover:bg-accent ${
                              hasAppointment ? 'bg-primary/10 border-primary' : ''
                            }`}
                          >
                            <div className="text-sm">{day}</div>
                            {hasAppointment && (
                              <div className="text-xs text-primary mt-1">
                                {day === 23 ? '3 appt' : '1 appt'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-80 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          {getStatusIcon(appointment.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.time}</p>
                        </div>
                        <div className="flex gap-1">
                          {appointment.mode === 'video' ? 
                            <Video className="h-4 w-4 text-blue-600" /> : 
                            <MapPin className="h-4 w-4 text-green-600" />
                          }
                        </div>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Today's Total</span>
                      <span className="font-semibold">4 appointments</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">This Week</span>
                      <span className="font-semibold">18 appointments</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Utilization</span>
                      <span className="font-semibold text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">No-shows</span>
                      <span className="font-semibold text-red-600">2%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search appointments..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(appointment.status)}
                        </div>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.time} • {appointment.duration} • {appointment.type}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {appointment.mode === 'video' ? 
                            <Video className="h-4 w-4 text-blue-600" /> : 
                            <MapPin className="h-4 w-4 text-green-600" />
                          }
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Set Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" defaultValue="2024-12-23" />
                      <Input type="date" defaultValue="2024-12-30" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Working Hours</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select defaultValue="09:00">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="17:00">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Appointment Duration</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Buffer Time</Label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Update Availability</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">AI Suggestion</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Based on your booking patterns, consider extending Thursday hours to 6 PM for 15% more bookings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recurring" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Recurring Appointments</h3>
                <p className="text-muted-foreground">Manage repeating appointment patterns</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Pattern
              </Button>
            </div>

            <div className="grid gap-4">
              {recurringPatterns.map((pattern) => (
                <Card key={pattern.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{pattern.patient}</p>
                        <p className="text-sm text-muted-foreground">{pattern.pattern}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{pattern.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Next: {pattern.next}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8 min</div>
                  <p className="text-xs text-muted-foreground">-3 min from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Booking analytics chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}