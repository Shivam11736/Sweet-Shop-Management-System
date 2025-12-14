import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useSweets } from "@/context/SweetsContext";
import { CATEGORY_LABELS, SweetCategory, CATEGORY_COLORS } from "@/types/sweet";
import { toast } from "sonner";

const categories: SweetCategory[] = [
  "chocolate",
  "gummy",
  "lollipop",
  "caramel",
  "mint",
  "fruit",
  "other",
];

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const { sweets, addSweet, updateSweet, deleteSweet, restockSweet } = useSweets();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<string | null>(null);
  const [restockAmount, setRestockAmount] = useState<Record<string, number>>({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "chocolate" as SweetCategory,
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleAddSweet = () => {
    if (!formData.name || !formData.price || !formData.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    addSweet({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description || "Delicious sweet treat",
      image: formData.image || "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=300&fit=crop",
    });

    toast.success("Sweet added successfully!");
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string, name: string) => {
    deleteSweet(id);
    toast.success(`${name} has been deleted`);
  };

  const handleRestock = (id: string, name: string) => {
    const amount = restockAmount[id] || 0;
    if (amount > 0) {
      restockSweet(id, amount);
      toast.success(`Restocked ${name} with ${amount} items`);
      setRestockAmount((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "chocolate",
      price: "",
      quantity: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-display text-gradient mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your sweet inventory
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="candy">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sweet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Sweet</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new sweet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Chocolate Truffle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: SweetCategory) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {CATEGORY_LABELS[cat]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="4.99"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="A delicious treat..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="candy" onClick={handleAddSweet}>
                    Add Sweet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sweets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{sweets.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {sweets.reduce((acc, s) => acc + s.quantity, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {sweets.filter((s) => s.quantity === 0).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Restock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sweets.map((sweet) => {
                    const categoryVariant = CATEGORY_COLORS[sweet.category] as
                      | "chocolate" | "strawberry" | "blueberry" | "caramel" | "mint" | "lemon" | "secondary";
                    
                    return (
                      <TableRow key={sweet.id}>
                        <TableCell className="font-medium">{sweet.name}</TableCell>
                        <TableCell>
                          <Badge variant={categoryVariant}>
                            {CATEGORY_LABELS[sweet.category]}
                          </Badge>
                        </TableCell>
                        <TableCell>${sweet.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={sweet.quantity === 0 ? "text-destructive font-medium" : ""}>
                            {sweet.quantity}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              className="w-20 h-8"
                              value={restockAmount[sweet.id] || ""}
                              onChange={(e) =>
                                setRestockAmount((prev) => ({
                                  ...prev,
                                  [sweet.id]: parseInt(e.target.value) || 0,
                                }))
                              }
                              placeholder="0"
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleRestock(sweet.id, sweet.name)}
                            >
                              <Package className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(sweet.id, sweet.name)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
