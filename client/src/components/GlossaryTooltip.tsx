import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
}

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  showUnderline?: boolean;
  children: React.ReactNode;
}

const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({
  term,
  definition,
  category,
  relatedTerms = [],
  showUnderline = true,
  children
}) => {
  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [tooltipWidth, setTooltipWidth] = useState(300); // default width
  
  const updatePosition = () => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const tooltipWidth = 300; // keep consistent with CSS width
    
    // Calculate where to position the tooltip
    let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2);
    
    // Ensure tooltip doesn't go off screen
    if (left < 10) left = 10;
    if (left + tooltipWidth > windowWidth - 10) left = windowWidth - tooltipWidth - 10;
    
    setPosition({
      top: rect.bottom + window.scrollY + 10, // 10px below the target
      left
    });
    
    setTooltipWidth(tooltipWidth);
  };
  
  // Update position when showing tooltip
  useEffect(() => {
    if (show) {
      updatePosition();
      
      // Add resize listener
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [show]);
  
  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [show]);
  
  return (
    <>
      <span
        ref={triggerRef}
        className={`inline cursor-help ${showUnderline ? 'border-b border-dotted border-gold/60' : ''}`}
        onMouseEnter={() => updatePosition()}
        onClick={() => setShow(!show)}
      >
        {children}
      </span>
      
      {show && createPortal(
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 bg-cosmic-blue-deep border border-gold/40 rounded-md shadow-glow p-4 max-w-md"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${tooltipWidth}px`,
          }}
        >
          <div className="absolute top-0 left-1/2 -mt-2 -ml-2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-cosmic-blue-deep"></div>
          
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="text-gold text-lg font-medium">{term}</h4>
            {category && (
              <span className="text-xs text-white/60 bg-cosmic-blue px-2 py-0.5 rounded-sm">
                {category}
              </span>
            )}
          </div>
          
          <p className="text-white/90 text-sm mb-3">{definition}</p>
          
          {relatedTerms.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gold/20">
              <h5 className="text-gold/80 text-xs mb-1">Related Terms:</h5>
              <div className="flex flex-wrap gap-1">
                {relatedTerms.map((relatedTerm, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-cosmic-blue px-2 py-0.5 rounded-sm text-gold/70 hover:text-gold cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Here you would typically fetch and show the related term
                      // For now, just a visual effect
                      alert(`Would load definition of: ${relatedTerm}`);
                    }}
                  >
                    {relatedTerm}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <button
            className="absolute top-1 right-1 text-white/60 hover:text-white w-5 h-5 flex items-center justify-center"
            onClick={() => setShow(false)}
          >
            ×
          </button>
        </motion.div>,
        document.body
      )}
    </>
  );
};

// Higher-order component to process text and automatically add tooltips for glossary terms
export const WithGlossaryTooltips: React.FC<{
  text: string;
  glossaryTerms: GlossaryTerm[];
  className?: string;
}> = ({ text, glossaryTerms, className }) => {
  // Create a map for quick lookup of terms
  const termsMap = new Map(
    glossaryTerms.map(item => [item.term.toLowerCase(), item])
  );
  
  // Function to find terms in text and replace with tooltips
  const processText = () => {
    // If no terms or no text, return the text as is
    if (glossaryTerms.length === 0 || !text) {
      return <span className={className}>{text}</span>;
    }
    
    // Split text into segments and process each
    const segments: React.ReactNode[] = [];
    let remainingText = text;
    let lastIndex = 0;
    
    // Sort terms by length (descending) to match longer terms first
    const sortedTerms = [...glossaryTerms].sort(
      (a, b) => b.term.length - a.term.length
    );
    
    while (remainingText.length > 0) {
      // Find the earliest occurrence of any term
      let earliestMatch: { index: number; term: GlossaryTerm } | null = null;
      
      for (const glossaryItem of sortedTerms) {
        const termIndex = remainingText.toLowerCase().indexOf(glossaryItem.term.toLowerCase());
        if (termIndex !== -1 && (earliestMatch === null || termIndex < earliestMatch.index)) {
          earliestMatch = { index: termIndex, term: glossaryItem };
        }
      }
      
      if (earliestMatch === null) {
        // No more terms found
        segments.push(remainingText);
        break;
      }
      
      // Add text before the term
      if (earliestMatch.index > 0) {
        segments.push(remainingText.substring(0, earliestMatch.index));
      }
      
      // Get the actual term as it appears in the text (preserving case)
      const actualTerm = remainingText.substring(
        earliestMatch.index, 
        earliestMatch.index + earliestMatch.term.term.length
      );
      
      // Add the tooltip
      segments.push(
        <GlossaryTooltip
          key={`${lastIndex}-${earliestMatch.term.id}`}
          term={earliestMatch.term.term}
          definition={earliestMatch.term.definition}
          category={earliestMatch.term.category}
          relatedTerms={earliestMatch.term.relatedTerms}
        >
          {actualTerm}
        </GlossaryTooltip>
      );
      
      // Update remaining text
      remainingText = remainingText.substring(
        earliestMatch.index + earliestMatch.term.term.length
      );
      lastIndex++;
    }
    
    return <span className={className}>{segments}</span>;
  };
  
  return processText();
};

export default GlossaryTooltip;