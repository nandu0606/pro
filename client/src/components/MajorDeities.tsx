import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";
import { Deity } from "@shared/schema";

const MajorDeities = () => {
  const { data: deities, isLoading, isError } = useQuery<Deity[]>({
    queryKey: ['/api/deities'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white ornate-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-eczar font-bold text-maroon mb-2">Major Deities</h2>
          <div className="w-24 h-1 bg-gold mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse mb-2"></div>
                <div className="h-3 w-16 bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-white ornate-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-eczar font-bold text-maroon mb-2">Major Deities</h2>
          <div className="w-24 h-1 bg-gold mb-8"></div>
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            Failed to load deities information. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white ornate-border">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <motion.h2 
            className="text-3xl font-eczar font-bold text-maroon mb-2"
            variants={fadeIn('up', 'tween', 0.1, 1)}
          >
            Major Deities
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gold mb-8"
            variants={fadeIn('up', 'tween', 0.2, 1)}
          ></motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {deities?.map((deity, index) => (
              <motion.div 
                key={deity.id} 
                className="text-center transform hover:scale-105 transition duration-300"
                variants={fadeIn('up', 'tween', 0.2 + index * 0.05, 1)}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gold mb-4">
                  <img src={deity.imageUrl} alt={deity.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-eczar font-semibold text-richbrown text-lg">{deity.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{deity.title}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-10"
            variants={fadeIn('up', 'tween', 0.5, 1)}
          >
            <button className="px-6 py-3 bg-richbrown text-white rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition duration-300">
              View All Deities
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MajorDeities;
