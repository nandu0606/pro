import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { type Quiz } from '@shared/schema';
import QuizCard from './QuizCard';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../lib/motion';

const QuizList = () => {
  const [_, setLocation] = useLocation();
  
  const { data: quizzes, isLoading, error } = useQuery<Quiz[]>({
    queryKey: ['/api/quizzes'],
  });
  
  const handleQuizClick = (quizId: number) => {
    setLocation(`/quiz/${quizId}`);
  };
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[400px]">
            <Skeleton className="w-full h-48 rounded-t-lg bg-wine-800" />
            <div className="p-4 space-y-3 bg-wine-900 rounded-b-lg">
              <Skeleton className="w-3/4 h-6 bg-wine-800" />
              <Skeleton className="w-1/2 h-4 bg-wine-800" />
              <Skeleton className="w-full h-16 bg-wine-800" />
              <Skeleton className="w-1/3 h-8 bg-wine-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-red-500 mb-4">Error Loading Quizzes</h3>
        <p className="text-gray-300">We couldn't load the quizzes at this time. Please try again later.</p>
      </div>
    );
  }
  
  // No quizzes available
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gold-500 mb-4">No Quizzes Available</h3>
        <p className="text-gray-300">Check back later for new mythology quizzes.</p>
      </div>
    );
  }
  
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="py-8"
    >
      <motion.h2 
        variants={fadeIn('up', 'tween', 0.2, 0.5)}
        className="text-3xl md:text-4xl font-bold text-gold-500 mb-8 text-center"
      >
        Test Your Mythology Knowledge
      </motion.h2>
      
      <motion.div 
        variants={fadeIn('up', 'tween', 0.4, 0.6)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10"
      >
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onClick={handleQuizClick}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default QuizList;