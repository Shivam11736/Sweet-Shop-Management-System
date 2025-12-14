import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Candy, ShoppingBag, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Candy className="h-8 w-8 text-primary" />
          </motion.div>
          <span className="font-display text-2xl text-gradient">Sweet Shop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/shop" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Shop
          </Link>
          {isAuthenticated && user?.isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-muted-foreground">
                Hi, <span className="font-semibold text-foreground">{user?.name}</span>
              </span>
              {user?.isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="icon">
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="candy" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
