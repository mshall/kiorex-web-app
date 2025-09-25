import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight, Sparkles, Shield, Clock, Heart, Wind } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Healthcare Platform
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Your Health,
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Experience the future of healthcare with Kiorex. From AI-powered diagnostics 
                to seamless telemedicine, we're transforming how you access and manage your health.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>AI-Powered</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="medical" className="group">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button size="lg" variant="outline" className="group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">1K+</div>
                <div className="text-sm text-muted-foreground">Healthcare Providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="relative">
            <div className="relative bg-gradient-card rounded-3xl p-8 shadow-xl border border-border/50">
              {/* Mock Dashboard */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Good morning, Sarah</h3>
                    <p className="text-sm text-muted-foreground">How are you feeling today?</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">S</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-5 h-5 text-success" />
                    </div>
                    <div className="text-2xl font-bold text-success">72</div>
                    <div className="text-sm text-muted-foreground">Heart Rate</div>
                  </div>
                  <div className="bg-info/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Wind className="w-5 h-5 text-info" />
                    </div>
                    <div className="text-2xl font-bold text-info">98%</div>
                    <div className="text-sm text-muted-foreground">Blood Oxygen</div>
                  </div>
                </div>

                {/* Upcoming Appointment */}
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Next Appointment</h4>
                    <Badge variant="secondary" className="text-xs">Today</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Dr. Emily Carter</p>
                  <p className="text-sm text-muted-foreground">2:30 PM - Cardiology</p>
                  <Button size="sm" className="mt-3 w-full" variant="medical">
                    Join Video Call
                  </Button>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-secondary/10 rounded-2xl p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-secondary" />
                    AI Health Insights
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your sleep quality has improved by 15% this week. Consider maintaining 
                    your current bedtime routine.
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};