import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Quiz } from "@shared/schema";
import { motion } from 'framer-motion';

interface QuizCardProps {
  quiz: Quiz;
  onClick: (quizId: number) => void;
}

const QuizCard = ({ quiz, onClick }: QuizCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500 hover:bg-green-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden border-2 border-gold-500 bg-wine-900 text-white shadow-gold hover:shadow-xl transition-all duration-300">
        <div 
          className="h-48 overflow-hidden relative" 
          style={{ 
            backgroundImage: `url(${quiz.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className={`absolute inset-0 bg-black ${isHovered ? 'bg-opacity-30' : 'bg-opacity-50'} transition-all duration-300`}></div>
          <Badge className={`absolute top-3 right-3 ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </Badge>
        </div>
        
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xl text-gold-500 truncate">{quiz.title}</CardTitle>
          <CardDescription className="text-gray-300 mt-1">{quiz.category}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 text-sm text-gray-300">
          <p className="line-clamp-3">{quiz.description}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Button 
            variant="secondary" 
            onClick={() => onClick(quiz.id)}
            className="bg-gold-500 hover:bg-gold-600 text-wine-900 font-semibold px-4 py-1"
          >
            Take Quiz
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizCard;