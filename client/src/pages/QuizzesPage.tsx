import QuizList from '../components/QuizList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '../lib/motion';
import { Container } from '@/components/ui/container';

const QuizzesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 0.5)}
          initial="hidden"
          animate="show"
          className="bg-wine-950 py-16 px-4"
        >
          <Container>
            <div className="text-center mb-10">
              <motion.h1 
                variants={fadeIn('up', 'tween', 0.3, 0.5)}
                className="text-4xl md:text-5xl font-bold text-gold-500 mb-4"
              >
                Mythology Quizzes
              </motion.h1>
              <motion.p 
                variants={fadeIn('up', 'tween', 0.4, 0.5)}
                className="text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Test your knowledge of Indian mythology with our interactive quizzes.
                Challenge yourself with questions about gods, epics, and ancient stories.
              </motion.p>
            </div>
            
            <QuizList />
          </Container>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizzesPage;