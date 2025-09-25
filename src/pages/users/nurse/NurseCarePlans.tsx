import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Clock, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  User,
  Activity,
  Heart,
  FileText,
  Target,
  TrendingUp,
  Users,
  ClipboardList
} from "lucide-react";

const NurseCarePlans = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'nurse';
  const providerType = location.state?.providerType || 'Nurse';

  const [carePlans, setCarePlans] = useState([
    { 
      id: 1, 
      patientName: "Sarah Johnson", 
      condition: "Diabetes Management",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      progress: 65,
      goals: [
        { id: 1, description: "Maintain blood sugar levels between 80-120 mg/dL", completed: true },
        { id: 2, description: "Exercise for 30 minutes daily", completed: true },
        { id: 3, description: "Follow diabetic diet plan", completed: false },
        { id: 4, description: "Regular foot care routine", completed: false }
      ],
      interventions: [
        { id: 1, description: "Daily blood glucose monitoring", frequency: "Daily" },
        { id: 2, description: "Insulin administration as prescribed", frequency: "Twice daily" },
        { id: 3, description: "Dietary counseling", frequency: "Weekly" },
        { id: 4, description: "Exercise monitoring", frequency: "Daily" }
      ],
      notes: "Patient showing good progress with medication adherence"
    },
    { 
      id: 2, 
      patientName: "Michael Brown", 
      condition: "Post-Surgery Recovery",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      progress: 40,
      goals: [
        { id: 1, description: "Achieve full range of motion in hip", completed: false },
        { id: 2, description: "Walk without assistance", completed: false },
        { id: 3, description: "Manage pain effectively", completed: true },
        { id: 4, description: "Prevent infection", completed: true }
      ],
      interventions: [
        { id: 1, description: "Physical therapy exercises", frequency: "Daily" },
        { id: 2, description: "Pain medication administration", frequency: "As needed" },
        { id: 3, description: "Wound care and monitoring", frequency: "Daily" },
        { id: 4, description: "Mobility assistance", frequency: "Daily" }
      ],
      notes: "Recovery progressing well, patient motivated"
    },
    { 
      id: 3, 
      patientName: "Emily Davis", 
      condition: "Prenatal Care",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-04-15",
      progress: 80,
      goals: [
        { id: 1, description: "Maintain healthy weight gain", completed: true },
        { id: 2, description: "Regular prenatal checkups", completed: true },
        { id: 3, description: "Proper nutrition", completed: true },
        { id: 4, description: "Prepare for delivery", completed: false }
      ],
      interventions: [
        { id: 1, description: "Weight monitoring", frequency: "Weekly" },
        { id: 2, description: "Blood pressure checks", frequency: "Weekly" },
        { id: 3, description: "Fetal heart rate monitoring", frequency: "Weekly" },
        { id: 4, description: "Nutritional counseling", frequency: "Bi-weekly" }
      ],
      notes: "Healthy pregnancy, all vitals normal"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleUpdateProgress = (planId: number) => {
    console.log('Updating progress for plan:', planId);
  };

  const handleAddIntervention = (planId: number) => {
    console.log('Adding intervention for plan:', planId);
  };

  const handleMarkGoalComplete = (planId: number, goalId: number) => {
    setCarePlans(prev => prev.map(plan => 
      plan.id === planId 
        ? {
            ...plan,
            goals: plan.goals.map(goal => 
              goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
            )
          }
        : plan
    ));
  };

  const filteredCarePlans = carePlans.filter(plan => {
    const matchesSearch = plan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'outline';
      case 'on-hold': return 'secondary';
      default: return 'secondary';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Care Plans</h1>
          <p className="text-muted-foreground">Manage patient care plans and track progress</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients or conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Care Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Care Plan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient1">Sarah Johnson</SelectItem>
                        <SelectItem value="patient2">Michael Brown</SelectItem>
                        <SelectItem value="patient3">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Condition</Label>
                    <Input placeholder="Enter condition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <Label>Goals</Label>
                  <Textarea placeholder="Enter care plan goals..." />
                </div>
                <div>
                  <Label>Interventions</Label>
                  <Textarea placeholder="Enter planned interventions..." />
                </div>
                <Button className="w-full">Create Care Plan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Care Plans List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2" />
                  Care Plans ({filteredCarePlans.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredCarePlans.map((plan) => (
                    <div key={plan.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{plan.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{plan.condition}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(plan.status)}>
                            {plan.status}
                          </Badge>
                          <span className={`text-sm font-medium ${getProgressColor(plan.progress)}`}>
                            {plan.progress}% Complete
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Goals */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Goals
                        </h4>
                        <div className="space-y-2">
                          {plan.goals.map((goal) => (
                            <div key={goal.id} className="flex items-center space-x-2">
                              <Checkbox
                                checked={goal.completed}
                                onCheckedChange={() => handleMarkGoalComplete(plan.id, goal.id)}
                              />
                              <span className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {goal.description}
                              </span>
                              {goal.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interventions */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Activity className="w-4 h-4 mr-2" />
                          Interventions
                        </h4>
                        <div className="space-y-1">
                          {plan.interventions.map((intervention) => (
                            <div key={intervention.id} className="flex items-center justify-between text-sm">
                              <span>{intervention.description}</span>
                              <Badge variant="outline" className="text-xs">
                                {intervention.frequency}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Notes
                        </h4>
                        <p className="text-sm text-muted-foreground">{plan.notes}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleUpdateProgress(plan.id)}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Update Progress
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleAddIntervention(plan.id)}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Intervention
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Care Plan Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Plans</span>
                    <span className="font-semibold">{carePlans.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Plans</span>
                    <span className="font-semibold text-green-600">
                      {carePlans.filter(p => p.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed Goals</span>
                    <span className="font-semibold text-blue-600">
                      {carePlans.reduce((acc, plan) => 
                        acc + plan.goals.filter(goal => goal.completed).length, 0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Progress</span>
                    <span className="font-semibold text-purple-600">
                      {Math.round(carePlans.reduce((acc, plan) => acc + plan.progress, 0) / carePlans.length)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    New Care Plan
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Templates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Progress Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Goal completed for Sarah Johnson</span>
                    <span className="text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New intervention added</span>
                    <span className="text-muted-foreground ml-auto">3 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Progress updated</span>
                    <span className="text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseCarePlans;
