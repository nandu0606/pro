import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Character {
  id: number;
  name: string;
  image?: string;
  description?: string;
}

interface Relationship {
  id: number;
  character1Id: number;
  character2Id: number;
  relationshipType: string;
  description: string;
}

interface CharacterRelationshipMapProps {
  characters: Character[];
  relationships: Relationship[];
  title?: string;
}

const RELATIONSHIP_COLORS: Record<string, string> = {
  parent: '#E67E22', // orange
  child: '#E67E22', // orange (same as parent)
  sibling: '#3498DB', // blue
  spouse: '#E91E63', // pink
  ally: '#2ECC71', // green
  enemy: '#E74C3C', // red
  guru: '#9B59B6', // purple
  student: '#9B59B6', // purple (same as guru)
  friend: '#1ABC9C', // teal
  default: '#D4AF37', // gold
};

const CharacterRelationshipMap = ({ 
  characters, 
  relationships,
  title = "Character Relationships"
}: CharacterRelationshipMapProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [lines, setLines] = useState<JSX.Element[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Demo data - used if no props are provided
  const demoCharacters: Character[] = characters.length > 0 ? characters : [
    { id: 1, name: 'Vishnu', image: '/images/image9.jpg', description: 'The preserver deity in the Hindu trinity.' },
    { id: 2, name: 'Lakshmi', image: '/images/image8.jpg', description: 'Goddess of wealth and prosperity.' },
    { id: 3, name: 'Shiva', image: '/images/image10.jpg', description: 'The destroyer deity in the Hindu trinity.' },
    { id: 4, name: 'Parvati', image: '/images/image7.jpg', description: 'Goddess of fertility, love and devotion.' },
    { id: 5, name: 'Ganesha', image: '/images/image1.jpg', description: 'Son of Shiva and Parvati, remover of obstacles.' },
    { id: 6, name: 'Kartikeya', image: '/images/image6.jpg', description: 'Son of Shiva and Parvati, god of war.' },
  ];
  
  const demoRelationships: Relationship[] = relationships.length > 0 ? relationships : [
    { id: 1, character1Id: 1, character2Id: 2, relationshipType: 'spouse', description: 'Vishnu and Lakshmi are divine consorts.' },
    { id: 2, character1Id: 3, character2Id: 4, relationshipType: 'spouse', description: 'Shiva and Parvati are divine consorts.' },
    { id: 3, character1Id: 3, character2Id: 5, relationshipType: 'parent', description: 'Shiva is the father of Ganesha.' },
    { id: 4, character1Id: 4, character2Id: 5, relationshipType: 'parent', description: 'Parvati is the mother of Ganesha.' },
    { id: 5, character1Id: 3, character2Id: 6, relationshipType: 'parent', description: 'Shiva is the father of Kartikeya.' },
    { id: 6, character1Id: 4, character2Id: 6, relationshipType: 'parent', description: 'Parvati is the mother of Kartikeya.' },
    { id: 7, character1Id: 5, character2Id: 6, relationshipType: 'sibling', description: 'Ganesha and Kartikeya are brothers.' },
    { id: 8, character1Id: 1, character2Id: 3, relationshipType: 'ally', description: 'Vishnu and Shiva work together to maintain cosmic balance.' },
  ];
  
  const displayCharacters = characters.length > 0 ? characters : demoCharacters;
  const displayRelationships = relationships.length > 0 ? relationships : demoRelationships;
  
  // Calculate and draw relationship lines
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const characterElements: Record<number, DOMRect> = {};
    
    // Get positions of all character nodes
    displayCharacters.forEach(char => {
      const element = container.querySelector(`[data-character-id="${char.id}"]`);
      if (element) {
        characterElements[char.id] = element.getBoundingClientRect();
      }
    });
    
    const containerRect = container.getBoundingClientRect();
    
    // Create lines for each relationship
    const newLines = displayRelationships.map(rel => {
      const char1Element = characterElements[rel.character1Id];
      const char2Element = characterElements[rel.character2Id];
      
      if (!char1Element || !char2Element) return null;
      
      // Calculate center points
      const x1 = char1Element.left + char1Element.width / 2 - containerRect.left;
      const y1 = char1Element.top + char1Element.height / 2 - containerRect.top;
      const x2 = char2Element.left + char2Element.width / 2 - containerRect.left;
      const y2 = char2Element.top + char2Element.height / 2 - containerRect.top;
      
      // Calculate line length and angle
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
      
      const color = RELATIONSHIP_COLORS[rel.relationshipType] || RELATIONSHIP_COLORS.default;
      
      return (
        <div
          key={`relationship-${rel.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${x1}px`,
            top: `${y1}px`,
            width: `${length}px`,
            height: '2px',
            backgroundColor: color,
            transformOrigin: '0 0',
            transform: `rotate(${angle}deg)`,
            zIndex: 0,
          }}
          data-relationship-id={rel.id}
        >
          <div 
            className="w-2 h-2 rounded-full absolute right-0 top-0 mt-[-3px] mr-[-3px]"
            style={{ backgroundColor: color }}
          />
        </div>
      );
    }).filter(Boolean) as JSX.Element[];
    
    setLines(newLines);
    
  }, [displayCharacters, displayRelationships]);
  
  const getRelationships = (characterId: number) => {
    return displayRelationships.filter(rel => 
      rel.character1Id === characterId || rel.character2Id === characterId
    );
  };
  
  const getRelatedCharacter = (relationship: Relationship, currentCharacterId: number) => {
    const relatedCharacterId = relationship.character1Id === currentCharacterId 
      ? relationship.character2Id 
      : relationship.character1Id;
    
    return displayCharacters.find(char => char.id === relatedCharacterId);
  };
  
  return (
    <div className="relative bg-cosmic-blue-deep p-6 rounded-lg border border-gold/30">
      <h3 className="text-2xl text-gold mb-6 text-center">{title}</h3>
      
      <div 
        ref={containerRef}
        className="relative min-h-[400px] mb-4"
      >
        {/* Relationship lines */}
        {lines}
        
        {/* Character nodes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {displayCharacters.map((character) => (
            <motion.div
              key={character.id}
              className={`relative z-10 bg-cosmic-blue rounded-lg p-4 border-2 cursor-pointer transition-transform duration-300 shadow-md ${
                selectedCharacter?.id === character.id ? 'border-gold shadow-glow' : 'border-gold/30 hover:border-gold/60'
              }`}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 } 
              }}
              data-character-id={character.id}
              onClick={() => setSelectedCharacter(character)}
            >
              {character.image && (
                <div className="w-16 h-16 mx-auto mb-2 overflow-hidden rounded-full border border-gold/40">
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h4 className="text-gold text-center text-lg font-medium">{character.name}</h4>
              {character.description && (
                <p className="text-white/70 text-sm text-center mt-1 line-clamp-2">{character.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected character info panel */}
      {selectedCharacter && (
        <motion.div 
          className="mt-6 bg-cosmic-blue border border-gold/30 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-4">
            {selectedCharacter.image && (
              <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-gold">
                <img 
                  src={selectedCharacter.image} 
                  alt={selectedCharacter.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl text-gold font-semibold">{selectedCharacter.name}</h3>
              {selectedCharacter.description && (
                <p className="text-white/80 mt-1">{selectedCharacter.description}</p>
              )}
            </div>
          </div>
          
          <h4 className="text-lg text-gold mb-2">Relationships</h4>
          
          <div className="space-y-2">
            {getRelationships(selectedCharacter.id).map(relationship => {
              const relatedCharacter = getRelatedCharacter(relationship, selectedCharacter.id);
              if (!relatedCharacter) return null;
              
              const isSource = relationship.character1Id === selectedCharacter.id;
              const relationColor = RELATIONSHIP_COLORS[relationship.relationshipType] || RELATIONSHIP_COLORS.default;
              
              return (
                <div 
                  key={relationship.id}
                  className={`p-3 rounded-md hover:bg-cosmic-blue-light cursor-pointer border-l-4 ${
                    selectedRelationship?.id === relationship.id ? 'bg-cosmic-blue-light' : 'bg-cosmic-blue-deep'
                  }`}
                  style={{ borderLeftColor: relationColor }}
                  onClick={() => setSelectedRelationship(
                    selectedRelationship?.id === relationship.id ? null : relationship
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gold">{relatedCharacter.name}</span>
                      <span className="text-white/60 text-sm">
                        ({isSource ? relationship.relationshipType : relationship.relationshipType})
                      </span>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: relationColor }}
                    ></div>
                  </div>
                  
                  {selectedRelationship?.id === relationship.id && (
                    <p className="text-white/80 text-sm mt-2">{relationship.description}</p>
                  )}
                </div>
              );
            })}
            
            {getRelationships(selectedCharacter.id).length === 0 && (
              <p className="text-white/60 italic">No relationships found.</p>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              className="bg-cosmic-blue hover:bg-cosmic-blue-light text-gold px-4 py-2 rounded-sm border border-gold/30"
              onClick={() => {
                setSelectedCharacter(null);
                setSelectedRelationship(null);
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CharacterRelationshipMap;