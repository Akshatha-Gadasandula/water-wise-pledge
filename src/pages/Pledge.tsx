import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import waterCommunity from "@/assets/water-community.jpg";

const Pledge = () => {
  const [name, setName] = useState("");
  const [pledgeText, setPledgeText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const pledgeExamples = [
    "I will turn off the tap while brushing my teeth",
    "I will fix any leaky faucets in my home immediately",
    "I will take shorter showers to conserve water",
    "I will only run full loads in my dishwasher and washing machine",
    "I will collect rainwater for my garden plants"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !pledgeText.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and pledge message are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - will be connected to backend
    setTimeout(() => {
      toast({
        title: "Pledge Submitted! 🎉",
        description: `Thank you ${name}! Your commitment makes a difference.`,
      });
      setName("");
      setPledgeText("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <img 
              src={waterCommunity} 
              alt="Community pledging for water conservation" 
              className="w-32 h-32 rounded-full shadow-wave"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Make Your Pledge</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of others committed to water conservation. Your promise matters!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pledge Form */}
          <Card className="shadow-water">
            <CardHeader>
              <CardTitle>Your Personal Commitment</CardTitle>
              <CardDescription>
                Tell us what you'll do to conserve water
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pledge">Your Pledge</Label>
                  <Textarea
                    id="pledge"
                    placeholder="I pledge to..."
                    value={pledgeText}
                    onChange={(e) => setPledgeText(e.target.value)}
                    rows={4}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    Be specific about what water-saving actions you'll take
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-ocean"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit My Pledge"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Examples and Info */}
          <div className="space-y-6">
            <Card className="shadow-water">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  Why Pledge?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Making a public commitment increases your likelihood of following through. 
                  When you pledge, you're not just helping yourself - you're inspiring others too!
                </p>
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="font-semibold text-primary mb-2">
                    💧 Did you know?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If every household in the US took simple water-saving measures, 
                    we could save over 3 trillion gallons per year!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-water">
              <CardHeader>
                <CardTitle>Pledge Examples</CardTitle>
                <CardDescription>
                  Need inspiration? Here are some ideas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pledgeExamples.map((example, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => setPledgeText(example)}
                    >
                      <span className="text-primary font-semibold">•</span>
                      <span className="text-sm">{example}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  Click any example to use it as your pledge
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <Card className="mt-8 shadow-wave gradient-ocean text-primary-foreground">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Every Action Counts</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Your individual commitment, combined with millions of others, creates 
                a wave of change that protects our planet's most precious resource.
              </p>
              <div className="flex justify-center gap-8 pt-4">
                <div>
                  <div className="text-4xl font-bold">2.2B</div>
                  <div className="text-sm opacity-80">People need water access</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">2030</div>
                  <div className="text-sm opacity-80">SDG 6 target year</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pledge;
