import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Sweet, CATEGORY_COLORS, CATEGORY_LABELS, SweetCategory } from "@/types/sweet";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSweets } from "@/context/SweetsContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface SweetCardProps {
  sweet: Sweet;
}

export function SweetCard({ sweet }: SweetCardProps) {
  const { purchaseSweet } = useSweets();
  const { isAuthenticated } = useAuth();
  const isOutOfStock = sweet.quantity <= 0;

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase sweets");
      return;
    }
    
    const success = purchaseSweet(sweet.id);
    if (success) {
      toast.success(`Purchased ${sweet.name}!`, {
        description: "Thank you for your order",
      });
    } else {
      toast.error("Unable to complete purchase");
    }
  };

  const categoryVariant = CATEGORY_COLORS[sweet.category] as 
    | "chocolate" | "strawberry" | "blueberry" | "caramel" | "mint" | "lemon" | "secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={sweet.image}
            alt={sweet.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="text-background font-bold text-lg">Out of Stock</span>
            </div>
          )}
          <Badge
            variant={categoryVariant}
            className="absolute top-3 left-3"
          >
            {CATEGORY_LABELS[sweet.category]}
          </Badge>
        </div>
        
        <CardContent className="flex-1 pt-4">
          <h3 className="font-semibold text-lg mb-1">{sweet.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {sweet.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${sweet.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              {sweet.quantity} in stock
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant={isOutOfStock ? "secondary" : "candy"}
            className="w-full"
            disabled={isOutOfStock}
            onClick={handlePurchase}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isOutOfStock ? "Out of Stock" : "Purchase"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
