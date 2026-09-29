import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Power, 
  Moon, 
  Sun, 
  Sliders, 
  Eye, 
  RotateCw, 
  Info,
  Maximize2,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { StrobePattern, EnvironmentMode } from '../types';

interface StrobeSimulatorProps {
  initialPattern?: StrobePattern;
}

export const StrobeSimulator: React.FC<StrobeSimulatorProps> = ({ 
  initialPattern = 'triple-alternate' 
}) => {
  const [isOn, setIsOn] = useState<boolean>(true);
  const [pattern, setPattern] = useState<StrobePattern>(initialPattern);
  const [speed, setSpeed] = useState<number>(1.0); // 0.5x to 2.0x
  const [brightness, setBrightness] = useState<number>(95); // 20% to 100%
  const [envMode, setEnvMode] = useState<EnvironmentMode>('night');
  const [blueActive, setBlueActive] = useState<boolean>(false);
  const [redActive, setRedActive] = useState<boolean>(false);
  const [showReflections, setShowReflections] = useState<boolean>(true);

  // Strobe animation tick loop
  const stepRef = useRef<number>(0);

  useEffect(() => {
    if (!isOn) {
      setBlueActive(false);
      setRedActive(false);
      return;
    }

    if (pattern === 'steady-on') {
      setBlueActive(true);
      setRedActive(true);
      return;
    }

    // Base interval step in ms
    const baseInterval = 80 / speed;

    const interval = setInterval(() => {
      stepRef.current = (stepRef.current + 1) % 36;
      const s = stepRef.current;

      switch (pattern) {
        case 'triple-alternate': {
          // Standard ITS camera pattern: Blue flashes 3 times, pause, Red flashes 3 times, pause
          // 0-1: Blue ON, 2: OFF, 3-4: Blue ON, 5: OFF, 6-7: Blue ON, 8-11: OFF
          // 12-13: Red ON, 14: OFF, 15-16: Red ON, 17: OFF, 18-19: Red ON, 20-23: OFF
          const cycle = s % 24;
          const isBlue = (cycle === 0 || cycle === 1 || cycle === 3 || cycle === 4 || cycle === 6 || cycle === 7);
          const isRed = (cycle === 12 || cycle === 13 || cycle === 15 || cycle === 16 || cycle === 18 || cycle === 19);
          setBlueActive(isBlue);
          setRedActive(isRed);
          break;
        }

        case 'double-alternate': {
          const cycle = s % 16;
          const isBlue = (cycle === 0 || cycle === 1 || cycle === 3 || cycle === 4);
          const isRed = (cycle === 8 || cycle === 9 || cycle === 11 || cycle === 12);
          setBlueActive(isBlue);
          setRedActive(isRed);
          break;
        }

        case 'rapid-strobe': {
          // Fast alternate 1-1
          const cycle = s % 8;
          setBlueActive(cycle === 0 || cycle === 1);
          setRedActive(cycle === 4 || cycle === 5);
          break;
        }

        case 'quad-pulse': {
          const cycle = s % 24;
          const isBlue = (cycle === 0 || cycle === 2 || cycle === 4 || cycle === 6);
          const isRed = (cycle === 12 || cycle === 14 || cycle === 16 || cycle === 18);
          setBlueActive(isBlue);
          setRedActive(isRed);
          break;
        }

        case 'simultaneous': {
          const cycle = s % 12;
          const isBoth = (cycle === 0 || cycle === 1 || cycle === 3 || cycle === 4);
          setBlueActive(isBoth);
          setRedActive(isBoth);
          break;
        }
      }
    }, baseInterval);

    return () => clearInterval(interval);
  }, [isOn, pattern, speed]);

  // Render individual 3x6 LED module (18 lenses)
  const renderLedGrid = (color: 'blue' | 'red', isActive: boolean) => {
    const isBlue = color === 'blue';
    const coreColor = isBlue ? 'bg-cyan-100' : 'bg-rose-100';
    const glowColor = isBlue ? '#38bdf8' : '#f43f5e';
    const activeAlpha = brightness / 100;

    return (
      <div 
        className={`relative p-3 rounded-lg border transition-all duration-75 flex flex-col justify-between ${
          isActive 
            ? isBlue
              ? 'bg-slate-900 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.6)]'
              : 'bg-slate-900 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)]'
            : 'bg-black/90 border-slate-700/80 shadow-inner'
        }`}
        style={{
          boxShadow: isActive 
            ? `inset 0 0 20px ${isBlue ? 'rgba(56,189,248,0.7)' : 'rgba(244,63,94,0.7)'}, 0 0 ${40 * activeAlpha}px ${glowColor}`
            : 'inset 0 2px 8px rgba(0,0,0,0.8)'
        }}
      >
        {/* Module Header / Engraved specs */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2 pb-1 border-b border-slate-800">
          <span className="flex items-center gap-1 font-bold">
            <span className={`w-2 h-2 rounded-full inline-block ${isBlue ? 'bg-blue-500' : 'bg-red-500'}`}></span>
            {isBlue ? 'CH-1 BLUE (청색)' : 'CH-2 RED (적색)'}
          </span>
          <span className="text-slate-500">18-LED (3×6)</span>
        </div>

        {/* 3 rows x 6 columns = 18 optic lenses */}
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5 my-auto">
          {Array.from({ length: 18 }).map((_, idx) => (
            <div 
              key={idx}
              className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-75 select-none"
              style={{
                background: isActive 
                  ? isBlue
                    ? `radial-gradient(circle, #ffffff 15%, #38bdf8 60%, #1e40af 100%)`
                    : `radial-gradient(circle, #ffffff 15%, #f43f5e 60%, #991b1b 100%)`
                  : 'radial-gradient(circle, #334155 20%, #1e293b 70%, #0f172a 100%)',
                boxShadow: isActive 
                  ? isBlue
                    ? `0 0 ${12 * activeAlpha}px #38bdf8, 0 0 ${24 * activeAlpha}px #0284c7`
                    : `0 0 ${12 * activeAlpha}px #f43f5e, 0 0 ${24 * activeAlpha}px #dc2626`
                  : 'inset 0 1px 3px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.05)',
                filter: isActive ? `brightness(${0.8 + activeAlpha * 0.5})` : 'none'
              }}
            >
              {/* Concentric Fresnel lens ring simulation */}
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-dashed ${
                isActive 
                  ? 'border-white/80 opacity-90 animate-pulse' 
                  : 'border-slate-600/40 opacity-40'
              }`}></div>
              
              {/* Central Power SMD LED chip emitter */}
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm ${
                isActive 
                  ? `${coreColor} shadow-[0_0_8px_#fff]` 
                  : 'bg-amber-800/50'
              }`}></div>

              {/* Lens Glare reflection spot */}
              <div className="absolute top-1 left-1.5 w-1.5 h-1 bg-white/40 rounded-full blur-[0.5px]"></div>
            </div>
          ))}
        </div>

        {/* Module Sub-footer / Lens array label */}
        <div className="mt-2 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500 font-mono">
          <span>IP67 WATERPROOF</span>
          <span>15° FRESNEL OPTIC</span>
        </div>
      </div>
    );
  };

  return (
    <div id="strobe-simulator-section" className="w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Simulator Top Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            <span>실시간 스트로보 시뮬레이터</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            3x6 18구 적청 LED 점멸 패턴 검증기
          </span>
        </div>

        {/* View environment controls */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex items-center text-xs">
            <button
              id="env-night-btn"
              onClick={() => setEnvMode('night')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                envMode === 'night' 
                  ? 'bg-blue-600 text-white font-medium shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="야간 도로 시인성 환경"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>야간 환경</span>
            </button>
            <button
              id="env-day-btn"
              onClick={() => setEnvMode('day')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                envMode === 'day' 
                  ? 'bg-blue-600 text-white font-medium shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="주간 및 실내 검수 환경"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>주간 환경</span>
            </button>
          </div>

          {/* Master Power button */}
          <button
            id="power-toggle-btn"
            onClick={() => setIsOn(!isOn)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              isOn 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40' 
                : 'bg-rose-900/60 border border-rose-700/60 text-rose-200 hover:bg-rose-900'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isOn ? '전원 ON' : '전원 OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display Stage */}
      <div 
        className={`relative w-full py-10 px-4 flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden ${
          envMode === 'night' 
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-black' 
            : 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300'
        }`}
        style={{ minHeight: '380px' }}
      >
        {/* Night environment background elements: Highway overhead gantry & speed warning sign */}
        {envMode === 'night' && (
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {/* Pole gantry silhouettes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 bg-slate-800 h-24 border-x border-slate-700"></div>
            {/* Road lines perspective in distance */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
              <span className="inline-block px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px]">
                과속단속 카메라 지주대 상단 가상 투영 (야간 도로 시인성 500m+)
              </span>
            </div>
          </div>
        )}

        {/* Daylight / Studio environment banner */}
        {envMode === 'day' && (
          <div className="absolute top-3 left-4 text-xs font-mono text-slate-600 pointer-events-none">
            [스튜디오 검수 모드] 태양광 하에서도 선명한 렌즈 투과율 및 바이저 차광 효과
          </div>
        )}

        {/* Ambient Bloom Flash Lighting cast across the stage */}
        {isOn && showReflections && (
          <>
            {blueActive && (
              <div 
                className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none transition-opacity duration-75 blur-3xl opacity-35"
                style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(37,99,235,0.2) 60%, transparent 80%)' }}
              />
            )}
            {redActive && (
              <div 
                className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none transition-opacity duration-75 blur-3xl opacity-35"
                style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.8) 0%, rgba(220,38,38,0.2) 60%, transparent 80%)' }}
              />
            )}
          </>
        )}

        {/* PHYSICAL HOUSING ASSEMBLY CONTAINER */}
        <div className="relative z-10 w-full max-w-2xl">
          {/* Top Sun Visor Hood (비가림막 / 차광막 일체형) */}
          <div className="relative w-full">
            {/* Visor Sloped Roof */}
            <div 
              className={`h-7 w-full rounded-t-xl border-t-2 border-x-2 transition-colors duration-200 ${
                envMode === 'night' 
                  ? 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-slate-600 shadow-lg' 
                  : 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 border-slate-500 shadow-md'
              }`}
              style={{
                clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)',
              }}
            >
              {/* Visor mounting rivets */}
              <div className="flex justify-between px-6 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-inner"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-inner"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-inner"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-inner"></div>
              </div>
            </div>

            {/* Visor Overhang Shadow lip (처마 그림자) */}
            <div className="h-2 w-full bg-black/80 blur-[1px]"></div>
          </div>

          {/* Main Rectangular Steel Housing (외함 분체도장 철제 본체) */}
          <div 
            className={`p-3 sm:p-5 rounded-b-xl border-b-4 border-x-4 transition-colors relative shadow-2xl ${
              envMode === 'night' 
                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700' 
                : 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700'
            }`}
          >
            {/* Top corner hex bolts */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-400"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-400"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-400"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-400"></div>

            {/* Middle Divider & Label Plate */}
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              {/* Left Unit: Blue 18-LED Module */}
              <div className="flex-1">
                {renderLedGrid('blue', blueActive)}
              </div>

              {/* Central Isolation Steel Partition & ITS Brand / Spec Badge */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-2 py-3 bg-slate-950/80 rounded border border-slate-800 select-none">
                <div className="w-0.5 h-6 bg-slate-700"></div>
                <div className="my-2 px-1 py-1 rounded bg-slate-900 border border-slate-700 text-center">
                  <span className="text-[8px] sm:text-[9px] font-mono text-slate-300 font-bold block leading-tight">
                    ITS
                  </span>
                  <span className="text-[7px] text-blue-400 font-mono block">
                    DUAL
                  </span>
                </div>
                <div className="w-0.5 h-6 bg-slate-700"></div>
              </div>

              {/* Right Unit: Red 18-LED Module */}
              <div className="flex-1">
                {renderLedGrid('red', redActive)}
              </div>
            </div>

            {/* Bottom Enclosure Details */}
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono px-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>STATUS: {isOn ? 'ACTIVE STROBE' : 'STANDBY'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>TOTAL: 36 POWER LED</span>
                <span className="hidden sm:inline">DC 12V/24V DUAL</span>
              </div>
            </div>
          </div>

          {/* Bottom Pole Mount Bracket Outline (지주대 U볼트 브라켓) */}
          <div className="w-24 h-4 mx-auto bg-slate-700/80 rounded-b border-b border-x border-slate-600 flex items-center justify-center text-[8px] font-mono text-slate-400">
            POLE BRACKET
          </div>
        </div>

        {/* Ambient Ground / Road Reflection effect */}
        {envMode === 'night' && isOn && showReflections && (
          <div className="w-full max-w-lg mt-6 h-3 rounded-full flex justify-between blur-md opacity-70 pointer-events-none">
            <div className={`w-1/2 h-full rounded-l-full transition-opacity duration-75 ${blueActive ? 'bg-cyan-400 opacity-90' : 'opacity-0'}`}></div>
            <div className={`w-1/2 h-full rounded-r-full transition-opacity duration-75 ${redActive ? 'bg-rose-500 opacity-90' : 'opacity-0'}`}></div>
          </div>
        )}
      </div>

      {/* Simulator Control Dashboard */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pattern Selection */}
          <div className="lg:col-span-2">
            <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>점멸 패턴 선택 (Strobe Pattern)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                id="pattern-triple-btn"
                onClick={() => setPattern('triple-alternate')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  pattern === 'triple-alternate'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">교차 3점멸 (표준)</div>
                <div className="text-[10px] text-slate-400">무인단속 카메라 기본형</div>
              </button>

              <button
                id="pattern-double-btn"
                onClick={() => setPattern('double-alternate')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  pattern === 'double-alternate'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">교차 2점멸</div>
                <div className="text-[10px] text-slate-400">어린이보호구역 스쿨존</div>
              </button>

              <button
                id="pattern-rapid-btn"
                onClick={() => setPattern('rapid-strobe')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  pattern === 'rapid-strobe'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">고속 스트로보</div>
                <div className="text-[10px] text-slate-400">고속도로 및 사고다발</div>
              </button>

              <button
                id="pattern-quad-btn"
                onClick={() => setPattern('quad-pulse')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  pattern === 'quad-pulse'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">4회 펄스 교차</div>
                <div className="text-[10px] text-slate-400">터널 입구 진입경고</div>
              </button>

              <button
                id="pattern-simul-btn"
                onClick={() => setPattern('simultaneous')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  pattern === 'simultaneous'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">동시 점멸</div>
                <div className="text-[10px] text-slate-400">도로공사 및 비상대응</div>
              </button>

              <button
                id="pattern-steady-btn"
                onClick={() => setPattern('steady-on')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  pattern === 'steady-on'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-sm'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">상시 점등 (검수)</div>
                <div className="text-[10px] text-slate-400">LED 단선 및 렌즈 점검</div>
              </button>
            </div>
          </div>

          {/* Flash Speed Controller */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                점멸 주기 (Flash Rate)
              </span>
              <span className="font-mono text-blue-400">{speed.toFixed(1)}x</span>
            </div>
            <input 
              id="speed-slider"
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>0.5x (저속)</span>
              <span>1.0x (표준)</span>
              <span>2.0x (초고속)</span>
            </div>
          </div>

          {/* Brightness Intensity Controller */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                발광 광도 (Intensity)
              </span>
              <span className="font-mono text-blue-400">{brightness}%</span>
            </div>
            <input 
              id="brightness-slider"
              type="range"
              min="20"
              max="100"
              step="5"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>20% (절전)</span>
              <span>60% (일반)</span>
              <span>100% (고휘도)</span>
            </div>
          </div>
        </div>

        {/* Diagnostic info pill */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>경찰청 표준 도로교통 신호설비 지침 및 한국도로공사 ITS 자재 규격 부합</span>
          </div>
          <button
            onClick={() => setShowReflections(!showReflections)}
            className="text-xs text-slate-400 hover:text-slate-200 underline font-mono flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            반사광/글레어 효과 {showReflections ? '숨기기' : '켜기'}
          </button>
        </div>
      </div>
    </div>
  );
};
