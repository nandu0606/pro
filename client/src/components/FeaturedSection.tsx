import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";
import StoryCard from "./StoryCard";
import { Story } from "@shared/schema";

const FeaturedSection = () => {
  const { data: stories, isLoading, isError } = useQuery<Story[]>({
    queryKey: ['/api/stories/featured'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-eczar font-bold text-maroon mb-2">Featured Stories</h2>
          <div className="w-24 h-1 bg-gold mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden h-[400px] bg-gray-200 animate-pulse"></div>
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
          <h2 className="text-3xl font-eczar font-bold text-maroon mb-2">Featured Stories</h2>
          <div className="w-24 h-1 bg-gold mb-8"></div>
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            Failed to load featured stories. Please try again later.
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
            Featured Stories
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gold mb-8"
            variants={fadeIn('up', 'tween', 0.2, 1)}
          ></motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories?.map((story, index) => (
              <motion.div 
                key={story.id}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 1)}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
