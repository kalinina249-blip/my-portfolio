/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Header } from "./components/Header";
import { HLSVideoBackground } from "./components/HLSVideoBackground";
import { HeroSection } from "./components/HeroSection";
import { StatsDashboard } from "./components/StatsDashboard";
import { PortfolioShowcase } from "./components/PortfolioShowcase";
import { AIContentStudio } from "./components/AIContentStudio";
import { ContactForm } from "./components/ContactForm";
import { ServicesSection } from "./components/ServicesSection";
import { VideoStreamOption } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Film, ArrowUpRight } from "lucide-react";

export default function App() {
  const streamOptions: VideoStreamOption[] = [
    {
      id: "sales-wb",
      name: "Поток 1: WB Лидер",
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      description: "Тестовый поток высокого разрешения для проверки интеграции (Big Buck Bunny)",
    },
    {
      id: "premium-sea",
      name: "Поток 2: Люкс Премиум",
      url: "https://samples.vod.video.glb.clouddn.com/oceans.m3u8",
      description: "Океанический рекламный футаж для спа, косметики и товаров премиум-ухода",
    },
    {
      id: "bipbop-fashion",
      name: "Поток 3: Электроника",
      url: "https://d2zihajmogu5jn.cloudfront.net/bipbop/bipbop.m3u8",
      description: "Тестовый технологический стрим с адаптивным битрейтом (BipBop)",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("home");
  const [currentStream, setCurrentStream] = useState<VideoStreamOption>(streamOptions[0]);
  const [customUrl, setCustomUrl] = useState("");
  const [streamError, setStreamError] = useState<string | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // We handle error logs cleanly if we need to output debug info
  if (streamError) {
    console.log("Active background stream error:", streamError);
  }

  const handleCustomStreamSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    const customOption: VideoStreamOption = {
      id: "custom-" + Date.now(),
      name: "Пользовательский поток",
      url: customUrl.trim(),
      description: "Ваш собственный HLS-поток",
    };

    setCurrentStream(customOption);
    setStreamError(null);
    setShowCustomInput(false);
  };

  const selectTabAndService = (serviceName: string) => {
    setActiveTab("studio");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Absolute Full Screen Live HLS Stream Background */}
      <HLSVideoBackground
        streamUrl={currentStream.url}
        onStreamError={(err) => setStreamError(err)}
      />

      {/* Cinematic Mesh Gradient Background Simulation on top of HLS Stream Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#2563eb]/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7c3aed]/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Decorative scanline overlay from "Frosted Glass" design guidelines for high tactile depth */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 scan-lines-effect" />

      {/* Top Floating Glassmorphic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streams={streamOptions}
        currentStream={currentStream}
        setStream={(stream) => {
          setCurrentStream(stream);
          setStreamError(null);
        }}
      />

      {/* Main Container Layout */}
      <main className="relative z-30 pt-32 pb-24 px-4 md:px-8 w-full min-h-screen flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <div className="relative w-full h-full flex flex-1">
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-auto"
              >
                {/* Overlay Hero positioned securely in bottom-left corner as requested */}
                <HeroSection
                  onExploreMetrics={() => setActiveTab("stats")}
                  onLaunchStudio={() => setActiveTab("studio")}
                />
              </motion.div>

              {/* Floating Performance Metrics (Right Side Desktop) - Frosted Glass spec */}
              <motion.div
                key="floating-metrics"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden xl:flex absolute top-12 right-6 z-10 flex-col gap-6"
              >
                <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl w-64 hover:border-blue-400/45 transition-all duration-300">
                  <div className="text-xs text-white/50 uppercase mb-1 tracking-widest font-mono">Marketplace Rank</div>
                  <div className="text-4xl font-bold italic text-blue-400">TOP-5</div>
                  <div className="mt-3.5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-blue-400"></div>
                  </div>
                </div>
                
                <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl w-64 hover:border-purple-400/45 transition-all duration-300">
                  <div className="text-xs text-white/50 uppercase mb-1 tracking-widest font-mono">AI Image Gen</div>
                  <div className="text-4xl font-bold italic text-purple-400">+45% CTR</div>
                  <div className="mt-2 text-[10px] text-white/30 italic leading-snug">Автоматизация визуального контента нейросетями</div>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl w-64 hover:border-emerald-400/45 transition-all duration-300">
                  <div className="text-xs text-white/50 uppercase mb-1 tracking-widest font-mono">Turnover Growth</div>
                  <div className="text-4xl font-bold italic text-green-400">x3</div>
                  <div className="mt-2 text-[10px] text-white/30 italic leading-snug">Средний рост за 6 месяцев ведения магазина</div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab !== "home" && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-6xl mx-auto my-auto"
            >
              {/* Dynamic Panel Overlays */}
              {activeTab === "stats" && <StatsDashboard />}
              {activeTab === "services" && (
                <ServicesSection onSelectService={selectTabAndService} />
              )}
              {activeTab === "portfolio" && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Portfolio slider */}
                  <PortfolioShowcase />

                  {/* Interactive HLS Custom Stream Config deck */}
                  <div className="w-full max-w-6xl mx-auto p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1 max-w-lg">
                      <span className="text-[10px] font-mono text-blue-400 tracking-wider font-semibold uppercase block">
                        ТЕХНОЛОГИЧЕСКИЙ ТЕСТ BACKGROUND-ПОТОКА
                      </span>
                      <h4 className="text-base font-bold text-white flex items-center gap-1.5 font-display">
                        <Film size={16} className="text-purple-400" />
                        Протестируйте свой собственный HLS (.m3u8) стрим!
                      </h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Наш сайт работает в связке с HLS.js движком. Вы можете вставить любую рабочую ссылку на стрим эфира или медиа-архива, чтобы мгновенно применить её к фону страницы!
                      </p>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      {showCustomInput ? (
                        <form onSubmit={handleCustomStreamSubmit} className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="url"
                            required
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            placeholder="https://domain.com/path/index.m3u8"
                            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:border-blue-500/40 w-full sm:w-64"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-white text-black font-sans text-xs font-semibold rounded-xl hover:bg-slate-100 transition-all"
                          >
                            Применить
                          </button>
                        </form>
                      ) : (
                        <button
                          onClick={() => setShowCustomInput(true)}
                          className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-2"
                        >
                          <ArrowUpRight size={13} />
                          <span>Вставить .m3u8 ссылку</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "studio" && (
                <div className="space-y-8">
                  <AIContentStudio />
                  <ContactForm />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Ambient footer details when home tab is active to preserve background aesthetics */}
        {activeTab === "home" && (
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest leading-none">
                TATIANA KALININA — PORTFOLIO LIVE 2026-v3
              </span>
            </div>
            
            <span className="font-mono text-[10px] text-white/40 tracking-wider">
              Powered by HLS.js Stream Engine & Gemini AI Flash-3.5
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
