import { Link, useLocation } from "react-router-dom";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tips", label: "Tips" },
    { path: "/quiz", label: "Quiz" },
    { path: "/pledge", label: "Pledge" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-ocean">
            <Droplet className="h-6 w-6 text-primary-foreground animate-wave" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WaterWise
          </span>
        </Link>
        
        <div className="flex-1 flex items-center justify-end space-x-1 md:space-x-2">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive(link.path) ? "default" : "ghost"}
                size="sm"
                className={isActive(link.path) ? "gradient-ocean" : ""}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
