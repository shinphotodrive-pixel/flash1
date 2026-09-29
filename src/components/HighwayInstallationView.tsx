import React, { useState } from 'react';
import { Camera, AlertCircle, School, Eye, ShieldAlert, Sparkles } from 'lucide-react';

export const HighwayInstallationView: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'speed-camera' | 'school-zone' | 'tunnel'>('speed-camera');

  return (
    <section className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
              <Camera className="w-5 h-5" />
            </div>
            현장 설치 위치 및 실제 운용 사례 (Use Cases)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            관급 도면별 지주대 상단 마운트 방식 및 운전자 시인성 제고 원리
          </p>
        </div>

        {/* Scenario Switchers */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveScenario('speed-camera')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeScenario === 'speed-camera'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>과속단속 카메라</span>
          </button>
          <button
            onClick={() => setActiveScenario('school-zone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeScenario === 'school-zone'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>스쿨존 안내판</span>
          </button>
          <button
            onClick={() => setActiveScenario('tunnel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeScenario === 'tunnel'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>터널·사고위험구간</span>
          </button>
        </div>
      </div>

      {/* Visual Infographic */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left 2 Cols: Interactive Graphic Representation */}
        <div className="lg:col-span-2 bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Virtual Road Pole Simulation View */}
          <div className="w-full h-64 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 rounded-lg border border-slate-800 relative flex items-center justify-center overflow-hidden">
            {/* Dark Sky & Road Perspective */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-800 to-transparent"></div>
              {/* Lane dashed lines */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-20 bg-amber-400/60 dashed"></div>
            </div>

            {/* Cantilever Gantry Pole Structure */}
            <div className="relative z-10 flex flex-col items-center">
              {/* 2-HEAD STROBE LIGHT MOUNTED AT VERY TOP */}
              <div className="relative mb-2 flex flex-col items-center animate-bounce duration-1000">
                <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-md border border-slate-700 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <div className="w-7 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_#3b82f6] animate-pulse"></div>
                  <div className="w-1 h-3 bg-slate-600"></div>
                  <div className="w-7 h-4 bg-red-500 rounded-sm shadow-[0_0_10px_#ef4444] animate-pulse"></div>
                </div>
                {/* Visor Overhang */}
                <div className="w-20 h-1 bg-slate-600 rounded-t"></div>
                {/* Pole adapter mount */}
                <div className="w-2 h-3 bg-slate-600"></div>
              </div>

              {/* Main Sign / Camera depending on active scenario */}
              {activeScenario === 'speed-camera' && (
                <div className="bg-slate-900 border-2 border-slate-700 rounded-lg p-3 w-64 shadow-xl flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-red-600 bg-white flex items-center justify-center text-slate-900 font-extrabold text-sm shadow-md">
                    50
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] text-red-400 font-bold block font-mono">단속중 / SPEED RADAR</span>
                    <span className="text-xs text-white font-bold block">과속·신호위반 단속</span>
                    <span className="text-[9px] text-slate-400 block">무인 교통감시 카메라</span>
                  </div>
                  <div className="w-6 h-6 rounded bg-slate-800 border border-slate-600 flex items-center justify-center">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                </div>
              )}

              {activeScenario === 'school-zone' && (
                <div className="bg-yellow-400 border-2 border-yellow-500 text-slate-900 rounded-lg p-3 w-64 shadow-xl flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-red-600 bg-white flex items-center justify-center text-slate-900 font-extrabold text-sm shadow-md">
                    30
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] text-slate-800 font-extrabold block">어린이보호구역</span>
                    <span className="text-xs text-slate-950 font-black block">스마트 과속경보판</span>
                    <span className="text-[9px] text-slate-700 block">현재속도 레이더 표출</span>
                  </div>
                  <School className="w-6 h-6 text-slate-900" />
                </div>
              )}

              {activeScenario === 'tunnel' && (
                <div className="bg-slate-900 border-2 border-amber-500 rounded-lg p-3 w-64 shadow-xl flex items-center justify-between gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center font-bold text-xs">
                    경고
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] text-amber-400 font-bold block font-mono">TUNNEL HAZARD</span>
                    <span className="text-xs text-white font-bold block">안전거리 확보 및 감속</span>
                    <span className="text-[9px] text-slate-400 block">사고다발·돌발상황 예경보</span>
                  </div>
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                </div>
              )}

              {/* Vertical Support Pole (지주대 기둥) */}
              <div className="w-5 h-24 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-700 border-x border-slate-500"></div>
            </div>
          </div>

          {/* Context Footer info */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>설치 높이: 노면 기준 5.5m ~ 6.5m 권장</span>
            <span className="text-blue-400 font-semibold">시야각 15° 하향 집중 조사</span>
          </div>
        </div>

        {/* Right Col: Engineering & Legal Principles */}
        <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-400 font-mono block mb-2">
              WHY RED/BLUE STROBE?
            </span>
            <h3 className="text-base font-bold text-white mb-3">
              적청(Red/Blue) 교차 점멸의 심리학적·시각적 효과
            </h3>
            
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <strong className="text-white block mb-1">1. 경찰·공공 긴급신호 연상 작용</strong>
                <span>
                  운전자의 뇌는 적색과 청색의 교차 섬광을 긴급 차량(순찰차) 및 단속 신호로 자동 인지하여 
                  즉각적인 감속 행동(평균 15~25km/h 감속)을 유발합니다.
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <strong className="text-white block mb-1">2. 색온도 보색 잔상 효과</strong>
                <span>
                  단파장(청색: 460nm)과 장파장(적색: 625nm)의 상이한 파장이 망막의 간상체와 추상체를 교차 자극하여 
                  야간 안개, 비천후 기상 조건에서도 높은 투과율을 나타냅니다.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>경찰청 「무인교통단속장비 설치 및 관리지침」 부합</span>
          </div>
        </div>
      </div>
    </section>
  );
};
