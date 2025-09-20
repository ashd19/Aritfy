import React, { useState, useEffect } from "react";

import { Instagram, Mail, Youtube, Twitter } from "lucide-react";

interface FooterLink {
  text: string;
  href: string;
  icon?: string;
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

interface FooterProps {
  companyName?: string;
  year?: number;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  tagline?: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "ArtFolio",
  year = new Date().getFullYear(),
  links = [
    { text: "Gallery", href: "#gallery" },
    { text: "About", href: "#about" },
    { text: "Commission", href: "#commission" },
    { text: "Contact", href: "/contact" },
  ],
  //  socialinks
  socialLinks = [
    { platform: "Instagram", href: "#", icon: <Instagram size={20} /> },
    { platform: "X (Twitter)", href: "#", icon: <Twitter size={20} /> },
    { platform: "YouTube", href: "#", icon: <Youtube size={20} /> },
    { platform: "Email", href: "#", icon: <Mail size={20} /> },
  ],
  tagline = "Where creativity meets opportunity",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer
      className={`
      relative bg-amber-50 border-4 border-black p-8 m-8 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden
      transition-all duration-600 ease-out
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
    `}
    >
      {/* Animated Accent Elements */}
      <div className="absolute w-16 h-16 bg-pink-400 -top-4 -left-4 animate-pulse"></div>
      <div className="absolute w-8 h-8 bg-blue-400 -bottom-2 -right-2 animate-bounce"></div>
      <div className="absolute w-10 h-10 bg-green-400 top-1/2 -left-4 animate-spin"></div>

      <div className="flex justify-between items-start mb-6 flex-wrap">
        <div className="mb-4 md:mb-0">
          <h3
            className="text-2xl font-bold text-black relative inline-block
            after:content-[''] after:absolute after:-bottom-1 after:left-0 
            after:w-full after:h-1 after:bg-red-500 after:scale-x-0 
            after:origin-bottom-right after:transition-transform after:duration-300
            hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            {tagline}
          </h3>
        </div>

        <div className="flex gap-6 flex-wrap">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`
                text-black font-semibold py-2 px-3 relative
                border-2 border-transparent
                transition-all duration-300 ease-out
                animate-slide-in-bottom opacity-0
                ${isVisible ? "opacity-100" : ""}
                ${
                  hoveredItem === link.text
                    ? "border-black bg-red-500 text-white -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10"
                    : "hover:border-black hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredItem(link.text)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {link.icon && (
                <span
                  className={`inline-block mr-2 ${
                    hoveredItem === link.text ? "rotate-12" : ""
                  } transition-transform duration-300`}
                >
                  {link.icon}
                </span>
              )}
              {link.text}
            </a>
          ))}
        </div>
      </div>

      <div className="h-1 bg-black my-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      </div>

      <div className="flex justify-between items-center flex-wrap">
        <div className="mb-4 md:mb-0">
          <p className="text-black font-medium">
            © {year} {companyName}. Brutally honest art.
          </p>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className={`
                text-2xl relative p-2
                transition-all duration-300
                animate-slide-in-bottom opacity-0
                ${isVisible ? "opacity-100" : ""}
                hover:-translate-y-1 hover:scale-110
              `}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              aria-label={social.platform}
            >
              {social.icon}
              <span
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                bg-black text-white text-xs font-bold px-2 py-1 
                opacity-0 transition-opacity duration-300 pointer-events-none
                hover:opacity-100"
              >
                {social.platform}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.5s ease forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bouwnce {
          animation: bounce 1s infinite;
        }

        .animate-spin {
          animation: spin 4s linear infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style> */}
    </footer>
  );
};

export default Footer;
