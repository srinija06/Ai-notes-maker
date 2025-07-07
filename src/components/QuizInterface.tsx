import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  memoryTrick: string;
}

const sampleQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and largest city of France, located in the north-central part of the country.",
    memoryTrick: "Remember: Paris is where the Eiffel Tower is located!"
  },
  {
    id: 2,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1,
    explanation: "Mercury is the smallest planet and the one closest to the Sun in our solar system.",
    memoryTrick: "Think 'Mercury thermometer' - it's hot because it's close to the Sun!"
  }
];

interface QuizInterfaceProps {
  topic?: string;
}

export function QuizInterface({ topic = "Sample Topic" }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuiz.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: sampleQuiz.length };
  };

  if (showResults) {
    const { correct, total } = calculateScore();
    const percentage = Math.round((correct / total) * 100);

    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>Your performance on {topic}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-lg">
              You got <span className="font-semibold text-success">{correct}</span> out of{" "}
              <span className="font-semibold">{total}</span> correct!
            </p>
          </div>

          <div className="space-y-4">
            {sampleQuiz.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Card key={question.id} className={cn(
                  "border-l-4",
                  isCorrect ? "border-l-success bg-success/5" : "border-l-destructive bg-destructive/5"
                )}>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-3">
                      <Badge variant={isCorrect ? "default" : "destructive"} className="mt-1">
                        {isCorrect ? <Check className="w-3 h-3" /> : "✗"}
                      </Badge>
                      <div className="flex-1 space-y-2">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                        </p>
                        <p className="text-sm bg-info/10 p-2 rounded">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                        <p className="text-sm bg-warning/10 p-2 rounded">
                          <strong>Memory Trick:</strong> {question.memoryTrick}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center space-x-3">
            <Button variant="outline" onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResults(false);
            }}>
              Retake Quiz
            </Button>
            <Button variant="gradient">
              Generate New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = sampleQuiz[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuiz.length) * 100;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quiz: {topic}</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {sampleQuiz.length}
          </Badge>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
                  answers[currentQuestion] === index
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    answers[currentQuestion] === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  )}>
                    {answers[currentQuestion] === index && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            variant={currentQuestion === sampleQuiz.length - 1 ? "success" : "default"}
          >
            {currentQuestion === sampleQuiz.length - 1 ? "Finish Quiz" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}