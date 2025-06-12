import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-maroon text-gold shadow-md sticky top-0 z-50 border-b border-gold/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-gold cursor-pointer tracking-wide font-serif">
              Explore
            </Link>
          </div>
          
          <nav className="md:flex items-center space-x-6 mb-4 md:mb-0 text-center">
            <Link href="/" className="nav-link font-medium text-gold hover:text-lightGold transition duration-300 uppercase text-sm tracking-wide">
              Home
            </Link>
            <Link href="/vr" className="nav-link font-medium text-gold hover:text-lightGold transition duration-300 uppercase text-sm tracking-wide">
              VR Experience
            </Link>
            <Link href="/forums" className="nav-link font-medium text-gold hover:text-lightGold transition duration-300 uppercase text-sm tracking-wide">
              Forums
            </Link>
            <Link href="/quizzes" className="nav-link font-medium text-gold hover:text-lightGold transition duration-300 uppercase text-sm tracking-wide">
              Quizzes
            </Link>
            <Link href="/achievements" className="nav-link font-medium text-gold hover:text-lightGold transition duration-300 uppercase text-sm tracking-wide">
              Achievements
            </Link>
            <Link href="/gallery" className="nav-link font-medium text-gold hover:text-lightGold transition duration-300 uppercase text-sm tracking-wide">
              Gallery
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 border border-gold/50 cursor-pointer">
                  <AvatarImage src="/assets/image10.jpg" alt="User" />
                  <AvatarFallback className="bg-gold/20 text-gold">U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-cosmic-blue-deep border-gold/30 text-white">
                <DropdownMenuLabel className="text-gold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gold/20" />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-black/40 focus:bg-cosmic-black/40">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/preferences">
                  <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-black/40 focus:bg-cosmic-black/40">
                    Preferences
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-gold/20" />
                <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-black/40 focus:bg-cosmic-black/40">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
