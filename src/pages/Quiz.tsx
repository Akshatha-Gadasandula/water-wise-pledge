import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: 1,
      question: "How much of Earth's water is freshwater available for human use?",
      options: ["Less than 1%", "About 10%", "About 25%", "About 50%"],
      correctAnswer: 0,
      explanation: "Less than 1% of Earth's water is accessible freshwater for human use. Most water is saltwater in oceans."
    },
    {
      id: 2,
      question: "How much water does a leaky faucet waste per year on average?",
      options: ["100 gallons", "500 gallons", "3,000 gallons", "10,000 gallons"],
      correctAnswer: 2,
      explanation: "A leaky faucet can waste over 3,000 gallons of water per year - enough to fill a swimming pool!"
    },
    {
      id: 3,
      question: "What percentage of the human body is made up of water?",
      options: ["30%", "50%", "60%", "80%"],
      correctAnswer: 2,
      explanation: "About 60% of the adult human body is water. We need it for nearly every bodily function."
    },
    {
      id: 4,
      question: "Which activity uses the most household water?",
      options: ["Toilet flushing", "Showering", "Laundry", "Cooking"],
      correctAnswer: 0,
      explanation: "Toilet flushing accounts for nearly 30% of household water use, making it the largest consumer."
    },
    {
      id: 5,
      question: "How many people worldwide lack access to safe drinking water?",
      options: ["500 million", "1 billion", "2.2 billion", "3 billion"],
      correctAnswer: 2,
      explanation: "Over 2.2 billion people lack access to safely managed drinking water services according to the UN."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "Choose an option before proceeding",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnsweredQuestions = [...answeredQuestions, isCorrect];
    setAnsweredQuestions(newAnsweredQuestions);

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: questions[currentQuestion].explanation,
      });
    } else {
      toast({
        title: "Not quite right",
        description: questions[currentQuestion].explanation,
        variant: "destructive",
      });
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="min-h-screen py-12">
        <div className="container max-w-2xl">
          <Card className="shadow-wave">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-6 rounded-full gradient-ocean">
                  <Trophy className="h-16 w-16 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
              <CardDescription>Here's how you did</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-primary">
                  {score} / {questions.length}
                </div>
                <p className="text-2xl text-muted-foreground">
                  {percentage}% Correct
                </p>
              </div>

              <div className="p-6 rounded-lg bg-muted space-y-2">
                <h3 className="font-semibold text-lg">
                  {percentage >= 80 ? "Excellent! 🌟" : percentage >= 60 ? "Good Job! 👏" : "Keep Learning! 💪"}
                </h3>
                <p className="text-muted-foreground">
                  {percentage >= 80 
                    ? "You're a water conservation expert! Share your knowledge with others."
                    : percentage >= 60
                    ? "You have good knowledge about water conservation. Keep it up!"
                    : "Every expert was once a beginner. Review the tips and try again!"}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Your Answers:</h4>
                {questions.map((q, index) => (
                  <div key={q.id} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    {answeredQuestions[index] ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className="text-sm">Question {index + 1}</span>
                  </div>
                ))}
              </div>

              <Button onClick={resetQuiz} className="w-full gradient-wave">
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-2xl">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Water Conservation Quiz</h1>
          <p className="text-xl text-muted-foreground">
            Test your knowledge and learn more about saving water
          </p>
        </div>

        <Card className="shadow-water">
          <CardHeader>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h2>

              <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary ${
                        selectedAnswer === index ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={handleNextQuestion} 
              className="w-full gradient-ocean"
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
