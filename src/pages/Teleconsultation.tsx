import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageCircle,
  Paperclip,
  Send,
  User,
  Clock,
  Settings,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  MoreVertical,
  Star,
  FileText,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  Timer,
  Users,
  Shield
} from "lucide-react";

const Teleconsultation = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  // Mock data
  const doctor = {
    name: "Dr. Emily Smith",
    specialty: "Cardiology",
    rating: 4.9,
    experience: "12 years",
    image: "/api/placeholder/100/100"
  };

  const patient = {
    name: "John Doe",
    age: 35,
    symptoms: "Chest pain and shortness of breath"
  };

  const [chatMessages] = useState([
    { id: 1, sender: 'doctor', message: 'Hello John, how are you feeling today?', time: '14:30' },
    { id: 2, sender: 'patient', message: 'Hi Dr. Smith, I have been experiencing chest pain since yesterday', time: '14:31' },
    { id: 3, sender: 'doctor', message: 'I understand. Can you describe the type of pain and when it started?', time: '14:32' }
  ]);

  const [consultationNotes, setConsultationNotes] = useState('');

  const handleEndCall = () => {
    setIsCallActive(false);
    navigate('/consultation-summary', { 
      state: { doctor, patient, notes: consultationNotes, duration: callDuration } 
    });
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle sending message
      setChatMessage('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isCallActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
                <span className="text-muted-foreground">Video Consultation</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join Your Consultation</h1>
            <p className="text-muted-foreground">
              Your video consultation with Dr. Emily Smith is ready to begin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Doctor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">ES</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({doctor.experience})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Appointment scheduled for 2:30 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Estimated duration: 30 minutes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{patient.name}</h3>
                      <p className="text-muted-foreground">Age: {patient.age} years</p>
                      <Badge variant="secondary">Patient</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Symptoms Reported:</h4>
                    <p className="text-sm text-muted-foreground">{patient.symptoms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pre-call Checklist */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Pre-Call Checklist</CardTitle>
              <CardDescription>Please ensure everything is ready before joining the call</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Camera and microphone working</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Stable internet connection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Quiet, private environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Medical documents ready</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCallActive(true)} size="lg">
                  <Video className="w-5 h-5 mr-2" />
                  Join Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Video Call Interface */}
      <div className="relative h-screen">
        {/* Main Video Area */}
        <div className="absolute inset-0">
          <div className="h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-white/80">{doctor.specialty}</p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Timer className="w-4 h-4" />
                <span>{formatTime(callDuration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium">{patient.name}</p>
            </div>
          </div>
          {!isVideoOn && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <VideoOff className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-black/50 rounded-full px-6 py-4">
            <Button
              variant={isMicOn ? "secondary" : "destructive"}
              size="icon"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="icon"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsScreenShare(!isScreenShare)}
            >
              <Share2 className="w-5 h-5" />
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={handleEndCall}
            >
              <PhoneOff className="w-5 h-5" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="absolute top-4 left-4 w-80 h-96 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Chat</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowChat(false)}>
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 space-y-3 h-64 overflow-y-auto">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'patient' 
                      ? 'bg-primary text-white' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Consultation Notes Panel */}
        {showNotes && (
          <div className="absolute top-4 left-96 w-80 h-96 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Consultation Notes</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowNotes(false)}>
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-4 h-80">
              <Textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Doctor's notes will appear here..."
                className="h-full resize-none"
              />
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-60 space-y-2">
          {!showChat && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setShowChat(true)}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
          )}
          
          {!showNotes && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setShowNotes(true)}
            >
              <FileText className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Connection Status */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teleconsultation;
