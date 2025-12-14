import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SweetCard } from "@/components/SweetCard";
import { SearchFilter } from "@/components/SearchFilter";
import { useSweets } from "@/context/SweetsContext";
import { SweetCategory } from "@/types/sweet";

const Shop = () => {
  const { sweets } = useSweets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SweetCategory | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const filteredSweets = sweets.filter((sweet) => {
    const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sweet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || sweet.category === selectedCategory;
    const matchesPrice = sweet.price >= priceRange[0] && sweet.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display text-gradient mb-2">Our Sweets</h1>
          <p className="text-muted-foreground">
            Browse our delicious collection of handcrafted confections
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>

        {filteredSweets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet, index) => (
              <motion.div
                key={sweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SweetCard sweet={sweet} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-muted-foreground mb-2">No sweets found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
