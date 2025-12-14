import { Candy, Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Candy className="h-6 w-6 text-primary" />
              <span className="font-display text-xl">Sweet Shop</span>
            </div>
            <p className="text-background/70 text-sm">
              Handcrafted sweets made with love. Bringing sweetness to your life since 2024.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-background/70 hover:text-background transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-sm text-background/70 hover:text-background transition-colors">
                Shop
              </Link>
              <Link to="/login" className="text-sm text-background/70 hover:text-background transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm text-background/70 hover:text-background transition-colors">
                Register
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Mail className="h-4 w-4" />
              hello@sweetshop.com
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/50">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> by Sweet Shop Team
          </p>
        </div>
      </div>
    </footer>
  );
}
