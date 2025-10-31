"use client";

import type React from "react";
import { useState } from "react";
import {
  Users,
  Heart,
  Zap,
  Globe,
  Star,
  Target,
  Rocket,
  Coffee,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  funFact: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState("story");
  const [, setHoveredMember] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Thunder",
      role: "Founder & CEO",
      avatar: "🚀",
      bio: "Passionate about building communities that bring people together. Started coding at 12 and never looked back!",
      skills: ["Leadership", "Strategy", "Full-Stack Dev"],
      funFact: "Can solve a Rubik's cube in under 30 seconds",
      social: {
        github: "alexthunder",
        twitter: "alexthunder",
        linkedin: "alexthunder",
      },
    },
    {
      id: 2,
      name: "Maya Pixel",
      role: "Lead Designer",
      avatar: "🎨",
      bio: "UI/UX wizard who believes great design should be both beautiful and functional. Neo-brutalism enthusiast!",
      skills: ["UI/UX Design", "Branding", "Animation"],
      funFact: "Collects vintage design posters from the 80s",
      social: {
        instagram: "mayapixel",
        twitter: "mayapixel",
      },
    },
    {
      id: 3,
      name: "Sam Code",
      role: "Tech Lead",
      avatar: "⚡",
      bio: "Backend architect who loves clean code and scalable systems. Coffee-powered coding machine!",
      skills: ["Backend Dev", "DevOps", "Architecture"],
      funFact: "Has memorized over 200 keyboard shortcuts",
      social: {
        github: "samcode",
        linkedin: "samcode",
      },
    },
    {
      id: 4,
      name: "Luna Vibe",
      role: "Community Manager",
      avatar: "🌙",
      bio: "People person who ensures our community stays vibrant and welcoming. Master of memes and good vibes!",
      skills: ["Community Building", "Content", "Social Media"],
      funFact: "Speaks 5 languages fluently",
      social: {
        twitter: "lunavibe",
        instagram: "lunavibe",
      },
    },
  ];

  const stats: Stat[] = [
    {
      icon: <Users className="animate-bounce" />,
      value: "50K+",
      label: "Active Users",
      color: "bg-purple-500",
    },
    {
      icon: <Globe className="animate-spin" />,
      value: "120+",
      label: "Countries",
      color: "bg-blue-500",
    },
    {
      icon: <Heart className="animate-pulse" />,
      value: "1M+",
      label: "Connections Made",
      color: "bg-pink-500",
    },
    {
      icon: <Zap className="animate-bounce" />,
      value: "99.9%",
      label: "Uptime",
      color: "bg-yellow-500",
    },
  ];

  const values = [
    {
      icon: <Target className="text-red-500" />,
      title: "Mission Driven",
      description:
        "We're on a mission to connect people and build meaningful communities worldwide.",
      color: "border-red-500",
    },
    {
      icon: <Heart className="text-pink-500" />,
      title: "Community First",
      description:
        "Every decision we make puts our community members at the center of everything.",
      color: "border-pink-500",
    },
    {
      icon: <Rocket className="text-purple-500" />,
      title: "Innovation",
      description:
        "We constantly push boundaries to create the best community experience possible.",
      color: "border-purple-500",
    },
    {
      icon: <Star className="text-yellow-500" />,
      title: "Quality",
      description:
        "We believe in delivering exceptional quality in every feature and interaction.",
      color: "border-yellow-500",
    },
  ];

  const milestones = [
    { year: "2020", event: "Founded with a dream", icon: "🌱" },
    { year: "2021", event: "Reached 1K users", icon: "🎉" },
    { year: "2022", event: "Launched mobile app", icon: "📱" },
    { year: "2023", event: "10K communities created", icon: "🏆" },
    { year: "2024", event: "Global expansion", icon: "🌍" },
    { year: "2025", event: "AI-powered features", icon: "🤖" },
  ];

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-32 h-32 bg-yellow-400 rounded-full -top-16 -left-16 animate-bounce opacity-20 border-4 border-black"></div>
        <div className="absolute w-24 h-24 bg-pink-400 -bottom-12 -right-12 animate-pulse opacity-30 border-4 border-black transform rotate-45"></div>
        <div className="absolute w-20 h-20 bg-green-400 top-1/3 right-20 animate-spin opacity-25 border-4 border-black"></div>
        <div className="absolute w-16 h-16 bg-blue-400 bottom-1/3 left-20 animate-bounce opacity-20 border-4 border-black"></div>
        <div className="absolute w-28 h-28 bg-purple-400 top-20 left-1/3 animate-pulse opacity-15 border-4 border-black rounded-full"></div>
        <div className="absolute w-12 h-12 bg-red-400 bottom-20 right-1/3 animate-spin opacity-30 border-4 border-black"></div>
        <div className="absolute w-36 h-8 bg-orange-400 top-1/2 left-10 animate-bounce opacity-20 border-4 border-black transform rotate-12"></div>
        <div className="absolute w-14 h-14 bg-cyan-400 top-10 right-1/2 animate-pulse opacity-25 border-4 border-black rounded-full"></div>
      </div>

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold animate-slideDown">
          {showToast}
        </div>
      )}

      <div className="relative w-full max-w-7xl mx-auto bg-amber-50 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] min-h-screen">
        {/* Header */}
        <div className="p-8 border-b-4 border-black bg-gradient-to-r from-purple-200 to-pink-200">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse">
                About Us
              </h1>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce border-2 border-black"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-400 rounded-full animate-ping border-2 border-black"></div>
            </div>
            <div className="flex gap-2">
              <Sparkles className="text-purple-600 animate-spin" size={32} />
              <Heart className="text-pink-600 animate-pulse" size={32} />
            </div>
          </div>

          <p className="text-xl font-bold text-gray-800 max-w-3xl leading-relaxed">
            We're building the future of online communities - where connections
            are real, conversations matter, and everyone finds their tribe! 🚀
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-6 border-b-4 border-black bg-white">
          {["story", "team", "values", "stats"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 font-bold border-2 border-black transition-all duration-300 transform hover:scale-105 ${
                activeSection === section
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-gray-100 hover:bg-gray-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Our Story Section */}
          {activeSection === "story" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl animate-bounce">📖</div>
                  <h2 className="text-3xl font-black">Our Story</h2>
                </div>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    It all started in 2020 when our founder Alex was feeling
                    disconnected during the pandemic. Existing social platforms
                    felt cold and algorithmic - we wanted something different.
                  </p>
                  <p>
                    We envisioned a place where communities could thrive with
                    authentic connections, meaningful conversations, and a
                    design that actually makes you smile! Thus, our
                    neo-brutalist community platform was born. 🎨
                  </p>
                  <p>
                    Today, we're proud to host thousands of vibrant communities
                    where people share passions, learn together, and build
                    lasting friendships. Every pixel is crafted with love! ❤️
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Calendar className="animate-bounce" />
                  Our Journey
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl animate-pulse">
                          {milestone.icon}
                        </span>
                        <span className="font-black text-purple-600">
                          {milestone.year}
                        </span>
                      </div>
                      <p className="font-bold">{milestone.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Section */}
          {activeSection === "team" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                  <Users className="animate-bounce" />
                  Meet Our Amazing Team
                </h2>
                <p className="text-xl font-bold text-gray-700">
                  The incredible humans behind the magic! ✨
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:scale-105"
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl animate-bounce">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black">{member.name}</h3>
                        <p className="text-purple-600 font-bold">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-black text-sm font-bold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-yellow-100 border-2 border-black">
                      <p className="text-sm font-bold">
                        <span className="text-yellow-600">Fun Fact:</span>{" "}
                        {member.funFact}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {member.social.github && (
                        <button
                          onClick={() =>
                            showToastMessage(
                              `Visiting ${member.name}'s GitHub!`
                            )
                          }
                          className="p-2 bg-gray-800 text-white border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          <Github size={16} />
                        </button>
                      )}
                      {member.social.twitter && (
                        <button
                          onClick={() =>
                            showToastMessage(
                              `Following ${member.name} on Twitter!`
                            )
                          }
                          className="p-2 bg-blue-500 text-white border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          <Twitter size={16} />
                        </button>
                      )}
                      {member.social.linkedin && (
                        <button
                          onClick={() =>
                            showToastMessage(
                              `Connecting with ${member.name} on LinkedIn!`
                            )
                          }
                          className="p-2 bg-blue-700 text-white border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          <Linkedin size={16} />
                        </button>
                      )}
                      {member.social.instagram && (
                        <button
                          onClick={() =>
                            showToastMessage(
                              `Following ${member.name} on Instagram!`
                            )
                          }
                          className="p-2 bg-pink-500 text-white border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          <Instagram size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Section */}
          {activeSection === "values" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                  <Star className="animate-spin" />
                  Our Values
                </h2>
                <p className="text-xl font-bold text-gray-700">
                  The principles that guide everything we do! 🌟
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className={`bg-white border-4 ${value.color} p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl animate-bounce">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-black">{value.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white text-center">
                <h3 className="text-3xl font-black mb-4">Join Our Mission!</h3>
                <p className="text-xl mb-6 leading-relaxed">
                  Ready to be part of something amazing? Let's build the future
                  of communities together! 🚀
                </p>
                <button
                  onClick={() =>
                    showToastMessage("Welcome to the community! 🎉")
                  }
                  className="px-8 py-4 bg-white text-purple-600 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Get Started Now
                  <ArrowRight className="animate-bounce" />
                </button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          {activeSection === "stats" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                  <Trophy className="animate-bounce" />
                  Our Impact
                </h2>
                <p className="text-xl font-bold text-gray-700">
                  Numbers that make us proud! 📊
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.color} text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:scale-105 text-center`}
                  >
                    <div className="text-4xl mb-4 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black mb-2">{stat.value}</div>
                    <div className="text-lg font-bold opacity-90">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Stats */}
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black mb-6 text-center">
                  More Amazing Stats!
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-black">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-xl font-black">2.5s</div>
                    <div className="font-bold text-gray-700">Avg Load Time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-black">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-xl font-black">98%</div>
                    <div className="font-bold text-gray-700">
                      User Satisfaction
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-black">
                    <div className="text-2xl mb-2">🌍</div>
                    <div className="text-xl font-black">24/7</div>
                    <div className="font-bold text-gray-700">
                      Global Support
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Mail className="animate-bounce" />
                  Get In Touch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      Our Location
                    </h4>
                    <p className="text-gray-700">San Francisco, CA 🌉</p>
                    <p className="text-gray-700">
                      Building the future from the heart of tech!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Coffee size={16} />
                      Let's Chat
                    </h4>
                    <p className="text-gray-700">hello@community-app.com</p>
                    <p className="text-gray-700">
                      Always up for a good conversation! ☕
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}