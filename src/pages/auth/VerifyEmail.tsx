import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  ArrowLeft,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import KiorexLogo from "@/components/KiorexLogo";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const email = location.state?.email || 'user@example.com';
  const userType = location.state?.userType || 'patient';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const enteredOtp = otp.join('');
      if (enteredOtp === '123456') { // Demo OTP
        setIsVerified(true);
        setTimeout(() => {
          navigate('/auth/mfa-setup', { 
            state: { email, userType } 
          });
        }, 2000);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOtp = () => {
    setTimer(300);
    setOtp(['', '', '', '', '', '']);
    // Simulate resend
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
              <p className="text-muted-foreground mb-6">
                Your email has been successfully verified. Setting up your secure account...
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
              <KiorexLogo size="sm" showText={false} />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Kiorex
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Email Verification
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-muted-foreground">
              We've sent a verification code to your email address
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Enter Verification Code</CardTitle>
              <CardDescription>
                Check your email <strong>{email}</strong> for a 6-digit code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* OTP Input */}
                <div>
                  <Label className="text-center block mb-4">Verification Code</Label>
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold"
                      />
                    ))}
                  </div>
                </div>

                {/* Timer */}
                <div className="text-center">
                  {timer > 0 ? (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Code expires in {formatTime(timer)}</span>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={handleResendOtp}
                      className="text-primary"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Code
                    </Button>
                  )}
                </div>

                {/* Verify Button */}
                <Button 
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length !== 6 || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </Button>

                {/* Demo Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Demo Mode:</strong> Use <code>123456</code> as the verification code
                  </p>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{" "}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    contact support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
