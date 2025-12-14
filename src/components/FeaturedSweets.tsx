import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SweetCard } from "@/components/SweetCard";
import { Button } from "@/components/ui/button";
import { useSweets } from "@/context/SweetsContext";

export function FeaturedSweets() {
  const { sweets } = useSweets();
  const featuredSweets = sweets.slice(0, 4);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-gradient mb-4">
            Sweet Favorites
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our most loved treats, handpicked for you. From rich chocolates to fruity delights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredSweets.map((sweet, index) => (
            <motion.div
              key={sweet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SweetCard sweet={sweet} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Sweets
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
