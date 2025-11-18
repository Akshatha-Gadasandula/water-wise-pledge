import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import waterHero from "@/assets/water-hero.jpg";

const Home = () => {
  const stats = [
    { icon: Droplet, value: "2.2B", label: "People lack safe water" },
    { icon: Users, value: "785M", label: "Without basic service" },
    { icon: Award, value: "SDG 6", label: "Our Mission" },
    { icon: TrendingUp, value: "2030", label: "Target Year" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={waterHero} 
            alt="Water conservation hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>
        
        <div className="relative z-10 container text-center space-y-6 animate-fade-in">
          <div className="inline-block">
            <Droplet className="h-20 w-20 text-primary animate-wave mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            WaterWise
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Every Drop Counts. Join the Movement for Clean Water and Sanitation.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/tips">
              <Button size="lg" className="gradient-ocean shadow-wave">
                Explore Tips
              </Button>
            </Link>
            <Link to="/pledge">
              <Button size="lg" variant="outline">
                Make a Pledge
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-water hover:shadow-wave transition-shadow">
                <CardHeader className="pb-2">
                  <stat.icon className="h-8 w-8 text-primary mx-auto" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDG 6 Overview */}
      <section className="py-16 container">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">About SDG 6</h2>
            <p className="text-xl text-muted-foreground">
              Ensure availability and sustainable management of water and sanitation for all
            </p>
          </div>

          <Card className="shadow-water">
            <CardHeader>
              <CardTitle>Why Water Conservation Matters</CardTitle>
              <CardDescription>
                Water is the essence of life, yet billions lack access to this basic human right
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                SDG 6 aims to ensure universal access to safe and affordable drinking water, 
                adequate sanitation, and hygiene by 2030. Water scarcity affects more than 40% 
                of the global population, and this figure is projected to rise.
              </p>
              <p className="text-muted-foreground">
                Climate change, population growth, and poor water management threaten our water 
                resources. But together, we can make a difference through awareness, education, 
                and action.
              </p>
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <h3 className="font-semibold mb-2">Learn</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover daily water-saving tips
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10">
                  <h3 className="font-semibold mb-2">Test</h3>
                  <p className="text-sm text-muted-foreground">
                    Take our knowledge quiz
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10">
                  <h3 className="font-semibold mb-2">Act</h3>
                  <p className="text-sm text-muted-foreground">
                    Make your personal pledge
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="container text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your water conservation journey today. Small actions create big impacts!
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/quiz">
              <Button size="lg" className="gradient-wave">
                Take the Quiz
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
