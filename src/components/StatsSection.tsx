import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Calendar, Award } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "50,000+",
      label: "Active Patients",
      description: "Trust our platform",
      color: "text-primary"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: "1,000+",
      label: "Healthcare Providers",
      description: "Expert medical professionals",
      color: "text-secondary"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      value: "100K+",
      label: "Appointments Booked",
      description: "Seamless scheduling",
      color: "text-accent"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "99.9%",
      label: "Uptime Reliability",
      description: "Always available for you",
      color: "text-info"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center group hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};