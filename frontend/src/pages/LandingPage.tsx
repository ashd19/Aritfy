import  { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Image, 
  Search, 
  Users, 
  MessageCircle, 
  Briefcase,
  UserPlus,
  Upload,
  Share2,
  Eye,
  Heart,
  ArrowRight,
  Sparkles,
  Camera,
  Video,
  Box,
  Target,
  Rocket
} from 'lucide-react';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import Footer from '@/components/ui/Footer';
import { useNavigate } from 'react-router-dom';

// let RINGS: unknown;

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  
  

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mockArtworks = [
    { type: 'image', color: 'bg-yellow-400', title: 'Digital Art' },
    { type: 'video', color: 'bg-cyan-400', title: 'Motion Graphics' },
    { type: '3d', color: 'bg-lime-400', title: '3D Models' },
    { type: 'image', color: 'bg-pink-400', title: 'Photography' },
    { type: 'image', color: 'bg-purple-400', title: 'Illustrations' },
    { type: 'video', color: 'bg-orange-400', title: 'Animations' }
  ];

  const features = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Customizable Portfolios",
      description: "Design a profile that reflects your unique style with endless customization options.",
      color: "bg-yellow-400",
      shadowColor: "shadow-yellow-400/50"
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: "Diverse Media Support",
      description: "Showcase images, videos, and 3D models all in one beautiful platform.",
      color: "bg-cyan-400",
      shadowColor: "shadow-cyan-400/50"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Easy Discovery",
      description: "Organize with categories & tags for maximum reach and visibility.",
      color: "bg-lime-400",
      shadowColor: "shadow-lime-400/50"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Engage & Collaborate",
      description: "Get feedback, share work, and connect with clients and fellow artists.",
      color: "bg-pink-400",
      shadowColor: "shadow-pink-400/50"
    }
  ];

  const functionalityCards = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Interactive Gallery",
      description: "Zoom, slideshow, and immersive viewing experiences for your audience.",
      color: "bg-purple-400",
      shadowColor: "shadow-purple-400/50"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Community Feedback",
      description: "Comments, likes, and shares to build engagement with your work.",
      color: "bg-orange-400",
      shadowColor: "shadow-orange-400/50"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Direct Commissions",
      description: "Receive inquiries for projects & collaborations directly from clients.",
      color: "bg-green-400",
      shadowColor: "shadow-green-400/50"
    }
  ];

  const steps = [
    {
      icon: <UserPlus className="h-12 w-12" />,
      title: "Sign Up & Create Profile",
      description: "Get started in minutes with our simple onboarding process.",
      color: "bg-red-400",
      step: "01"
    },
    {
      icon: <Upload className="h-12 w-12" />,
      title: "Upload Your Artwork",
      description: "Add images, videos, and 3D models with drag-and-drop simplicity.",
      color: "bg-blue-400",
      step: "02"
    },
    {
      icon: <Share2 className="h-12 w-12" />,
      title: "Share & Connect",
      description: "Share your portfolio link and connect with the creative world.",
      color: "bg-green-400",
      step: "03"
    }
  ];

  return (
    
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Neo-Brutalist animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 transform rotate-12 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400 transform -rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-pink-400 transform rotate-45 animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-lime-400 transform -rotate-45 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="bg-black border border-red-600 relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="mb-8">
            <Badge className="px-6 py-3 text-lg font-black bg-yellow-400 text-black border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
              <Sparkles className="h-5 w-5 mr-2" />
              NEW PLATFORM LAUNCH!
            </Badge>
          </div>
          
          <TypewriterEffect
  words={[
    { text: "SHOWCASE", className: "text-black font-black" },
    { text: "YOUR", className: "text-black font-black" },
    { text: "CREATIVITY", className: "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-black" },
    { text: "TO", className: "text-black font-black" },
    { text: "THE", className: "text-black font-black" },
    { text: "WORLD", className: "text-black font-black" },
  ]}
  className="text-6xl md:text-8xl font-black mb-8 leading-none"
/>

          
          <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto font-bold leading-relaxed">
            A DIGITAL PORTFOLIO PLATFORM WHERE ARTISTS CAN DISPLAY IMAGES, VIDEOS, AND EVEN 3D MODELS — CONNECT, ENGAGE, AND GROW YOUR AUDIENCE.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-black text-white border-4 border-black font-black text-lg px-8 py-6 shadow-[8px_8px_0px_0px_#ff6b6b] hover:shadow-[12px_12px_0px_0px_#ff6b6b] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 animate-wiggle">
              CREATE YOUR PORTFOLIO
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
            onClick={() => navigate('/explore')}
            size="lg" className="bg-yellow-400 text-black border-4 border-black font-black text-lg px-8 py-6 shadow-[8px_8px_0px_0px_#4ecdc4] hover:shadow-[12px_12px_0px_0px_#4ecdc4] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
              EXPLORE ARTISTS
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className="relative py-24 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 transform hover:scale-105 transition-transform duration-300">
              WHY CHOOSE 
              <span className="block text-yellow-400 animate-bounce">OUR PLATFORM?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-bold">
              EVERYTHING YOU NEED TO SHOWCASE YOUR CREATIVITY AND BUILD MEANINGFUL CONNECTIONS.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} 
                   className={`${feature.color} border-4 border-black p-8 text-black transform hover:rotate-3 hover:scale-105 transition-all duration-300 shadow-[8px_8px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                   style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mb-6 p-4 bg-black text-white rounded-full w-fit mx-auto transform hover:rotate-12 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-black text-2xl mb-4 text-center">{feature.title}</h3>
                <p className="font-bold text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Functionality */}
      <section className="relative py-24 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-black">
              POWERFUL
              <span className="block text-purple-600 animate-pulse">FEATURES</span>
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto font-bold">
              PROFESSIONAL TOOLS DESIGNED TO MAKE YOUR ARTWORK SHINE.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {functionalityCards.map((card, index) => (
              <div key={index} 
                   className={`${card.color} border-4 border-black p-8 text-black transform hover:-rotate-2 hover:scale-105 transition-all duration-300 shadow-[8px_8px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] animate-float`}
                   style={{ animationDelay: `${index * 200}ms` }}>
                <div className="mb-6 p-4 bg-black text-white rounded-none w-fit transform hover:rotate-45 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="font-black text-2xl mb-4">{card.title}</h3>
                <p className="font-bold">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4 bg-yellow-400">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-black">
              HOW IT
              <span className="block animate-bounce">WORKS</span>
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto font-bold">
              GET STARTED IN THREE SIMPLE STEPS AND JOIN OUR CREATIVE COMMUNITY.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className={`${step.color} border-4 border-black p-8 mb-6 shadow-[8px_8px_0px_0px_#000] transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 animate-wiggle`}>
                  <div className="text-6xl font-black text-black mb-4">{step.step}</div>
                  <div className="bg-black text-white p-4 rounded-none mx-auto w-fit mb-4 transform group-hover:-rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black text-black mb-4">{step.title}</h3>
                  <p className="font-bold text-black">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full transform -translate-x-1/2 translate-x-6">
                    <ArrowRight className="h-8 w-8 text-black animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Demo */}
      <section className="relative py-24 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              YOUR ART,
              <span className="block text-cyan-400 animate-pulse">BEAUTIFULLY DISPLAYED</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-bold">
              SEE HOW YOUR CREATIVE WORK WILL LOOK WITH OUR STUNNING GALLERY LAYOUTS.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mockArtworks.map((artwork, index) => (
              <div key={index} 
                   className={`${artwork.color} border-4 border-white h-48 p-4 flex flex-col items-center justify-center text-black font-black transform hover:rotate-6 hover:scale-110 transition-all duration-300 shadow-[4px_4px_0px_0px_#fff] hover:shadow-[8px_8px_0px_0px_#fff] cursor-pointer animate-float`}
                   style={{ animationDelay: `${index * 100}ms` }}>
                <div className="mb-2">
                  {artwork.type === 'image' && <Camera className="h-8 w-8" />}
                  {artwork.type === 'video' && <Video className="h-8 w-8" />}
                  {artwork.type === '3d' && <Box className="h-8 w-8" />}
                </div>
                <p className="text-sm font-black text-center">{artwork.title}</p>
                <div className="mt-2 flex space-x-2">
                  <Heart className="h-4 w-4 hover:scale-150 transition-transform duration-200" />
                  <Eye className="h-4 w-4 hover:scale-150 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4 bg-gradient-to-r from-pink-400 to-purple-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-black">
            START YOUR DIGITAL
            <span className="block animate-bounce">ART JOURNEY TODAY</span>
          </h2>
          <p className="text-xl text-black mb-12 max-w-2xl mx-auto font-bold">
            JOIN THOUSANDS OF ARTISTS WHO ARE ALREADY SHOWCASING THEIR CREATIVITY AND BUILDING THEIR CAREERS WITH OUR PLATFORM.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-black text-white border-4 border-black font-black text-xl px-10 py-8 shadow-[8px_8px_0px_0px_#ffff00] hover:shadow-[16px_16px_0px_0px_#ffff00] transform hover:-translate-x-2 hover:-translate-y-2 transition-all duration-200 animate-wiggle">
              CREATE PORTFOLIO
              <Rocket className="ml-2 h-6 w-6" />
            </Button>
            <Button size="lg" className="bg-white text-black border-4 border-black font-black text-xl px-10 py-8 shadow-[8px_8px_0px_0px_#00ffff] hover:shadow-[16px_16px_0px_0px_#00ffff] transform hover:-translate-x-2 hover:-translate-y-2 transition-all duration-200">
              JOIN COMMUNITY
              <Target className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Neo-Brutalist Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        /* Custom shadow utilities for neo-brutalism */
        .shadow-brutal-sm { box-shadow: 4px 4px 0px 0px #000; }
        .shadow-brutal-md { box-shadow: 8px 8px 0px 0px #000; }
        .shadow-brutal-lg { box-shadow: 12px 12px 0px 0px #000; }
        .shadow-brutal-xl { box-shadow: 16px 16px 0px 0px #000; }
        
        /* Hover state shadows */
        .hover\\:shadow-brutal-sm:hover { box-shadow: 6px 6px 0px 0px #000; }
        .hover\\:shadow-brutal-md:hover { box-shadow: 12px 12px 0px 0px #000; }
        .hover\\:shadow-brutal-lg:hover { box-shadow: 16px 16px 0px 0px #000; }
        .hover\\:shadow-brutal-xl:hover { box-shadow: 20px 20px 0px 0px #000; }
      `}</style>
      <Footer/>
    </div>
  );
};

export default LandingPage;