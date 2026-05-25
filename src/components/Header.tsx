/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Cpu, Menu, X, ExternalLink, RefreshCw, Send, CheckCircle2 } from "lucide-react";
import { VideoStreamOption } from "@/src/types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streams: VideoStreamOption[];
  currentStream: VideoStreamOption;
  setStream: (stream: VideoStreamOption) => void;
}

export function Header({ activeTab, setActiveTab, streams, currentStream, setStream }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showStreamDropdown, setShowStreamDropdown] = useState(false);

  const menuItems = [
    { id: "home", label: "Главная" },
    { id: "stats", label: "Результаты" },
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "ИИ-Стримы & Кейсы" },
    { id: "studio", label: "ИИ Студия" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 px-6 md:px-12 flex items-center justify-between bg-white/5 backdrop-blur-xl border-b border-white/10 mx-4 mt-4 rounded-2xl">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-lg text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          TK
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
        </div>
        <div>
          <span className="font-display font-medium text-white tracking-tight text-base block leading-tight uppercase">
            Татьяна Калинина
          </span>
          <span className="font-sans text-[10px] text-blue-400 tracking-wider font-semibold uppercase min-w-max flex items-center gap-1.5 leading-none mt-0.5">
            <span>Marketplace Expert</span>
            <span className="h-1 w-1 rounded-full bg-white/40"></span>
            <span className="text-purple-400">TOP-5 BRAND</span>
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            id={`nav-tab-${item.id}`}
            className={`px-4 py-2 rounded-xl font-sans text-sm tracking-wide font-medium transition-all duration-300 relative overflow-hidden ${
              activeTab === item.id
                ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Utility deck & CTA */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Stream Changer Controller */}
        <div className="relative">
          <button
            onClick={() => setShowStreamDropdown(!showStreamDropdown)}
            id="btn-stream-picker"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all font-sans text-xs text-white/80 hover:text-white"
            title="Переключить фоновое HLS-видео"
          >
            <RefreshCw size={12} className="text-blue-400" />
            <span className="max-w-[120px] truncate">{currentStream.name}</span>
          </button>

          {showStreamDropdown && (
            <div className="absolute right-0 mt-2.5 w-72 bg-slate-950/95 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden py-2 animate-float">
              <div className="px-4 py-2 border-b border-white/5">
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                  ВЫБЕРИТЕ HLS-ВИДЕОФОН
                </p>
                <p className="text-[11px] text-slate-400">
                  Интерактивные стримы в прямом эфире
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto mt-1 px-1">
                {streams.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setStream(opt);
                      setShowStreamDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl font-sans text-xs flex flex-col gap-0.5 transition-all mb-1 ${
                      currentStream.id === opt.id
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-white/70 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="font-semibold flex items-center justify-between gap-1 w-full text-white">
                      {opt.name}
                      {currentStream.id === opt.id && (
                        <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate w-full">
                      {opt.description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-white/5 bg-white/[0.02]">
                <p className="text-[10px] text-blue-300 font-mono text-center">
                  HLS.js Stream Engine Active
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => handleTabClick("studio")}
          id="btn-nav-optimize-cta"
          className="px-6 py-2.5 bg-white text-black font-sans text-xs font-bold uppercase tracking-tight rounded-full hover:bg-blue-50 transition-all flex items-center gap-2"
        >
          <span>Связаться</span>
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Mobile Burger & Settings Selector */}
      <div className="flex lg:hidden items-center gap-2">
        <button
          onClick={() => setShowStreamDropdown(!showStreamDropdown)}
          className="p-2 rounded-xl bg-slate-900/40 border border-white/10 text-slate-300"
          title="Стримы"
        >
          <RefreshCw size={16} />
        </button>

        {showStreamDropdown && (
          <div className="absolute right-4 top-22 w-64 glass-effect border border-white/10 rounded-2xl shadow-xl overflow-hidden py-2">
            <div className="px-4 py-1.5 border-b border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              HLS фоновые потоки
            </div>
            {streams.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setStream(opt);
                  setShowStreamDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs flex flex-col gap-0.5 ${
                  currentStream.id === opt.id ? "bg-indigo-600/20 text-white" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="font-semibold">{opt.name}</span>
                <span className="text-[9px] text-slate-400 truncate">{opt.description}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          id="btn-mobile-burger"
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop & Panel */}
      {isOpen && (
        <div className="absolute top-22 left-0 right-0 glass-effect border border-white/10 rounded-2xl mx-1 p-4 flex flex-col gap-3 lg:hidden animate-float-in shadow-2xl z-50">
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-indigo-500/20 text-white border-l-4 border-indigo-400 pl-3"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="h-px bg-white/5 my-1" />
          <button
            onClick={() => handleTabClick("studio")}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-sans text-xs font-semibold tracking-wider text-center flex items-center justify-center gap-2"
          >
            <Send size={12} />
            <span>Запустить ИИ Студию</span>
          </button>
        </div>
      )}
    </header>
  );
}
