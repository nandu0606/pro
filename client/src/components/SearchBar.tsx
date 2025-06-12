import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Story } from "@shared/schema";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Only trigger search when query is at least 3 characters
  const enabled = searchQuery.length >= 3 && isSearching;

  const { data: searchResults, isLoading } = useQuery<Story[]>({
    queryKey: ['/api/search', searchQuery],
    enabled: enabled,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length < 3) {
      toast({
        title: "Search query too short",
        description: "Please enter at least 3 characters to search",
        variant: "destructive",
      });
      return;
    }
    setIsSearching(true);
  };

  const handleSearchItemClick = (storyId: number) => {
    setSearchQuery("");
    setIsSearching(false);
    setLocation(`/story/${storyId}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text" 
          placeholder="Search Stories..." 
          className="w-full px-4 py-3 rounded-md bg-white focus:outline-none text-black text-center font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.length >= 3) {
              setIsSearching(true);
            }
          }}
          onBlur={() => {
            // Delay hiding results to allow for click
            setTimeout(() => setIsSearching(false), 200);
          }}
        />
      </form>

      <AnimatePresence>
        {isSearching && searchQuery.length >= 3 && (
          <motion.div 
            className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : searchResults && searchResults.length > 0 ? (
              <ul>
                {searchResults.map(story => (
                  <li 
                    key={story.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gold/10 cursor-pointer transition"
                    onClick={() => handleSearchItemClick(story.id)}
                  >
                    <div className="p-3">
                      <div className="font-medium text-deepRed">{story.title}</div>
                      <div className="text-xs text-gray-500">{story.category}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">No results found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
