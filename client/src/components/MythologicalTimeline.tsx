import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/container';

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  year: string;
  imageUrl: string;
  era: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    title: "Creation of the Universe",
    description: "The cosmic egg (Hiranyagarbha) hatches to form the universe as we know it.",
    year: "Beginning of Time",
    imageUrl: "/images/timeline/creation.jpg",
    era: "Creation Era"
  },
  {
    id: 2,
    title: "Samudra Manthan (Churning of the Ocean)",
    description: "The devas (gods) and asuras (demons) churn the cosmic ocean to obtain amrita, the nectar of immortality.",
    year: "First Age",
    imageUrl: "/images/timeline/ocean-churning.jpg",
    era: "Satya Yuga"
  },
  {
    id: 3,
    title: "Matsya Avatar",
    description: "Vishnu's first avatar saves Manu (the first man) from a great deluge, preserving humanity and knowledge.",
    year: "Early Satya Yuga",
    imageUrl: "/images/timeline/matsya.jpg",
    era: "Satya Yuga"
  },
  {
    id: 4,
    title: "Ramayana Epic",
    description: "The story of Lord Rama, his exile, the abduction of Sita, and the war against Ravana.",
    year: "Treta Yuga",
    imageUrl: "/images/timeline/ramayana.jpg",
    era: "Treta Yuga"
  },
  {
    id: 5,
    title: "Mahabharata War",
    description: "The great battle between the Pandavas and the Kauravas at Kurukshetra, where Lord Krishna delivers the Bhagavad Gita.",
    year: "End of Dwapara Yuga",
    imageUrl: "/images/timeline/mahabharata.jpg",
    era: "Dwapara Yuga"
  },
  {
    id: 6,
    title: "Beginning of Kali Yuga",
    description: "The current age begins after Krishna's departure from Earth, marking the start of a spiritually degraded era.",
    year: "3102 BCE",
    imageUrl: "/images/timeline/kali-yuga.jpg",
    era: "Kali Yuga"
  }
];

const MythologicalTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<number>(1);
  
  // Parallax effect with scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  
  // Change active event based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find the event elements
      const eventElements = container.querySelectorAll('.timeline-event');
      
      // Determine which event is closest to the center of the viewport
      let closestEvent = 1;
      let minDistance = Infinity;
      
      eventElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestEvent = index + 1;
        }
      });
      
      setActiveEvent(closestEvent);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative py-20 overflow-hidden bg-black text-white" ref={containerRef} style={{ position: 'relative' }}>
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
        style={{ 
          backgroundImage: `url(${TIMELINE_EVENTS[activeEvent - 1]?.imageUrl || '/images/timeline/default.jpg'})`,
          y: backgroundY,
          filter: 'brightness(0.6) contrast(1.2)'
        }}
      />
      
      {/* Header */}
      <Container>
        <motion.div 
          className="relative z-10 text-center mb-16"
          style={{ opacity }}
        >
          <h2 className="text-4xl font-bold text-amber-300 uppercase tracking-wider">
            Mythological Timeline
          </h2>
          <div className="h-1 w-32 bg-indigo-700 mx-auto my-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Journey through the four ages (yugas) of Hindu cosmology and explore pivotal events in mythology
          </p>
        </motion.div>
      
        {/* Timeline */}
        <div className="relative z-10">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-700/40"></div>
          
          {/* Timeline Events */}
          <div className="relative">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div 
                key={event.id}
                className={`timeline-event relative mb-24 ${
                  index % 2 === 0 ? 'text-right pr-12 ml-auto' : 'text-left pl-12 mr-auto'
                }`}
                style={{ 
                  width: '45%',
                  opacity: activeEvent === event.id ? 1 : 0.6,
                  scale: activeEvent === event.id ? 1 : 0.95,
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5 } 
                }}
                viewport={{ once: false, amount: 0.7 }}
              >
                {/* Timeline Dot */}
                <div className={`absolute ${
                  index % 2 === 0 ? 'right-0 -translate-x-1/2' : 'left-0 translate-x-1/2'
                } top-5 transform -translate-y-1/2 w-6 h-6 rounded-full bg-amber-400 z-10 shadow-lg shadow-amber-400/50`}></div>
                
                {/* Era Badge */}
                <div className={`inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold ${
                  event.era === 'Satya Yuga' ? 'bg-indigo-900/90 text-indigo-100 border border-indigo-500' :
                  event.era === 'Treta Yuga' ? 'bg-emerald-900/90 text-emerald-100 border border-emerald-500' :
                  event.era === 'Dwapara Yuga' ? 'bg-amber-900/90 text-amber-100 border border-amber-500' :
                  event.era === 'Kali Yuga' ? 'bg-rose-900/90 text-rose-100 border border-rose-500' :
                  'bg-purple-900/90 text-purple-100 border border-purple-500'
                }`}>
                  {event.era}
                </div>
                
                {/* Content */}
                <div className={`timeline-content p-5 rounded-lg backdrop-blur-sm ${
                  activeEvent === event.id 
                    ? 'bg-black/80 border-2 border-amber-500/50' 
                    : 'bg-black/60 border border-amber-700/30'
                }`}>
                  <h3 className="text-xl font-bold text-amber-300 mb-1">{event.title}</h3>
                  <p className="text-amber-200/70 text-sm mb-2">{event.year}</p>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16 relative z-10">
          <p className="text-amber-300 text-lg mb-4">Want to explore these stories in detail?</p>
          <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold rounded-lg hover:from-amber-600 hover:to-amber-800 transition-colors shadow-lg">
            Explore Epic Stories
          </button>
        </div>
      </Container>
    </div>
  );
};

export default MythologicalTimeline;