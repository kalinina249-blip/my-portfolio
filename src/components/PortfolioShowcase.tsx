/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, ArrowLeftRight, Check, ShoppingCart, Image as ImageIcon } from "lucide-react";

interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  ctrBefore: string;
  ctrAfter: string;
  salesBoost: string;
}

export function PortfolioShowcase() {
  const [activeItem, setActiveItem] = useState<string>("backpack");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  const portfolioItems: Record<string, PortfolioItem> = {
    backpack: {
      id: "backpack",
      name: "Кожаный Рюкзак 'Aero Urban'",
      category: "Wildberries / Аксессуары",
      beforeUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=60&w=800", // Standard warehouse backpack
      afterUrl: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&q=80&w=800", // Breathtaking product studio
      beforeLabel: "Обычное фото со склада",
      afterLabel: "AI Студийная интеграция Калининой",
      ctrBefore: "2.1% CTR",
      ctrAfter: "5.8% CTR",
      salesBoost: "x2.7 Продаж",
    },
    watch: {
      id: "watch",
      name: "Умные Часы 'Quantum V'",
      category: "Ozon / Электроника",
      beforeUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=60&w=800", // Plain watch
      afterUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800", // Premium dynamic watch
      beforeLabel: "Любительский кадр Ozon",
      afterLabel: "Космический 3D AI рендер",
      ctrBefore: "1.4% CTR",
      ctrAfter: "4.9% CTR",
      salesBoost: "x3.5 Продаж",
    },
    serum: {
      id: "serum",
      name: "Сыворотка 'Eco Peptide'",
      category: "Яндекс.Маркет / Косметика",
      beforeUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=60&w=800", // Cosmetic on white
      afterUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800", // Water elements botanical background
      beforeLabel: "Простой дистрибьюторский сток",
      afterLabel: "Органическая композиция AI",
      ctrBefore: "1.9% CTR",
      ctrAfter: "5.1% CTR",
      salesBoost: "x2.4 Продаж",
    },
  };

  const item = portfolioItems[activeItem];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSliding) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliding(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isSliding) {
      const onMove = (e: MouseEvent) => handleMouseMove(e);
      const onTouchMove = (e: TouchEvent) => handleTouchMove(e);

      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onTouchMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, [isSliding]);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 md:px-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl text-white">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-bold">
            ИНФОГРАФИКА & КЕЙСЫ
          </span>
          <h2 className="font-display text-2xl sm:text-3.5xl font-bold mt-1 tracking-tight">
            Генерации, которые продают
          </h2>
          <p className="text-white/65 text-sm mt-2 max-w-lg leading-relaxed">
            Перетащите ползунок на интерактивной карточке ниже, чтобы увидеть разницу в визуале до и после AI-генерации.
          </p>
        </div>

        {/* Product selector buttons */}
        <div className="flex flex-wrap gap-2.5 p-1 rounded-2xl bg-white/5 border border-white/10">
          {Object.values(portfolioItems).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveItem(p.id);
                setSliderPosition(50);
              }}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all ${
                activeItem === p.id ? "bg-white text-black shadow-lg font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              {p.name.split("'")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Interactive Compare Slider Container */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div
            ref={containerRef}
            className="w-full aspect-[4/5] sm:aspect-[4/3] max-h-[500px] bg-[#0d0d0d] rounded-2xl border border-white/10 relative overflow-hidden select-none cursor-ew-resize touched-action-none shadow-2xl"
            onMouseDown={() => setIsSliding(true)}
            onTouchStart={() => setIsSliding(true)}
          >
            {/* After (Optimized Image - Full width) */}
            <img
              src={item.afterUrl}
              alt="После оптимизации"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute right-4 top-4 z-20 px-3.5 py-2 rounded-xl bg-blue-600/90 border border-blue-400/40 backdrop-blur-md text-white font-sans text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <Sparkles size={11} className="text-white animate-spin-slow" />
              <span>{item.afterLabel}</span>
            </div>

            {/* Before component (Clipped horizontally) */}
            <div
              className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Force rendering standard width to prevent stretching */}
              <div className="absolute inset-y-0 left-0 w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-full">
                <img
                  src={item.beforeUrl}
                  alt="До оптимизации"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="absolute left-4 top-4 z-20 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-md text-white/65 font-sans text-[10px] uppercase tracking-wider">
                {item.beforeLabel}
              </div>
            </div>

            {/* Sliding handle divider */}
            <div
              className="absolute inset-y-0 w-1 bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.7)] cursor-ew-resize z-25 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-4 border-black/10 font-mono text-xs scale-90">
                <ArrowLeftRight size={13} className="text-black" />
              </div>
            </div>
          </div>
          <span className="text-[11px] text-white/40 font-mono text-center block">
            ← Проведите ползунок влево/вправо для сравнения в реальном времени →
          </span>
        </div>

        {/* Meta Stats details right panel */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-blue-400 text-[10px] tracking-wider uppercase font-bold">
                {item.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3.5xl font-bold text-white mt-1 leading-tight">
                {item.name}
              </h3>
            </div>

            {/* Before / After comparison stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 relative">
                <p className="text-[10px] font-sans text-white/40 uppercase tracking-widest font-bold">СТОКОВЫЙ CTR</p>
                <span className="text-xl font-display font-medium text-white/50 mt-1 block">
                  {item.ctrBefore}
                </span>
                <span className="text-[10px] text-white/30 block mt-1 font-sans">Обычное белое фото</span>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-400/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-6 w-6 bg-blue-500/20 rounded-full blur-md" />
                <p className="text-[10px] font-sans text-blue-300 uppercase tracking-widest font-bold font-sans">AI CTR РЕЗУЛЬТАТ</p>
                <span className="text-xl font-display font-bold text-emerald-400 mt-1 block">
                  {item.ctrAfter}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-1 font-sans">
                  {item.salesBoost}
                </span>
              </div>
            </div>

            {/* AI Prompts detailed direction used for generating */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-3.5">
                <Sparkles size={14} className="text-purple-400" />
                <span className="font-sans text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  Промпт генерации (Midjourney / Flux)
                </span>
              </div>
              <p className="font-mono text-[11px] text-white/75 bg-black/45 p-3 rounded-xl border border-white/10 italic leading-relaxed">
                "Premium product photography of {item.id === "backpack" ? "leather urban backpack" : item.id === "watch" ? "minimalist smartwatch" : "luxury cosmetic glass capsule bottle"}, placed on a dark sleek architectural slate rock, raw wet textures, cinematic studio lighting, volumetric realistic mist, hyper-detail 8k resolution --ar 4:5"
              </p>
            </div>

            {/* Tatiana's Execution Commentary */}
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} />
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  <strong>Проблема:</strong> Обычные складские превью собирали менее 1.5% переходов. Клиенты Ozon и Wildberries не понимали премиальной текстуры изделия.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} />
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  <strong>Решение Татьяны:</strong> Настроены фотореалистичные контентные пайплайны. Товар интегрирован в премиум ландшафт с правильной тенью и инфографикой, заменяющей дорогие съёмки.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4.5 border-t border-white/10 flex items-center gap-3">
            <span className="text-xs text-white/40 font-sans">
              Хотите такой же взрывной рост CTR вашей карточки? Напишите мне во вкладке ИИ-Студия!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
