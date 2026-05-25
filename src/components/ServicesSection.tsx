/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ShoppingBag, Search, LineChart, CheckCircle2, ArrowRight } from "lucide-react";
import { ServiceItem } from "@/src/types";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const services: ServiceItem[] = [
    {
      id: "ai_photo",
      title: "ИИ-Инфографика & Фотоконтент",
      description: "Полная замена дорогих фотосессий и аренды фотостудий на фотореалистичную генерацию с помощью нейросетей Midjourney, Stable Diffusion и Flux.",
      benefits: [
        "Интеграция вашего товара в любые люкс-локации",
        "Создание идеальных моделей под вашу целевую аудиторию",
        "Экономия рекламного бюджета на фотосессии до 90%",
      ],
      iconName: "Sparkles",
    },
    {
      id: "management",
      title: "Маркетплейс-Менеджмент (WB & Ozon)",
      description: "Профессиональное комплексное ведение вашего магазина топ-менеджером с годовым оборотом &gt; 150 млн рублей.",
      benefits: [
        "Оптимизация поставок FBO и логистических цепочек",
        "Ежедневная ценовая аналитика и участие в акциях",
        "Увеличение выкупаемости товаров и борьба со сливом бюджета",
      ],
      iconName: "ShoppingBag",
    },
    {
      id: "seo",
      title: "SEO Умная Семантика листинга",
      description: "Написание высококонверсионных описаний и подбор высокочастотных поисковых запросов с привлечением ИИ.",
      benefits: [
        "Максимальный охват поисковых индексов WB & Ozon",
        "Интеграция сочных триггеров уникального торгового предложения (УТП)",
        "Снижение стоимости целевого клика во внутренней рекламе",
      ],
      iconName: "Search",
    },
    {
      id: "strategy",
      title: "Анализ Рекламы & Стратегия ТОП-5",
      description: "Анализ рекламных кампаний конкурентов, выкуп рекламных мест и вывод карточек в заветный ТОП-5 категорий.",
      benefits: [
        "Тонкая настройка ставок АвторекК (АРК) без переплаты фантомам",
        "Настройка сквозного CTR анализа на всех этапах воронки",
        "Аудит слабых мест в юнит-экономике для роста чистой прибыли",
      ],
      iconName: "LineChart",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 md:px-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl text-white">
      {/* Services Heading */}
      <div className="text-center md:text-left mb-10">
        <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-bold">
          СПЕКТР УСЛУГ
        </span>
        <h2 className="font-display text-2xl sm:text-3.5xl font-bold mt-1 text-white tracking-tight">
          Услуги для взрывного роста продаж
        </h2>
        <p className="text-white/65 text-sm mt-1 max-w-xl">
          Сфокусируйтесь на производстве и закупке, а упаковку, вывод в ТОП-5 и аналитическое сопровождение возьмет на себя профессиональная ИИ-команда.
        </p>
      </div>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between hover:border-white/20 hover:scale-[1.01] transition-all duration-300 group"
          >
            <div>
              {/* Top Row with icon */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 border border-blue-400/20 text-blue-400 rounded-xl">
                  {srv.iconName === "Sparkles" && <Sparkles size={20} className="animate-pulse" />}
                  {srv.iconName === "ShoppingBag" && <ShoppingBag size={20} />}
                  {srv.iconName === "Search" && <Search size={20} />}
                  {srv.iconName === "LineChart" && <LineChart size={20} />}
                </div>
                <span className="font-sans text-[9px] text-white/40 uppercase font-bold tracking-widest">
                  PROFESSIONAL S-GRADE
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-white">
                {srv.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/65 leading-relaxed mb-5">
                {srv.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 mb-6">
                {srv.benefits.map((b, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-white/80 items-start">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA trigger */}
            <button
              onClick={() => onSelectService(srv.title)}
              className="mt-2 py-3 px-4.5 rounded-xl border border-white/10 hover:border-white/20 bg-black/40 hover:bg-white/5 text-xs text-white font-bold flex items-center justify-between gap-2 transition-all w-full cursor-pointer"
            >
              <span>Подать заявку на {srv.id === "ai_photo" ? "ИИ-контент" : "услугу"}</span>
              <ArrowRight size={13} className="text-white/40 group-hover:translate-x-1 group-hover:text-blue-450 transition-all" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
