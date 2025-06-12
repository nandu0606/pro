import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";
import { Epic } from "@shared/schema";

const EpicsSection = () => {
  const { data: epics, isLoading, isError } = useQuery<Epic[]>({
    queryKey: ['/api/epics'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-eczar font-bold text-maroon mb-2">Epic Sagas</h2>
          <div className="w-24 h-1 bg-gold mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-xl h-[400px] animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 w-40 bg-gray-200 mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 mb-2"></div>
                  <div className="h-4 w-4/5 bg-gray-200 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4].map((tag) => (
                      <div key={tag} className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-eczar font-bold text-maroon mb-2">Epic Sagas</h2>
          <div className="w-24 h-1 bg-gold mb-8"></div>
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            Failed to load epic sagas. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream">
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
            Epic Sagas
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gold mb-8"
            variants={fadeIn('up', 'tween', 0.2, 1)}
          ></motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {epics?.map((epic, index) => (
              <motion.div 
                key={epic.id} 
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-2xl"
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 1)}
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={epic.imageUrl} 
                    alt={epic.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-eczar font-bold ${epic.name === 'Ramayana' ? 'text-saffron' : 'text-royalblue'} mb-2`}>
                    {epic.name}
                  </h3>
                  <p className="text-gray-700 mb-4">{epic.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {epic.tags?.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className={`px-3 py-1 ${epic.name === 'Ramayana' ? 'bg-saffron/20 text-saffron' : 'bg-royalblue/20 text-royalblue'} text-xs rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-richbrown text-white rounded hover:bg-opacity-90 transition text-sm font-medium">
                    Explore {epic.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EpicsSection;
