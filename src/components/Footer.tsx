import { Heart, Droplet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Droplet className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">WaterWise</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting UN SDG 6: Clean Water and Sanitation for all.
              Every drop counts!
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About SDG 6</li>
              <li>Water Conservation</li>
              <li>Get Involved</li>
              <li>Resources</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Join our mission to conserve water and protect our planet's most precious resource.
            </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
