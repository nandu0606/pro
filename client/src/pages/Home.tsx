import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import WelcomeSection from "@/components/WelcomeSection";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import RecommendedStoriesSection from "@/components/RecommendedStoriesSection";
import MythologicalTimeline from "@/components/MythologicalTimeline";
import { Story } from "@shared/schema";
import StoryCard from "@/components/StoryCard";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Get all stories 
  const { data: stories, isLoading } = useQuery<Story[]>({
    queryKey: ['/api/stories'],
  });
  
  // Filter stories based on selected category
  const filteredStories = useMemo(() => {
    if (!stories) return [];
    if (selectedCategory === "all") return stories;
    
    return stories.filter(story => 
      story.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [stories, selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <Header />
      
      {/* Welcome Section with Background */}
      <WelcomeSection />
      
      {/* Search Section */}
      <SearchBar />
      
      {/* Stories Grid Section */}
      <section className="py-10 px-4 bg-cosmic-blue-deep">
        <div className="container mx-auto">
          <motion.div
            className="mb-8 text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gold uppercase tracking-wider mb-2 animate-pulse-glow"
              variants={fadeIn('up', 'tween', 0.1, 1)}
            >
              Explore Mythological Stories
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-gold/70 mx-auto mb-4"
              variants={fadeIn('up', 'tween', 0.2, 1)}
            ></motion.div>
            <motion.p 
              className="text-white/80 max-w-2xl mx-auto"
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              Delve into the rich tapestry of Indian mythology with our collection of timeless tales
            </motion.p>
          </motion.div>
          
          {/* Category Navigation */}
          <CategoryNav onCategoryChange={handleCategoryChange} />
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >              
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-[200px] bg-cosmic-blue animate-pulse border border-gold/20"></div>
                ))}
              </div>
            ) : filteredStories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {filteredStories.map((story, index) => (
                  <motion.div 
                    key={story.id}
                    variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 0.8)}
                  >
                    <StoryCard story={story} index={index} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p
                className="text-center text-lightGold/60 py-8 border border-gold/20 rounded p-8 bg-cosmic-blue"
                variants={fadeIn('up', 'tween', 0.3, 1)}
              >
                No stories found for this category.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Mythological Timeline Section */}
      <MythologicalTimeline />
      
      {/* Recommended Stories Section */}
      <RecommendedStoriesSection userId={1} /> {/* Using a default user ID for now */}
      
      <Footer />
    </div>
  );
};

export default Home;
