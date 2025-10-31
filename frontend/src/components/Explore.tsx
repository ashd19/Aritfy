"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Users,
  Plus,
  TrendingUp,
  Search,
  MessageSquare,
  Lock,
  Globe,
  Tag,
  Heart,
  Share2,
  Shield,
  Eye,
  Filter,
  Calendar,
  MapPin,
  Sparkles,
  Flame,
  ChevronDown,
  X,
  MessageCircle,
  Activity,
  TrendingDown,
  Coffee,
  Music,
  Camera,
  Code,
  Gamepad2,
  Palette,
  Dumbbell,
  Briefcase,
  GraduationCap,
  Rocket,
  ArrowLeft,
  Send,
  ImageIcon,
  Smile,
  MoreVertical,
  Pin,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Hash,
  Settings,
  UserPlus,
  Crown,
} from "lucide-react";

interface Community {
  id: string;
  name: string;
  members: number;
  description: string;
  isJoined: boolean;
  category: string;
  icon: string;
  isPrivate: boolean;
  tags: string[];
  createdAt: string;
  lastActivity: string;
  posts: number;
  likes: number;
  trending: boolean;
  featured: boolean;
  level: "beginner" | "intermediate" | "advanced";
  location?: string;
  language: string;
  moderators: number;
  rules: string[];
  weeklyActivity: number;
  growthRate: number;
  verified: boolean;
}

interface CommunityCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

// Added new interfaces for chat functionality
interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies: Message[];
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  isPinned: boolean;
  isEdited: boolean;
  attachments?: string[];
  channelId: string;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  type: "text" | "voice" | "announcement";
  isPrivate: boolean;
  memberCount: number;
  lastMessage?: string;
  lastActivity: string;
}

interface CommunityMember {
  id: string;
  username: string;
  avatar: string;
  role: "owner" | "moderator" | "member";
  joinedAt: string;
  isOnline: boolean;
  lastSeen: string;
}

