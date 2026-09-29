import React from 'react';
import { Shield, Radio, Activity, Compass, Cpu, Zap, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'flash' | 'its-guide';
  setActiveTab: (tab: 'flash' | 'its-guide') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 shadow-2xl overflow-hidden">
      {/* Decorative background grid and beam glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Subdued Dual Warning Flare Glow on edges */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 pt-8 pb-10 md:pt-10 md:pb-12 text-center">
        {/* ITS Standard Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-4 backdrop-blur shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-mono">ITS SPEED ENFORCEMENT & WARNING BEACON</span>
          <span className="text-slate-500">|</span>
          <span>과속 경고등 플래시 비콘 기술 규격</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-white drop-shadow-sm">
          {activeTab === 'flash' ? '과속차량 경고등 플래시 비콘 추천 및 구매 가이드' : 'ITS 2구 적청 사각 LED 경광등'}
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-blue-200/90 max-w-3xl mx-auto leading-relaxed font-normal mb-8">
          {activeTab === 'flash'
            ? '과속경보 안내판 상단 마운트용 100mm 이상 직각/원형 고휘도 플래시 비콘 (ON/OFF 제어, 적색/백색, 소모전력, 가격, 마운트 편의성, 구매처 및 유튜브 조사)'
            : '과속 단속 카메라 지주대 및 스쿨존 스마트 안내판 상단 부착용 (Red/Blue 2구 스트로보 상세 규격 및 시뮬레이터)'}
        </p>

        {/* Main Tab Switcher - Placed Prominently at the front / top */}
        <div className="inline-flex p-1.5 bg-slate-950/90 border border-slate-700/90 rounded-2xl shadow-2xl backdrop-blur max-w-full">
          {/* Tab 1 (FIRST): Flash Beacon (플래시 탭) */}
          <button
            type="button"
            id="tab-flash-beacon"
            onClick={() => setActiveTab('flash')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'flash'
                ? 'bg-gradient-to-r from-amber-500 via-red-600 to-rose-600 text-white shadow-lg shadow-red-900/50 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            <span className="font-extrabold tracking-wide">플래시 (과속 경고등·비콘)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/25 text-white font-mono font-bold shadow-sm">
              맨앞 탭
            </span>
          </button>

          {/* Tab 2: ITS 2-Head Blue/Red Guide */}
          <button
            type="button"
            id="tab-its-guide"
            onClick={() => setActiveTab('its-guide')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'its-guide'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Radio className="w-4 h-4 text-blue-300" />
            <span>ITS 2구 적청 경광등 (가이드·시뮬레이터)</span>
          </button>
        </div>

        {/* Sub-navigation anchors for the active tab */}
        {activeTab === 'its-guide' && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              onClick={() => scrollToSection('strobe-simulator-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200 transition-colors shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 text-blue-400" />
              <span>실시간 점멸 시뮬레이터</span>
            </button>
            
            <button
              onClick={() => scrollToSection('equipment-analysis')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200 transition-colors shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>제품 형상 및 규격 도면</span>
            </button>

            <button
              onClick={() => scrollToSection('vendor-directory')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200 transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>제작·구매 디렉토리</span>
            </button>

            <button
              onClick={() => scrollToSection('demo-video-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200 transition-colors shadow-sm"
            >
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span>유튜브 작동 시연</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
