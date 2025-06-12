import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Forum {
  id: number;
  title: string;
  description: string;
  category: string;
  threadsCount?: number;
  lastActivity?: Date;
}

const ForumsPage = () => {
  const { data: forums, isLoading } = useQuery<Forum[]>({
    queryKey: ['/api/forums'],
  });

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeIn('up', 'tween', 0.1, 1)}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">Community Forums</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Join the discussion with fellow mythology enthusiasts. Share your insights, 
              ask questions, and deepen your understanding of Indian mythology.
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="animate-pulse space-y-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-32 bg-cosmic-blue/30 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {forums?.map((forum, index) => (
                <motion.div
                  key={forum.id}
                  variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 1)}
                  className="bg-cosmic-blue/30 rounded-lg border border-gold/20 p-6 hover:border-gold/40 transition-colors"
                >
                  <Link href={`/forums/${forum.id}`}>
                    <a className="block">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold text-gold mb-2">{forum.title}</h2>
                          <p className="text-white/70 mb-4">{forum.description}</p>
                          
                          <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
                            {forum.category}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white/60 text-sm">{forum.threadsCount || 0} discussions</p>
                          {forum.lastActivity && (
                            <p className="text-white/60 text-xs mt-1">
                              Last activity: {new Date(forum.lastActivity).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {forum.lastActivity && (
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src="/assets/image11.jpg" alt="User" />
                            <AvatarFallback className="bg-gold/20 text-gold">U</AvatarFallback>
                          </Avatar>
                          <span className="text-white/60 text-xs">
                            Latest post by <span className="text-gold">User</span>
                          </span>
                        </div>
                      )}
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForumsPage;