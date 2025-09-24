import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ready to transform your health journey?</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            Start Your Health
            <span className="block">Revolution Today</span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of patients and healthcare providers who are already experiencing 
            the future of healthcare with Kiorex. Your health journey starts here.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Instant Setup</h3>
              <p className="text-sm text-white/80">Get started in under 5 minutes</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Bank-Grade Security</h3>
              <p className="text-sm text-white/80">Your data is always protected</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">AI-Powered Insights</h3>
              <p className="text-sm text-white/80">Personalized health recommendations</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="group bg-white text-primary hover:bg-white/90">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-sm text-white/70 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};