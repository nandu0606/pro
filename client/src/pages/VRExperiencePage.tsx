import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import the attached deity images
import krishnaImage from "@assets/01db9f1e-426a-4a75-b533-51ba0951ddb5.jpg";
import ganeshImage from "@assets/3ea42a6c-3c5d-4ccc-9eb0-9ffc23e3f763.jpg";
import shivImage from "@assets/59a2a053-8bd3-4925-b255-15e3a16ea3ff.jpg";
import lordImage from "@assets/738543a0-86af-4718-b928-f4f31240f4ca.jpg";
import vishwaroopImage from "@assets/7659eb81-a723-47b0-9f29-fdd172282779.jpg";
import lordKrishnaImage from "@assets/c8093efb-b239-42b5-9523-ec6a9fd4c2f7.jpg";

// Let's use the numbered images for more reliable paths
import ganpatiBappaImage from "@assets/image1.jpg";
import pramodHedgeImage from "@assets/image2.jpg";
import kashiImage from "@assets/image3.jpg";

interface VRScene {
  id: number;
  name: string;
  deity: string;
  description: string;
  imageUrl: string;
  details: string;
}

const VRExperiencePage = () => {
  const [activeScene, setActiveScene] = useState<VRScene | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const vrScenes: VRScene[] = [
    {
      id: 1,
      name: "Krishna's Divine Form",
      deity: "Lord Krishna",
      description: "Experience the divine cosmic form of Lord Krishna as he revealed to Arjuna.",
      imageUrl: krishnaImage,
      details: "This immersive VR experience takes you into the Mahabharata's most profound moment - when Lord Krishna reveals his Vishwaroop (Universal Form) to Arjuna on the battlefield of Kurukshetra. Witness the cosmic vision that changed Arjuna's perspective forever."
    },
    {
      id: 2,
      name: "Ganesh Chaturthi",
      deity: "Lord Ganesha",
      description: "Join the vibrant celebrations of Ganesh Chaturthi in a spiritual VR journey.",
      imageUrl: ganeshImage,
      details: "Experience the joy and devotion of Ganesh Chaturthi celebrations in this interactive VR journey. Walk through beautifully decorated pandals, participate in aarti ceremonies, and learn about the significance of this beloved festival honoring the elephant-headed deity."
    },
    {
      id: 3,
      name: "Shiva's Cosmic Dance",
      deity: "Lord Shiva",
      description: "Witness the mesmerizing Tandava dance of Lord Shiva in virtual reality.",
      imageUrl: shivImage,
      details: "Enter the cosmic realm where Lord Shiva performs his Tandava - the celestial dance of creation and destruction. Feel the rhythmic energy as the universe pulsates with each movement, witnessing the primal forces that shape existence itself."
    },
    {
      id: 4,
      name: "Kashi Vishwanath",
      deity: "Lord Shiva",
      description: "Walk through the sacred lanes of Varanasi and visit the ancient Kashi Vishwanath temple.",
      imageUrl: kashiImage,
      details: "Journey through the spiritual heart of India in this authentic VR experience of Kashi (Varanasi). Navigate the ancient ghats along the sacred Ganges, witness the evening aarti, and step inside the revered Kashi Vishwanath temple dedicated to Lord Shiva."
    },
    {
      id: 5,
      name: "Krishna's Teachings",
      deity: "Lord Krishna",
      description: "Listen to the Bhagavad Gita as spoken by Lord Krishna in an immersive setting.",
      imageUrl: lordKrishnaImage,
      details: "This meditative VR experience places you on the battlefield of Kurukshetra as a silent observer to the profound conversation between Krishna and Arjuna. Listen to the timeless wisdom of the Bhagavad Gita in a deeply immersive environment with spatial audio."
    },
    {
      id: 6,
      name: "Vishwaroop Darshan",
      deity: "Lord Krishna",
      description: "Witness the awe-inspiring cosmic form of the divine as described in ancient texts.",
      imageUrl: vishwaroopImage,
      details: "This advanced VR experience attempts to visualize the indescribable - the Vishwaroop or Universal Form that contains all existences and non-existences. Based on descriptions from the Bhagavad Gita, this experience creates a profound sense of cosmic awareness."
    }
  ];

  const handleSceneClick = (scene: VRScene) => {
    setActiveScene(scene);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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
            <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">Virtual Reality Experiences</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Immerse yourself in the divine realms of Indian mythology through our cutting-edge VR experiences. 
              Witness the cosmic forms of deities and visit sacred places in breathtaking detail.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* VR Scenes List */}
            <motion.div
              variants={fadeIn('right', 'tween', 0.2, 1)}
              className="col-span-1"
            >
              <h2 className="text-xl font-bold text-gold mb-4">Available Experiences</h2>
              <div className="space-y-4">
                {vrScenes.map((scene) => (
                  <div 
                    key={scene.id}
                    className={`bg-cosmic-blue/30 rounded-lg border p-4 cursor-pointer transition-colors ${
                      activeScene?.id === scene.id 
                        ? 'border-gold' 
                        : 'border-gold/20 hover:border-gold/40'
                    }`}
                    onClick={() => handleSceneClick(scene)}
                  >
                    <h3 className="text-gold font-bold text-lg">{scene.name}</h3>
                    <p className="text-white/70 text-sm mb-2">{scene.deity}</p>
                    <p className="text-white/90">{scene.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* VR Scene Display */}
            <motion.div
              variants={fadeIn('left', 'tween', 0.2, 1)}
              className="col-span-1 lg:col-span-2"
            >
              {activeScene ? (
                <div className="bg-cosmic-blue/20 rounded-lg border border-gold/30 overflow-hidden">
                  <div 
                    className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-cosmic-black' : ''}`}
                  >
                    <img 
                      src={activeScene.imageUrl} 
                      alt={activeScene.name}
                      className={`w-full object-cover ${isFullscreen ? 'h-screen' : 'h-[400px]'}`}
                    />
                    
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={toggleFullscreen}
                        className="bg-cosmic-black/50 border-gold/30 text-gold hover:bg-gold/20"
                      >
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-cosmic-black/50 border-gold/30 text-gold hover:bg-gold/20"
                      >
                        Launch VR
                      </Button>
                    </div>
                  </div>
                  
                  {!isFullscreen && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gold mb-2">{activeScene.name}</h2>
                      <p className="text-white/60 text-sm mb-4">Featuring {activeScene.deity}</p>
                      
                      <Tabs defaultValue="about" className="w-full">
                        <TabsList className="bg-cosmic-blue/20 border border-gold/20 w-full mb-4">
                          <TabsTrigger 
                            value="about" 
                            className="flex-1 data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                          >
                            About
                          </TabsTrigger>
                          <TabsTrigger 
                            value="instructions" 
                            className="flex-1 data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                          >
                            Instructions
                          </TabsTrigger>
                          <TabsTrigger 
                            value="mythology" 
                            className="flex-1 data-[state=active]:bg-gold data-[state=active]:text-cosmic-black"
                          >
                            Mythology
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="about" className="mt-2">
                          <div className="text-white/90">
                            <p className="mb-4">{activeScene.details}</p>
                            <p>This VR experience is designed to be both educationally valuable and spiritually resonant, offering a new dimension to understanding Indian mythology.</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="instructions" className="mt-2">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="bg-gold/20 text-gold h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">1</div>
                              <p className="text-white/80">Put on your VR headset and ensure it's properly connected.</p>
                            </div>
                            <div className="flex items-start">
                              <div className="bg-gold/20 text-gold h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">2</div>
                              <p className="text-white/80">Launch the experience from your VR dashboard using the button above.</p>
                            </div>
                            <div className="flex items-start">
                              <div className="bg-gold/20 text-gold h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">3</div>
                              <p className="text-white/80">Use the hand controllers to navigate and interact with elements.</p>
                            </div>
                            <div className="flex items-start">
                              <div className="bg-gold/20 text-gold h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">4</div>
                              <p className="text-white/80">To engage with meditation modes, remain still and focus on your breathing.</p>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="mythology" className="mt-2">
                          <div className="text-white/90">
                            <p className="mb-3">The mythology depicted in this experience draws from authentic texts and traditions, including:</p>
                            <ul className="list-disc pl-5 space-y-2 text-white/80">
                              <li>Passages from the relevant Puranas and epics</li>
                              <li>Traditional artistic representations and iconography</li>
                              <li>Regional variations and interpretations</li>
                              <li>Scholarly insights into symbolism and meaning</li>
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="mt-6 flex justify-center">
                        <Button 
                          className="bg-gold hover:bg-gold/80 text-cosmic-black font-medium px-8"
                        >
                          Launch VR Experience
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-cosmic-blue/20 rounded-lg border border-gold/30 h-full flex items-center justify-center p-12 text-center">
                  <div>
                    <div className="mb-6">
                      <img 
                        src={lordImage} 
                        alt="VR Experience" 
                        className="w-48 h-48 object-cover mx-auto rounded-full border-4 border-gold/30"
                      />
                    </div>
                    <h3 className="text-gold text-xl font-bold mb-3">Select an Experience</h3>
                    <p className="text-white/70 max-w-md mx-auto">
                      Choose from our collection of immersive VR experiences to begin your spiritual journey through Indian mythology.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Additional Features */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gold mb-6 text-center">Featured Deities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-4 text-center hover:border-gold/50 transition-colors">
                <img 
                  src={ganpatiBappaImage} 
                  alt="Lord Ganesha" 
                  className="w-32 h-32 object-cover mx-auto rounded-full mb-3 border-2 border-gold/30"
                />
                <h3 className="text-gold font-bold">Lord Ganesha</h3>
                <p className="text-white/60 text-sm">The Remover of Obstacles</p>
              </div>
              
              <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-4 text-center hover:border-gold/50 transition-colors">
                <img 
                  src={lordKrishnaImage} 
                  alt="Lord Krishna" 
                  className="w-32 h-32 object-cover mx-auto rounded-full mb-3 border-2 border-gold/30"
                />
                <h3 className="text-gold font-bold">Lord Krishna</h3>
                <p className="text-white/60 text-sm">The Divine Flute Player</p>
              </div>
              
              <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-4 text-center hover:border-gold/50 transition-colors">
                <img 
                  src={shivImage} 
                  alt="Lord Shiva" 
                  className="w-32 h-32 object-cover mx-auto rounded-full mb-3 border-2 border-gold/30"
                />
                <h3 className="text-gold font-bold">Lord Shiva</h3>
                <p className="text-white/60 text-sm">The Cosmic Destroyer</p>
              </div>
              
              <div className="bg-cosmic-blue/20 rounded-lg border border-gold/20 p-4 text-center hover:border-gold/50 transition-colors">
                <img 
                  src={pramodHedgeImage} 
                  alt="Divine Goddess" 
                  className="w-32 h-32 object-cover mx-auto rounded-full mb-3 border-2 border-gold/30"
                />
                <h3 className="text-gold font-bold">Divine Goddess</h3>
                <p className="text-white/60 text-sm">The Universal Mother</p>
              </div>
            </div>
          </motion.div>
          
          {/* VR Hardware Requirements */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.4, 1)}
            className="mt-16 bg-cosmic-blue/20 rounded-lg border border-gold/20 p-6"
          >
            <h2 className="text-xl font-bold text-gold mb-4">VR Hardware Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cosmic-black/40 rounded-lg p-4 border border-gold/10">
                <h3 className="text-gold font-bold mb-2">Recommended VR Headsets</h3>
                <ul className="text-white/80 space-y-1.5">
                  <li>• Meta Quest 2 or newer</li>
                  <li>• Valve Index</li>
                  <li>• HTC Vive Pro</li>
                  <li>• PlayStation VR2</li>
                </ul>
              </div>
              
              <div className="bg-cosmic-black/40 rounded-lg p-4 border border-gold/10">
                <h3 className="text-gold font-bold mb-2">System Requirements</h3>
                <ul className="text-white/80 space-y-1.5">
                  <li>• GPU: NVIDIA GTX 1070 or better</li>
                  <li>• CPU: Intel i5-8500 or equivalent</li>
                  <li>• RAM: 16GB or more</li>
                  <li>• Storage: 10GB free space</li>
                </ul>
              </div>
              
              <div className="bg-cosmic-black/40 rounded-lg p-4 border border-gold/10">
                <h3 className="text-gold font-bold mb-2">Additional Equipment</h3>
                <ul className="text-white/80 space-y-1.5">
                  <li>• Headphones for spatial audio</li>
                  <li>• Room-scale play area: 2m × 2m</li>
                  <li>• Stable internet connection</li>
                  <li>• Optional: meditation cushion</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VRExperiencePage;