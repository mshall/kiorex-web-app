import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { 
  Pill,
  Search,
  Filter,
  ShoppingCart,
  MapPin,
  Clock,
  Star,
  Truck,
  CreditCard,
  Plus,
  Minus,
  Package,
  AlertCircle,
  CheckCircle2,
  Phone,
  Calendar,
  Heart,
  User,
  FileText
} from "lucide-react";

export default function Pharmacy() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products", count: 1247 },
    { id: "prescription", name: "Prescription", count: 438 },
    { id: "otc", name: "Over-the-Counter", count: 624 },
    { id: "supplements", name: "Supplements", count: 185 }
  ];

  const medications = [
    {
      id: 1,
      name: "Lisinopril 10mg",
      genericName: "Lisinopril",
      brand: "Prinivil",
      category: "prescription",
      price: 12.99,
      originalPrice: 18.99,
      discount: 32,
      inStock: true,
      rating: 4.8,
      reviews: 124,
      description: "ACE inhibitor used to treat high blood pressure",
      dosage: "10mg tablets",
      quantity: "30 tablets",
      prescriptionRequired: true,
      pharmacy: "CVS Pharmacy",
      deliveryTime: "2-3 days",
      image: "💊"
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      genericName: "Ibuprofen",
      brand: "Advil",
      category: "otc",
      price: 8.99,
      originalPrice: 12.99,
      discount: 31,
      inStock: true,
      rating: 4.6,
      reviews: 89,
      description: "Pain reliever and fever reducer",
      dosage: "200mg tablets",
      quantity: "100 tablets",
      prescriptionRequired: false,
      pharmacy: "Walgreens",
      deliveryTime: "1-2 days",
      image: "💊"
    },
    {
      id: 3,
      name: "Vitamin D3 1000 IU",
      genericName: "Cholecalciferol",
      brand: "Nature Made",
      category: "supplements",
      price: 15.99,
      originalPrice: 19.99,
      discount: 20,
      inStock: true,
      rating: 4.7,
      reviews: 203,
      description: "Supports bone health and immune function",
      dosage: "1000 IU softgels",
      quantity: "180 softgels",
      prescriptionRequired: false,
      pharmacy: "Target Pharmacy",
      deliveryTime: "1-2 days",
      image: "💊"
    },
    {
      id: 4,
      name: "Metformin 500mg",
      genericName: "Metformin",
      brand: "Glucophage",
      category: "prescription",
      price: 22.99,
      originalPrice: 35.99,
      discount: 36,
      inStock: false,
      rating: 4.5,
      reviews: 67,
      description: "Type 2 diabetes medication",
      dosage: "500mg tablets",
      quantity: "60 tablets",
      prescriptionRequired: true,
      pharmacy: "Rite Aid",
      deliveryTime: "5-7 days",
      image: "💊"
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      prescriber: "Dr. Smith",
      dateIssued: "Dec 20, 2024",
      refillsLeft: 5,
      status: "Active",
      nextRefill: "Jan 20, 2025"
    },
    {
      id: 2,
      medication: "Metformin 500mg", 
      prescriber: "Dr. Johnson",
      dateIssued: "Dec 15, 2024",
      refillsLeft: 3,
      status: "Active",
      nextRefill: "Jan 15, 2025"
    },
    {
      id: 3,
      medication: "Atorvastatin 20mg",
      prescriber: "Dr. Wilson",
      dateIssued: "Nov 30, 2024",
      refillsLeft: 0,
      status: "Expired",
      nextRefill: "Contact doctor"
    }
  ];

  const orderHistory = [
    {
      id: "ORD-001",
      date: "Dec 18, 2024",
      items: 2,
      total: 45.98,
      status: "Delivered",
      pharmacy: "CVS Pharmacy",
      trackingNumber: "1Z999AA1234567890"
    },
    {
      id: "ORD-002", 
      date: "Dec 10, 2024",
      items: 1,
      total: 12.99,
      status: "Delivered",
      pharmacy: "Walgreens",
      trackingNumber: "1Z999AA1234567891"
    },
    {
      id: "ORD-003",
      date: "Dec 5, 2024",
      items: 3,
      total: 78.97,
      status: "Processing",
      pharmacy: "Target Pharmacy",
      trackingNumber: "1Z999AA1234567892"
    }
  ];

  const addToCart = (medication) => {
    setCartItems([...cartItems, medication]);
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Digital Pharmacy</h1>
          <p className="text-muted-foreground text-lg">Order medications online with prescription management and delivery</p>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search medications..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Medication Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedications.map((medication) => (
                <Card key={medication.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-3xl">{medication.image}</div>
                      <div className="text-right">
                        {medication.prescriptionRequired && (
                          <Badge variant="outline" className="text-xs mb-1">
                            Prescription Required
                          </Badge>
                        )}
                        {!medication.inStock && (
                          <Badge variant="secondary" className="text-xs">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">{medication.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Generic: {medication.genericName}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {medication.quantity} • {medication.dosage}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{medication.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({medication.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        ${medication.price}
                      </span>
                      {medication.originalPrice && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            ${medication.originalPrice}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {medication.discount}% off
                          </Badge>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{medication.pharmacy}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{medication.deliveryTime}</span>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        disabled={!medication.inStock}
                        onClick={() => addToCart(medication)}
                      >
                        {medication.inStock ? (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        ) : (
                          "Out of Stock"
                        )}
                      </Button>
                      {medication.prescriptionRequired && (
                        <Button variant="outline" className="w-full" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Upload Prescription
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Prescriptions</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Prescription
              </Button>
            </div>

            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{prescription.medication}</h4>
                          <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'}>
                            {prescription.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Prescribed by:</span>
                            <p className="font-medium">{prescription.prescriber}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date issued:</span>
                            <p className="font-medium">{prescription.dateIssued}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Refills left:</span>
                            <p className="font-medium">{prescription.refillsLeft}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next refill:</span>
                            <p className="font-medium">{prescription.nextRefill}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {prescription.status === 'Active' && prescription.refillsLeft > 0 && (
                          <Button size="sm">
                            <Pill className="h-4 w-4 mr-2" />
                            Refill Now
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Doctor
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order History</h3>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Orders
              </Button>
            </div>

            <div className="space-y-4">
              {orderHistory.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">Order {order.id}</h4>
                          <Badge variant={
                            order.status === 'Delivered' ? 'default' :
                            order.status === 'Processing' ? 'secondary' : 'outline'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <p className="font-medium">{order.date}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Items:</span>
                            <p className="font-medium">{order.items} items</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <p className="font-medium">${order.total}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Pharmacy:</span>
                            <p className="font-medium">{order.pharmacy}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tracking:</span>
                            <p className="font-medium text-blue-600">{order.trackingNumber}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Package className="h-4 w-4 mr-2" />
                          Track Order
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Medication Reminders</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Reminder
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-blue-600" />
                    Lisinopril 10mg
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium">Daily at 8:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next dose:</span>
                    <span className="font-medium">Tomorrow 8:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Taken
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-green-600" />
                    Vitamin D3 1000 IU
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium">Daily at 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next dose:</span>
                    <span className="font-medium">Today 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Taken
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Refill Reminder
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">You have 3 medications due for refill in the next 7 days:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Lisinopril 10mg (5 days)</li>
                    <li>• Metformin 500mg (7 days)</li>
                    <li>• Vitamin D3 (3 days)</li>
                  </ul>
                  <Button className="w-full" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Refills
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Medication Adherence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                    <p className="text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                    <p className="text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                    <p className="text-muted-foreground">Overall</p>
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