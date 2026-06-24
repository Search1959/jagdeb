import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, MessageSquare, Bot, HelpCircle, ArrowRight, CornerDownLeft } from "lucide-react";
import { ChatMessage } from "../types";

export default function AISteelAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to Jagdev Nagar Industries! I am your **JNI Steel Advisor**, powered by Gemini AI. I can assist you with structural steel tubes specifications, IS:1239 plumbing standards, Hot-Dip GI pipe coatings, weight calculations, or logistical services from our Sultanpur plant.\n\nWhat can I assist you with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const recommendedPrompts = [
    { label: "IS:1239 Standards Guide", query: "What are the standard dimensions, thickness classes and weight charts of IS:1239 MS pipes?" },
    { label: "ERW vs Hot-Dip GI Pipes", query: "Can you explain the structural and coating differences between JNI ERW Black Pipes and Hot-Dip Galvanized Iron (GI) Pipes?" },
    { label: "Sultanpur Manufacturing facility", query: "Where is the JNI steel factory, what is the bigha area, total investment, and QA labs equipped there?" },
    { label: "Bulk quotation pricing", query: "How is pricing calculated for bulk institutional supply, and what is the callback response time?" }
  ];

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || userInput;
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setUserInput("");
    setIsLoading(true);

    try {
      // Package conversation history
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content
        }));

      const response = await fetch("/api/gemini/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          conversationHistory: history
        })
      });

      const result = await response.json();

      if (result.success) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: result.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("AI Assistant consulting error:", error);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Our AI consulting terminal is briefly over-capacity. For urgent engineering specifications or bulk pricing estimates, please dial our direct corporate billing desk at **+91 7003646556**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 group border border-blue-400/30 cursor-pointer"
          id="ai-launcher-btn"
        >
          <Sparkles className="w-5.5 h-5.5 text-white animate-pulse" />
          <span className="font-display font-bold text-xs uppercase tracking-wider pr-1 max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap">
            AI Steel Advisor
          </span>
        </button>
      )}

      {/* Floating Sliding Drawer Sidebar Chat Panel */}
      {isOpen && (
        <div
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#020617] shadow-2xl flex flex-col justify-between border-l border-slate-800/60 animate-in slide-in-from-right duration-300"
          id="ai-sidebar-container"
        >
          {/* Header Panel */}
          <div className="bg-slate-900 px-5 py-4 border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-500/10 p-2 rounded-sm text-blue-400 border border-blue-500/10">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display font-bold text-sm text-white uppercase tracking-wider">
                  JNI Steel Advisor
                </span>
                <span className="block font-sans text-[10px] text-blue-400 font-bold tracking-widest">
                  POWERED BY GEMINI AI
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-sm transition-colors cursor-pointer"
              id="ai-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log Panel */}
          <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 scrollbar-thin">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7.5 h-7.5 rounded-sm flex items-center justify-center shrink-0 border text-[10px] font-bold ${
                    msg.role === "user"
                      ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                      : "bg-slate-900 text-slate-300 border-slate-800"
                  }`}
                >
                  {msg.role === "user" ? "ME" : "JNI"}
                </div>

                {/* Message Bubble Box */}
                <div className="flex flex-col gap-1">
                  <div
                    className={`p-3.5 rounded-sm text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white font-semibold border border-blue-400/30"
                        : "bg-slate-900/60 text-slate-200 border border-slate-800/60"
                    }`}
                  >
                    {/* Render basic custom bold and bullet format to maintain neat typography without massive markdown packages */}
                    {msg.content.split("\n").map((line, lineIdx) => {
                      // Bullet points format
                      if (line.trim().startsWith("-") || line.trim().startsWith("* ")) {
                        const content = line.replace(/^[-*]\s+/, "");
                        return (
                          <div key={lineIdx} className="flex gap-2 pl-2 my-1">
                            <span className="text-blue-400">•</span>
                            <span>{content}</span>
                          </div>
                        );
                      }
                      
                      // Title format
                      if (line.trim().startsWith("###")) {
                        return (
                          <h4 key={lineIdx} className="font-display font-bold text-blue-300 mt-3 mb-1 text-xs uppercase tracking-wider">
                            {line.replace(/^###\s+/, "")}
                          </h4>
                        );
                      }

                      // Dynamic inline bold styling wrapper (**bold**)
                      const parts = line.split(/\*\*(.*?)\*\*/g);
                      return (
                        <p key={lineIdx} className={lineIdx > 0 ? "mt-1.5" : ""}>
                          {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className={msg.role === 'user' ? 'font-bold text-white' : 'text-white font-bold'}>{part}</strong> : part))}
                        </p>
                      );
                    })}
                  </div>
                  
                  <span className={`text-[9px] font-mono text-slate-500 ${msg.role === "user" ? "text-right mr-1" : "ml-1"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* AI Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center animate-pulse">
                <div className="w-7.5 h-7.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center text-xs">
                  ...
                </div>
                <div className="bg-slate-900/40 text-slate-400 border border-slate-800/60 p-3.5 rounded-sm text-xs font-mono">
                  Computing steel specification matrix...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Recommendations Prompts list */}
          {messages.length === 1 && (
            <div className="px-5 pb-4">
              <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-blue-400" />
                Frequently Consulted Topics
              </span>
              <div className="flex flex-col gap-2">
                {recommendedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt.query)}
                    className="w-full text-left bg-slate-900/40 hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 p-2.5 rounded-sm text-[11px] text-slate-300 flex items-center justify-between transition-all duration-200 group cursor-pointer"
                  >
                    <span>{prompt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transform group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form Entry Panel */}
          <div className="bg-slate-900 p-4 border-t border-slate-800/60">
            <div className="relative flex items-center bg-[#020617] border border-slate-800 rounded-sm pr-2">
              <input
                type="text"
                placeholder="Ask technical specification specs..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                disabled={isLoading}
                className="w-full bg-transparent border-0 py-3.5 pl-4 pr-10 text-xs md:text-sm text-white focus:outline-none"
              />
              
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !userInput.trim()}
                className="bg-blue-600 text-white p-2 rounded-sm hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 transition-colors cursor-pointer"
                id="ai-send-message-btn"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono px-1">
              <span>Press Enter to send</span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-2.5 h-2.5" />
                JNI Engineering Database V1
              </span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
