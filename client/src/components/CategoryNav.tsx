import { useState } from "react";
import { motion } from "framer-motion";

interface CategoryNavProps {
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({ onCategoryChange }: CategoryNavProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const categories = [
    { id: "all", label: "All Stories" },
    { id: "Vishnu", label: "Vishnu" },
    { id: "Shiva", label: "Shiva" },
    { id: "Devi", label: "Devi" },
    { id: "Ganesh", label: "Ganesh" },
    { id: "Krishna", label: "Krishna" },
    { id: "Ramayana", label: "Ramayana" },
    { id: "Mahabharata", label: "Mahabharata" }
  ];
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeCategory === category.id
                ? "bg-deepRed text-gold"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;