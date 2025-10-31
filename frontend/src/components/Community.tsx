import  { useState, useEffect, useMemo } from 'react';
import { Heart, MessageCircle, ShoppingCart, Eye, User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CurrentSlides = {
  [key: number]: number; // Maps artist ID to slide index
};

const Community = () => {
  type Comment = { id: number; text: string; user: string; timestamp: string; };
  const [likedArtworks, setLikedArtworks] = useState<Set<number>>(new Set());
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [currentSlides, setCurrentSlides] = useState<CurrentSlides>({});
  const navigate = useNavigate();

  // Dummy artists data
  const artists = useMemo(() => [
    {
      id: 1,
      name: "MAYA STORM",
      location: "TOKYO, JAPAN",
      specialty: "DIGITAL ABSTRACT",
      followers: "12.5K",
      artworks: [
        { id: 1, title: "NEON DREAMS", price: "$2,500", likes: 847, views: "3.2K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop" },
        { id: 2, title: "CYBER PULSE", price: "$3,200", likes: 1205, views: "5.1K", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" },
        { id: 3, title: "VOID MATTER", price: "$1,800", likes: 623, views: "2.8K", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop" }
      ]
    },
    {
      id: 2,
      name: "ALEX CHROME",
      location: "BERLIN, GERMANY",
      specialty: "3D SCULPTURES",
      followers: "8.7K",
      artworks: [
        { id: 4, title: "METAL SOUL", price: "$5,500", likes: 1456, views: "7.3K", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" },
        { id: 5, title: "IRON WHISPERS", price: "$4,200", likes: 892, views: "4.1K", image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&h=600&fit=crop" },
        { id: 6, title: "CHROME HEART", price: "$6,800", likes: 2134, views: "9.5K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop" }
      ]
    },
    {
      id: 3,
      name: "ZARA PIXEL",
      location: "NYC, USA",
      specialty: "GLITCH ART",
      followers: "15.2K",
      artworks: [
        { id: 7, title: "BROKEN REALITY", price: "$3,800", likes: 1789, views: "6.7K", image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=600&fit=crop" },
        { id: 8, title: "DATA CORRUPTION", price: "$2,900", likes: 1023, views: "4.9K", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop" },
        { id: 9, title: "SYSTEM ERROR", price: "$4,500", likes: 1567, views: "8.2K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop" }
      ]
    },
    {
      id: 4,
      name: "RIO BLAZE",
      location: "SÃO PAULO, BRAZIL",
      specialty: "STREET MURALS",
      followers: "22.1K",
      artworks: [
        { id: 10, title: "URBAN FIRE", price: "$7,200", likes: 3456, views: "12.8K", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" },
        { id: 11, title: "CITY SOUL", price: "$5,900", likes: 2187, views: "9.3K", image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&h=600&fit=crop" },
        { id: 12, title: "CONCRETE DREAMS", price: "$6,500", likes: 2834, views: "11.1K", image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=600&fit=crop" }
      ]
    },
    {
      id: 5,
      name: "LUNA FROST",
      location: "REYKJAVIK, ICELAND",
      specialty: "ICE SCULPTURES",
      followers: "9.8K",
      artworks: [
        { id: 13, title: "FROZEN LIGHT", price: "$8,900", likes: 1876, views: "7.4K", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop" },
        { id: 14, title: "ARCTIC VISION", price: "$7,500", likes: 1432, views: "5.9K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop" },
        { id: 15, title: "CRYSTAL MEMORIES", price: "$9,200", likes: 2198, views: "8.7K", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" }
      ]
    }
  ], []);

  useEffect(() => {
   // Initialize current slides for each artist
    const initialSlides: CurrentSlides = {};
    artists.forEach(artist => {
      initialSlides[artist.id] = 0;
    });
    setCurrentSlides(initialSlides);
  }, [artists]);

  const handleLike = (artworkId : number) => {
    const newLiked = new Set(likedArtworks);
    if (newLiked.has(artworkId)) {
      newLiked.delete(artworkId);
    } else {
      newLiked.add(artworkId);
    }
    setLikedArtworks(newLiked);
  };

  const handleBuy = (artworkId: number) => {
    // Find the artwork and its artist
    for (const artist of artists) {
      const artwork = artist.artworks.find(a => a.id === artworkId);
      if (artwork) {
        navigate(`/buy/${artworkId}`, { 
          state: { 
            artwork: { ...artwork, description: 'A captivating digital artwork' }, // Add description if needed
            artist: { 
              name: artist.name,
              location: artist.location,
              specialty: artist.specialty 
            } 
          } 
        });
        return;
      }
    }
  };

  const handleComment = (artworkId:number) => {
    if (newComment[artworkId]?.trim()) {
      const updatedComments = { ...comments };
      if (!updatedComments[artworkId]) {
        updatedComments[artworkId] = [];
      }
      updatedComments[artworkId].push({
        id: Date.now(),
        text: newComment[artworkId],
        user: "YOU",
        timestamp: "NOW"
      });
      setComments(updatedComments);
      setNewComment({ ...newComment, [artworkId]: "" });
    }
  };

  const nextSlide = (artistId : number , totalSlides:number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [artistId]: (prev[artistId] + 1) % totalSlides
    }));
  };

  const prevSlide = (artistId: number, totalSlides: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [artistId]: prev[artistId] === 0 ? totalSlides - 1 : prev[artistId] - 1
    }));
  };

  return (
    <div className="min-h-screen bg-lime-300 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:-translate-y-2 transition-all duration-300">
          <h1 className="text-6xl font-black text-black uppercase tracking-tighter mb-4 animate-pulse">
            ARTIST COMMUNITY
          </h1>
          <p className="text-2xl font-bold text-black uppercase opacity-80">
            DISCOVER • COLLECT • CONNECT
          </p>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto space-y-16">
        {artists.map((artist, artistIndex) => (
          <div 
            key={artist.id} 
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:-translate-y-2 transition-all duration-500"
            style={{ animationDelay: `${artistIndex * 200}ms` }}
          >
            {/* Artist Profile */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 border-2 border-black flex items-center justify-center animate-bounce">
                    <span className="text-black font-black text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-black text-black uppercase tracking-tighter hover:tracking-wide transition-all duration-300 transform hover:skew-x-3">
                    {artist.name}
                  </h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-black" />
                      <span className="text-sm font-bold text-black uppercase">{artist.location}</span>
                    </div>
                    <div className="w-2 h-2 bg-black"></div>
                    <span className="text-sm font-bold text-black uppercase">{artist.specialty}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="bg-yellow-300 border-3 border-black px-6 py-3 transform hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl font-black text-black">{artist.followers}</span>
                  <p className="text-sm font-bold text-black uppercase">FOLLOWERS</p>
                </div>
                <button className="bg-black text-white border-3 border-black font-black px-8 py-3 uppercase tracking-wider hover:bg-gray-800 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  FOLLOW
                </button>
              </div>
            </div>

            {/* Artwork Slider */}
            <div className="relative">
              <div className="overflow-hidden bg-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${(currentSlides[artist.id] || 0) * 100}%)` }}
                >
                  {artist.artworks.map((artwork) => (
                    <div key={artwork.id} className="w-full flex-shrink-0">
                      <div className="relative group">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Artwork Info Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-2xl font-black text-black uppercase mb-2">{artwork.title}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-3xl font-black text-black">{artwork.price}</span>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4 text-black" />
                                  <span className="font-bold text-black text-sm">{artwork.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4 text-red-600" />
                                  <span className="font-bold text-black text-sm">{artwork.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <button 
                onClick={() => prevSlide(artist.id, artist.artworks.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border-3 border-black p-3 hover:bg-cyan-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              
              <button 
                onClick={() => nextSlide(artist.id, artist.artworks.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border-3 border-black p-3 hover:bg-cyan-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {artist.artworks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlides(prev => ({ ...prev, [artist.id]: index }))}
                    className={`w-4 h-4 border-2 border-black transform hover:scale-125 transition-all duration-200 ${
                      (currentSlides[artist.id] || 0) === index 
                        ? 'bg-black' 
                        : 'bg-white hover:bg-yellow-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current Artwork Actions */}
            {artist.artworks[currentSlides[artist.id] || 0] && (
              <div className="mt-8 bg-gray-100 border-3 border-black p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div>
                    <h3 className="text-3xl font-black text-black uppercase mb-2">
                      {artist.artworks[currentSlides[artist.id] || 0].title}
                    </h3>
                    <span className="text-4xl font-black text-black">
                      {artist.artworks[currentSlides[artist.id] || 0].price}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(artist.artworks[currentSlides[artist.id] || 0].id)}
                      className={`flex items-center space-x-2 px-6 py-3 border-3 border-black font-black uppercase tracking-wider hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
                        likedArtworks.has(artist.artworks[currentSlides[artist.id] || 0].id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white text-black hover:bg-red-100'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedArtworks.has(artist.artworks[currentSlides[artist.id] || 0].id) ? 'fill-current' : ''}`} />
                      <span>LIKE</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 bg-white border-3 border-black px-6 py-3 font-black text-black uppercase tracking-wider hover:bg-blue-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                      <MessageCircle className="w-5 h-5" />
                      <span>COMMENT</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 border-3 border-black px-8 py-3 font-black text-white uppercase tracking-wider hover:from-green-600 hover:to-emerald-600 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105"
                    onClick={() => handleBuy(artist.artworks[currentSlides[artist.id] || 0].id)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>BUY NOW</span>
                    </button>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="mt-6 border-t-3 border-black pt-6">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="ADD YOUR COMMENT..."
                      value={newComment[artist.artworks[currentSlides[artist.id] || 0].id] || ''}
                      onChange={(e) => setNewComment(prev => ({ 
                        ...prev, 
                        [artist.artworks[currentSlides[artist.id] || 0].id]: e.target.value 
                      }))}
                      className="flex-1 px-4 py-3 border-3 border-black font-bold text-black placeholder-gray-500 uppercase focus:outline-none focus:bg-yellow-100"
                    />
                    <button 
                      onClick={() => handleComment(artist.artworks[currentSlides[artist.id] || 0].id)}
                      className="bg-black text-white border-3 border-black px-6 py-3 font-black uppercase tracking-wider hover:bg-gray-800 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                      POST
                    </button>
                  </div>
                  
                  {comments[artist.artworks[currentSlides[artist.id] || 0].id] && (
                    <div className="mt-4 space-y-3">
                      {comments[artist.artworks[currentSlides[artist.id] || 0].id].map((comment: Comment) => (
                        <div key={comment.id} className="bg-white border-2 border-black p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-black text-sm uppercase">{comment.user}</span>
                            <span className="text-xs font-bold text-gray-600 uppercase">{comment.timestamp}</span>
                          </div>
                          <p className="text-black font-bold">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  ){'}'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Section */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-4 border-black font-black px-12 py-6 text-2xl uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:-translate-y-2 transform hover:scale-105 hover:rotate-1 transition-all duration-300">
          LOAD MORE ARTISTS
        </button>
      </div>
    </div>
  );
};

export default Community;