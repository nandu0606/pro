import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Boxes, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface SimpleVRViewerProps {
  title: string;
  imageUrl: string;
  description?: string;
}

// This is a simplified "VR-like" experience using panoramic images
// For a real VR experience, you would integrate with A-Frame, Three.js, or React 360
const SimpleVRViewer = ({ title, imageUrl, description }: SimpleVRViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    setPosition({
      x: e.touches[0].clientX - startPos.x,
      y: e.touches[0].clientY - startPos.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetView = () => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-cosmic-blue hover:bg-cosmic-blue-light text-gold border border-gold/30 rounded-sm transition-colors"
      >
        <Boxes className="w-5 h-5" />
        <span>Launch 3D View</span>
      </button>

      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-black bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative w-11/12 h-5/6 max-w-6xl rounded-lg overflow-hidden bg-cosmic-blue border-2 border-gold"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-2 bg-cosmic-blue-deep border-b border-gold/30">
              <h3 className="text-xl text-gold font-semibold">{title}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-gold hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <button 
                onClick={handleZoomIn}
                className="p-2 bg-cosmic-blue-deep text-gold rounded-full hover:bg-cosmic-blue border border-gold/30"
              >
                <ZoomIn size={20} />
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-2 bg-cosmic-blue-deep text-gold rounded-full hover:bg-cosmic-blue border border-gold/30"
              >
                <ZoomOut size={20} />
              </button>
              <button 
                onClick={resetView}
                className="p-2 bg-cosmic-blue-deep text-gold rounded-full hover:bg-cosmic-blue border border-gold/30"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Description */}
            {description && (
              <div className="absolute bottom-4 left-4 right-20 z-10 p-3 bg-cosmic-blue-deep bg-opacity-90 border border-gold/30 rounded-md text-white/80 text-sm max-w-md">
                {description}
              </div>
            )}

            {/* VR Content */}
            <div 
              ref={containerRef}
              className="w-full h-full pt-10 overflow-hidden cursor-grab"
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="w-full h-full transform-gpu transition-transform"
                style={{ 
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              ></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default SimpleVRViewer;