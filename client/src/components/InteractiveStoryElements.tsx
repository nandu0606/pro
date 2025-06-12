import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface StoryElement {
  id: number;
  elementName: string;
  description: string;
  imageUrl?: string;
  position: { x: number; y: number; width: number; height: number };
}

interface InteractiveStoryElementsProps {
  storyId: number;
  imageUrl: string;
  elements?: StoryElement[];
}

const InteractiveStoryElements = ({ storyId, imageUrl, elements = [] }: InteractiveStoryElementsProps) => {
  const [selectedElement, setSelectedElement] = useState<StoryElement | null>(null);

  // Sample elements if none are provided
  const demoElements: StoryElement[] = elements.length > 0 ? elements : [
    {
      id: 1,
      elementName: "Lord Vishnu",
      description: "The preserver deity, shown here in his cosmic form.",
      imageUrl: "/images/image2.jpg",
      position: { x: 20, y: 20, width: 15, height: 15 }
    },
    {
      id: 2,
      elementName: "Mount Mandara",
      description: "The mountain used as a churning rod in Samudra Manthan.",
      position: { x: 50, y: 40, width: 20, height: 20 }
    },
    {
      id: 3,
      elementName: "Cosmic Ocean",
      description: "The primordial ocean of milk (Kshira Sagara) that was churned.",
      position: { x: 70, y: 70, width: 25, height: 15 }
    }
  ];

  const displayElements = elements.length > 0 ? elements : demoElements;

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      {/* Main image */}
      <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 bg-cosmic-black bg-opacity-20"></div>
        
        {/* Interactive hotspots */}
        {displayElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute cursor-pointer"
            style={{
              left: `${element.position.x}%`,
              top: `${element.position.y}%`,
              width: `${element.position.width}%`,
              height: `${element.position.height}%`,
            }}
            initial={{ opacity: 0.6 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            onClick={() => setSelectedElement(element)}
          >
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-gold animate-pulse-glow"></div>
              <motion.div 
                className="bg-cosmic-blue-deep bg-opacity-80 rounded-full p-2"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Info className="w-5 h-5 text-gold" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup information */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            className="absolute inset-0 bg-cosmic-black bg-opacity-80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedElement(null)}
          >
            <motion.div
              className="bg-cosmic-blue border border-gold rounded-lg p-6 max-w-xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-gold text-2xl font-semibold mb-2">{selectedElement.elementName}</h3>
              
              {selectedElement.imageUrl && (
                <div className="mb-4 overflow-hidden rounded-md">
                  <img 
                    src={selectedElement.imageUrl} 
                    alt={selectedElement.elementName} 
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
              )}
              
              <p className="text-white/90 leading-relaxed">{selectedElement.description}</p>
              
              <button
                className="mt-4 bg-cosmic-blue-light hover:bg-cosmic-blue text-gold border border-gold/50 px-4 py-2 rounded-sm"
                onClick={() => setSelectedElement(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveStoryElements;