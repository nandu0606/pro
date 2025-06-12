import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";

const VRExperience = () => {
  return (
    <section className="py-16 bg-richbrown text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
            variants={fadeIn('right', 'tween', 0.2, 1)}
          >
            <span className="inline-block px-3 py-1 bg-gold text-richbrown text-xs rounded-full mb-3 font-medium">NEW FEATURE</span>
            <h2 className="text-3xl font-eczar font-bold mb-4">Experience Mythology in Virtual Reality</h2>
            <p className="text-cream mb-6">Step into the world of Indian mythology with our immersive VR experience. Witness the stories come to life, interact with deities, and explore ancient temples and battlefields in stunning detail.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-gold mt-1 mr-2"></i>
                <span>Explore legendary locations from Hindu mythology</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-gold mt-1 mr-2"></i>
                <span>Witness epic battles and divine interventions</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-gold mt-1 mr-2"></i>
                <span>Interactive storytelling with multiple perspectives</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-gold mt-1 mr-2"></i>
                <span>Compatible with major VR headsets</span>
              </li>
            </ul>
            <motion.button 
              className="px-6 py-3 bg-gold text-richbrown rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About VR
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            variants={fadeIn('left', 'tween', 0.2, 1)}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop" 
                alt="VR Experience" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-play text-richbrown text-xl"></i>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VRExperience;
