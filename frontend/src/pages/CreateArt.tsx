import React, { useState, useRef } from 'react';
import { 
  Camera, X, Upload, Image as ImageIcon, 
  Save, ArrowLeft, Palette, Hash, 
  Type, FileText, Globe, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// TypeScript interfaces (no changes)
interface ArtworkPost {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  visibility: 'public' | 'private' | 'unlisted';
  createdAt: string;
}

// NOTE: Styles are derived from the 'neo-brutalism' theme object provided.
const theme = {
  cardClass: 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] transform transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1',
  buttonClass: 'bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150',
  primaryButton: 'bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150',
  secondaryButton: 'bg-blue-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150',
  accentButton: 'bg-green-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-black text-black uppercase tracking-wide hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150',
  headingClass: 'font-black text-black uppercase tracking-wider',
  inputClass: 'border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-yellow-100 transition-colors w-full',
  background: 'bg-gradient-to-br from-yellow-200 to-pink-200',
};


const CreateArt: React.FC = () => {
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Partial<ArtworkPost>>({
    title: '',
    description: '',
    category: 'Digital Art',
    tags: [],
    visibility: 'public'
  });
  const [newTag, setNewTag] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // All logic functions remain the same...
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setArtwork(prev => ({ ...prev, image: e.target!.result as string }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (field: keyof ArtworkPost, value: any) => setArtwork(prev => ({ ...prev, [field]: value }));
  const handleAddTag = () => {
    if (newTag.trim() && !artwork.tags?.includes(newTag.trim())) {
      setArtwork(prev => ({ ...prev, tags: [...(prev.tags || []), newTag.trim()] }));
      setNewTag('');
    }
  };
  const handleRemoveTag = (tagToRemove: string) => setArtwork(prev => ({ ...prev, tags: prev.tags?.filter(tag => tag !== tagToRemove) || [] }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting artwork:', artwork);
    navigate('/profile');
  };
  const categories = ['Digital Art', 'Traditional Art', '3D Art', 'Photography', 'Mixed Media', 'Illustration', 'Sculpture', 'Painting', 'Drawing', 'Other'];

  return (
    <div className={`min-h-screen p-4 md:p-8 ${theme.background}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-4 py-2 ${theme.secondaryButton}`}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className={`text-3xl ${theme.headingClass}`}>Create Art Post</h1>
          <div className="w-32"></div> {/* Spacer */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Image Upload Section */}
          <div className={`${theme.cardClass} p-6`}>
            <h2 className={`text-xl ${theme.headingClass} mb-4 flex items-center gap-2`}>
              <Camera size={24} />
              Artwork Image
            </h2>
            
            <div className="flex flex-col items-center justify-center p-8 border-4 border-dashed border-black">
              {artwork.image ? (
                <div className="relative w-full max-w-md border-4 border-black">
                  <img src={artwork.image} alt="Artwork preview" className="w-full h-auto" />
                  <button
                    type="button"
                    onClick={() => setArtwork(prev => ({ ...prev, image: undefined }))}
                    className={`absolute top-2 right-2 p-2 ${theme.primaryButton}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon size={64} className="text-black mb-4" />
                  <p className="text-black mb-4 text-center font-semibold">
                    {isUploading ? 'UPLOADING...' : 'DRAG & DROP OR SELECT FILE'}
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className={`px-6 py-3 flex items-center gap-2 ${theme.accentButton} disabled:bg-gray-400 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0`}
                  >
                    <Upload size={20} />
                    {isUploading ? 'Uploading...' : 'Select Image'}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className={`${theme.cardClass} p-6`}>
            <h2 className={`text-xl ${theme.headingClass} mb-6 flex items-center gap-2`}>
              <FileText size={24} />
              Artwork Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2 uppercase">
                  <Type size={16} /> Title
                </label>
                <input
                  type="text" value={artwork.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={theme.inputClass}
                  placeholder="A Captivating Title" required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase">Description</label>
                <textarea
                  value={artwork.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`${theme.inputClass} h-32 resize-none`}
                  placeholder="Inspiration, techniques, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2 uppercase">
                  <Palette size={16} /> Category
                </label>
                <select
                  value={artwork.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`${theme.inputClass} appearance-none`}
                >
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2 uppercase">
                  <Hash size={16} /> Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {artwork.tags?.map((tag) => (
                    <span key={tag} className="bg-blue-200 text-black px-3 py-1 text-sm font-bold flex items-center gap-2 border-2 border-black">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="text-black hover:text-red-600"><X size={14} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className={`${theme.inputClass} flex-1`}
                    placeholder="Add tag and press Enter"
                  />
                  <button type="button" onClick={handleAddTag} className={`px-4 ${theme.buttonClass}`}>
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2 uppercase">
                  {artwork.visibility === 'public' ? <Globe size={16} /> : <Lock size={16} />}
                  Visibility
                </label>
                <div className="flex gap-4">
                  {(['public', 'private', 'unlisted'] as const).map((option) => (
                    <label key={option} className="flex items-center gap-2 font-semibold">
                      <input
                        type="radio" name="visibility" value={option}
                        checked={artwork.visibility === option}
                        onChange={(e) => handleInputChange('visibility', e.target.value)}
                        className="w-5 h-5 accent-yellow-300"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex justify-end gap-4">
            <button
              type="button" onClick={() => navigate(-1)}
              className={`px-6 py-3 ${theme.secondaryButton}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!artwork.image || !artwork.title}
              className={`px-8 py-3 flex items-center gap-2 ${theme.primaryButton} disabled:bg-gray-400 disabled:text-gray-600 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed`}
            >
              <Save size={20} />
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArt;