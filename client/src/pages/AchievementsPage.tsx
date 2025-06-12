import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Achievement } from "@shared/schema";

const AchievementsPage = () => {
  // Get achievements
  const { data: achievements, isLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
  });

  // Get user points
  const { data: userPoints, isLoading: userPointsLoading } = useQuery({
    queryKey: ['/api/users', 1, 'points'], // Using a default user ID for now
  });

  const isPageLoading = isLoading || userPointsLoading;

  // Group achievements by category
  const getCategoryAchievements = (category: string) => {
    return achievements?.filter(a => a.category === category) || [];
  };

  // Check if achievement is completed
  const isAchievementCompleted = (achievement: Achievement) => {
    if (!userPoints) return false;
    return userPoints.points >= achievement.requiredPoints;
  };

  // Calculate achievement progress
  const getAchievementProgress = (achievement: Achievement) => {
    if (!userPoints) return 0;
    const progress = (userPoints.points / achievement.requiredPoints) * 100;
    return Math.min(progress, 100);
  };

  // Get all available categories
  const getCategories = () => {
    if (!achievements) return [];
    const categories = achievements.map(a => a.category);
    return [...new Set(categories)];
  };

  // Count completed achievements
  const countCompletedAchievements = () => {
    if (!achievements || !userPoints) return 0;
    return achievements.filter(a => userPoints.points >= a.requiredPoints).length;
  };

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
            <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">Mythological Achievements</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Embark on your spiritual journey through ancient Indian mythology. 
              Unlock achievements as you explore stories, complete quizzes, and engage with the community.
            </p>
            
            {!isPageLoading && (
              <div className="mt-6 max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">Your Progress</span>
                  <span className="text-gold">
                    {countCompletedAchievements()} / {achievements?.length || 0} Achievements
                  </span>
                </div>
                <Progress
                  value={achievements?.length ? (countCompletedAchievements() / achievements.length) * 100 : 0}
                  className="h-2 bg-cosmic-black/50"
                  indicatorClassName="bg-gold"
                />
              </div>
            )}
          </motion.div>
          
          {isPageLoading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-16 bg-cosmic-blue/30 rounded-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-48 bg-cosmic-blue/30 rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              <Tabs defaultValue={getCategories()[0] || ""} className="w-full">
                <TabsList className="bg-cosmic-blue/20 border border-gold/20 overflow-x-auto flex flex-nowrap max-w-full w-fit mx-auto px-1 mb-6">
                  {getCategories().map((category) => (
                    <TabsTrigger 
                      key={category}
                      value={category} 
                      className="whitespace-nowrap data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {getCategories().map((category) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryAchievements(category).map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 0.8)}
                          className={`bg-cosmic-blue/20 rounded-lg border ${
                            isAchievementCompleted(achievement) 
                              ? 'border-gold/50' 
                              : 'border-gold/10'
                          } p-6 flex flex-col transition-colors relative`}
                        >
                          {isAchievementCompleted(achievement) && (
                            <div className="absolute top-3 right-3 bg-gold/20 text-gold text-xs px-2 py-1 rounded">
                              Completed
                            </div>
                          )}
                          
                          <div 
                            className={`w-16 h-16 rounded-full mx-auto mb-4 bg-cover bg-center ${
                              achievement.isSecret && !isAchievementCompleted(achievement) 
                                ? 'bg-cosmic-blue/50 flex items-center justify-center' 
                                : ''
                            }`}
                            style={
                              achievement.isSecret && !isAchievementCompleted(achievement)
                                ? {}
                                : { backgroundImage: `url(${achievement.imageUrl})` }
                            }
                          >
                            {achievement.isSecret && !isAchievementCompleted(achievement) && (
                              <span className="text-gold text-2xl">?</span>
                            )}
                          </div>
                          
                          <h3 className={`text-lg font-bold text-center mb-2 ${
                            isAchievementCompleted(achievement) 
                              ? 'text-gold' 
                              : 'text-white/80'
                          }`}>
                            {achievement.isSecret && !isAchievementCompleted(achievement)
                              ? "Secret Achievement"
                              : achievement.title
                            }
                          </h3>
                          
                          <p className="text-white/60 text-sm text-center flex-grow mb-4">
                            {achievement.isSecret && !isAchievementCompleted(achievement)
                              ? "Continue your mythological journey to unlock this secret achievement."
                              : achievement.description
                            }
                          </p>
                          
                          <div className="mt-auto">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Progress</span>
                              <span className={isAchievementCompleted(achievement) ? 'text-gold' : 'text-white/60'}>
                                {userPoints?.points || 0} / {achievement.requiredPoints} points
                              </span>
                            </div>
                            <Progress
                              value={getAchievementProgress(achievement)}
                              className="h-1.5 bg-cosmic-black/50"
                              indicatorClassName={isAchievementCompleted(achievement) ? 'bg-gold' : 'bg-gold/40'}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AchievementsPage;