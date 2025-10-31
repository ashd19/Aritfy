import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Palette,
  Brush,
} from "lucide-react";

// Define types
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface FAQResponses {
  [key: string]: string;
}

// AI Service Class
class ArtFolioAI {
  basePrompt: string;
  conversationHistory: { role: string; content: string }[];

  constructor() {
    this.basePrompt = `You are an assistant for ArtFolio, a digital art portfolio platform designed to help artists showcase their work, connect with audiences, and find professional opportunities. Your purpose is to help artists navigate the platform, troubleshoot issues, and maximize their use of ArtFolio's features.

Key Problem You're Solving:
Artists struggle to find a centralized, professional, and engaging way to present their work. Traditional methods like static websites, social media, or physical portfolios limit their ability to showcase creativity, interact with audiences, and connect with clients/collaborators.

Platform Capabilities:
- Personalized portfolio creation with multiple media format support
- Interactive viewing experiences for audiences
- Community engagement features (groups, discussions, feedback)
- Client connection tools (commissions, collaborations)
- Professional presentation beyond social media limitations

Your Responsibilities:
1. Onboarding Assistance: Guide new users through portfolio setup and feature exploration
2. Technical Support: Help troubleshoot media uploads, formatting, or display issues
3. Community Guidance: Explain how to join/create groups, participate in discussions, and network
4. Opportunity Facilitation: Assist with commission setup, client connections, and collaboration opportunities
5. Feature Education: Explain interactive features that enhance audience engagement
6. Best Practices: Share tips for effective portfolio presentation and community engagement

Tone & Approach:
- Be encouraging and supportive of artistic expression
- Focus on empowering artists to showcase their work effectively
- Emphasize the community and opportunity aspects
- Use clear, accessible language without excessive technical jargon
- Be creative in suggesting ways to use the platform's features

Example User Queries You Might Receive:
- "How do I create a portfolio that stands out?"
- "What's the best way to showcase my digital paintings?"
- "How can I find clients for commission work?"
- "Can I create a private community for my art students?"
- "How do I make my portfolio more interactive?"
- "What's the best format for uploading video art?"
- "How can I connect with other digital sculptors?"

Remember: You're not just solving technical problems—you're helping artists overcome the limitations of traditional portfolio methods and empowering their creative careers.
`;
    this.conversationHistory = [];
  }

  // Method to call Gemini API
  async sendToGemini(userMessage: string): Promise<string> {
    const apiKey = "";
    if (!apiKey) {
      throw new Error("Gemini API key not found");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${this.basePrompt}\n\nUser: ${userMessage}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Save to history
    this.conversationHistory.push(
      { role: "user", content: userMessage },
      { role: "assistant", content: text || "" }
    );

    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    return (
      text || "Sorry, I couldn't understand that. Try rephrasing your question."
    );
  }

  // Method for FAQ responses (fallback for common questions)
  getFAQResponse(userMessage: string): string | null {
    const message = userMessage.toLowerCase();

    const faqResponses: FAQResponses = {
      "portfolio|create|setup|build":
        "To create your portfolio, go to your dashboard and click 'Create Portfolio'. You can add different sections for various art forms, upload your work, and customize the layout to match your artistic style.",
      "format|file type|upload|video":
        "We support JPG, PNG, GIF, MP4, and WebM files. For best results, use high-quality images (under 10MB) and videos (under 100MB). For interactive pieces, consider recording screen captures.",
      "community|group|discussion|forum":
        "You can join existing communities from the Discover page or create your own specialized group. Communities are great for getting feedback, finding collaborators, and discussing techniques.",
      "commission|client|sell|opportunity":
        "Set up your commission info in the 'Services' section of your profile. Be clear about your rates, process, and timelines. Clients can contact you directly through the platform.",
      "interactive|engagement|audience|viewer":
        "Make your portfolio interactive by adding project descriptions, process videos, and allowing comments. Consider creating time-lapses of your work or offering limited-time digital downloads.",
      "privacy|private|visibility|public":
        "You can control the visibility of each piece in your portfolio. Options include public, private (only with link), or password-protected for specific clients.",
      "support|help|contact|issue":
        "For technical support, please email help@artfolio.com or use the contact form on our website. Our team typically responds within 24 hours.",
    };

    for (const [keywords, response] of Object.entries(faqResponses)) {
      const keywordList = keywords.split("|");
      if (keywordList.some((keyword) => message.includes(keyword))) {
        return response;
      }
    }

    return null; // No FAQ match found
  }

  // Main method to get AI response
  async getResponse(userMessage: string): Promise<string> {
    // First try FAQ for quick responses
    const faqResponse = this.getFAQResponse(userMessage);
    if (faqResponse) {
      return faqResponse;
    }

    return await this.sendToGemini(userMessage);

    // Fallback response if no API key
    return "Thank you for your question! For detailed assistance with your art portfolio, please contact our support team at help@artfolio.com. They'll be happy to help you showcase your work effectively.";
  }
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your ArtFolio assistant. I can help you with portfolio creation, community features, commission setup, or any questions about showcasing your artwork. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = useRef(new ArtFolioAI());

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Get AI response
      const botResponse = await aiService.current.getResponse(currentInput);

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize for the technical difficulty. Please try again or contact help@artfolio.com for immediate assistance with your portfolio.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[28rem] h-[34rem] bg-white rounded-2xl shadow-2xl border-2 border-purple-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                <Palette size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">ArtFolio Assistant</h3>
                <p className="text-xs opacity-90">Here to help artists</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-purple-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-xs ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.sender === "user"
                        ? "bg-purple-500 text-white shadow-sm"
                        : "bg-pink-300 text-gray-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={12} />
                    ) : (
                      <Brush size={12} />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-purple-500 text-white rounded-br-sm shadow-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-purple-100"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs">
                  <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center text-xs text-gray-600">
                    <Brush size={12} />
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm border border-purple-100">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-200 p-3 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your portfolio..."
                className="flex-1 px-3 py-2 border border-purple-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-0"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-2 border-purple-300"
        }`}
      >
        {isOpen ? <X size={50} /> : <Bot size={40} />}
      </button>
    </div>
  );
};

export default Chatbot;