/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Sparkles, BrainCircuit, Play, Copy, Check, Send, AlertCircle, ShoppingBag, Terminal, Cpu, FileText, Camera } from "lucide-react";
import { AIStudioResponse } from "@/src/types";

export function AIContentStudio() {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [platform, setPlatform] = useState<"Wildberries" | "Ozon" | "Yandex.Market">("Wildberries");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIStudioResponse | null>(null);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Pre-loaded premium results for simulation if key is missing or for instant testing
  const presets: Record<string, AIStudioResponse> = {
    jacket: {
      seoTitle: "Пуховик женский зимний длинный с капюшоном оверсайз",
      seoDescription: "Стильный зимний пуховик оверсайз — ваш абсолютный щит от холода до -30°C. Выполнен из мембранной ветровлагозащитной ткани с премиальным гипоаллергенным наполнителем эко-пух. Анатомический глубокий капюшон, мягкие трикотажные манжеты и надежная двухсторонняя молния гарантируют максимальный уют во время долгих прогулок. Силуэт-кокон идеально садится на любой тип фигуры, подчеркивая индивидуальность.",
      keywords: ["пуховик женский", "зимняя куртка", "пальто оверсайз", "пуховик зимний длинный", "одежда на зиму", "теплый пуховик кокон", "пуховик с капюшоном", "мембранный плащ"],
      aiPhotoPrompts: {
        hero: "Premium product layout photo of a long ivory-white puffed winter jacket, floating in mid-air on a dark slate background, dramatic studio lighting, soft natural snow particles, photorealistic, 8k --ar 4:5",
        details: "Macro close-up shot of heavy-duty double seam thread, high-performance windproof fabric fibers, water droplets rolling off white membrane, detailed studio texture macro --ar 4:5",
        lifestyle: "Elegant candid photo of a modern athletic woman walking through high-end alpine winter resort wearing white modern long puffer jacket, golden hour sun reflection, warm vibes --ar 4:5"
      },
      strategicAdvice: [
        "Установите скидку в диапазоне 65-70%. Алгоритм WB лучше продвигает карточки с высокими номинальными скидками.",
        "Используйте инфографику на 1-м фото с тезисами: влагозащита, температурный режим до -30°C, оверсайз крой.",
        "Завозите первую партию по FBO на склады Коледино и Подольск для ускорения срока доставки по ключевым регионам."
      ]
    },
    humidifier: {
      seoTitle: "Увлажнитель воздуха ультразвуковой бесшумный с ароматизацией",
      seoDescription: "Создайте идеальный микроклимат в вашем доме с премиальным ультразвуковым увлажнителем воздуха. Прибор оснащен вместительным резервуаром на 4 литра, обеспечивающим до 15 часов непрерывной работы. Сверхтихий ночной режим (до 23 дБ) делает его идеальным выбором для спальни и детской комнаты. Встроенный диффузор для эфирных масел мягко насытит атмосферу любимыми ароматами для глубокого релакса.",
      keywords: ["увлажнитель воздуха", "ароматизатор диффузор", "ультразвуковой увлажнитель", "бытовая техника для дома", "очиститель воздуха", "увлажнитель детский", "ночник увлажнитель", "диффузор масел"],
      aiPhotoPrompts: {
        hero: "Commercial studio lighting photography of a sleek white minimalist cylindrical air humidifier, soft white vapor stream rising elegantly, set on polished absolute walnut wood table, grey smooth studio backdrop, volumetric fog --ar 4:5",
        details: "Detailed macro view of a circular touch-screen glowing LED panel interface with digital temperature and level controls --ar 4:5",
        lifestyle: "Cozy interior design photography, air humidifier operating on a wooden stand near a modern beige sofa, green Monstera plant leaves on background, sunny morning rays beaming through window glass --ar 4:5"
      },
      strategicAdvice: [
        "Включите в инфографику графики пользы для кожи и детского сна. Это закрывает главные эмоциональные триггеры мам.",
        "Делайте упор на SEO-ключ 'подарок на новоселье', 'техника для дома', запустите внутреннюю рекламу по точным поисковым фразам.",
        "Отправляйте товар под FBS по схеме Ozon Rocket, чтобы протестировать спрос перед оптовым выкупом."
      ]
    }
  };

  const loadPreset = (key: "jacket" | "humidifier") => {
    setProductName(key === "jacket" ? "Пуховик женский оверсайз" : "Ультразвуковой увлажнитель воздуха");
    setProductDesc(key === "jacket" ? "Зимний белый пуховик до -30 градусов, оверсайз кокон с капюшоном, ветрозащитный" : "Увлажнитель воздуха на 4л с ароматерапией, тихий режим работы для сна, подсветка");
    setResult(presets[key]);
    setErrorHeader(null);
  };

  const handleOptimize = async (e: FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setIsLoading(true);
    setErrorHeader(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          productDesc,
          platform
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Fallback simulated load since API key might not be present or is expired
        console.warn("Server API failed, loading realistic simulated result:", data);
        setTimeout(() => {
          // Check if we can approximate a good response from productName
          const lowerName = productName.toLowerCase();
          if (lowerName.includes("куртк") || lowerName.includes("пуховик") || lowerName.includes("пальт") || lowerName.includes("одежд")) {
            setResult(presets.jacket);
          } else {
            setResult(presets.humidifier);
          }
          setErrorHeader("Демо-режим: Лимит запросов исчерпан или ключ не подключен. Мы загрузили высококлассную симуляцию.");
          setIsLoading(false);
        }, 1200);
        return;
      }

      setResult(data);
    } catch (err: any) {
      console.error("Fetch root error:", err);
      // Fallback
      setTimeout(() => {
        setResult(presets.jacket);
        setErrorHeader("Локальный демо-режим. Загружен проверенный шаблон оптимизации.");
        setIsLoading(false);
      }, 1000);
    } finally {
      if (!errorHeader) {
        setIsLoading(false);
      }
    }
  };

  const handleCopy = (text: string, id: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopiedKey(id);
            setTimeout(() => setCopiedKey(null), 1500);
          })
          .catch(() => {
            // Fallback copy
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopiedKey(id);
            setTimeout(() => setCopiedKey(null), 1550);
          });
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 1500);
      }
    } catch (e) {
      console.warn("Failed to copy text using clipboard API:", e);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 md:px-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl text-white">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-bold flex items-center gap-1.5">
            <Cpu size={14} className="animate-spin-slow text-blue-400" />
            AI STUDIO PLAYGROUND
          </span>
          <h2 className="font-display text-2xl sm:text-3.5xl font-bold mt-1 tracking-tight text-white">
            Инструмент Оптимизации Листингов
          </h2>
          <p className="text-white/65 text-sm mt-2 max-w-xl leading-relaxed">
            Попробуйте технологию ИИ-оптимизации Татьяны в реальном времени. Введите название и платформа смоделирует безупречную карточку товара.
          </p>
        </div>

        {/* Preset fast picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/40 hidden sm:inline">Быстрые шаблоны:</span>
          <button
            onClick={() => loadPreset("jacket")}
            className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 text-xs text-white/85 transition-all font-sans"
          >
            🧥 Пуховик зима
          </button>
          <button
            onClick={() => loadPreset("humidifier")}
            className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 text-xs text-white/85 transition-all font-sans"
          >
            💧 Увлажнитель
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input form */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
            <span className="font-sans text-[10px] text-white/50 font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Terminal size={12} className="text-blue-400" />
              Ввод параметров товара
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold uppercase">
              Free Sandbox Node
            </span>
          </div>

          <form onSubmit={handleOptimize} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 font-mono uppercase tracking-wider">
                Название маркетплейса
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Wildberries", "Ozon", "Yandex.Market"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold font-sans transition-all border ${
                      platform === p
                        ? "bg-white text-black border-transparent"
                        : "bg-[#0d0d0d] border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 font-mono uppercase tracking-wider">
                Название товара (например, Кожаная куртка)
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Введите название вашего продукта..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:border-blue-500/40 transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 font-mono uppercase tracking-wider">
                Сырые характеристики или старое описание (по желанию)
              </label>
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Материал, размер, температурный режим, комплектация, целевая аудитория..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white resize-none focus:border-blue-500/40 transition-all font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !productName.trim()}
              className="w-full py-4 rounded-xl bg-white hover:bg-slate-100 text-black text-xs md:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2.5 mt-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Cpu className="animate-spin text-black h-4.5 w-4.5" />
                  <span className="font-mono text-xs">АНАЛИЗ И ОПТИМИЗАЦИЯ КАНАЛОВ...</span>
                </>
              ) : (
                <>
                  <BrainCircuit size={16} className="text-black" />
                  <span>Сгенерировать супер-карточку</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Console */}
        <div className="lg:col-span-7">
          {isLoading ? (
            <div className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[450px] text-center">
              <Cpu className="animate-spin text-blue-400 mb-4 h-12 w-12" />
              <h4 className="text-lg font-bold text-white mb-2 font-display">Нейросеть генерирует контент</h4>
              <p className="text-white/60 text-xs max-w-sm leading-relaxed font-sans">
                Модель анализирует перегруженность ниши, подбирает релевантные SEO-ключи, формирует маркетинговые триггеры и собирает промпты для идеального фотосета.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Alert header if sandbox mode was invoked */}
              {errorHeader && (
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs flex items-start gap-2.5 font-sans leading-snug">
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-blue-450" />
                  <span>{errorHeader}</span>
                </div>
              )}

              {/* Bento Output Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SEO Title Card */}
                <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-5 relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-[9px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FileText size={12} className="text-blue-400" />
                      ОПТИМИЗИРОВАННЫЙ SEO ЗАГОЛОВОК
                    </span>
                    <button
                      onClick={() => handleCopy(result.seoTitle, "title_copy")}
                      className="text-white/60 hover:text-white p-1 rounded transition-all"
                      title="Копировать"
                    >
                      {copiedKey === "title_copy" ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <h4 className="text-base font-semibold text-white font-sans">{result.seoTitle}</h4>
                  <div className="h-px bg-white/10 my-3" />
                  <span className="text-[10px] text-white/40 font-sans">
                    Длина: {result.seoTitle.length} символов. Максимально заполняет поисковые поисковые индексы {platform}.
                  </span>
                </div>

                {/* Left Description Card */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[9px] text-white/50 font-bold uppercase tracking-wider">
                      ОПИСАНИЕ С ВЫСОКИМ CTR
                    </span>
                    <button
                      onClick={() => handleCopy(result.seoDescription, "desc_copy")}
                      className="text-white/60 hover:text-white p-1 rounded transition-all"
                    >
                      {copiedKey === "desc_copy" ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed font-sans max-h-62 overflow-y-auto pr-1">
                    {result.seoDescription}
                  </p>
                </div>

                {/* Right Keywords block */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[9px] text-white/50 font-bold uppercase tracking-wider block mb-4">
                      SEO КЛЮЧИ С ВЫСОКОЙ ЧАСТОТНОСТЬЮ
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.keywords.map((kw, idx) => (
                        <span
                          key={idx}
                          onClick={() => handleCopy(kw, `kw_${idx}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-black/45 border border-white/10 hover:border-blue-400/40 text-[10px] text-white/80 font-mono cursor-pointer transition-all flex items-center gap-1.5"
                        >
                          <span>#{kw}</span>
                          {copiedKey === `kw_${idx}` ? <Check size={10} className="text-emerald-400" /> : <Copy size={9} className="opacity-40" />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-white/40 font-sans mt-4 border-t border-white/10 pt-3">
                    * Кликните по тегу, чтобы мгновенно скопировать его в буфер обмена.
                  </p>
                </div>

                {/* Bottom Photo Prompts Card */}
                <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <span className="font-sans text-[9px] text-blue-400 font-bold tracking-wider uppercase block mb-3.5 flex items-center gap-1">
                    <Camera size={12} />
                    ПРОМПТЫ СТУДИЙНОГО КАЧЕСТВА ДЛЯ ГЕНЕРАЦИИ В ИИ (MIDJOURNEY V6 / FLUX)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="p-3 bg-black/45 rounded-xl border border-white/10">
                      <span className="text-[10px] font-sans text-white/40 font-bold block mb-1">1. HERO PHOTO</span>
                      <p className="text-[11px] text-white/70 line-clamp-3 italic mb-2 leading-relaxed font-mono">"{result.aiPhotoPrompts.hero}"</p>
                      <button
                        onClick={() => handleCopy(result.aiPhotoPrompts.hero, 'p_hero')}
                        className="w-full py-1 text-[10px] text-white/60 hover:text-white hover:bg-white/5 font-sans border border-white/10 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'p_hero' ? <Check size={11} className="text-emerald-400" /> : <Copy size={10} />}
                        <span>Копировать</span>
                      </button>
                    </div>

                    <div className="p-3 bg-black/45 rounded-xl border border-white/10">
                      <span className="text-[10px] font-sans text-white/40 font-bold block mb-1">2. ДЕТАЛИ И ТЕКСТУРЫ</span>
                      <p className="text-[11px] text-white/70 line-clamp-3 italic mb-2 leading-relaxed font-mono">"{result.aiPhotoPrompts.details}"</p>
                      <button
                        onClick={() => handleCopy(result.aiPhotoPrompts.details, 'p_details')}
                        className="w-full py-1 text-[10px] text-white/60 hover:text-white hover:bg-white/5 font-sans border border-white/10 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'p_details' ? <Check size={11} className="text-emerald-450" /> : <Copy size={10} />}
                        <span>Копировать</span>
                      </button>
                    </div>

                    <div className="p-3 bg-black/45 rounded-xl border border-white/10">
                      <span className="text-[10px] font-sans text-white/40 font-bold block mb-1">3. LIFESTYLE</span>
                      <p className="text-[11px] text-white/70 line-clamp-3 italic mb-2 leading-relaxed font-mono">"{result.aiPhotoPrompts.lifestyle}"</p>
                      <button
                        onClick={() => handleCopy(result.aiPhotoPrompts.lifestyle, 'p_life')}
                        className="w-full py-1 text-[10px] text-white/60 hover:text-white hover:bg-white/5 font-sans border border-white/10 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'p_life' ? <Check size={11} className="text-emerald-400" /> : <Copy size={10} />}
                        <span>Копировать</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Strategic Advice Card */}
                <div className="md:col-span-2 bg-gradient-to-r from-blue-950/40 to-purple-950/20 border border-blue-405/20 rounded-2xl p-5">
                  <span className="font-sans text-[9px] text-blue-300 font-bold tracking-widest uppercase block mb-3">
                    📜 СТРАТЕГИЧЕСКИЕ СОВЕТЫ ОТ ТАТЬЯНЫ КАЛИНИНОЙ (TOP-5 SELLER)
                  </span>
                  <ul className="space-y-2.5">
                    {result.strategicAdvice.map((adv, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-white/85 font-sans leading-relaxed">
                        <span className="font-mono text-blue-400 font-extrabold">{idx + 1}.</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[450px] text-center">
              <Sparkles size={36} className="text-blue-450/40 animate-bounce mb-4" />
              <h4 className="text-lg font-bold text-white mb-2 font-display">Студия ожидает запуска</h4>
              <p className="text-white/60 text-xs max-w-sm leading-relaxed font-sans mb-6">
                Слева введите название вашего продукта, выберите маркетплейс и нажмите кнопку генерации карточки. Наш встроенный ИИ от Татьяны мгновенно создаст контент.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => loadPreset("jacket")}
                  className="px-5 py-3 bg-white hover:bg-slate-100 text-black font-sans text-xs font-bold rounded-xl transition-all shadow-lg active:scale-97"
                >
                  Загрузить демо-пуховик
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
