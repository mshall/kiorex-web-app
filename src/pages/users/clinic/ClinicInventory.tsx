import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  Package, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

const ClinicInventory = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'clinic';
  const providerType = location.state?.providerType || 'Clinic';

  const [inventory, setInventory] = useState([
    { 
      id: 1, 
      name: "Surgical Gloves (Box of 100)", 
      category: "Medical Supplies", 
      quantity: 25, 
      minQuantity: 10,
      unitPrice: 15.99, 
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-10",
      expiryDate: "2025-12-31",
      status: "in-stock"
    },
    { 
      id: 2, 
      name: "Bandages (Pack of 50)", 
      category: "First Aid", 
      quantity: 8, 
      minQuantity: 15,
      unitPrice: 8.50, 
      supplier: "HealthFirst",
      lastRestocked: "2024-01-05",
      expiryDate: "2026-06-30",
      status: "low-stock"
    },
    { 
      id: 3, 
      name: "Antiseptic Solution 500ml", 
      category: "Medical Supplies", 
      quantity: 0, 
      minQuantity: 5,
      unitPrice: 12.75, 
      supplier: "MedSupply Co.",
      lastRestocked: "2023-12-20",
      expiryDate: "2025-03-15",
      status: "out-of-stock"
    },
    { 
      id: 4, 
      name: "Thermometer Digital", 
      category: "Equipment", 
      quantity: 12, 
      minQuantity: 5,
      unitPrice: 25.00, 
      supplier: "TechMed",
      lastRestocked: "2024-01-12",
      expiryDate: "2027-01-01",
      status: "in-stock"
    },
    { 
      id: 5, 
      name: "Syringes 10ml (Box of 100)", 
      category: "Medical Supplies", 
      quantity: 3, 
      minQuantity: 20,
      unitPrice: 22.50, 
      supplier: "MedSupply Co.",
      lastRestocked: "2023-11-15",
      expiryDate: "2025-08-20",
      status: "low-stock"
    },
    { 
      id: 6, 
      name: "Blood Pressure Cuff", 
      category: "Equipment", 
      quantity: 18, 
      minQuantity: 8,
      unitPrice: 45.00, 
      supplier: "TechMed",
      lastRestocked: "2024-01-08",
      expiryDate: "2026-12-31",
      status: "in-stock"
    },
    { 
      id: 7, 
      name: "Gauze Pads (Box of 100)", 
      category: "First Aid", 
      quantity: 2, 
      minQuantity: 12,
      unitPrice: 18.75, 
      supplier: "HealthFirst",
      lastRestocked: "2023-10-30",
      expiryDate: "2025-10-30",
      status: "low-stock"
    },
    { 
      id: 8, 
      name: "Stethoscope", 
      category: "Equipment", 
      quantity: 0, 
      minQuantity: 3,
      unitPrice: 85.00, 
      supplier: "TechMed",
      lastRestocked: "2023-09-15",
      expiryDate: "2028-01-01",
      status: "out-of-stock"
    },
    { 
      id: 9, 
      name: "Alcohol Wipes (Pack of 200)", 
      category: "Medical Supplies", 
      quantity: 15, 
      minQuantity: 10,
      unitPrice: 12.25, 
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-14",
      expiryDate: "2025-11-30",
      status: "in-stock"
    },
    { 
      id: 10, 
      name: "Cotton Swabs (Box of 1000)", 
      category: "First Aid", 
      quantity: 5, 
      minQuantity: 8,
      unitPrice: 9.99, 
      supplier: "HealthFirst",
      lastRestocked: "2024-01-03",
      expiryDate: "2026-03-15",
      status: "low-stock"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination logic
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedInventory,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredInventory,
    initialPage: 1,
    initialItemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'default';
      case 'low-stock': return 'secondary';
      case 'out-of-stock': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="w-4 h-4" />;
      case 'low-stock': return <AlertTriangle className="w-4 h-4" />;
      case 'out-of-stock': return <Minus className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'out-of-stock').length;
  const totalItemsCount = inventory.length;

  const handleAddItem = (newItem: any) => {
    const item = {
      ...newItem,
      id: inventory.length + 1,
      status: newItem.quantity > newItem.minQuantity ? 'in-stock' : 
              newItem.quantity === 0 ? 'out-of-stock' : 'low-stock'
    };
    setInventory([...inventory, item]);
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (updatedItem: any) => {
    setInventory(inventory.map(item => 
      item.id === updatedItem.id ? {
        ...updatedItem,
        status: updatedItem.quantity > updatedItem.minQuantity ? 'in-stock' : 
                updatedItem.quantity === 0 ? 'out-of-stock' : 'low-stock'
      } : item
    ));
    setIsEditDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (itemId: number) => {
    setInventory(inventory.filter(item => item.id !== itemId));
  };

  const categories = [...new Set(inventory.map(item => item.category))];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userType={userType} providerType={providerType} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">Manage clinic inventory, supplies, and equipment</p>
          </div>

          {/* Inventory Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold">{totalItemsCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-green-600">${totalValue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Minus className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Inventory Items ({totalItems})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search inventory..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Inventory Item</DialogTitle>
                      </DialogHeader>
                      <AddEditItemForm onSubmit={handleAddItem} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInventory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Min: {item.minQuantity} | Last restocked: {item.lastRestocked}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.quantity}</span>
                          {item.quantity <= item.minQuantity && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(item.status)} className="flex items-center space-x-1">
                          {getStatusIcon(item.status)}
                          <span className="capitalize">{item.status.replace('-', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(item);
                              setIsEditDialogOpen(true);
                            }}
                            className="h-8"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteItem(item.id)}
                            className="h-8"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[5, 10, 15, 20, 25]}
              />
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Inventory Item</DialogTitle>
              </DialogHeader>
              <AddEditItemForm 
                item={selectedItem} 
                onSubmit={handleEditItem} 
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedItem(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Item Form Component
const AddEditItemForm = ({ item, onSubmit, onCancel }: { 
  item?: any, 
  onSubmit: (item: any) => void, 
  onCancel?: () => void 
}) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || '',
    quantity: item?.quantity || 0,
    minQuantity: item?.minQuantity || 0,
    unitPrice: item?.unitPrice || 0,
    supplier: item?.supplier || '',
    lastRestocked: item?.lastRestocked || new Date().toISOString().split('T')[0],
    expiryDate: item?.expiryDate || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
              <SelectItem value="First Aid">First Aid</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Medications">Medications</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Current Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
            required
          />
        </div>
        <div>
          <Label htmlFor="minQuantity">Minimum Quantity</Label>
          <Input
            id="minQuantity"
            type="number"
            value={formData.minQuantity}
            onChange={(e) => setFormData({...formData, minQuantity: parseInt(e.target.value) || 0})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="unitPrice">Unit Price ($)</Label>
          <Input
            id="unitPrice"
            type="number"
            step="0.01"
            value={formData.unitPrice}
            onChange={(e) => setFormData({...formData, unitPrice: parseFloat(e.target.value) || 0})}
            required
          />
        </div>
        <div>
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            value={formData.supplier}
            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lastRestocked">Last Restocked</Label>
          <Input
            id="lastRestocked"
            type="date"
            value={formData.lastRestocked}
            onChange={(e) => setFormData({...formData, lastRestocked: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {item ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default ClinicInventory;
