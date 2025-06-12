import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import CreateThreadModal from "@/components/CreateThreadModal";

interface Forum {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface Thread {
  id: number;
  title: string;
  content: string;
  userId: number;
  forumId: number;
  createdAt: Date;
  isPinned: boolean;
  viewCount: number;
  commentCount: number;
}

const ForumThreadsPage = () => {
  const params = useParams<{ id: string }>();
  const forumId = parseInt(params.id);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Get forum details
  const { data: forum, isLoading: forumLoading } = useQuery<Forum>({
    queryKey: ['/api/forums', forumId],
    enabled: !!forumId,
  });

  // Get threads for this forum
  const { data: threads, isLoading: threadsLoading } = useQuery<Thread[]>({
    queryKey: ['/api/forums', forumId, 'threads'],
    enabled: !!forumId,
  });

  const isLoading = forumLoading || threadsLoading;

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-24 bg-cosmic-blue/30 rounded-lg mb-8"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-20 bg-cosmic-blue/30 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeIn('up', 'tween', 0.1, 1)}
              className="mb-4"
            >
              <Link href="/forums">
                <a className="text-gold/60 hover:text-gold text-sm mb-4 inline-block transition-colors">
                  ← Back to Forums
                </a>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="bg-cosmic-blue/30 rounded-lg border border-gold/20 p-6 mb-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gold mb-3">{forum?.title}</h1>
                  <p className="text-white/70 mb-4">{forum?.description}</p>
                  
                  <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
                    {forum?.category}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gold hover:bg-gold/80 text-cosmic-black font-medium"
                >
                  Create Thread
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="space-y-4"
            >
              {threads?.length === 0 ? (
                <div className="text-center py-16 bg-cosmic-blue/20 rounded-lg border border-gold/10">
                  <p className="text-white/60 mb-2">No discussions yet</p>
                  <p className="text-gold/70 text-sm mb-6">Be the first to start a conversation!</p>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gold hover:bg-gold/80 text-cosmic-black font-medium"
                  >
                    Create Thread
                  </Button>
                </div>
              ) : (
                <>
                  {/* Pinned threads */}
                  {threads.filter(thread => thread.isPinned).length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-white/60 text-sm font-medium mb-3">PINNED DISCUSSIONS</h2>
                      {threads.filter(thread => thread.isPinned).map((thread, index) => (
                        <motion.div
                          key={thread.id}
                          variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 0.8)}
                          className="bg-cosmic-blue/25 rounded-lg border border-gold/30 p-4 mb-3 hover:border-gold/50 transition-colors"
                        >
                          <Link href={`/threads/${thread.id}`}>
                            <a className="block">
                              <div className="flex justify-between">
                                <h3 className="text-gold font-bold flex items-center">
                                  <span className="mr-2">{thread.title}</span>
                                  <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded">Pinned</span>
                                </h3>
                                <div className="text-white/60 text-sm">
                                  {thread.viewCount} views • {thread.commentCount} comments
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-3">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src="/assets/image10.jpg" alt="User" />
                                  <AvatarFallback className="bg-gold/20 text-gold">U</AvatarFallback>
                                </Avatar>
                                <div className="text-white/70 text-xs">
                                  Posted {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                                </div>
                              </div>
                            </a>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Regular threads */}
                  <div>
                    {threads.filter(thread => !thread.isPinned).length > 0 && (
                      <h2 className="text-white/60 text-sm font-medium mb-3">DISCUSSIONS</h2>
                    )}
                    {threads.filter(thread => !thread.isPinned).map((thread, index) => (
                      <motion.div
                        key={thread.id}
                        variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 0.8)}
                        className="bg-cosmic-blue/20 rounded-lg border border-gold/10 p-4 mb-3 hover:border-gold/30 transition-colors"
                      >
                        <Link href={`/threads/${thread.id}`}>
                          <a className="block">
                            <h3 className="text-gold font-bold mb-1">{thread.title}</h3>
                            <p className="text-white/80 text-sm line-clamp-2 mb-3">
                              {thread.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src="/assets/image10.jpg" alt="User" />
                                  <AvatarFallback className="bg-gold/20 text-gold">U</AvatarFallback>
                                </Avatar>
                                <div className="text-white/70 text-xs">
                                  Posted {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                                </div>
                              </div>
                              <div className="text-white/60 text-xs">
                                {thread.viewCount} views • {thread.commentCount} comments
                              </div>
                            </div>
                          </a>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <CreateThreadModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        forumId={forumId} 
      />
      
      <Footer />
    </div>
  );
};

export default ForumThreadsPage;