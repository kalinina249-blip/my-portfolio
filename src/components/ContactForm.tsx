/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Phone, Sparkles, MessageSquare, ClipboardCheck, ArrowRight } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [brandLink, setBrandLink] = useState("");
  const [service, setService] = useState("ИИ-инфографика & Генерация");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const serviceOptions = [
    "ИИ-инфографика & Студийная Генерация Фотоконтента",
    "Комплексный Аудит Листинга & SEO Буст",
    "Полное Ведение Магазина на Wildberries/Ozon под ключ",
    "Разработка Стратегии Продвижения (ТОП-5)",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 md:px-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl text-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side Info */}
        <div className="md:col-span-12 lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-bold">
              СВЯЗАТЬСЯ СО МНОЙ
            </span>
            <h2 className="font-display text-2xl sm:text-3.5xl font-bold mt-1 text-white tracking-tight">
              Обсудить ваш проект
            </h2>
            <p className="text-white/65 text-xs sm:text-sm mt-3 leading-relaxed">
              Оставьте заявку на бесплатный экспресс-аудит вашего бренда. Я лично оценю качество визуалов и SEO-оптимизацию ваших карточек и предложу точки роста для кратного масштабирования.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <ClipboardCheck className="text-blue-400 shrink-0" size={18} />
              <div>
                <span className="text-[10px] font-sans text-white/40 font-bold block">ФОРМАТ СОТРУДНИЧЕСТВА</span>
                <span className="text-xs font-semibold text-white/90">Договор, KPI на рост выручки</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <MessageSquare className="text-blue-400 shrink-0" size={18} />
              <div>
                <span className="text-[10px] font-sans text-white/40 font-bold block">ОТВЕТ В ТЕЧЕНИЕ</span>
                <span className="text-xs font-semibold text-white/90">1-2 часов во всех мессенджерах</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Input Form */}
        <div className="md:col-span-12 lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative">
          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center animate-fadeIn">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 font-display">Заявка отправлена!</h4>
              <p className="text-white/65 text-xs max-w-sm mb-6 leading-relaxed font-sans">
                Спасибо за обращение, <strong>{name}</strong>! Я свяжусь с вами через Telegram или телефон в ближайшее время, чтобы сформировать точки роста для вашего маркетплейса.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setContact("");
                  setBrandLink("");
                }}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-white hover:text-white hover:bg-white/5 transition-all font-sans cursor-pointer"
              >
                Отправить заново
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5">
              <div className="flex items-center gap-2 mb-4.5 pb-2 border-b border-white/10">
                <Sparkles size={14} className="text-blue-400 shrink-0" />
                <span className="font-sans text-[10px] text-white/50 uppercase tracking-widest font-bold">
                  ФОРМА ЗАЯВКИ НА АУДИТ / УСЛУГИ
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-white/50 mb-1.5 tracking-wider">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-white/35 focus:border-blue-500/40 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-white/50 mb-1.5 tracking-wider">
                  Контакты: Телефон или Ник Telegram *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@telegram_nick или +7 (999) ..."
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-white/35 focus:border-blue-500/40 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-white/50 mb-1.5 tracking-wider">
                  Ссылка на бренд или маркетплейс (по желанию)
                </label>
                <input
                  type="text"
                  value={brandLink}
                  onChange={(e) => setBrandLink(e.target.value)}
                  placeholder="wildberries.ru/brands/..."
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-white/35 focus:border-blue-500/40 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-white/50 mb-1.5 tracking-wider">
                  Требуемая услуга
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:border-blue-500/40 transition-all font-sans"
                >
                  {serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt} className="bg-neutral-950 text-white font-sans">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim() || !contact.trim()}
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-105 hover:shadow-lg text-black font-sans text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isLoading ? (
                  <span>ОБРАБОТКА...</span>
                ) : (
                  <>
                    <span>Оставить заявку Татьяне</span>
                    <ArrowRight size={12} className="text-black" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
