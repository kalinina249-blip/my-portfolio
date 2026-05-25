/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp, Cpu, Sparkles, ChevronRight, BarChart4 } from "lucide-react";

interface HeroSectionProps {
  onExploreMetrics: () => void;
  onLaunchStudio: () => void;
}

export function HeroSection({ onExploreMetrics, onLaunchStudio }: HeroSectionProps) {
  return (
    <div className="absolute bottom-6 md:bottom-12 left-4 md:left-12 z-30 w-[calc(100%-2rem)] max-w-xl lg:max-w-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)] relative group overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-[60px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/10 blur-[60px] pointer-events-none" />

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-400 font-mono text-[10px] uppercase tracking-widest font-bold">
          <Cpu size={12} className="animate-spin-slow text-blue-300" />
          <span>Marketplace Management Expert</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-400 font-mono text-[10px] uppercase tracking-widest font-bold">
          <TrendingUp size={11} className="text-purple-300" />
          <span>ТОП-5 на Wildberries</span>
        </span>
      </div>

      {/* Main Pitch */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-[1.05] mb-4">
        Масштабирую <br />
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">бизнес на маркетплейсах</span>
      </h1>
      
      <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed mb-6 max-w-lg">
        Привет, я Татьяна Калинина. Специализируюсь на продвижении и выводе в ТОП-5 брендов на Wildberries. Я заменила дорогостоящие классические фотосессии на высокоэффективную генерацию фотоконтента с помощью нейросетей, повысив CTR карточек на 45%.
      </p>

      {/* Key Metrics row */}
      <div className="grid grid-cols-3 gap-3.5 mb-7 py-4 border-y border-white/10 bg-white/[0.02] rounded-2xl px-4">
        <div>
          <span className="block font-display text-xl sm:text-2xl font-bold text-blue-400 tracking-tight">
            &gt; 150М+
          </span>
          <span className="block font-sans text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
            Годовой оборот ₽
          </span>
        </div>
        <div className="border-x border-white/10 px-3.5">
          <span className="block font-display text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">
            TOP-5
          </span>
          <span className="block font-sans text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
            в категориях
          </span>
        </div>
        <div className="pl-2">
          <span className="block font-display text-xl sm:text-2xl font-bold text-purple-400 tracking-tight">
            -83%
          </span>
          <span className="block font-sans text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
            расходы на фотосъемку
          </span>
        </div>
      </div>

      {/* Interaction Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={onLaunchStudio}
          id="btn-hero-launch-studio"
          className="flex-1 py-3.5 sm:py-4 px-6 rounded-xl bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider hover:bg-slate-50 transition-all duration-300 active:scale-97 flex items-center justify-center gap-2"
        >
          <Sparkles size={16} className="text-black animate-pulse" />
          <span>Умная ИИ Студия</span>
          <ChevronRight size={14} className="opacity-70 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={onExploreMetrics}
          id="btn-hero-explore-metrics"
          className="py-3.5 sm:py-4 px-6 rounded-xl border border-white/20 bg-white/10 font-sans text-xs md:text-sm font-semibold tracking-wider text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md active:scale-97 flex items-center justify-center gap-2"
        >
          <BarChart4 size={15} className="text-blue-400" />
          <span>Кейсы & Цифры</span>
        </button>
      </div>
    </div>
  );
}
