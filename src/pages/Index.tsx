import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedSweets } from "@/components/FeaturedSweets";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedSweets />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
