import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Smartphone,
  Mail,
  CheckCircle,
  Key,
  ArrowRight
} from "lucide-react";

const MFASetup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mfaMethod, setMfaMethod] = useState<'sms' | 'app' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  
  const email = location.state?.email || 'user@example.com';
  const userType = location.state?.userType || 'patient';

  const handleMFASetup = () => {
    setIsSetup(true);
    // Simulate MFA setup
    setTimeout(() => {
      navigate('/auth/profile-setup', { 
        state: { email, userType, mfaMethod } 
      });
    }, 2000);
  };

  if (isSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">MFA Setup Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Your account is now secured with multi-factor authentication.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Security Setup
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Enable Multi-Factor Authentication</h1>
            <p className="text-muted-foreground">
              Add an extra layer of security to protect your healthcare data
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Choose Your MFA Method</CardTitle>
              <CardDescription>
                Select how you'd like to receive verification codes for secure login
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* SMS Option */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    mfaMethod === 'sms' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setMfaMethod('sms')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">SMS Text Messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive verification codes via text message
                        </p>
                      </div>
                      {mfaMethod === 'sms' && (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Authenticator App Option */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    mfaMethod === 'app' 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setMfaMethod('app')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Key className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Authenticator App</h3>
                        <p className="text-sm text-muted-foreground">
                          Use apps like Google Authenticator or Authy
                        </p>
                      </div>
                      {mfaMethod === 'app' && (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Phone Number Input for SMS */}
                {mfaMethod === 'sms' && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll send verification codes to this number
                    </p>
                  </div>
                )}

                {/* Authenticator App Instructions */}
                {mfaMethod === 'app' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Authenticator App Setup</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Download Google Authenticator or Authy</li>
                      <li>Scan the QR code we'll show you</li>
                      <li>Enter the 6-digit code from the app</li>
                    </ol>
                  </div>
                )}

                {/* Security Benefits */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Benefits
                  </h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Protects your sensitive health data</li>
                    <li>• HIPAA-compliant security measures</li>
                    <li>• Prevents unauthorized access</li>
                    <li>• Required for accessing medical records</li>
                  </ul>
                </div>

                {/* Setup Button */}
                <Button 
                  onClick={handleMFASetup}
                  disabled={!mfaMethod || (mfaMethod === 'sms' && !phoneNumber)}
                  className="w-full"
                  size="lg"
                >
                  Setup Multi-Factor Authentication
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  You can change this setting later in your account preferences
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MFASetup;
