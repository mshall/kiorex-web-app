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
import { 
  Calendar, 
  Clock, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  File,
  Image,
  FileCheck,
  User,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  ClipboardList,
  Paperclip,
  Archive,
  Share
} from "lucide-react";

const NurseDocuments = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'nurse';
  const providerType = location.state?.providerType || 'Nurse';

  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: "Patient Assessment - Sarah Johnson", 
      type: "Assessment",
      patientName: "Sarah Johnson",
      date: "2024-01-20",
      size: "2.3 MB",
      status: "completed",
      category: "Patient Records",
      description: "Initial nursing assessment for diabetes management",
      lastModified: "2024-01-20 14:30"
    },
    { 
      id: 2, 
      name: "Vital Signs Log - Week 1", 
      type: "Log",
      patientName: "Michael Brown",
      date: "2024-01-19",
      size: "1.8 MB",
      status: "pending",
      category: "Monitoring",
      description: "Daily vital signs monitoring log",
      lastModified: "2024-01-19 16:45"
    },
    { 
      id: 3, 
      name: "Care Plan - Emily Davis", 
      type: "Care Plan",
      patientName: "Emily Davis",
      date: "2024-01-18",
      size: "3.1 MB",
      status: "draft",
      category: "Care Plans",
      description: "Prenatal care plan and interventions",
      lastModified: "2024-01-18 10:15"
    },
    { 
      id: 4, 
      name: "Medication Administration Record", 
      type: "MAR",
      patientName: "Sarah Johnson",
      date: "2024-01-17",
      size: "1.2 MB",
      status: "completed",
      category: "Medications",
      description: "Daily medication administration tracking",
      lastModified: "2024-01-17 09:30"
    },
    { 
      id: 5, 
      name: "Incident Report - Fall Prevention", 
      type: "Report",
      patientName: "Michael Brown",
      date: "2024-01-16",
      size: "0.8 MB",
      status: "completed",
      category: "Incidents",
      description: "Incident report for fall prevention measures",
      lastModified: "2024-01-16 11:20"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleDownload = (documentId: number) => {
    console.log('Downloading document:', documentId);
  };

  const handleEdit = (documentId: number) => {
    console.log('Editing document:', documentId);
  };

  const handleDelete = (documentId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleShare = (documentId: number) => {
    console.log('Sharing document:', documentId);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'assessment': return <ClipboardList className="w-4 h-4" />;
      case 'log': return <Activity className="w-4 h-4" />;
      case 'care plan': return <Heart className="w-4 h-4" />;
      case 'mar': return <FileCheck className="w-4 h-4" />;
      case 'report': return <FileText className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'assessment': return 'text-blue-600';
      case 'log': return 'text-green-600';
      case 'care plan': return 'text-purple-600';
      case 'mar': return 'text-orange-600';
      case 'report': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <RoleBasedNavigation userType={userType} userName={providerType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-muted-foreground">Manage patient documents, assessments, and reports</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, patients, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="log">Log</SelectItem>
                <SelectItem value="care plan">Care Plan</SelectItem>
                <SelectItem value="mar">MAR</SelectItem>
                <SelectItem value="report">Report</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Patient Records">Patient Records</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Care Plans">Care Plans</SelectItem>
                <SelectItem value="Medications">Medications</SelectItem>
                <SelectItem value="Incidents">Incidents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Document Name</Label>
                  <Input placeholder="Enter document name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="log">Log</SelectItem>
                        <SelectItem value="care-plan">Care Plan</SelectItem>
                        <SelectItem value="mar">MAR</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Enter document description" />
                </div>
                <div>
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
                  </div>
                </div>
                <Button className="w-full">Create Document</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Documents List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents ({filteredDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg bg-muted ${getTypeColor(doc.type)}`}>
                          {getTypeIcon(doc.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{doc.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span><strong>Patient:</strong> {doc.patientName}</span>
                            <span><strong>Type:</strong> {doc.type}</span>
                            <span><strong>Category:</strong> {doc.category}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                            <span>Size: {doc.size}</span>
                            <span>Modified: {doc.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => handleDownload(doc.id)}>
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(doc.id)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleShare(doc.id)}>
                            <Share className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(doc.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
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
                <CardTitle>Document Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Documents</span>
                    <span className="font-semibold">{documents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold text-green-600">
                      {documents.filter(d => d.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-semibold text-yellow-600">
                      {documents.filter(d => d.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Drafts</span>
                    <span className="font-semibold text-blue-600">
                      {documents.filter(d => d.status === 'draft').length}
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
                    New Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Old
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Assessment completed for Sarah Johnson</span>
                    <span className="text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New care plan uploaded</span>
                    <span className="text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Vital signs log updated</span>
                    <span className="text-muted-foreground ml-auto">2 days ago</span>
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

export default NurseDocuments;
