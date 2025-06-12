import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, UserPreference, UserProgress, Story, Achievement } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";

interface UserPointsData {
  points: number;
  categories?: Record<string, number>;
}

interface BookmarkData {
  id: number;
  storyId: number;
  createdAt: string;
}

const UserProfilePage = () => {
  // Using a default user ID for now
  const userId = 1;

  // Get user details
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['/api/users', userId],
  });

  // Get user preferences
  const { data: preferences, isLoading: preferencesLoading } = useQuery<UserPreference>({
    queryKey: ['/api/users', userId, 'preferences'],
  });

  // Get user progress
  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress[]>({
    queryKey: ['/api/users', userId, 'progress'],
  });

  // Get bookmarks
  const { data: bookmarks, isLoading: bookmarksLoading } = useQuery<BookmarkData[]>({
    queryKey: ['/api/users', userId, 'bookmarks'],
  });

  // Get stories (to match with progress)
  const { data: stories, isLoading: storiesLoading } = useQuery<Story[]>({
    queryKey: ['/api/stories'],
  });

  // Get achievements
  const { data: achievements, isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
  });

  // Get user points
  const { data: userPoints, isLoading: userPointsLoading } = useQuery<UserPointsData>({
    queryKey: ['/api/users', userId, 'points'],
  });

  const isLoading = userLoading || preferencesLoading || progressLoading || 
    bookmarksLoading || storiesLoading || achievementsLoading || userPointsLoading;

  // Find story title by ID
  const getStoryTitle = (storyId: number) => {
    return stories?.find(s => s.id === storyId)?.title || "Unknown Story";
  };

  // Calculate overall profile completion
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 0;

    if (stories && progress) {
      total = stories.length;
      completed = progress.length;
    }

    return total > 0 ? Math.floor((completed / total) * 100) : 0;
  };

  // Get recent progress items
  const getRecentProgress = () => {
    if (!progress) return [];
    
    return [...progress]
      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
      .slice(0, 5);
  };

  // Get completed achievements
  const getCompletedAchievements = () => {
    if (!achievements || !userPoints) return [];
    
    return achievements.filter(a => (userPoints.points || 0) >= a.requiredPoints);
  };

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="h-32 w-32 rounded-full bg-cosmic-blue/30"></div>
              <div className="space-y-4 flex-grow">
                <div className="h-8 bg-cosmic-blue/30 rounded-lg w-1/2"></div>
                <div className="h-4 bg-cosmic-blue/30 rounded-lg w-1/4"></div>
                <div className="h-20 bg-cosmic-blue/30 rounded-lg w-full"></div>
              </div>
            </div>
            <div className="h-10 bg-cosmic-blue/30 rounded-lg w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-40 bg-cosmic-blue/30 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Profile Header */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.1, 1)}
              className="bg-cosmic-blue/30 rounded-lg border border-gold/20 p-6 mb-8 flex flex-col md:flex-row gap-6"
            >
              <div className="flex justify-center">
                <Avatar className="h-32 w-32 border-2 border-gold/50">
                  <AvatarImage src="/assets/image10.jpg" alt={user?.username || "User"} />
                  <AvatarFallback className="bg-gold/20 text-gold text-4xl">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-gold mb-1 text-center md:text-left">
                  {user?.username || "User"}
                </h1>
                <p className="text-white/60 mb-4 text-center md:text-left">
                  Member since {new Date().toLocaleDateString()}
                </p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Mythological Journey</span>
                    <span className="text-gold">{calculateProfileCompletion()}% Complete</span>
                  </div>
                  <Progress
                    value={calculateProfileCompletion()}
                    className="h-2 bg-cosmic-black/50"
                    indicatorClassName="bg-gold"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-cosmic-black/50 rounded-lg border border-gold/30 px-3 py-2 text-center">
                    <p className="text-xs text-white/70">Stories Read</p>
                    <p className="text-xl font-bold text-gold">{progress?.length || 0}</p>
                  </div>
                  <div className="bg-cosmic-black/50 rounded-lg border border-gold/30 px-3 py-2 text-center">
                    <p className="text-xs text-white/70">Achievements</p>
                    <p className="text-xl font-bold text-gold">{getCompletedAchievements().length}</p>
                  </div>
                  <div className="bg-cosmic-black/50 rounded-lg border border-gold/30 px-3 py-2 text-center">
                    <p className="text-xs text-white/70">Bookmarks</p>
                    <p className="text-xl font-bold text-gold">{bookmarks?.length || 0}</p>
                  </div>
                  <div className="bg-cosmic-black/50 rounded-lg border border-gold/30 px-3 py-2 text-center">
                    <p className="text-xs text-white/70">Total Points</p>
                    <p className="text-xl font-bold text-gold">{userPoints?.points || 0}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Profile Tabs */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="grid grid-cols-3 w-full bg-cosmic-blue/20 border border-gold/20">
                  <TabsTrigger 
                    value="progress" 
                    className="data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                  >
                    Progress
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className="data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                  >
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookmarks" 
                    className="data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                  >
                    Bookmarks
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="mt-6">
                  <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-6">
                    <h2 className="text-xl font-bold text-gold mb-4">Recent Progress</h2>
                    
                    {!progress || progress.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-white/60">You haven't made any progress yet.</p>
                        <Link href="/">
                          <a className="text-gold hover:underline mt-2 inline-block">
                            Start exploring stories
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {getRecentProgress().map((item) => (
                          <div 
                            key={item.id}
                            className="flex justify-between items-center p-3 bg-cosmic-black/30 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors"
                          >
                            <div>
                              <h3 className="text-gold font-medium mb-1">
                                {getStoryTitle(item.storyId)}
                              </h3>
                              <p className="text-white/60 text-xs">
                                {item.progress}% complete • Updated {formatDistanceToNow(new Date(item.lastAccessedAt), { addSuffix: true })}
                              </p>
                            </div>
                            <Link href={`/story/${item.storyId}`}>
                              <a className="text-xs px-3 py-1 bg-gold/20 hover:bg-gold/30 text-gold rounded-full transition-colors">
                                Continue
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="mt-6">
                  <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-6">
                    <h2 className="text-xl font-bold text-gold mb-4">Your Achievements</h2>
                    
                    {getCompletedAchievements().length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-white/60">You haven't unlocked any achievements yet.</p>
                        <Link href="/achievements">
                          <a className="text-gold hover:underline mt-2 inline-block">
                            View all achievements
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getCompletedAchievements().map((achievement) => (
                          <div 
                            key={achievement.id}
                            className="flex bg-cosmic-black/30 rounded-lg border border-gold/30 overflow-hidden"
                          >
                            <div 
                              className="w-16 h-16 bg-cover bg-center flex-shrink-0"
                              style={{ backgroundImage: `url(${achievement.imageUrl})` }}
                            ></div>
                            <div className="p-3">
                              <h3 className="text-gold font-medium text-sm">{achievement.title}</h3>
                              <p className="text-white/70 text-xs">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 text-center">
                      <Link href="/achievements">
                        <a className="text-gold hover:underline text-sm">
                          View all achievements →
                        </a>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookmarks" className="mt-6">
                  <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-6">
                    <h2 className="text-xl font-bold text-gold mb-4">Your Bookmarks</h2>
                    
                    {!bookmarks || bookmarks.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-white/60">You haven't bookmarked any stories yet.</p>
                        <Link href="/">
                          <a className="text-gold hover:underline mt-2 inline-block">
                            Browse stories
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookmarks.map((bookmark) => (
                          <div 
                            key={bookmark.id}
                            className="flex justify-between items-center p-3 bg-cosmic-black/30 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors"
                          >
                            <div>
                              <h3 className="text-gold font-medium mb-1">
                                {getStoryTitle(bookmark.storyId)}
                              </h3>
                              <p className="text-white/60 text-xs">
                                Bookmarked {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            <Link href={`/story/${bookmark.storyId}`}>
                              <a className="text-xs px-3 py-1 bg-gold/20 hover:bg-gold/30 text-gold rounded-full transition-colors">
                                Read
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfilePage;