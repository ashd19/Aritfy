import { useState } from 'react';
import { Menu, X, User,  LogOut, ChevronDown, Search, Plus,  MessageCircle} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState } from '@/types/redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <nav className="bg-yellow-300 border-b-3 border-black sticky top-0 z-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="/" className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
              <div className="w-12 h-12 bg-red-500 border-3 border-black rounded-none flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                <span className="text-white text-2xl animate-bounce">🎨</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 border-2 border-black rounded-none animate-pulse"></div>
            </div>
            <div className="transform group-hover:scale-105 transition-all duration-300">
              <h1 className="text-2xl font-black text-black tracking-tighter hover:tracking-wide transition-all duration-500 transform hover:skew-x-3">
                ARTIFY
              </h1>
              <p className="text-xs font-black text-black uppercase tracking-wider -mt-1 opacity-70">
                CREATIVE HUB
              </p>
            </div>
          </a>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-2">
              {['EXPLORE', 'COMMUNITY', 'ABOUT'].map((item, index) => (
                <a
                  key={item}
                  href={item === 'EXPLORE' ? '/explore' : item === 'COMMUNITY' ? '/community' : item === 'ABOUT' ? '/about' : '#'}
                  className="group relative px-6 py-3 bg-white border-3 border-black font-black text-black uppercase tracking-wider hover:bg-cyan-400 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 active:translate-x-0 active:translate-y-0 active:shadow-none text-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex items-center space-x-1">
                    {item === 'EXPLORE' && <Search className="w-4 h-4" />}
                    {item === 'COMMUNITY' && <MessageCircle className="w-4 h-4" />}
                    <span>{item}</span>
                  </span>
                  <div className="absolute inset-0 bg-magenta-500 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200 border-3 border-black"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">


            {/* Create Portfolio CTA */}
            <button
              onClick={() => navigate('/createArt')}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 border-3 border-black font-black text-white px-4 sm:px-6 py-2 sm:py-3 uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 hover:rotate-1 text-xs sm:text-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2 animate-pulse">
                <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="group-hover:animate-bounce">CREATE ARTWORK</span>
              </div>
            </button>

            {/* Authentication Section */}
            {/* Authentication Section */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-white border-3 border-black text-black font-black px-4 sm:px-6 py-2 sm:py-3 uppercase tracking-wider hover:bg-cyan-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 active:translate-x-0 active:translate-y-0 active:shadow-none text-xs sm:text-sm"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="bg-black text-white border-3 border-black font-black px-4 sm:px-6 py-2 sm:py-3 uppercase tracking-wider hover:bg-gray-800 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:translate-x-0 active:translate-y-0 active:shadow-none text-xs sm:text-sm"
                >
                  SIGN UP
                </button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border-3 border-black font-black text-black uppercase tracking-wider hover:bg-yellow-300 transition-all">
                    <User className="w-5 h-5" />
                    <span>{user?.username || "Profile"}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black text-white">
                  <DropdownMenuLabel className="font-black">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profilePage")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => dispatch(logout())}
                    className="cursor-pointer text-red-600 font-bold"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 bg-white border-3 border-black hover:bg-magenta-400 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-black transform rotate-180 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5 text-black group-hover:rotate-90 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex lg:hidden ml-4 border-t-3 border-black py-6 bg-white animate-slideInDown">
            <div className="space-y-4">
              {['HOME', 'EXPLORE', 'COMMUNITY', 'ABOUT'].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="flex items-center space-x-3 text-black hover:text-white font-black py-2.5 hover:bg-black hover:translate-x-2 transition-all duration-200 uppercase tracking-wider border-b-2 border-black text-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item === 'EXPLORE' && <Search className="w-4 h-4" />}
                  {item === 'COMMUNITY' && <MessageCircle className="w-4 h-4" />}
                  <span>{item}</span>
                </a>
              ))}

              {!isAuthenticated ? (
                <div className="pt-4 space-x-4 border-t-3 border-black">
                  <button
                    onClick={() => navigate('/auth')}
                    className="w-full text-left bg-white border-3 border-black text-black font-black py-2.5 px-4 uppercase tracking-wider hover:bg-cyan-300 hover:translate-x-2 transition-all duration-200 text-sm"
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => navigate('/auth?mode=signup')}
                    className="w-full bg-black text-white border-3 border-black font-black py-2.5 px-4 uppercase tracking-wider hover:bg-gray-800 hover:translate-x-2 transition-all duration-200 text-sm mt-3"
                  >
                    SIGN UP
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-x-4 border-t-3 border-black">
                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full text-left bg-red-500 text-white border-3 border-black font-black py-2.5 px-4 uppercase tracking-wider hover:bg-red-600 hover:translate-x-2 transition-all duration-200 text-sm"
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.3s ease-out;
        }
        
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
      `}</style> */}
    </nav>
  );
};

export default Navbar;