import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596825205280-69ecb7ad3c3a?w=1600&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-eczar font-bold text-white mb-4 hero-text-shadow"
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          animate="show"
        >
          Discover Ancient Indian Mythology
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-cream font-poppins max-w-2xl mx-auto hero-text-shadow"
          variants={fadeIn('up', 'tween', 0.4, 1)}
          initial="hidden"
          animate="show"
        >
          Embark on a journey through timeless stories of gods, demons, and heroes that have shaped Indian culture.
        </motion.p>
        <motion.div 
          className="mt-8"
          variants={fadeIn('up', 'tween', 0.6, 1)}
          initial="hidden"
          animate="show"
        >
          <button className="px-8 py-3 bg-saffron text-white rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition duration-300 mr-4">
            Explore Stories
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-cream text-cream rounded-lg font-medium hover:bg-white hover:bg-opacity-20 transition duration-300">
            Experience in VR
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
