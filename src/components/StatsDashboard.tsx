/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TrendingUp, BarChart3, Star, Zap, ShoppingBag, FolderGit2, CheckCircle, Shield } from "lucide-react";

export function StatsDashboard() {
  const [activeCategory, setActiveCategory] = useState<"ctr" | "costs" | "turnover">("ctr");

  const ctrData = [
    { name: "Ср. по WB", value: 1.8, label: "Сток-фото", color: "bg-white/10" },
    { name: "WB + Инфографика", value: 3.1, label: "Шаблонный дизайн", color: "bg-blue-400/40" },
    { name: "WB + Калинина AI", value: 5.6, label: "ИИ-Студия", color: "bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" },
  ];

  const costsData = [
    { name: "Фотостудия", value: 15000, label: "Модели, Аренда, Ретушь", desc: "За 1 товар" },
    { name: "ИИ Генерация AI", value: 1500, label: "Контент за 3 минуты", desc: "Татьяна Калинина" },
  ];

  const categoriesToShow = [
    { id: "WB — Кейс А (Оптимизация & ИИ)", rank: "ТОП-3", turnover: "62 млн ₽ / год", growth: "+180%" },
    { id: "WB — Кейс Б (SEO & Продвижение)", rank: "ТОП-2", turnover: "45 млн ₽ / год", growth: "+220%" },
    { id: "WB — Кейс В (Визуальная часть)", rank: "ТОП-5", turnover: "38 млн ₽ / год", growth: "+140%" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 md:px-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl text-white">
      {/* Intro Heading */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-bold">
          РЕЗУЛЬТАТЫ & АНАЛИТИКА
        </span>
        <h2 className="font-display text-2xl sm:text-3.5xl font-bold mt-1 text-white tracking-tight">
          Результаты работы в сухих цифрах
        </h2>
        <p className="text-white/65 text-sm mt-3 max-w-2xl leading-relaxed">
          Я не просто управляю листингом. Я выстраиваю системные продажи: от оптимизации цепочки поставок (FBO/FBS) до полного переосмысления визуальной упаковки с помощью ИИ.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Profile & Vision */}
        <div className="md:col-span-1 bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-sans text-[10px] tracking-wider text-white/50 uppercase font-bold">
                Моя философия
              </span>
            </div>
            
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 leading-tight">
              Бизнес-подход к маркетплейсам
            </h3>
            
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
              Современный маркетплейс — это битва первой секунды. Покупатель принимает решение глазами. Тот, кто использует ИИ для постоянного тестирования гипотез на фотоконтенте, забирает 80% трафика в категории.
            </p>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Мои клиенты входят в <strong>топ-5 продавцов</strong>, благодаря глубокой сквозной аналитике, оптимизации рекламы и уникальным ИИ карточкам, которые выделяются на фоне серых студийных съемок.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-white/40">STATUS:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-semibold">
                ОПЕРАЦИИ БОЛЕЕ 10M ₽/МЕСЯЦ
              </span>
            </div>
          </div>
        </div>

        {/* Charts & Analytical Interactive Grid */}
        <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between">
          <div>
            {/* Header with Switch Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <span className="font-sans text-xs text-white/50 tracking-wider flex items-center gap-1.5 font-bold">
                <BarChart3 size={14} className="text-blue-400" />
                АНАЛИТИЧЕСКИЕ ДАННЫЕ ВНЕДРЕНИЯ ИИ
              </span>
              
              <div className="flex p-0.5 rounded-xl bg-white/5 border border-white/10 self-start">
                <button
                  onClick={() => setActiveCategory("ctr")}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    activeCategory === "ctr" ? "bg-white text-black shadow-md font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  CTR Карточки
                </button>
                <button
                  onClick={() => setActiveCategory("costs")}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    activeCategory === "costs" ? "bg-white text-black shadow-md font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Стоимость фотоконтента
                </button>
              </div>
            </div>

            {/* CTR Chart Visualizer */}
            {activeCategory === "ctr" && (
              <div className="animate-fadeIn">
                <p className="text-xs text-white/60 mb-6 leading-relaxed font-sans">
                  <strong>Кликабельность (CTR)</strong> — ключевой фактор продвижения Wildberries & Ozon. Алгоритм поднимает выше карточки, на которые чаще кликают. Моя ИИ-упаковка бьет рекорды конверсии:
                </p>

                <div className="space-y-4">
                  {ctrData.map((bar, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/80 font-medium flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          {bar.name} <span className="text-white/50 font-normal">({bar.label})</span>
                        </span>
                        <span className="font-mono font-bold text-white text-sm">{bar.value}% CTR</span>
                      </div>
                      <div className="w-full h-8 bg-black/40 border border-white/10 rounded-xl overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-lg transition-all duration-1000 flex items-center justify-end pr-3 font-mono text-[10px] text-white font-bold ${bar.color}`}
                          style={{ width: `${(bar.value / 6) * 100}%` }}
                        >
                          x{(bar.value / 1.8).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Costs Chart Visualizer */}
            {activeCategory === "costs" && (
              <div className="animate-fadeIn">
                <p className="text-xs text-white/65 mb-6 leading-relaxed font-sans">
                  Традиционные фотосессии требуют аренды залов, оплаты моделей, визажистов, фотографов и ретушеров. Для ИИ генератора Калининой требуется лишь несколько любительских кадров товара на телефон:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {costsData.map((card, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/15 flex flex-col justify-between">
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-white/40 block mb-1 font-bold">
                          {card.label}
                        </span>
                        <span className="text-sm font-semibold text-white block">
                          {card.name}
                        </span>
                        <p className="text-[10px] text-white/50 mt-1 font-sans">{card.desc}</p>
                      </div>
                      <div className="mt-4">
                        <span className="text-2xl font-display font-medium text-white">
                          {card.value.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-2 font-sans">
                  <Star size={14} className="shrink-0 text-emerald-400 fill-emerald-400" />
                  <span>Ваша прямая экономия бюджета на контент составляет более <strong>90%</strong> при росте качества карточки!</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs text-white/50 font-sans flex items-center gap-1.5">
              <CheckCircle size={14} className="text-blue-400" />
              Все замеры CTR сделаны на реальных листингах Татьяны с оборотом &gt; 15 млн ₽
            </span>
          </div>
        </div>

      </div>

      {/* Case studies brief blocks (TOP-5 sellers) */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categoriesToShow.map((cat, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between relative group hover:border-blue-400/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-xs font-semibold text-white">{cat.id}</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 font-mono text-[10px] font-bold">
                {cat.rank}
              </span>
            </div>
            
            <div>
              <span className="block text-[10px] uppercase font-sans tracking-wide text-white/40 font-bold">ГОДОВОЙ ОБОРОТ</span>
              <span className="block font-display text-lg font-medium text-white">{cat.turnover}</span>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/5 flex justify-between items-center text-[10px] font-sans">
              <span className="text-white/40">Динамика вывода</span>
              <span className="text-purple-400 font-bold font-mono">{cat.growth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
