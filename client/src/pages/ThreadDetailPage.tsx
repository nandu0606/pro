import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DiscussionThread, DiscussionComment } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ThreadDetailPage = () => {
  const params = useParams<{ id: string }>();
  const threadId = parseInt(params.id);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  // Get thread details
  const { data: thread, isLoading: threadLoading } = useQuery<DiscussionThread>({
    queryKey: ['/api/threads', threadId],
    enabled: !!threadId,
  });

  // Get comments for this thread
  const { data: comments, isLoading: commentsLoading } = useQuery<DiscussionComment[]>({
    queryKey: ['/api/threads', threadId, 'comments'],
    enabled: !!threadId,
  });

  const createCommentMutation = useMutation({
    mutationFn: async (newComment: { content: string; threadId: number; userId: number }) => {
      return apiRequest('/api/comments', { method: 'POST', body: newComment });
    },
    onSuccess: () => {
      // Reset form and invalidate cache
      setComment("");
      queryClient.invalidateQueries({ queryKey: ['/api/threads', threadId, 'comments'] });
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const isLoading = threadLoading || commentsLoading;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    createCommentMutation.mutate({
      content: comment,
      threadId: threadId,
      userId: 1, // Using a default user ID for now
    });
  };

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-cosmic-blue/30 rounded-lg w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-cosmic-blue/30 rounded-lg w-1/2 mx-auto mb-10"></div>
            <div className="bg-cosmic-blue/30 rounded-lg p-6 mb-8 h-40"></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-4 bg-cosmic-blue/30 rounded-lg p-6 h-24"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="mb-6"
              variants={fadeIn('up', 'tween', 0.1, 1)}
            >
              <Link href={`/forums/${thread?.forumId}`}>
                <a className="text-gold/60 hover:text-gold text-sm mb-4 inline-block transition-colors">
                  ← Back to Forum
                </a>
              </Link>
            </motion.div>

            <motion.div
              className="bg-cosmic-blue/30 rounded-lg border border-gold/20 p-6 mb-8"
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gold">{thread?.title}</h1>
                {thread?.isPinned && (
                  <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded">Pinned</span>
                )}
              </div>
              
              <div className="flex items-center mb-6">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/assets/image10.jpg" alt="User" />
                  <AvatarFallback className="bg-gold/20 text-gold">U</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white/80 text-sm">Posted by <span className="text-gold">User</span></div>
                  <div className="text-white/60 text-xs">
                    {thread?.createdAt && formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
              
              <div className="text-white/90 leading-relaxed mb-4 whitespace-pre-line">
                {thread?.content}
              </div>
              
              <div className="flex justify-between items-center text-sm text-white/60 mt-6 pt-4 border-t border-white/10">
                <span>{thread?.viewCount} views</span>
                <span>{comments?.length || 0} comments</span>
              </div>
            </motion.div>
            
            <motion.div
              className="mb-8"
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              <h2 className="text-xl font-bold text-gold mb-4">Comments</h2>
              
              {comments?.length === 0 ? (
                <div className="text-center py-8 bg-cosmic-blue/20 rounded-lg border border-gold/10">
                  <p className="text-white/60 mb-2">No comments yet</p>
                  <p className="text-gold/70 text-sm">Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments?.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 0.8)}
                      className="bg-cosmic-blue/20 rounded-lg border border-gold/10 p-4"
                    >
                      <div className="flex items-center mb-3">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/assets/image11.jpg" alt="Commenter" />
                          <AvatarFallback className="bg-gold/20 text-gold">U</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-gold text-sm">User</div>
                          <div className="text-white/60 text-xs">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm whitespace-pre-line">{comment.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="bg-cosmic-blue/30 rounded-lg border border-gold/20 p-6"
            >
              <h3 className="text-lg font-bold text-gold mb-4">Add Your Comment</h3>
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts on this topic..."
                  className="mb-4 bg-cosmic-black/50 border-gold/20 focus:border-gold/40 min-h-[120px]"
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={createCommentMutation.isPending || !comment.trim()}
                    className="bg-gold hover:bg-gold/80 text-cosmic-black font-medium"
                  >
                    {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ThreadDetailPage;