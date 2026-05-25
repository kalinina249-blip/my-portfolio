/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, AlertCircle, RefreshCw, Cpu } from "lucide-react";

interface HLSVideoBackgroundProps {
  streamUrl: string;
  onStreamError?: (err: string) => void;
}

export function HLSVideoBackground({ streamUrl, onStreamError }: HLSVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setErrorMsg(null);
    setIsBuffering(true);

    // Stop and destroy any previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsBuffering(false);
        video.play().catch((err) => {
          console.log("Auto-play blocked or interrupted:", err);
          setIsPlaying(false);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("HLS fatal network error, trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("HLS fatal media error, trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              console.error("FATAL HLS stream error:", data);
              setErrorMsg("Ошибка загрузки HLS. Попробуйте другой поток или подождите.");
              if (onStreamError) onStreamError(data.details);
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native support (Safari/iOS)
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        setIsBuffering(false);
        video.play().catch((err) => {
          console.log("Native Safari autoplay block:", err);
          setIsPlaying(false);
        });
      });
      video.addEventListener("error", (e) => {
        console.error("Native video error:", e);
        setErrorMsg("Нативные плееры iOS/Safari не поддерживают этот стрим.");
        if (onStreamError) onStreamError("Native error");
      });
    } else {
      setIsBuffering(false);
      setErrorMsg("Ваш браузер не поддерживает HLS-видео. Используем интерактивный фон.");
    }

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setErrorMsg(null);
    };

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [streamUrl, onStreamError]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
      {/* Cinematic dark overlays to guarantee visual high-contrast and readability of absolute overlay widgets */}
      <div className="absolute inset-0 bg-radial-[circle_at_left_bottom] from-slate-950/40 via-slate-900/60 to-slate-950/80 z-10" />
      <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-[0.85] z-10" />

      {/* Actual HTML Video Node */}
      <video
        ref={videoRef}
        id="bg-hls-video"
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        playsInline
        muted={isMuted}
        loop
      />

      {/* Fallback pattern if video is loading or broken */}
      {errorMsg ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 z-20 text-center px-4">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mb-4 animate-pulse">
            <AlertCircle size={40} />
          </div>
          <h4 className="text-xl font-medium text-white mb-2 font-sans">
            Интерактивный AI фон
          </h4>
          <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
            {errorMsg}
          </p>
          <div className="absolute inset-0 -z-10 bg-radial-[circle_at_center] from-indigo-950/20 via-slate-950 to-slate-950" />
          {/* Pulsing AI nodes pattern as visual backup */}
          <div className="w-64 h-64 rounded-full bg-violet-600/10 blur-[100px] animate-pulse" />
        </div>
      ) : null}

      {/* Buffering Indicator */}
      {isBuffering && !errorMsg && (
        <div className="absolute bottom-6 right-24 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          <RefreshCw className="animate-spin text-indigo-400" size={14} />
          <span className="text-white/80 font-mono text-xs">Буферизация HLS...</span>
        </div>
      )}

      {/* Video Playback Controls Widget */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          id="btn-video-play-pause"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md transition-all active:scale-95"
          title={isPlaying ? "Пауза" : "Воспроизвести"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={toggleMute}
          id="btn-video-mute"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md transition-all active:scale-95"
          title={isMuted ? "Включить звук" : "Без звука"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Bottom corner branding touch */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-widest uppercase">
        <Cpu size={12} className="animate-pulse" />
        <span>Live HLS Background Active</span>
      </div>
    </div>
  );
}
