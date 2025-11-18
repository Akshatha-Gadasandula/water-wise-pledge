import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, RefreshCw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tip {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
}

const Tips = () => {
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Static tips for now - will be connected to backend
  const tips: Tip[] = [
    {
      id: "1",
      title: "Turn Off the Tap While Brushing",
      description: "Don't let water run while brushing your teeth or washing your hands. Turn it on only when needed.",
      impact: "Saves up to 8 gallons per day",
      category: "Daily Habits"
    },
    {
      id: "2",
      title: "Fix Leaky Faucets Immediately",
      description: "A dripping faucet can waste over 3,000 gallons per year. Check and repair leaks promptly.",
      impact: "Saves 3,000+ gallons annually",
      category: "Home Maintenance"
    },
    {
      id: "3",
      title: "Use a Bucket While Showering",
      description: "Collect water while waiting for the shower to warm up. Use it for plants or cleaning.",
      impact: "Saves 2-3 gallons per shower",
      category: "Bathroom"
    },
    {
      id: "4",
      title: "Run Full Loads Only",
      description: "Only run dishwashers and washing machines when they're full to maximize water efficiency.",
      impact: "Saves up to 50 gallons per week",
      category: "Appliances"
    },
    {
      id: "5",
      title: "Water Plants in the Morning",
      description: "Water your garden early morning or late evening to reduce evaporation.",
      impact: "Reduces water waste by 30%",
      category: "Garden"
    },
    {
      id: "6",
      title: "Use a Broom, Not a Hose",
      description: "Clean driveways and sidewalks with a broom instead of hosing them down.",
      impact: "Saves up to 150 gallons",
      category: "Outdoor"
    },
    {
      id: "7",
      title: "Install Low-Flow Fixtures",
      description: "Replace old showerheads and faucets with water-efficient low-flow models.",
      impact: "Saves 25-60% of water usage",
      category: "Home Improvement"
    },
    {
      id: "8",
      title: "Collect Rainwater",
      description: "Set up a rain barrel to collect rainwater for watering plants and gardens.",
      impact: "Saves 1,300 gallons during growing season",
      category: "Garden"
    }
  ];

  const getRandomTip = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setCurrentTip(randomTip);
      setIsLoading(false);
      toast({
        title: "New tip loaded! 💧",
        description: "Learn something new about water conservation",
      });
    }, 500);
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Droplet className="h-12 w-12 text-primary animate-wave" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Daily Water-Saving Tips</h1>
          <p className="text-xl text-muted-foreground">
            Small changes in daily habits can make a huge difference
          </p>
        </div>

        {/* Daily Tip Card */}
        <Card className="shadow-water mb-8 overflow-hidden">
          <div className="h-2 gradient-ocean" />
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Sparkles className="h-4 w-4" />
              <span>{currentTip?.category}</span>
            </div>
            <CardTitle className="text-2xl">{currentTip?.title}</CardTitle>
            <CardDescription className="text-base">
              {currentTip?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-primary/10 mb-4">
              <p className="font-semibold text-primary">
                💧 Impact: {currentTip?.impact}
              </p>
            </div>
            <Button 
              onClick={getRandomTip} 
              className="w-full gradient-wave"
              disabled={isLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Get Another Tip
            </Button>
          </CardContent>
        </Card>

        {/* All Tips Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">All Water-Saving Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <Card 
                key={tip.id} 
                className={`hover:shadow-wave transition-all cursor-pointer ${
                  currentTip?.id === tip.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentTip(tip)}
              >
                <CardHeader>
                  <div className="text-xs text-muted-foreground mb-1">
                    {tip.category}
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {tip.description}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {tip.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
