import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KiorexLogo from "@/components/KiorexLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useRTL } from "@/hooks/useRTL";
import { 
  Activity, 
  Calendar, 
  Heart, 
  Shield, 
  Stethoscope, 
  Users, 
  Brain, 
  ChevronRight,
  Video,
  Pill,
  FileText,
  BarChart3,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  const { t } = useTranslation();
  const { isRTL, direction } = useRTL();

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <KiorexLogo size="md" showText={true} />
            </div>

            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
                {t('navigation.features')}
              </a>
              <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">
                {t('navigation.services')}
              </a>
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                {t('navigation.about')}
              </a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                {t('navigation.contact')}
              </a>
            </div>

            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <LanguageSwitcher />
              <Link to="/auth/role-selection">
                <Button variant="ghost">{t('auth.signIn')}</Button>
              </Link>
              <Link to="/auth/welcome">
                <Button variant="medical">{t('auth.getStarted')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Comprehensive Healthcare
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need for <span className="text-primary">Better Health</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI-powered diagnostics to seamless appointment booking, 
              Kiorex brings together all healthcare services in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Video className="w-6 h-6" />}
              title="Telemedicine"
              description="Connect with doctors virtually from the comfort of your home with HD video consultations."
              color="primary"
            />
            
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Smart Scheduling"
              description="AI-powered appointment booking that finds the perfect time slot for you and your doctor."
              color="secondary"
            />
            
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Electronic Health Records"
              description="Secure, comprehensive digital health records accessible to you and your care team."
              color="accent"
            />
            
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="AI Health Assistant"
              description="Get personalized health insights and recommendations powered by advanced AI."
              color="info"
            />
            
            <FeatureCard
              icon={<Pill className="w-6 h-6" />}
              title="Digital Pharmacy"
              description="Order medications online with same-day delivery and automatic refill reminders."
              color="warning"
            />
            
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Health Analytics"
              description="Track your health metrics and get detailed insights into your wellness journey."
              color="success"
            />
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Specialized <span className="text-primary">Healthcare Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access world-class medical expertise across all specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cardiology", icon: Heart, patients: "15,000+", rating: 4.9 },
              { name: "Neurology", icon: Brain, patients: "8,500+", rating: 4.8 },
              { name: "General Medicine", icon: Stethoscope, patients: "25,000+", rating: 4.9 },
              { name: "Pediatrics", icon: Users, patients: "12,000+", rating: 4.7 },
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>
                    <span className="block text-center text-sm text-muted-foreground mt-2">
                      {service.patients} patients
                    </span>
                    <span className="flex items-center justify-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" size="sm">
                    Book Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <KiorexLogo size="md" showText={true} />
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Revolutionizing healthcare with AI-powered comprehensive medical services, 
                telemedicine, and integrated health management.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>HIPAA Compliant & Secure</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Book Appointment</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Find Doctors</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Emergency Care</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Health Records</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Kiorex. All rights reserved. Transforming healthcare for a healthier tomorrow.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;