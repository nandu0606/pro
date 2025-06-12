import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link, useParams } from 'wouter';
import { type Quiz, type QuizQuestion } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, ArrowLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';

const QuizPage = () => {
  const [matched, params] = useRoute('/quiz/:id');
  const quizId = matched ? parseInt(params.id) : 0;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Fetch quiz details
  const { data: quiz, isLoading: isLoadingQuiz } = useQuery<Quiz>({
    queryKey: ['/api/quizzes', quizId],
  });
  
  // Fetch quiz questions
  const { data: questions, isLoading: isLoadingQuestions } = useQuery<QuizQuestion[]>({
    queryKey: ['/api/quizzes', quizId, 'questions'],
    queryFn: async () => {
      const res = await fetch(`/api/quizzes/${quizId}/questions`);
      if (!res.ok) throw new Error('Failed to fetch questions');
      return res.json();
    }
  });
  
  const isLoading = isLoadingQuiz || isLoadingQuestions;
  
  // Handle selection of an answer
  const handleSelectAnswer = (answer: string) => {
    if (questions) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questions[currentQuestionIndex].id]: answer
      });
    }
  };
  
  // Move to the next question or submit if last question
  const handleNextQuestion = () => {
    if (!questions) return;
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  // Reset the quiz to start over
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };
  
  // Calculate the quiz results
  const calculateResults = () => {
    if (!questions) return { correctCount: 0, incorrectCount: 0, score: 0 };
    
    let correctCount = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const incorrectCount = questions.length - correctCount;
    const score = Math.round((correctCount / questions.length) * 100);
    
    return { correctCount, incorrectCount, score };
  };
  
  // Get a message based on the score
  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You're a mythology master!";
    if (score >= 70) return "Great job! You know your mythology well!";
    if (score >= 50) return "Good effort! You have a decent knowledge of mythology.";
    return "Keep learning! Mythology has many fascinating stories to discover.";
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <Skeleton className="h-12 w-3/4 mb-6 bg-wine-800" />
        <Skeleton className="h-6 w-1/2 mb-8 bg-wine-800" />
        <Card className="bg-wine-900 border-gold-500 border-2">
          <CardHeader>
            <Skeleton className="h-8 w-full mb-2 bg-wine-800" />
            <Skeleton className="h-4 w-1/3 bg-wine-800" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-5 w-5 rounded-full mt-0.5 bg-wine-800" />
                <Skeleton className="h-6 w-full bg-wine-800" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-end">
            <Skeleton className="h-10 w-32 bg-wine-800" />
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (!quiz || !questions || questions.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4 text-center">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            We couldn't load this quiz. It may not exist or there was a problem with the server.
          </AlertDescription>
        </Alert>
        <Link href="/quizzes">
          <Button className="mt-4" variant="secondary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Button>
        </Link>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const hasSelectedAnswer = !!selectedAnswers[currentQuestion.id];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Show results screen
  if (showResults) {
    const { correctCount, incorrectCount, score } = calculateResults();
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto py-10 px-4"
      >
        <Link href="/quizzes">
          <Button variant="outline" className="mb-6 text-gold-500 border-gold-500 hover:bg-wine-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Button>
        </Link>
        
        <Card className="bg-wine-900 border-gold-500 border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-gold-500">
              {quiz.title} Results
            </CardTitle>
            <CardDescription className="text-gray-300">
              {quiz.category} | {quiz.difficulty}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <div className="text-6xl font-bold text-gold-500 mb-4">{score}%</div>
              <p className="text-xl text-white">{getScoreMessage(score)}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-wine-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-500 mb-2">{correctCount}</div>
                <p className="text-gray-300">Correct Answers</p>
              </div>
              <div className="bg-wine-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">{incorrectCount}</div>
                <p className="text-gray-300">Incorrect Answers</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleRestartQuiz}
              className="bg-gold-500 hover:bg-gold-600 text-wine-900 w-full sm:w-auto"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Take Quiz Again
            </Button>
            <Link href="/quizzes">
              <Button 
                variant="outline" 
                className="text-gold-500 border-gold-500 hover:bg-wine-800 w-full sm:w-auto"
              >
                Explore More Quizzes
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gold-500">Detailed Results</h3>
          
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
            const selectedAnswer = selectedAnswers[question.id] || "Not answered";
            
            return (
              <Card 
                key={question.id} 
                className={`bg-wine-800 border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-start">
                    <span className="mr-2">
                      {isCorrect ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      }
                    </span>
                    <span>Question {index + 1}: {question.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Your answer:</p>
                    <p className={`font-medium ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedAnswer}
                    </p>
                  </div>
                  
                  {!isCorrect && (
                    <div>
                      <p className="text-sm text-gray-400">Correct answer:</p>
                      <p className="font-medium text-green-500">{question.correctAnswer}</p>
                    </div>
                  )}
                  
                  {question.explanation && (
                    <div>
                      <p className="text-sm text-gray-400">Explanation:</p>
                      <p className="text-gray-300">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    );
  }
  
  // Show quiz question
  return (
    <motion.div 
      variants={fadeIn('up', 'tween', 0.2, 0.5)}
      initial="hidden"
      animate="show"
      className="container max-w-4xl mx-auto py-10 px-4"
    >
      <Link href="/quizzes">
        <Button variant="outline" className="mb-6 text-gold-500 border-gold-500 hover:bg-wine-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
      </Link>
      
      <div className="mb-2 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gold-500">{quiz.title}</h1>
        <span className="text-sm text-gray-300">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>
      
      <Progress value={progress} className="h-2 mb-6 bg-wine-800" />
      
      <Card className="bg-wine-900 border-gold-500 border-2">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <RadioGroup 
            value={selectedAnswers[currentQuestion.id]} 
            onValueChange={handleSelectAnswer}
            className="space-y-4"
          >
            {currentQuestion.options && currentQuestion.options.map((option) => (
              <div key={option} className="flex items-start space-x-3">
                <RadioGroupItem 
                  value={option} 
                  id={`option-${option}`} 
                  className="border-gold-500 text-gold-500"
                />
                <Label 
                  htmlFor={`option-${option}`} 
                  className="text-white font-medium cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        
        <CardFooter className="justify-end">
          <Button 
            onClick={handleNextQuestion}
            disabled={!hasSelectedAnswer}
            className="bg-gold-500 hover:bg-gold-600 text-wine-900"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Submit Quiz'
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizPage;