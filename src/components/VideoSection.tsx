import React, { useState } from 'react';
import { Play, ExternalLink, Video, Clock, AlertTriangle, Sparkles } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoId = 'wrOS3LEkynI';
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section id="demo-video-section" className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Red Accent edge */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-red-500 via-rose-500 to-red-600"></div>

      {/* Header */}
      <div className="pb-5 border-b border-slate-800 mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 text-red-400">
            <Video className="w-5 h-5" />
          </div>
          작동 시연 영상 (YouTube)
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          실제 도로 현장 및 실험실 환경에서의 2구 적청 LED 스트로보 교차 점멸 시인성 테스트
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side: Description and Link */}
        <div className="w-full lg:w-1/2 space-y-4">
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            이러한 형태의 2구 적청 LED 경광등이 실제로 어떻게 교차 점멸하며 작동하는지 
            시인성과 광학 집광 효과를 직관적으로 확인할 수 있는 시연 영상입니다.
          </p>

          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <Clock className="w-4 h-4 text-red-400" />
              <span>실제 점멸 사이클 분석 포인트</span>
            </div>
            <p className="leading-relaxed">
              • <strong className="text-blue-400">청색 3회 고속 펄스</strong>와 <strong className="text-red-400">적색 3회 고속 펄스</strong>의 
              비대칭 잔상 효과를 통해 원거리 운전자의 동공 수축을 유도하여 주시율을 300% 이상 증대시킵니다.
            </p>
            <p className="leading-relaxed">
              • 주간 직사광선 조건에서도 차광 바이저(비가림막)가 그늘을 형성하여 플래시 콘트라스트비를 극대화합니다.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg shadow-red-900/30 hover:scale-[1.02]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              <span>도로용 장방형 경광등 시연 보기 (Thomas An)</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>

            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>페이지 내 즉시 재생</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Responsive Video Player / Thumbnail */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl group">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="도로용 장방형 경광등 시연 보기"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div 
                onClick={() => setIsPlaying(true)}
                className="w-full h-full cursor-pointer relative"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube Video Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 group-hover:via-black/10 transition-colors flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span className="bg-red-600/90 text-white font-bold px-2 py-0.5 rounded">
                      YOUTUBE DEMO
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                      Thomas An 도로용 장방형 경광등
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="self-center my-auto flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-900/50 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 fill-white translate-x-0.5" />
                    </div>
                    <span className="text-xs text-white font-medium bg-black/70 px-2.5 py-1 rounded-full backdrop-blur">
                      클릭하여 영상 바로 재생
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>2구 적청 교차 스트로보 실제 발광 및 시인성 녹화</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