const CommunityDiscovery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDesc, setNewCommunityDesc] = useState("");
  const [newCommunityCategory, setNewCommunityCategory] = useState("art");
  const [newCommunityTags, setNewCommunityTags] = useState<string[]>([]);
  const [newCommunityPrivate, setNewCommunityPrivate] = useState(false);
  const [sortBy, setSortBy] = useState("members");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showOnlyJoined, setShowOnlyJoined] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const [currentView, setCurrentView] = useState<"discovery" | "community">(
    "discovery"
  );
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [selectedChannel, setSelectedChannel] = useState<string>("general");
  const [messageInput, setMessageInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories: CommunityCategory[] = [
    {
      id: "all",
      name: "All Communities",
      icon: <Users size={18} />,
      color: "bg-gray-500",
    },
    {
      id: "art",
      name: "Art & Design",
      icon: <Palette size={18} />,
      color: "bg-pink-500",
    },
    {
      id: "digital",
      name: "Digital Art",
      icon: <TrendingUp size={18} />,
      color: "bg-purple-500",
    },
    {
      id: "traditional",
      name: "Traditional Art",
      icon: <MessageSquare size={18} />,
      color: "bg-orange-500",
    },
    {
      id: "tech",
      name: "Technology",
      icon: <Code size={18} />,
      color: "bg-blue-500",
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: <Gamepad2 size={18} />,
      color: "bg-green-500",
    },
    {
      id: "music",
      name: "Music",
      icon: <Music size={18} />,
      color: "bg-red-500",
    },
    {
      id: "photography",
      name: "Photography",
      icon: <Camera size={18} />,
      color: "bg-indigo-500",
    },
    {
      id: "fitness",
      name: "Fitness",
      icon: <Dumbbell size={18} />,
      color: "bg-yellow-500",
    },
    {
      id: "education",
      name: "Education",
      icon: <GraduationCap size={18} />,
      color: "bg-teal-500",
    },
    {
      id: "business",
      name: "Business",
      icon: <Briefcase size={18} />,
      color: "bg-cyan-500",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      icon: <Coffee size={18} />,
      color: "bg-amber-500",
    },
  ];

  const availableTags = [
    "beginner-friendly",
    "advanced",
    "weekly-challenges",
    "tutorials",
    "showcase",
    "feedback",
    "collaboration",
    "contests",
    "resources",
    "networking",
    "mentorship",
    "open-source",
    "freelance",
    "career",
    "inspiration",
    "critique",
    "community-driven",
    "international",
    "local",
    "online-events",
    "workshops",
    "live-streams",
    "Q&A",
    "trending",
    "featured",
    "verified",
    "active",
    "growing",
    "established",
  ];

  const [communities, setCommunities] = useState<Community[]>([
    {
      id: "1",
      name: "Digital Painters United",
      members: 24853,
      description:
        "The ultimate hub for digital painting techniques, tutorials, and masterpiece showcases. Join thousands of artists pushing the boundaries of digital art.",
      isJoined: false,
      category: "digital",
      icon: "🎨",
      isPrivate: false,
      tags: ["tutorials", "showcase", "feedback", "advanced"],
      createdAt: "2023-01-15",
      lastActivity: "2 hours ago",
      posts: 15420,
      likes: 89650,
      trending: true,
      featured: true,
      level: "intermediate",
      location: "Global",
      language: "English",
      moderators: 12,
      rules: [
        "Be respectful",
        "No spam",
        "Original content only",
        "Constructive feedback",
      ],
      weeklyActivity: 95,
      growthRate: 15.2,
      verified: true,
    },
    {
      id: "2",
      name: "Sculpture Masters Guild",
      members: 18765,
      description:
        "Elite community for sculptors working in clay, stone, metal, and modern materials. Share techniques and get expert critiques.",
      isJoined: true,
      category: "traditional",
      icon: "🗿",
      isPrivate: true,
      tags: ["advanced", "critique", "mentorship", "established"],
      createdAt: "2022-08-20",
      lastActivity: "1 hour ago",
      posts: 8930,
      likes: 45200,
      trending: false,
      featured: true,
      level: "advanced",
      location: "Europe & Americas",
      language: "English",
      moderators: 8,
      rules: [
        "Portfolio required",
        "Professional conduct",
        "No commercial posts",
        "Quality over quantity",
      ],
      weeklyActivity: 78,
      growthRate: 8.5,
      verified: true,
    },
    {
      id: "3",
      name: "Pixel Art Revolution",
      members: 31521,
      description:
        "From 8-bit nostalgia to modern pixel masterpieces. Learn, create, and celebrate the art of the pixel with fellow enthusiasts.",
      isJoined: false,
      category: "digital",
      icon: "👾",
      isPrivate: false,
      tags: ["beginner-friendly", "tutorials", "contests", "retro"],
      createdAt: "2023-03-10",
      lastActivity: "30 minutes ago",
      posts: 22100,
      likes: 156780,
      trending: true,
      featured: false,
      level: "beginner",
      location: "Global",
      language: "Multiple",
      moderators: 15,
      rules: [
        "All skill levels welcome",
        "Share your process",
        "Weekly challenges",
        "Help newcomers",
      ],
      weeklyActivity: 92,
      growthRate: 22.8,
      verified: false,
    },
    {
      id: "4",
      name: "Watercolor Dreamscapes",
      members: 12421,
      description:
        "Dive into the fluid world of watercolors. From landscapes to portraits, explore techniques that make colors dance on paper.",
      isJoined: false,
      category: "traditional",
      icon: "🌊",
      isPrivate: false,
      tags: ["tutorials", "landscape", "beginner-friendly", "inspiration"],
      createdAt: "2023-05-22",
      lastActivity: "4 hours ago",
      posts: 6780,
      likes: 34500,
      trending: false,
      featured: false,
      level: "beginner",
      location: "Global",
      language: "English",
      moderators: 5,
      rules: [
        "Share your journey",
        "Encourage others",
        "Process photos welcome",
        "No harsh criticism",
      ],
      weeklyActivity: 65,
      growthRate: 12.1,
      verified: false,
    },
    {
      id: "5",
      name: "Vector Visionaries Pro",
      members: 19876,
      description:
        "Professional vector artists creating logos, illustrations, and brand identities. Where precision meets creativity.",
      isJoined: true,
      category: "digital",
      icon: "🔷",
      isPrivate: true,
      tags: ["professional", "branding", "advanced", "networking"],
      createdAt: "2022-11-08",
      lastActivity: "1 hour ago",
      posts: 11200,
      likes: 67800,
      trending: false,
      featured: true,
      level: "advanced",
      location: "Global",
      language: "English",
      moderators: 10,
      rules: [
        "Professional work only",
        "No self-promotion",
        "Constructive feedback",
        "Respect IP rights",
      ],
      weeklyActivity: 88,
      growthRate: 6.3,
      verified: true,
    },
    {
      id: "6",
      name: "Street Art Collective",
      members: 27234,
      description:
        "Urban art from around the globe. Murals, graffiti, stencils, and street installations that transform cities into galleries.",
      isJoined: false,
      category: "art",
      icon: "🏙️",
      isPrivate: false,
      tags: ["urban", "photography", "culture", "global"],
      createdAt: "2023-02-14",
      lastActivity: "2 hours ago",
      posts: 18900,
      likes: 145600,
      trending: true,
      featured: false,
      level: "intermediate",
      location: "Global",
      language: "Multiple",
      moderators: 18,
      rules: [
        "Respect local laws",
        "Credit artists",
        "Location tags required",
        "No vandalism promotion",
      ],
      weeklyActivity: 91,
      growthRate: 18.7,
      verified: false,
    },
    {
      id: "7",
      name: "AI Art Pioneers",
      members: 45600,
      description:
        "Exploring the frontier of AI-generated art. Prompts, techniques, ethics, and the future of creative collaboration with machines.",
      isJoined: true,
      category: "tech",
      icon: "🤖",
      isPrivate: false,
      tags: ["AI", "innovation", "future", "experimental"],
      createdAt: "2023-01-05",
      lastActivity: "15 minutes ago",
      posts: 28700,
      likes: 234500,
      trending: true,
      featured: true,
      level: "intermediate",
      location: "Global",
      language: "English",
      moderators: 25,
      rules: [
        "Disclose AI usage",
        "Discuss ethics",
        "Share prompts",
        "Respect human artists",
      ],
      weeklyActivity: 97,
      growthRate: 35.2,
      verified: true,
    },
    {
      id: "8",
      name: "Indie Game Devs",
      members: 38900,
      description:
        "Solo developers and small teams creating amazing indie games. Share progress, get feedback, find collaborators.",
      isJoined: false,
      category: "gaming",
      icon: "🎮",
      isPrivate: false,
      tags: ["gamedev", "indie", "collaboration", "feedback"],
      createdAt: "2022-09-12",
      lastActivity: "1 hour ago",
      posts: 24500,
      likes: 178900,
      trending: true,
      featured: false,
      level: "intermediate",
      location: "Global",
      language: "English",
      moderators: 20,
      rules: [
        "Show your work",
        "Help others",
        "No asset flipping",
        "Constructive criticism only",
      ],
      weeklyActivity: 89,
      growthRate: 19.4,
      verified: false,
    },
  ]);

  // Mock data for channels and messages
  const [channels] = useState<Channel[]>([
    {
      id: "general",
      name: "general",
      description: "General discussion",
      type: "text",
      isPrivate: false,
      memberCount: 1250,
      lastMessage: "Hey everyone! Check out my latest artwork...",
      lastActivity: "2 minutes ago",
    },
    {
      id: "showcase",
      name: "showcase",
      description: "Show off your work",
      type: "text",
      isPrivate: false,
      memberCount: 890,
      lastMessage: "Amazing digital painting! Love the colors",
      lastActivity: "5 minutes ago",
    },
    {
      id: "tutorials",
      name: "tutorials",
      description: "Share and request tutorials",
      type: "text",
      isPrivate: false,
      memberCount: 650,
      lastMessage: "New Photoshop tutorial series starting tomorrow",
      lastActivity: "1 hour ago",
    },
    {
      id: "feedback",
      name: "feedback",
      description: "Get constructive feedback",
      type: "text",
      isPrivate: false,
      memberCount: 420,
      lastMessage: "Looking for critique on my character design",
      lastActivity: "3 hours ago",
    },
    {
      id: "announcements",
      name: "announcements",
      description: "Important community updates",
      type: "announcement",
      isPrivate: false,
      memberCount: 2100,
      lastMessage: "Monthly art contest winners announced!",
      lastActivity: "1 day ago",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "user1",
      username: "ArtMaster2024",
      avatar: "🎨",
      content:
        "Hey everyone! Just finished my latest digital painting. What do you think?",
      timestamp: "2024-01-15T10:30:00Z",
      replies: [],
      likes: 15,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      isPinned: false,
      isEdited: false,
      attachments: ["/digital-painting-artwork.jpg"],
      channelId: "general",
    },
    {
      id: "2",
      userId: "user2",
      username: "PixelPro",
      avatar: "👾",
      content:
        "Wow! The color composition is incredible. How long did this take you?",
      timestamp: "2024-01-15T10:35:00Z",
      replies: [],
      likes: 8,
      dislikes: 0,
      isLiked: true,
      isDisliked: false,
      isPinned: false,
      isEdited: false,
      channelId: "general",
    },
    {
      id: "3",
      userId: "user3",
      username: "CreativeGuru",
      avatar: "✨",
      content:
        "This is giving me major inspiration for my next project! Mind sharing your brush settings?",
      timestamp: "2024-01-15T10:40:00Z",
      replies: [
        {
          id: "3-1",
          userId: "user1",
          username: "ArtMaster2024",
          avatar: "🎨",
          content:
            "I used a custom texture brush with 60% opacity and flow. DM me for the brush pack!",
          timestamp: "2024-01-15T10:45:00Z",
          replies: [],
          likes: 5,
          dislikes: 0,
          isLiked: false,
          isDisliked: false,
          isPinned: false,
          isEdited: false,
          channelId: "general",
        },
      ],
      likes: 12,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      isPinned: true,
      isEdited: false,
      channelId: "general",
    },
  ]);

  const [communityMembers] = useState<CommunityMember[]>([
    {
      id: "user1",
      username: "ArtMaster2024",
      avatar: "🎨",
      role: "owner",
      joinedAt: "2023-01-15",
      isOnline: true,
      lastSeen: "now",
    },
    {
      id: "user2",
      username: "PixelPro",
      avatar: "👾",
      role: "moderator",
      joinedAt: "2023-02-20",
      isOnline: true,
      lastSeen: "now",
    },
    {
      id: "user3",
      username: "CreativeGuru",
      avatar: "✨",
      role: "member",
      joinedAt: "2023-03-10",
      isOnline: false,
      lastSeen: "2 hours ago",
    },
    {
      id: "user4",
      username: "DigitalDreamer",
      avatar: "🌟",
      role: "member",
      joinedAt: "2023-04-05",
      isOnline: true,
      lastSeen: "now",
    },
  ]);

  // Trigger re-animation when filters change
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [selectedCategory, selectedTags, sortBy]);

  const filteredCommunities = communities
    .filter((community) => {
      const matchesSearch =
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || community.category === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => community.tags.includes(tag));

      const matchesJoinedFilter = !showOnlyJoined || community.isJoined;

      return (
        matchesSearch && matchesCategory && matchesTags && matchesJoinedFilter
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "members":
          return b.members - a.members;
        case "activity":
          return b.weeklyActivity - a.weeklyActivity;
        case "growth":
          return b.growthRate - a.growthRate;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        default:
          return 0;
      }
    });

  const handleJoinCommunity = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCommunities(
        communities.map((community) =>
          community.id === id
            ? {
                ...community,
                isJoined: !community.isJoined,
                members: community.isJoined
                  ? community.members - 1
                  : community.members + 1,
              }
            : community
        )
      );
      const community = communities.find((c) => c.id === id);
      setShowToast(
        community?.isJoined
          ? `Left ${community.name}`
          : `Joined ${community?.name}!`
      );
      setIsLoading(false);
      setTimeout(() => setShowToast(null), 3000);
    }, 500);
  };

  const enterCommunity = (community: Community) => {
    if (!community.isJoined) {
      setShowToast("You need to join this community first!");
      setTimeout(() => setShowToast(null), 3000);
      return;
    }
    setSelectedCommunity(community);
    setCurrentView("community");
    setSelectedChannel("general");
  };

  const backToDiscovery = () => {
    setCurrentView("discovery");
    setSelectedCommunity(null);
    setSelectedChannel("general");
    setMessageInput("");
    setReplyingTo(null);
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: "currentUser",
      username: "You",
      avatar: "😎",
      content: messageInput,
      timestamp: new Date().toISOString(),
      replies: [],
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      isPinned: false,
      isEdited: false,
      channelId: selectedChannel,
    };

    if (replyingTo) {
      setMessages(
        messages.map((msg) =>
          msg.id === replyingTo
            ? { ...msg, replies: [...msg.replies, newMessage] }
            : msg
        )
      );
      setReplyingTo(null);
    } else {
      setMessages([...messages, newMessage]);
    }

    setMessageInput("");
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const handleMessageReaction = (
    messageId: string,
    type: "like" | "dislike"
  ) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          if (type === "like") {
            return {
              ...msg,
              likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1,
              isLiked: !msg.isLiked,
              dislikes: msg.isDisliked ? msg.dislikes - 1 : msg.dislikes,
              isDisliked: false,
            };
          } else {
            return {
              ...msg,
              dislikes: msg.isDisliked ? msg.dislikes - 1 : msg.dislikes + 1,
              isDisliked: !msg.isDisliked,
              likes: msg.isLiked ? msg.likes - 1 : msg.likes,
              isLiked: false,
            };
          }
        }
        return msg;
      })
    );
  };

  const handleCreateCommunity = () => {
    if (!newCommunityName.trim()) return;

    const newCommunity: Community = {
      id: Date.now().toString(),
      name: newCommunityName,
      members: 1,
      description: newCommunityDesc,
      isJoined: true,
      category: newCommunityCategory,
      icon: "🆕",
      isPrivate: newCommunityPrivate,
      tags: newCommunityTags,
      createdAt: new Date().toISOString().split("T")[0],
      lastActivity: "Just now",
      posts: 0,
      likes: 0,
      trending: false,
      featured: false,
      level: "beginner",
      location: "Global",
      language: "English",
      moderators: 1,
      rules: ["Be respectful", "Stay on topic"],
      weeklyActivity: 100,
      growthRate: 0,
      verified: false,
    };

    setCommunities([newCommunity, ...communities]);
    setShowCreateModal(false);
    setNewCommunityName("");
    setNewCommunityDesc("");
    setNewCommunityTags([]);
    setNewCommunityPrivate(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleNewCommunityTag = (tag: string) => {
    setNewCommunityTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getCommunityStats = (community: Community) => {
    return [
      {
        label: "Posts",
        value: community.posts.toLocaleString(),
        icon: <MessageCircle size={14} />,
      },
      {
        label: "Likes",
        value: community.likes.toLocaleString(),
        icon: <Heart size={14} />,
      },
      {
        label: "Activity",
        value: `${community.weeklyActivity}%`,
        icon: <Activity size={14} />,
      },
      {
        label: "Growth",
        value: `+${community.growthRate}%`,
        icon:
          community.growthRate > 0 ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          ),
      },
    ];
  };

  if (currentView === "community" && selectedCommunity) {
    const currentChannelMessages = messages.filter(
      (msg) => msg.channelId === selectedChannel
    );
    const currentChannel = channels.find((ch) => ch.id === selectedChannel);
    const onlineMembers = communityMembers.filter((member) => member.isOnline);

    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-32 h-32 bg-yellow-400 rounded-full -top-16 -left-16 animate-bounce opacity-20 border-4 border-black"></div>
          <div className="absolute w-24 h-24 bg-pink-400 -bottom-12 -right-12 animate-pulse opacity-30 border-4 border-black transform rotate-45"></div>
          <div className="absolute w-20 h-20 bg-green-400 top-1/3 right-20 animate-spin opacity-25 border-4 border-black"></div>
          <div className="absolute w-16 h-16 bg-blue-400 bottom-1/3 left-20 animate-bounce opacity-20 border-4 border-black"></div>
        </div>

        {/* Toast Notifications */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold animate-slideDown">
            {showToast}
          </div>
        )}

        <div className="relative w-full max-w-7xl mx-auto bg-amber-50 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] min-h-screen flex">
          {/* Sidebar */}
          <div className="w-80 bg-white border-r-4 border-black p-4 flex flex-col">
            {/* Community Header */}
            <div className="mb-6">
              <button
                onClick={backToDiscovery}
                className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-200 font-bold border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Back to Discovery
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl animate-bounce">
                  {selectedCommunity.icon}
                </span>
                <div>
                  <h2 className="font-black text-xl">
                    {selectedCommunity.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={14} />
                    <span>
                      {selectedCommunity.members.toLocaleString()} members
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{onlineMembers.length} online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Channels List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Hash size={18} />
                  Channels
                </h3>
                <button className="p-1 hover:bg-gray-200 border border-black">
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full text-left p-3 border-2 border-black transition-all duration-300 transform hover:scale-105 ${
                      selectedChannel === channel.id
                        ? "bg-purple-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-gray-100 hover:bg-gray-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {channel.type === "announcement" ? (
                        <Pin size={16} />
                      ) : (
                        <Hash size={16} />
                      )}
                      <span className="font-bold">#{channel.name}</span>
                      {channel.isPrivate && <Lock size={14} />}
                    </div>
                    <div className="text-xs opacity-75 truncate">
                      {channel.lastMessage}
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      {channel.memberCount} members • {channel.lastActivity}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Online Members */}
            <div className="mt-6">
              <button
                onClick={() => setShowMembersList(!showMembersList)}
                className="flex items-center justify-between w-full mb-3 font-bold text-lg"
              >
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  Online ({onlineMembers.length})
                </div>
                <ChevronDown
                  className={`transform transition-transform ${
                    showMembersList ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>

              {showMembersList && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {onlineMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 border border-black"
                    >
                      <span className="text-lg">{member.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">
                            {member.username}
                          </span>
                          {member.role === "owner" && (
                            <Crown size={12} className="text-yellow-500" />
                          )}
                          {member.role === "moderator" && (
                            <Shield size={12} className="text-blue-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-600">
                          {member.role}
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Channel Header */}
            <div className="bg-white border-b-4 border-black p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash size={24} />
                  <div>
                    <h3 className="font-black text-xl">
                      #{currentChannel?.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {currentChannel?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-200 border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <UserPlus size={18} />
                  </button>
                  <button className="p-2 bg-gray-200 border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentChannelMessages.map((message) => (
                <div key={message.id} className="group">
                  <div
                    className={`bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${
                      message.isPinned ? "border-yellow-500 bg-yellow-50" : ""
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{message.avatar}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {message.username}
                            </span>
                            {message.isPinned && (
                              <Pin size={14} className="text-yellow-600" />
                            )}
                            {message.isEdited && (
                              <span className="text-xs text-gray-500">
                                (edited)
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 border border-black transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Message Content */}
                    <div className="mb-3">
                      <p className="text-gray-800 leading-relaxed">
                        {message.content}
                      </p>
                      {message.attachments &&
                        message.attachments.map((attachment, idx) => (
                          <img
                            key={idx}
                            src={attachment || "/placeholder.svg"}
                            alt="Attachment"
                            className="mt-2 max-w-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                          />
                        ))}
                    </div>

                    {/* Message Actions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          handleMessageReaction(message.id, "like")
                        }
                        className={`flex items-center gap-1 px-2 py-1 border border-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          message.isLiked
                            ? "bg-green-200"
                            : "bg-gray-100 hover:bg-green-100"
                        }`}
                      >
                        <ThumbsUp size={14} />
                        <span className="text-sm font-bold">
                          {message.likes}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          handleMessageReaction(message.id, "dislike")
                        }
                        className={`flex items-center gap-1 px-2 py-1 border border-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          message.isDisliked
                            ? "bg-red-200"
                            : "bg-gray-100 hover:bg-red-100"
                        }`}
                      >
                        <ThumbsDown size={14} />
                        <span className="text-sm font-bold">
                          {message.dislikes}
                        </span>
                      </button>

                      <button
                        onClick={() => setReplyingTo(message.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 border border-black hover:bg-blue-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        <Reply size={14} />
                        <span className="text-sm font-bold">Reply</span>
                      </button>
                    </div>

                    {/* Replies */}
                    {message.replies.length > 0 && (
                      <div className="mt-4 ml-8 space-y-2">
                        {message.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-gray-50 border border-black p-3"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{reply.avatar}</span>
                              <span className="font-bold text-sm">
                                {reply.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(reply.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t-4 border-black p-4">
              {replyingTo && (
                <div className="mb-3 p-2 bg-blue-50 border-2 border-blue-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Reply size={16} />
                    <span className="text-sm font-bold">
                      Replying to message
                    </span>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={`Message #${currentChannel?.name}...`}
                    className="w-full p-3 border-2 border-black focus:outline-none focus:border-purple-500 focus:shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-200 border border-black">
                      <ImageIcon size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 border border-black">
                      <Smile size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-32 h-32 bg-yellow-400 rounded-full -top-16 -left-16 animate-bounce opacity-20 border-4 border-black"></div>
        <div className="absolute w-24 h-24 bg-pink-400 -bottom-12 -right-12 animate-pulse opacity-30 border-4 border-black transform rotate-45"></div>
        <div className="absolute w-20 h-20 bg-green-400 top-1/3 right-20 animate-spin opacity-25 border-4 border-black"></div>
        <div className="absolute w-16 h-16 bg-blue-400 bottom-1/3 left-20 animate-bounce opacity-20 border-4 border-black"></div>
        <div className="absolute w-28 h-28 bg-purple-400 top-20 left-1/3 animate-pulse opacity-15 border-4 border-black rounded-full"></div>
        <div className="absolute w-12 h-12 bg-red-400 bottom-20 right-1/3 animate-spin opacity-30 border-4 border-black"></div>
        <div className="absolute w-36 h-8 bg-orange-400 top-1/2 left-10 animate-bounce opacity-20 border-4 border-black transform rotate-12"></div>
        <div className="absolute w-14 h-14 bg-cyan-400 top-10 right-1/2 animate-pulse opacity-25 border-4 border-black rounded-full"></div>
        <div className="absolute w-10 h-20 bg-lime-400 bottom-10 left-1/2 animate-spin opacity-20 border-4 border-black"></div>
      </div>

      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold animate-slideDown">
          {showToast}
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce"></div>
              <div
                className="w-6 h-6 bg-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <span className="font-bold text-lg ml-2">Processing...</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-7xl mx-auto bg-amber-50 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 border-b-4 border-black pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse">
                Discover Communities
              </h1>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce border-2 border-black"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-400 rounded-full animate-ping border-2 border-black"></div>
            </div>
            <div className="flex gap-2">
              <Sparkles className="text-purple-600 animate-spin" size={24} />
              <Flame className="text-orange-500 animate-pulse" size={24} />
              <Rocket className="text-blue-600 animate-bounce" size={24} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300 transform hover:scale-105"
            >
              {viewMode === "grid" ? <Users size={18} /> : <Filter size={18} />}
              {viewMode === "grid" ? "List View" : "Grid View"}
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 animate-pulse transform hover:scale-110"
            >
              <Plus size={18} className="animate-spin" /> Create Community
            </button>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 animate-pulse"
              size={20}
            />
            <input
              type="text"
              placeholder="Search communities, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-4 border-black focus:outline-none focus:border-purple-500 focus:shadow-[6px_6px_0px_0px_rgba(147,51,234,1)] transition-all duration-300 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 font-bold border-2 border-black transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse`
                    : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 font-bold border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300"
            >
              <Filter size={18} />
              Advanced Filters
              <ChevronDown
                className={`transform transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
                size={16}
              />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-black focus:outline-none focus:border-blue-500 font-bold bg-white"
            >
              <option value="members">Most Members</option>
              <option value="activity">Most Active</option>
              <option value="growth">Fastest Growing</option>
              <option value="newest">Newest</option>
              <option value="trending">Trending</option>
            </select>

            <label className="flex items-center gap-2 font-bold">
              <input
                type="checkbox"
                checked={showOnlyJoined}
                onChange={(e) => setShowOnlyJoined(e.target.checked)}
                className="w-4 h-4 border-2 border-black"
              />
              My Communities Only
            </label>
          </div>

          {/* Tag Filter Dropdown */}
          {showFilters && (
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-slideDown">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Tag size={20} />
                Filter by Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-sm font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? "bg-purple-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-gray-100 hover:bg-gray-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-4 px-4 py-2 bg-red-500 text-white font-bold border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300"
                >
                  Clear All Tags
                </button>
              )}
            </div>
          )}
        </div>

        {/* Communities Display */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredCommunities.map((community, index) => (
            <div
              key={`${community.id}-${animationKey}`}
              className={`bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 transform hover:scale-[1.03] animate-slideUp relative overflow-hidden group ${
                viewMode === "list" ? "flex gap-6" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              {/* Community Header */}
              <div
                className={`${
                  viewMode === "list" ? "flex-shrink-0" : ""
                } relative z-10`}
              >
                <div className="flex items-start justify-between mb-4 mt-8">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-bounce">
                      {community.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-xl">{community.name}</h3>
                        {community.isPrivate && (
                          <Lock size={16} className="text-gray-600" />
                        )}
                        {!community.isPrivate && (
                          <Globe size={16} className="text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Users size={14} />{" "}
                          {community.members.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity size={14} /> {community.weeklyActivity}%
                          active
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-bold border border-black ${
                            community.level === "beginner"
                              ? "bg-green-200"
                              : community.level === "intermediate"
                              ? "bg-yellow-200"
                              : "bg-red-200"
                          }`}
                        >
                          {community.level.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {community.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {community.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-xs font-bold border border-black hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                  {community.tags.length > 4 && (
                    <span className="px-2 py-1 bg-gray-200 text-xs font-bold border border-black">
                      +{community.tags.length - 4} more
                    </span>
                  )}
                </div>

                {/* Community Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  {getCommunityStats(community).map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-gray-50 px-2 py-1 border border-black"
                    >
                      {stat.icon}
                      <span className="font-bold">{stat.label}:</span>
                      <span>{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="text-xs text-gray-600 mb-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} />
                    <span>{community.location}</span>
                    <Calendar size={12} />
                    <span>Created {community.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={12} />
                    <span>{community.moderators} moderators</span>
                    <Eye size={12} />
                    <span>Last active {community.lastActivity}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleJoinCommunity(community.id)}
                    disabled={isLoading}
                    className={`flex-1 py-3 font-bold border-2 border-black transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      community.isJoined
                        ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 animate-pulse"
                    }`}
                  >
                    {isLoading
                      ? "..."
                      : community.isJoined
                      ? "✓ Joined"
                      : "Join Community"}
                  </button>

                  {community.isJoined && (
                    <button
                      onClick={() => enterCommunity(community)}
                      className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300 transform hover:scale-110"
                    >
                      <MessageSquare size={16} />
                    </button>
                  )}

                  <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300 transform hover:scale-110">
                    <Share2 size={16} />
                  </button>

                  <button className="px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300 transform hover:scale-110">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-bounce">😢</div>
            <h3 className="text-2xl font-bold mb-2">No communities found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
                setSelectedCategory("all");
                setShowOnlyJoined(false);
              }}
              className="px-6 py-3 bg-blue-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Enhanced Create Community Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="absolute top-2 left-2 w-4 h-4 bg-purple-400 rounded-full animate-bounce border-2 border-black"></div>
              <div className="absolute top-2 right-16 w-3 h-3 bg-pink-400 rounded-full animate-pulse border-2 border-black"></div>
              <div className="absolute bottom-2 left-4 w-5 h-5 bg-blue-400 rounded-full animate-spin border-2 border-black"></div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 text-2xl font-bold hover:text-red-500 transition-colors hover:scale-125 transform bg-white border-2 border-black w-10 h-10 flex items-center justify-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                ×
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Rocket className="text-purple-600 animate-bounce" size={32} />
                <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Create New Community
                </h2>
                <Sparkles className="text-yellow-500 animate-spin" size={24} />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block font-bold mb-2 text-lg">
                    Community Name *
                  </label>
                  <input
                    type="text"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                    className="w-full p-4 border-2 border-black focus:outline-none focus:border-purple-500 focus:shadow-[6px_6px_0px_0px_rgba(147,51,234,1)] transition-all duration-300 text-lg"
                    placeholder="Enter an awesome community name"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-lg">
                    Description *
                  </label>
                  <textarea
                    value={newCommunityDesc}
                    onChange={(e) => setNewCommunityDesc(e.target.value)}
                    className="w-full p-4 border-2 border-black focus:outline-none focus:border-purple-500 focus:shadow-[6px_6px_0px_0px_rgba(147,51,234,1)] transition-all duration-300 text-lg"
                    rows={4}
                    placeholder="Describe what makes your community special..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold mb-2 text-lg">
                      Category
                    </label>
                    <select
                      value={newCommunityCategory}
                      onChange={(e) => setNewCommunityCategory(e.target.value)}
                      className="w-full p-4 border-2 border-black focus:outline-none focus:border-purple-500 focus:shadow-[6px_6px_0px_0px_rgba(147,51,234,1)] transition-all duration-300 text-lg"
                    >
                      {categories
                        .filter((cat) => cat.id !== "all")
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 font-bold text-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newCommunityPrivate}
                        onChange={(e) =>
                          setNewCommunityPrivate(e.target.checked)
                        }
                        className="w-5 h-5 border-2 border-black"
                      />
                      <Lock size={20} />
                      Private Community
                    </label>
                    <p className="text-sm text-gray-600 mt-1 ml-8">
                      {newCommunityPrivate
                        ? "Invite-only community"
                        : "Open to everyone"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-3 text-lg flex items-center gap-2">
                    <Tag size={20} />
                    Community Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleNewCommunityTag(tag)}
                        className={`px-3 py-2 text-sm font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 ${
                          newCommunityTags.includes(tag)
                            ? "bg-purple-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-white hover:bg-purple-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Selected: {newCommunityTags.length} tags
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleCreateCommunity}
                    disabled={
                      !newCommunityName.trim() || !newCommunityDesc.trim()
                    }
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg animate-pulse transform hover:scale-105"
                  >
                    🚀 Create Community
                  </button>

                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style> */}
    </div>
  );
};

export default CommunityDiscovery;