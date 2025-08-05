import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Apple, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const apiKey = import.meta.env.VITE_OR_API_KEY;

const Botazel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Data gizi lokal
  const localNutritionData = `
  Kamu adalah Botazel, sebuah chatbot asisten Kak Zelda (seorang Mahasiswi Psikologi) yang ditugaskan sebagai pendamping psikologi untuk Desa Simpang Ayam. 


  
  Jawablah hanya pertanyaan seputar konsultasi psikologi, bullying, motivasi, kesehatan mental, dan pengembangan diri.
  
  Jika pengguna menanyakan hal di luar topik tersebut, tolak dengan sopan dan arahkan kembali ke topik psikologi.`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "My Chatbot App",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
              {
                role: "system",
                content: localNutritionData,
              },
              ...updatedMessages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
            ],
          }),
        }
      );

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex flex-col h-[calc(100vh-5rem)]">
        {/* Chatbot Header */}
        <div className="backdrop-blur-lg border-b border-purple-600 shadow-xs">
          <div className="flex items-center gap-2 md:gap-4 p-3 md:p-6">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/chatbot")}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-1 md:p-2"
            >
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>

            {/* Bot Avatar & Info */}
            <div className="relative ml-1 md:ml-4">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 md:w-8 md:h-8 text-purple-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-sm md:text-xl font-bold font-heading truncate">
                Botazel - Asisten Psikologi
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                Konsultasi Psikologi dengan{" "}
                <span className="font-semibold text-purple-600">Kak Zelda</span>{" "}
                • Mahasiswi Psikologi UIN Suska Riau
              </p>
              <p className="text-xs text-muted-foreground sm:hidden">
                Konsultasi dengan{" "}
                <span className="font-semibold text-purple-600">Kak Zelda</span>
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full mr-2 md:mr-0"></div>
                <span className="hidden sm:inline">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-3 md:p-6 space-y-4">
            <ScrollArea>
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-purple-600 rounded-full flex items-center justify-center mb-4 md:mb-8">
                    <Apple className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </div>

                  <h2 className="text-xl md:text-3xl font-bold text-purple-800 mb-2 md:mb-4">
                    Selamat datang di Botazel!
                  </h2>

                  <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mb-4 md:mb-8 leading-relaxed">
                    Saya chatbot-nya{" "}
                    <span className="font-semibold text-purple-600">
                      Kak Zelda
                    </span>
                    , mahasiswi Psikologi yang siap membantu Anda dengan
                    pertanyaan seputar psikologi masyarakat di Desa Simpang
                    Ayam.
                  </p>

                  {/* Quick Start Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4 max-w-2xl mb-4 md:mb-8 w-full">
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-4 border border-purple-200">
                      <div className="text-lg md:text-2xl mb-1 md:mb-2">💡</div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-purple-600">
                        Tanya tentang gizi balita
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-4 border border-purple-200">
                      <div className="text-lg md:text-2xl mb-1 md:mb-2">🤱</div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-purple-600">
                        Nutrisi ibu hamil
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-4 border border-purple-200">
                      <div className="text-lg md:text-2xl mb-1 md:mb-2">🥗</div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-purple-600">
                        Menu makanan sehat
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-4 border border-purple-200">
                      <div className="text-lg md:text-2xl mb-1 md:mb-2">📊</div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-purple-600">
                        Status gizi desa
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 md:gap-4 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-in slide-in-from-bottom-2 duration-300`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-xs sm:max-w-sm md:max-w-6xl ${
                      msg.role === "user" ? "order-first" : ""
                    }`}
                  >
                    <div
                      className={`px-3 py-2 md:px-5 md:py-4 rounded-xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-secondary text-white rounded-tr-none"
                          : "bg-white/90 backdrop-blur-sm text-muted-foreground border border-primary rounded-tl-none"
                      }`}
                    >
                      <div className="max-w-none text-sm md:text-base">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 leading-relaxed">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 mb-2 space-y-1">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 mb-2 space-y-1">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="leading-relaxed">{children}</li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold">
                                {children}
                              </strong>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <div
                      className={`text-xs text-muted-foreground mt-1 md:mt-2 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 md:gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl rounded-bl-none px-3 py-2 md:px-5 md:py-4 border-secondary border">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs md:text-sm text-muted-foreground ml-2">
                        Botazel sedang mengetik...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/90 backdrop-blur-lg border-t border-primary p-3 md:p-6 shadow-lg">
          <div className="flex gap-2 md:gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                placeholder="Tanyakan seputar psikologimu..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
                disabled={loading}
                className="pr-10 md:pr-12 py-2 md:py-4 text-sm md:text-base rounded-full"
              />
              {input && (
                <button
                  onClick={() => setInput("")}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground text-lg"
                >
                  ×
                </button>
              )}
            </div>
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-2 md:px-8 md:py-4 rounded-full bg-secondary shadow-lg transition-all text-white duration-200 hover:shadow-xl disabled:opacity-50 text-sm md:text-base"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2 md:mt-3">
            Botazel dapat membantu dengan pertanyaan psikologi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Botazel;
