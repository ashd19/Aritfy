import React, { useState, useEffect } from 'react';
import { User, MapPin, ArrowLeft, CreditCard, Banknote, QrCode, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Artwork {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  likes: number;
  views: string;
}

interface Artist {
  id: number;
  name: string;
  location: string;
  specialty: string;
  artworks: Artwork[];
  followers: string;
}

interface BillingDetails {
  fullName: string;
  email: string;
  address: string;
}

interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Buy = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({ number: "", expiry: "", cvc: "" });
  const [upiId, setUpiId] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    fullName: "",
    email: "",
    address: ""
  });

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artist, setArtist] = useState<Omit<Artist, 'artworks' | 'followers'> | null>(null);

  // Mock artists data
  const artists: Artist[] = [
    {
      id: 1,
      name: "MAYA STORM",
      location: "TOKYO, JAPAN",
      specialty: "DIGITAL ABSTRACT",
      followers: "12.5K",
      artworks: [
        { id: 1, title: "NEON DREAMS", price: "$2,500", likes: 847, views: "3.2K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop", description: "A vibrant digital artwork featuring neon colors and abstract shapes" },
        { id: 2, title: "CYBER PULSE", price: "$3,200", likes: 1205, views: "5.1K", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop", description: "Futuristic cyberpunk style digital art with glowing elements" },
        { id: 3, title: "VOID MATTER", price: "$1,800", likes: 623, views: "2.8K", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop", description: "Dark and mysterious abstract composition exploring the void" }
      ]
    },
    {
      id: 2,
      name: "ALEX CHROME",
      location: "BERLIN, GERMANY",
      specialty: "3D SCULPTURES",
      followers: "8.7K",
      artworks: [
        { id: 4, title: "METAL SOUL", price: "$5,500", likes: 1456, views: "7.3K", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", description: "Industrial metal sculpture with intricate details" },
        { id: 5, title: "IRON WHISPERS", price: "$4,200", likes: 892, views: "4.1K", image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&h=600&fit=crop", description: "Delicate metalwork with flowing, organic forms" },
        { id: 6, title: "CHROME HEART", price: "$6,800", likes: 2134, views: "9.5K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop", description: "Highly polished chrome sculpture with heart motif" }
      ]
    },
    {
      id: 3,
      name: "ZARA PIXEL",
      location: "NYC, USA",
      specialty: "GLITCH ART",
      followers: "15.2K",
      artworks: [
        { id: 7, title: "BROKEN REALITY", price: "$3,800", likes: 1789, views: "6.7K", image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=600&fit=crop", description: "Glitch art exploring digital distortion" },
        { id: 8, title: "DATA CORRUPTION", price: "$2,900", likes: 1023, views: "4.9K", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop", description: "Digital art piece visualizing data errors" },
        { id: 9, title: "SYSTEM ERROR", price: "$4,500", likes: 1567, views: "8.2K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop", description: "Abstract representation of digital system failures" }
      ]
    },
    {
      id: 4,
      name: "RIO BLAZE",
      location: "SÃO PAULO, BRAZIL",
      specialty: "STREET MURALS",
      followers: "22.1K",
      artworks: [
        { id: 10, title: "URBAN FIRE", price: "$7,200", likes: 3456, views: "12.8K", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", description: "Vibrant street mural depicting urban energy" },
        { id: 11, title: "CITY SOUL", price: "$5,900", likes: 2187, views: "9.3K", image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&h=600&fit=crop", description: "Mural capturing the essence of city life" },
        { id: 12, title: "CONCRETE DREAMS", price: "$6,500", likes: 2834, views: "11.1K", image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=600&fit=crop", description: "Large-scale urban artwork on concrete walls" }
      ]
    },
    {
      id: 5,
      name: "LUNA FROST",
      location: "REYKJAVIK, ICELAND",
      specialty: "ICE SCULPTURES",
      followers: "9.8K",
      artworks: [
        { id: 13, title: "FROZEN LIGHT", price: "$8,900", likes: 1876, views: "7.4K", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop", description: "Ice sculpture capturing the play of light" },
        { id: 14, title: "ARCTIC VISION", price: "$7,500", likes: 1432, views: "5.9K", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop", description: "Sculpture inspired by Arctic landscapes" },
        { id: 15, title: "CRYSTAL MEMORIES", price: "$9,200", likes: 2198, views: "8.7K", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", description: "Intricate crystal-like ice formations" }
      ]
    }
  ];

  // Find the artwork and artist when the component mounts or artworkId changes
  useEffect(() => {
    if (artworkId) {
      // Find the artwork and artist in our mock data
      for (const artistData of artists) {
        const foundArtwork = artistData.artworks.find(a => a.id === parseInt(artworkId));
        if (foundArtwork) {
          setArtwork(foundArtwork);
          // Extract only the artist properties we need
          const { artworks, followers, ...artistInfo } = artistData;
          setArtist(artistInfo);
          break;
        }
      }
    }
  }, [artworkId]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    // Validate billing details
    if (!billingDetails.fullName) errors.fullName = "FULL NAME IS REQUIRED";
    if (!billingDetails.email) errors.email = "EMAIL IS REQUIRED";
    if (!billingDetails.address) errors.address = "ADDRESS IS REQUIRED";
    
    // Validate payment details
    if (paymentMethod === "card") {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
        errors.card = "CARD NUMBER MUST BE 16 DIGITS";
      }
      if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiry)) {
        errors.expiry = "INVALID EXPIRY (MM/YY)";
      }
      if (!cardDetails.cvc || cardDetails.cvc.length !== 3) {
        errors.cvc = "CVC MUST BE 3 DIGITS";
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !/.+@.+/.test(upiId)) {
        errors.upi = "INVALID UPI ID";
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 2000);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="card" className="block text-black font-black uppercase mb-2">CARD NUMBER</label>
              <input
                type="text"
                id="card"
                className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              {validationErrors.card && (
                <p className="text-red-600 font-black text-sm mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.card}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiry" className="block text-black font-black uppercase mb-2">EXPIRY</label>
                <input
                  type="text"
                  id="expiry"
                  className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                {validationErrors.expiry && (
                  <p className="text-red-600 font-black text-sm mt-1">{validationErrors.expiry}</p>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="cvc" className="block text-black font-black uppercase mb-2">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                />
                {validationErrors.cvc && (
                  <p className="text-red-600 font-black text-sm mt-1">{validationErrors.cvc}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="upiId" className="block text-black font-black uppercase mb-2">UPI ID</label>
              <input
                type="text"
                id="upiId"
                className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
                placeholder="YOURNAME@BANK"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              {validationErrors.upi && (
                <p className="text-red-600 font-black text-sm mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.upi}
                </p>
              )}
            </div>
            <div className="bg-white border-4 border-black p-6 text-center">
              <h3 className="font-black uppercase mb-4">OR SCAN TO PAY</h3>
              <div className="flex justify-center mb-4">
                <QrCode className="w-32 h-32 text-black" />
              </div>
              <p className="text-sm font-bold">OPEN YOUR UPI APP AND SCAN THE QR CODE TO COMPLETE THE PAYMENT.</p>
            </div>
          </div>
        );
      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="bank" className="block text-black font-black uppercase mb-2">SELECT YOUR BANK</label>
              <select
                id="bank"
                className="w-full p-3 border-4 border-black bg-white font-bold uppercase focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
              >
                <option value="">SELECT BANK</option>
                <option value="sbi">STATE BANK OF INDIA</option>
                <option value="icici">ICICI BANK</option>
                <option value="hdfc">HDFC BANK</option>
                <option value="axis">AXIS BANK</option>
                <option value="other">OTHER</option>
              </select>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center">
              <p className="font-black uppercase">YOU WILL BE REDIRECTED TO YOUR BANK'S WEBSITE TO COMPLETE THE TRANSACTION.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Show loading state while data is being loaded
  if (!artwork || !artist) {
    return (
      <div className="min-h-screen bg-lime-300 flex items-center justify-center">
        <div className="text-xl font-bold">Loading artwork details...</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-lime-400 flex items-center justify-center p-6">
        <div className="bg-white border-4 border-black p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-black text-black mb-4 uppercase">PURCHASE COMPLETED!</h2>
          <p className="text-lg font-bold text-black mb-6">YOUR ARTWORK PURCHASE HAS BEEN CONFIRMED</p>
          <div className="w-full h-4 bg-gradient-to-r from-green-400 to-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lime-300 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Button */}
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center space-x-2 bg-white border-4 border-black px-6 py-3 font-black text-black uppercase tracking-wider hover:bg-gray-200 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>BACK TO COMMUNITY</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artwork & Artist Info */}
          <div className="space-y-8">
            {/* Artwork Image */}
            <div className="relative border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <img src={artwork.image} alt={artwork.title} className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-4xl font-black uppercase">{artwork.title}</h1>
                <p className="text-2xl font-bold mt-2">{artwork.price}</p>
              </div>
            </div>

            {/* Artist Info */}
            <div className="border-4 border-black p-6 bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-4">ARTIST: {artist.name}</h2>
              <div className="flex items-center space-x-4 text-black font-bold uppercase">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{artist.specialty}</span>
                </div>
                <div className="w-2 h-2 bg-black"></div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{artist.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-4 border-black p-6 bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-4">DESCRIPTION</h2>
              <p className="text-black font-bold leading-relaxed">{artwork.description}</p>
            </div>
          </div>

          {/* Billing Details & Payment Form */}
          <div className="border-4 border-black p-6 bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 text-center">BILLING DETAILS</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Billing Information */}
              <div>
                <label htmlFor="fullName" className="block text-black font-black uppercase mb-2">FULL NAME</label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
                  placeholder="JOHN DOE"
                  value={billingDetails.fullName}
                  onChange={(e) => setBillingDetails({ ...billingDetails, fullName: e.target.value })}
                  required
                />
                {validationErrors.fullName && (
                  <p className="text-red-600 font-black text-sm mt-1">{validationErrors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-black font-black uppercase mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200"
                  placeholder="YOUR@EMAIL.COM"
                  value={billingDetails.email}
                  onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-600 font-black text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-black font-black uppercase mb-2">SHIPPING ADDRESS</label>
                <textarea
                  id="address"
                  rows={3}
                  className="w-full p-3 border-4 border-black bg-white font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-200 transition-colors duration-200 resize-none"
                  placeholder="STREET, CITY, STATE, ZIP"
                  value={billingDetails.address}
                  onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                  required
                />
                {validationErrors.address && (
                  <p className="text-red-600 font-black text-sm mt-1">{validationErrors.address}</p>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="border-t-4 border-black pt-6">
                <h3 className="text-xl font-black uppercase mb-4">SELECT PAYMENT METHOD</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center p-4 border-4 border-black font-black uppercase transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 ${paymentMethod === 'card' ? 'bg-cyan-300 text-black' : 'bg-white text-black hover:bg-purple-200'}`}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    CREDIT CARD
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-center p-4 border-4 border-black font-black uppercase transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 ${paymentMethod === 'upi' ? 'bg-cyan-300 text-black' : 'bg-white text-black hover:bg-orange-200'}`}
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`flex items-center justify-center p-4 border-4 border-black font-black uppercase transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 ${paymentMethod === 'netbanking' ? 'bg-cyan-300 text-black' : 'bg-white text-black hover:bg-lime-200'}`}
                  >
                    <Banknote className="w-5 h-5 mr-2" />
                    NETBANKING
                  </button>
                </div>

                {/* Dynamic Payment Fields */}
                {renderPaymentFields()}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-4 border-black font-black px-12 py-6 text-xl uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      PROCESSING...
                    </div>
                  ) : (
                    "COMPLETE PURCHASE"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;