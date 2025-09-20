import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, MapPin, Plus, X, Edit3, Save, Eye, Palette, Star, 
  ExternalLink, Mail, Instagram, Twitter, Linkedin, Github, 
  Upload, Image as ImageIcon, Trash2, Settings, 
  Brush, Sparkles, Zap, Moon
} from 'lucide-react';

// TypeScript interfaces
interface ArtworkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

interface SocialLinks {
  email: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
  website: string;
}

interface Profile {
  fullName: string;
  artistName: string;
  bio: string;
  location: string;
  profilePicture: string;
  coverImage: string;
  skills: string[];
  artworks: ArtworkItem[];
  socialLinks: SocialLinks;
  theme: string;
  isPublic: boolean;
}

// Initial empty profile
const initialProfile: Profile = {
  fullName: '',
  artistName: '',
  bio: '',
  location: '',
  profilePicture: '',
  coverImage: '',
  skills: [],
  artworks: [],
  socialLinks: {
    email: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    github: '',
    website: ''
  },
  theme: 'neo-brutalism',
  isPublic: true
};

// Theme configurations
const themes = {
  'neo-brutalism': {
    name: 'Neo-Brutalism',
    description: 'Bold, aggressive, artistic',
    cardClass: 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] transform transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1',
    buttonClass: 'bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150',
    primaryButton: 'bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1',
    secondaryButton: 'bg-blue-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1',
    accentButton: 'bg-green-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1',
    headingClass: 'font-black text-black uppercase tracking-wider',
    inputClass: 'border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-yellow-100 transition-colors',
    background: 'bg-gradient-to-br from-yellow-200 to-pink-200',
    icon: <Brush className="w-5 h-5" />
  },
  'magic-ui': {
    name: 'Magic UI',
    description: 'Animated, mystical, enchanting',
    cardClass: 'bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-md border border-purple-200/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]',
    buttonClass: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold tracking-wide hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg',
    primaryButton: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold tracking-wide hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105',
    secondaryButton: 'bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl font-semibold tracking-wide hover:from-pink-500 hover:to-rose-600 transition-all duration-300 hover:scale-105',
    accentButton: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-semibold tracking-wide hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:scale-105',
    headingClass: 'font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent',
    inputClass: 'border-2 border-purple-200 rounded-xl p-3 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all',
    background: 'bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100',
    icon: <Sparkles className="w-5 h-5" />
  },
  'aceternity': {
    name: 'Aceternity',
    description: 'Futuristic, sleek, tech',
    cardClass: 'bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30',
    buttonClass: 'bg-cyan-500 text-slate-900 rounded-lg font-semibold hover:bg-cyan-400 transition-all duration-300 border border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30',
    primaryButton: 'bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all duration-300 border border-blue-500 hover:shadow-lg hover:shadow-blue-500/30',
    secondaryButton: 'bg-slate-700 text-cyan-400 rounded-lg font-semibold hover:bg-slate-600 transition-all duration-300 border border-slate-600 hover:shadow-lg',
    accentButton: 'bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition-all duration-300 border border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30',
    headingClass: 'font-bold text-slate-100',
    inputClass: 'border border-slate-600 rounded-lg p-3 bg-slate-800/70 text-slate-100 focus:outline-none focus:border-cyan-500 focus:bg-slate-800 transition-all',
    background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    icon: <Zap className="w-5 h-5" />
  },
  'shadcn': {
    name: 'shadcn/ui',
    description: 'Clean, minimal, professional',
    cardClass: 'bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300',
    buttonClass: 'bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 border border-gray-200 hover:shadow-sm',
    primaryButton: 'bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200',
    secondaryButton: 'bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 border border-gray-200',
    accentButton: 'bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-200',
    headingClass: 'font-semibold text-gray-900',
    inputClass: 'border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all',
    background: 'bg-gray-50',
    icon: <Settings className="w-5 h-5" />
  },
  'dark-mode': {
    name: 'Dark Mode',
    description: 'Elegant, mysterious, modern',
    cardClass: 'bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-gray-600',
    buttonClass: 'bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30',
    primaryButton: 'bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30',
    secondaryButton: 'bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300',
    accentButton: 'bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30',
    headingClass: 'font-bold text-white',
    inputClass: 'border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:bg-gray-600 transition-all',
    background: 'bg-gradient-to-br from-gray-900 to-gray-800',
    icon: <Moon className="w-5 h-5" />
  }
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>('');
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const artworkInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const currentTheme = themes[profile.theme as keyof typeof themes];

  // File upload handlers
  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfile(prev => ({ ...prev, profilePicture: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfile(prev => ({ ...prev, coverImage: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtworkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newArtwork: ArtworkItem = {
              id: `artwork_${Date.now()}_${Math.random()}`,
              title: `New Artwork ${profile.artworks.length + 1}`,
              description: 'Click to edit description',
              image: e.target!.result as string,
              category: 'Digital Art',
              featured: false,
              createdAt: new Date().toISOString()
            };
            setProfile(prev => ({
              ...prev,
              artworks: [...prev.artworks, newArtwork]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Profile data handlers
  const handleInputChange = (field: keyof Profile, value: any, e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // If we have an event, use its target value, otherwise use the provided value
    const newValue = e ? e.target.value : value;
    setProfile(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleArtworkUpdate = (artworkId: string, field: keyof ArtworkItem, value: any) => {
    setProfile(prev => ({
      ...prev,
      artworks: prev.artworks.map(artwork =>
        artwork.id === artworkId ? { ...artwork, [field]: value } : artwork
      )
    }));
  };

  const handleDeleteArtwork = (artworkId: string) => {
    setProfile(prev => ({
      ...prev,
      artworks: prev.artworks.filter(artwork => artwork.id !== artworkId)
    }));
  };

  const toggleArtworkFeatured = (artworkId: string) => {
    setProfile(prev => ({
      ...prev,
      artworks: prev.artworks.map(artwork =>
        artwork.id === artworkId ? { ...artwork, featured: !artwork.featured } : artwork
      )
    }));
  };

  const handleThemeChange = (themeName: string) => {
    setProfile(prev => ({ ...prev, theme: themeName }));
    setShowThemeSelector(false);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'email': return <Mail size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'github': return <Github size={20} />;
      case 'website': return <ExternalLink size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  // Components
  const ThemeSelector: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`${currentTheme.cardClass} p-6 mb-6`}
    >
      <h3 className={`text-xl ${currentTheme.headingClass} mb-4 flex items-center gap-3`}>
        <Palette size={24} />
        Choose Your Theme
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleThemeChange(key)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              profile.theme === key 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {theme.icon}
              <span className="font-semibold text-lg">{theme.name}</span>
            </div>
            <p className="text-sm text-gray-600">{theme.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const CoverImage: React.FC = () => (
    <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
      {profile.coverImage ? (
        <img
          src={profile.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full ${currentTheme.background} flex items-center justify-center`}>
          <div className="text-center">
            <Camera size={48} className="mx-auto mb-4 opacity-50" />
            <p className="opacity-50 font-semibold">Add Cover Image</p>
          </div>
        </div>
      )}
      
        {isEditing && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => coverInputRef.current?.click()}
          className={`absolute top-4 right-4 ${currentTheme.buttonClass} px-4 py-2 flex items-center gap-2`}
        >
          <Camera size={16} />
          Cover
        </motion.button>
      )}
      
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        onChange={handleCoverImageUpload}
        className="hidden"
      />
    </div>
  );

  const ProfileHeader: React.FC = () => (
    <div className={`${currentTheme.cardClass} overflow-hidden`}>
      <CoverImage />
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-16">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Camera size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className={`absolute bottom-0 right-0 ${currentTheme.accentButton} w-10 h-10 rounded-full flex items-center justify-center`}
              >
                <Camera size={16} />
              </motion.button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>
          
          <div className="flex-1">
      {isEditing ? (
              <div className="space-y-4">
        <input
          type="text"
          value={profile.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value, e)}
                  className={`${currentTheme.inputClass} text-2xl font-bold w-full`}
                  placeholder="Your Full Name"
                />
                <input
                  type="text"
                  value={profile.artistName}
                  onChange={(e) => handleInputChange('artistName', e.target.value, e)}
                  className={`${currentTheme.inputClass} text-lg w-full`}
                  placeholder="Artist Name / Brand"
                />
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
          <input
            type="text"
            value={profile.location}
            onChange={(e) => handleInputChange('location', e.target.value, e)}
                    className={`${currentTheme.inputClass} flex-1`}
                    placeholder="Location"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className={`text-3xl ${currentTheme.headingClass} mb-2`}>{profile.fullName}</h1>
                {profile.artistName && (
                  <p className={`text-xl ${currentTheme.headingClass} opacity-70 mb-2`}>{profile.artistName}</p>
                )}
                <div className="flex items-center gap-2 opacity-70">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const BioSection: React.FC = () => (
    <div className={`${currentTheme.cardClass} p-8`}>
      <h2 className={`text-2xl ${currentTheme.headingClass} mb-6`}>About</h2>
      {isEditing ? (
        <textarea
          value={profile.bio}
          onChange={(e) => handleInputChange('bio', e.target.value, e)}
          className={`w-full h-32 ${currentTheme.inputClass} resize-none`}
          placeholder="Tell your story as an artist. What drives your creativity? What's your artistic journey?"
        />
      ) : (
        <p className="text-lg leading-relaxed">{profile.bio || 'No bio added yet.'}</p>
      )}
    </div>
  );

  const SkillsSection: React.FC = () => (
    <div className={`${currentTheme.cardClass} p-8`}>
      <h2 className={`text-2xl ${currentTheme.headingClass} mb-6`}>Skills & Expertise</h2>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <AnimatePresence>
        {profile.skills.map((skill) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`px-4 py-2 ${currentTheme.secondaryButton} flex items-center gap-2 text-sm font-semibold`}
            >
              {skill}
            {isEditing && (
              <button
                onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-red-500 hover:text-white rounded-full p-1 transition-colors"
              >
                  <X size={14} />
              </button>
            )}
            </motion.span>
        ))}
        </AnimatePresence>
      </div>

      {isEditing && (
        <div className="flex gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            className={`flex-1 ${currentTheme.inputClass}`}
            placeholder="Add a skill (e.g., Digital Painting, 3D Modeling)"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddSkill}
            className={`px-6 py-3 ${currentTheme.accentButton} flex items-center gap-2`}
          >
            <Plus size={16} />
            Add
          </motion.button>
        </div>
      )}
    </div>
  );

  const SocialLinksSection: React.FC = () => (
    <div className={`${currentTheme.cardClass} p-8`}>
      <h2 className={`text-2xl ${currentTheme.headingClass} mb-6`}>Connect</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(profile.socialLinks).map(([platform, value]) => (
          <div key={platform} className="flex items-center gap-3">
            <div className={`p-2 ${currentTheme.secondaryButton} rounded-lg`}>
              {getSocialIcon(platform)}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                className={`flex-1 ${currentTheme.inputClass}`}
                placeholder={`Your ${platform} ${platform === 'email' ? 'address' : 'username'}`}
              />
            ) : value ? (
              <a
                href={platform === 'email' ? `mailto:${value}` : value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-lg hover:underline flex items-center gap-2"
              >
                {platform === 'email' ? value : value.replace(/https?:\/\//, '')}
                {platform !== 'email' && <ExternalLink size={14} />}
              </a>
            ) : (
              <span className="flex-1 text-gray-500">Not provided</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const ArtworksSection: React.FC = () => (
    <div className={`${currentTheme.cardClass} p-8`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl ${currentTheme.headingClass}`}>Artworks</h2>
        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => artworkInputRef.current?.click()}
            className={`${currentTheme.primaryButton} px-6 py-3 flex items-center gap-2`}
          >
            <Upload size={16} />
            Upload Art
          </motion.button>
        )}
      </div>

      <input
        ref={artworkInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleArtworkUpload}
        className="hidden"
      />

      {profile.artworks.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg opacity-70 mb-4">No artworks uploaded yet</p>
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => artworkInputRef.current?.click()}
              className={`${currentTheme.buttonClass} px-8 py-4 flex items-center gap-3 mx-auto`}
            >
              <Upload size={20} />
              Upload Your First Artwork
            </motion.button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {profile.artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative group"
              >
                <div className={`${currentTheme.cardClass} overflow-hidden`}>
                  <div className="relative aspect-square">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleArtworkFeatured(artwork.id)}
                          className={`px-3 py-2 rounded ${
                            artwork.featured 
                              ? 'bg-yellow-400 text-black' 
                              : 'bg-white text-black'
                          } flex items-center gap-2`}
                        >
                          <Star size={14} fill={artwork.featured ? 'black' : 'none'} />
                          {artwork.featured ? 'Featured' : 'Feature'}
                        </motion.button>
                        
                        {isEditing && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteArtwork(artwork.id)}
                            className="px-3 py-2 bg-red-500 text-white rounded flex items-center gap-2"
                          >
                            <Trash2 size={14} />
                            Delete
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={artwork.title}
                          onChange={(e) => handleArtworkUpdate(artwork.id, 'title', e.target.value)}
                          className={`${currentTheme.inputClass} font-semibold text-lg w-full`}
                          placeholder="Artwork Title"
                        />
                        <textarea
                          value={artwork.description}
                          onChange={(e) => handleArtworkUpdate(artwork.id, 'description', e.target.value)}
                          className={`${currentTheme.inputClass} text-sm w-full h-20 resize-none`}
                          placeholder="Description"
                        />
                        <select
                          value={artwork.category}
                          onChange={(e) => handleArtworkUpdate(artwork.id, 'category', e.target.value)}
                          className={`${currentTheme.inputClass} text-sm w-full`}
                        >
                          <option value="Digital Art">Digital Art</option>
                          <option value="Traditional Art">Traditional Art</option>
                          <option value="3D Art">3D Art</option>
                          <option value="Photography">Photography</option>
                          <option value="Mixed Media">Mixed Media</option>
                          <option value="Illustration">Illustration</option>
                          <option value="Sculpture">Sculpture</option>
                          <option value="Painting">Painting</option>
                          <option value="Drawing">Drawing</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{artwork.description}</p>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded">
                          {artwork.category}
                        </span>
                        {artwork.featured && (
                          <div className="mt-2 flex items-center gap-1 text-yellow-600">
                            <Star size={14} fill="currentColor" />
                            <span className="text-xs">Featured</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  const ControlButtons: React.FC = () => (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditing(!isEditing)}
        className={`${isEditing ? currentTheme.primaryButton : currentTheme.secondaryButton} px-6 py-3 flex items-center gap-2 shadow-lg`}
      >
        {isEditing ? (
          <>
            <Save size={20} />
            Save Changes
          </>
        ) : (
          <>
            <Edit3 size={20} />
            Edit Profile
          </>
        )}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowThemeSelector(!showThemeSelector)}
        className={`${currentTheme.accentButton} px-6 py-3 flex items-center gap-2 shadow-lg`}
      >
        <Palette size={20} />
        Change Theme
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPreview(!isPreview)}
        className={`${currentTheme.buttonClass} px-6 py-3 flex items-center gap-2 shadow-lg`}
      >
        <Eye size={20} />
        {isPreview ? 'Exit Preview' : 'Preview'}
      </motion.button>
    </div>
  );

  // Main render
  return (
    <div className={`h-screen ${currentTheme.background} overflow-hidden flex flex-col`}>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
          <AnimatePresence>
            {showThemeSelector && <ThemeSelector />}
          </AnimatePresence>
          
          {isPreview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProfileHeader />
              <BioSection />
              <SkillsSection />
              <ArtworksSection />
              <SocialLinksSection />
            </motion.div>
          ) : (
            <>
              <ProfileHeader />
              <BioSection />
              <SkillsSection />
              <ArtworksSection />
              <SocialLinksSection />
            </>
          )}
        </div>
      </div>
      
      <ControlButtons />
    </div>
  );
};

export default ProfilePage;