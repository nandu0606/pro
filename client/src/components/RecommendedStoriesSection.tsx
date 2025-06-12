import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StoryCard from './StoryCard';
import { Story } from '@shared/schema';

interface RecommendedStoriesSectionProps {
  userId: number;
}

const RecommendedStoriesSection = ({ userId }: RecommendedStoriesSectionProps) => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<{
    preferredCategories: string[];
    preferenceTags: string[];
  }>({
    preferredCategories: [],
    preferenceTags: []
  });

  // Fetch user preferences
  const { data: userPreferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['/api/users', userId, 'preferences'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/${userId}/preferences`);
        if (!response.ok) {
          return null;
        }
        return await response.json();
      } catch (error) {
        return null;
      }
    },
    enabled: !!userId
  });

  // Fetch recommended stories
  const { data: recommendedStories, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['/api/users', userId, 'recommendations'],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/recommendations?limit=4`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      return await response.json();
    },
    enabled: !!userId
  });

  // Handle category selection for preferences
  const handleCategorySelect = (category: string) => {
    setPreferences(prev => {
      const categories = prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category];
      
      return {
        ...prev,
        preferredCategories: categories
      };
    });
  };

  // Save user preferences
  const savePreferences = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
      });

      if (response.ok) {
        toast({
          title: 'Preferences Saved',
          description: 'Your story preferences have been updated.'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to save preferences.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save preferences.',
        variant: 'destructive'
      });
    }
  };

  // Update preferences state when data is loaded
  useEffect(() => {
    if (userPreferences) {
      setPreferences({
        preferredCategories: userPreferences.preferredCategories || [],
        preferenceTags: userPreferences.preferenceTags || []
      });
    }
  }, [userPreferences]);

  // Available categories (hardcoded for now, could be fetched from API)
  const categories = [
    'Ganesh', 'Vishnu', 'Shiva', 'Devi', 'Krishna', 'Ramayana', 'Mahabharata'
  ];

  return (
    <div className="py-10 bg-slate-950">
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-primary uppercase tracking-wider text-center">Personalized Recommendations</h2>
        <div className="h-1 w-24 bg-primary/50 mx-auto mb-8"></div>
        
        {/* Preferences Section */}
        <Card className="mb-8 overflow-hidden border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Select Your Interests</h3>
            <p className="text-muted-foreground mb-4">
              Choose categories you're interested in to get personalized story recommendations.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={preferences.preferredCategories.includes(category) ? "default" : "outline"}
                  onClick={() => handleCategorySelect(category)}
                  className="mr-2 mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <Button onClick={savePreferences} className="mt-2">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
        
        {/* Recommended Stories Section */}
        <h3 className="text-2xl font-semibold mb-6 text-center">Stories You Might Like</h3>
        
        {recommendationsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="h-64 animate-pulse">
                <div className="h-full bg-slate-800"></div>
              </Card>
            ))}
          </div>
        ) : recommendedStories && recommendedStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedStories.map((story: Story, index: number) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              Select your interests above to get personalized recommendations.
            </p>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default RecommendedStoriesSection;