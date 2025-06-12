import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import backgroundImage from "@assets/background.jpg.jpg";

const WelcomeSection = () => {
  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Background Image with floating animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-float" 
        style={{ backgroundImage: `url(${backgroundImage})`, transformOrigin: 'center center' }}
      >
        <div className="absolute inset-0 bg-cosmic-black bg-opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <motion.div 
          className="max-w-2xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <motion.h2 
            className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wide"
            variants={fadeIn('up', 'tween', 0.1, 1)}
          >
            Sanatan Tales
          </motion.h2>
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-gold mb-4 uppercase tracking-wide animate-pulse-glow"
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Discover Ancient Indian Mythology
          </motion.h1>
          <motion.div 
            className="h-1 w-32 bg-gold/70 mb-6"
            variants={fadeIn('up', 'tween', 0.3, 1)}
          ></motion.div>
          <motion.p 
            className="text-base text-white mb-6 max-w-xl"
            variants={fadeIn('up', 'tween', 0.4, 1)}
          >
            Journey through the mystical tales of gods, heroes, and cosmic events that have shaped Indian culture and spirituality for thousands of years.
          </motion.p>
          <motion.div
            variants={fadeIn('up', 'tween', 0.5, 1)}
          >
            <button className="bg-cosmic-blue text-gold px-8 py-3 uppercase font-medium tracking-wide hover:bg-cosmic-blue-light transition border border-gold/30">
              Explore Stories
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;