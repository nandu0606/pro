import { Link } from "wouter";
import { Home, BookOpen, MessageCircle, Award, Video, Mail, Code, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cosmic-black border-t border-gold/20 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gold text-lg font-bold mb-4">Mythic Tales</h3>
            <p className="text-white/70 mb-4">
              Explore the rich tapestry of Indian mythology through immersive storytelling and interactive experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold/80 hover:text-gold transition-colors">
                <Code size={20} />
              </a>
              <a href="#" className="text-gold/80 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gold/80 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gold text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-gold transition-colors flex items-center">
                  <Home size={16} className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link href="/vr" className="text-white/70 hover:text-gold transition-colors flex items-center">
                  <Video size={16} className="mr-2" /> VR Experience
                </Link>
              </li>
              <li>
                <Link href="/forums" className="text-white/70 hover:text-gold transition-colors flex items-center">
                  <MessageCircle size={16} className="mr-2" /> Forums
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="text-white/70 hover:text-gold transition-colors flex items-center">
                  <BookOpen size={16} className="mr-2" /> Quizzes
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-white/70 hover:text-gold transition-colors flex items-center">
                  <Award size={16} className="mr-2" /> Achievements
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gold text-lg font-bold mb-4">Popular Epics</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-gold transition-colors">Ramayana</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-gold transition-colors">Mahabharata</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-gold transition-colors">Bhagavad Gita</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-gold transition-colors">Puranas</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-gold transition-colors">Upanishads</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gold text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-white/70 flex items-start mb-2">
              <Mail size={18} className="mr-2 mt-0.5" />
              <span>contact@mythictales.com</span>
            </p>
            <p className="text-white/70 mt-4">
              Subscribe to our newsletter for updates on new stories and VR experiences.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-cosmic-blue/20 border border-gold/30 rounded-l-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-gold/70 w-full"
              />
              <button className="bg-gold hover:bg-gold/80 text-cosmic-black font-medium px-4 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gold/20 mt-8 pt-8 text-center text-white/50">
          <p>© {new Date().getFullYear()} Mythic Tales. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;