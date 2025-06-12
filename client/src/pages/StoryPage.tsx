import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoiceNarration from "@/components/VoiceNarration";
import { Story } from "@shared/schema";

// Import the images directly
import image1 from "@assets/image1.jpg";
import image2 from "@assets/image2.jpg";
import image3 from "@assets/image3.jpg";
import image4 from "@assets/image4.jpg";
import image5 from "@assets/image5.jpg";
import image6 from "@assets/image6.jpg";
import image7 from "@assets/image7.jpg";
import image8 from "@assets/image8.jpg";
import image9 from "@assets/image9.jpg";
import image10 from "@assets/image10.jpg";
import image11 from "@assets/image11.jpg";
import image12 from "@assets/image12.jpg";

const StoryPage = () => {
  const [, params] = useRoute<{ id: string }>("/story/:id");
  const storyId = parseInt(params?.id || "0");

  const { data: story, isLoading, isError } = useQuery<Story>({
    queryKey: ['/api/stories', storyId],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse bg-cosmic-blue border border-gold/20 h-8 w-1/4 mb-4"></div>
          <div className="animate-pulse bg-cosmic-blue border border-gold/20 h-64 w-full mb-6"></div>
          <div className="animate-pulse bg-cosmic-blue border border-gold/20 h-4 w-full mb-2"></div>
          <div className="animate-pulse bg-cosmic-blue border border-gold/20 h-4 w-full mb-2"></div>
          <div className="animate-pulse bg-cosmic-blue border border-gold/20 h-4 w-3/4 mb-6"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="min-h-screen bg-cosmic-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl text-gold mb-4">Story Not Found</h2>
          <p className="text-white/70 mb-6">Sorry, we couldn't find the story you're looking for.</p>
          <Link href="/" className="inline-block bg-cosmic-blue text-gold px-6 py-2 rounded-sm border border-gold">
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Create an array of all imported images
  const imageArray = [
    image1, image2, image3, image4, image5, image6,
    image7, image8, image9, image10, image11, image12
  ];
  
  // Get the image based on story ID (mod 12 to cycle through images)
  const imageSource = imageArray[(story.id - 1) % 12];

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <Header />

      <motion.div 
        className="relative h-[40vh] mb-8"
        initial="hidden"
        whileInView="show"
      >
        {/* Hero Image with floating animation */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-float" 
          style={{ backgroundImage: `url(${imageSource})`, transformOrigin: 'center center' }}
        >
          <div className="absolute inset-0 bg-cosmic-blue-deep bg-opacity-70"></div>
        </div>
        
        {/* Title and Category */}
        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-block bg-cosmic-blue border-l-2 border-gold text-gold px-4 py-1 text-sm uppercase tracking-wider mb-4"
              variants={fadeIn('up', 'tween', 0.1, 1)}
            >
              {story.category}
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gold animate-pulse-glow"
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              {story.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-cosmic-blue-deep bg-opacity-80 p-6 mb-8 border-l-4 border-gold rounded-r-sm shadow-lg"
            variants={fadeIn('up', 'tween', 0.3, 1)}
            initial="hidden"
            whileInView="show"
          >
            <p className="text-gold italic text-lg">{story.summary}</p>
          </motion.div>
          
          {/* Voice Narration Component */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.35, 1)}
            initial="hidden"
            whileInView="show"
          >
            <VoiceNarration 
              audioSrc="/audio/sample-narration.mp3" 
              storyTitle={story.title} 
              narrator="Divine Storyteller"
            />
          </motion.div>
          
          <motion.div
            className="prose prose-lg prose-invert prose-headings:text-gold prose-strong:text-gold max-w-none"
            variants={fadeIn('up', 'tween', 0.4, 1)}
            initial="hidden"
            whileInView="show"
          >
            {story.content && story.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 border-t border-gold/30 pt-6"
            variants={fadeIn('up', 'tween', 0.5, 1)}
            initial="hidden"
            whileInView="show"
          >
            <h3 className="text-2xl text-gold mb-4 animate-pulse-glow">Explore More Stories</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="bg-cosmic-blue hover:bg-cosmic-blue-light text-gold px-4 py-2 transition border border-gold/40 rounded-sm">
                All Stories
              </Link>
              <Link href={`/?category=${encodeURIComponent(story.category)}`} className="bg-cosmic-blue-deep hover:bg-cosmic-blue text-gold px-4 py-2 transition border border-gold rounded-sm">
                More {story.category} Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoryPage;