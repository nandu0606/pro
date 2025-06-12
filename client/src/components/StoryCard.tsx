import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
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

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard = ({ story, index }: StoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Create an array of all imported images
  const imageArray = [
    image1, image2, image3, image4, image5, image6,
    image7, image8, image9, image10, image11, image12
  ];
  
  // Use the image based on index (mod 12 to cycle through images)
  const imageSource = imageArray[index % 12];
  
  return (
    <motion.div 
      className="story-card overflow-hidden h-[250px] cursor-pointer relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "tween", duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/story/${story.id}`}>
        <div className="w-full h-full overflow-hidden">
          <img 
            src={imageSource}
            alt={story.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Dark Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isHovered ? 0.15 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Golden Border on Hover */}
          <motion.div 
            className="absolute inset-0 border-3 border-lightGold opacity-0 pointer-events-none shadow-[inset_0_0_15px_rgba(212,175,55,0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Title Bar */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-cosmic-blue-deep bg-opacity-95 text-center p-2 border-t border-gold/30"
            animate={{ 
              height: isHovered ? "auto" : "40px",
              padding: isHovered ? "12px" : "8px" 
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-gold font-bold uppercase tracking-wider text-sm transition-all duration-300 animate-pulse-glow">
              {story.title}
            </h3>
            
            {/* Summary that appears on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0
              }}
              transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
              className="overflow-hidden"
            >
              <p className="text-white/90 text-xs mt-2 line-clamp-3">{story.summary}</p>
              <div className="bg-cosmic-blue px-2 py-1 inline-block mt-2 border-l-2 border-gold">
                <span className="text-gold text-xs uppercase tracking-wide font-semibold">{story.category}</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* "Read More" text that appears on hover */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cosmic-blue border border-gold text-gold px-5 py-2 rounded-sm uppercase text-xs font-bold tracking-wider shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            Read Story
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;
