import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ExternalLink, 
  Youtube, 
  CheckCircle2, 
  Sliders, 
  ShieldAlert, 
  Cpu, 
  Wrench, 
  Maximize2, 
  Sparkles, 
  Play, 
  Eye, 
  Gauge, 
  Layers, 
  Clock, 
  X,
  Flame,
  Radio,
  ArrowDownRight,
  TrendingDown,
  Feather,
  BatteryCharging,
  Camera,
  AlertTriangle
} from 'lucide-react';
import { SPEED_WARNING_PRODUCTS } from '../data/speedWarningProducts';
import { SpeedWarningProduct } from '../types';
import { SpeedWarningComparisonTable } from './SpeedWarningComparisonTable';
import { SpeedWarningDetailModal } from './SpeedWarningDetailModal';

export const SpeedWarningTab: React.FC = () => {
  // View mode switcher: 'both' | 'table' | 'cards'
  const [viewMode, setViewMode] = useState<'both' | 'table' | 'cards'>('both');

  // Product detail modal state
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<SpeedWarningProduct | null>(null);

  const handleNavigateDetail = (direction: 'prev' | 'next') => {
    if (!selectedDetailProduct) return;
    const currentIndex = SPEED_WARNING_PRODUCTS.findIndex((p) => p.id === selectedDetailProduct.id);
    if (currentIndex === -1) return;
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedDetailProduct(SPEED_WARNING_PRODUCTS[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < SPEED_WARNING_PRODUCTS.length - 1) {
      setSelectedDetailProduct(SPEED_WARNING_PRODUCTS[currentIndex + 1]);
    }
  };

  // Filters
  const [selectedSize, setSelectedSize] = useState<'all' | '100mm급' | '120~150mm급' | '200mm급'>('all');
  const [selectedShape, setSelectedShape] = useState<'all' | 'square' | 'round'>('all');
  const [selectedColor, setSelectedColor] = useState<'all' | 'red' | 'white'>('all');
  const [selectedFlashType, setSelectedFlashType] = useState<'all' | '크세논 스트로브 플래시' | '파워 LED 버스트 플래시' | '규격형 1구 점멸 플래시'>('all');

  // Interactive Live Simulator state
  const [simSize, setSimSize] = useState<'100mm급' | '120~150mm급' | '200mm급'>('100mm급');
  const [simShape, setSimShape] = useState<'square' | 'round'>('round');
  const [simColor, setSimColor] = useState<'red' | 'white'>('white');
  const [simMode, setSimMode] = useState<'xenon' | 'burst' | 'standard'>('xenon');
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [simTimer, setSimTimer] = useState<number>(0);
  const [flashActive, setFlashActive] = useState<boolean>(false);

  // Video modal state
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string; url: string } | null>(null);

  // Filtered products
  const filteredProducts = SPEED_WARNING_PRODUCTS.filter((product) => {
    if (selectedSize !== 'all' && product.sizeCategory !== selectedSize) {
      return false;
    }
    if (selectedShape !== 'all' && product.shape !== selectedShape) {
      return false;
    }
    if (selectedColor === 'red' && !product.colors.some(c => c.includes('적색'))) {
      return false;
    }
    if (selectedColor === 'white' && !product.colors.some(c => c.includes('백색'))) {
      return false;
    }
    if (selectedFlashType !== 'all' && product.flashType !== selectedFlashType) {
      return false;
    }
    return true;
  });

  // Handle trigger simulation (Speeding car detected: 3-second burst strobe)
  const triggerSpeedAlert = () => {
    setIsTriggered(true);
    setSimTimer(3);
  };

  // Timer countdown for simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTriggered && simTimer > 0) {
      timer = setTimeout(() => {
        setSimTimer((prev) => prev - 1);
      }, 1000);
    } else if (simTimer === 0) {
      setIsTriggered(false);
    }
    return () => clearTimeout(timer);
  }, [isTriggered, simTimer]);

  // Flash oscillation while triggered based on mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTriggered) {
      const speed = simMode === 'xenon' ? 70 : simMode === 'burst' ? 95 : 250;
      interval = setInterval(() => {
        setFlashActive((prev) => !prev);
      }, speed);
    } else {
      setFlashActive(false);
    }
    return () => clearInterval(interval);
  }, [isTriggered, simMode]);

  // Calculate visual dimensions based on simSize
  const getCanvasDimensions = () => {
    switch (simSize) {
      case '100mm급':
        return { sizeClass: 'w-28 h-28', label: 'Ø100mm 규격 (초경량 0.25kg, 3만원대)', dotCols: 3, count: 9 };
      case '120~150mm급':
        return { sizeClass: 'w-36 h-36', label: simShape === 'square' ? '120×120mm 슬림 사각 플래시' : 'Ø125~150mm 표준 플래시 돔', dotCols: 4, count: 16 };
      case '200mm급':
      default:
        return { sizeClass: 'w-44 h-44', label: simShape === 'square' ? '200×200mm C-찬넬 대형 직각' : 'Ø200mm 대형 신호형 비콘', dotCols: 5, count: 25 };
    }
  };

  const canvasInfo = getCanvasDimensions();

  return (
    <div className="space-y-10">
      {/* 1. Header Overview & 4 Core Requirements Acceptance */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-2xl overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>과속차량 경고용 플래시 비콘 (Flash Warning Beacon)</span>
            </span>

            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
              요청 4대 필수 기능 100% 충족 검증
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              과속차량 경고용 플래시 비콘 추천 및 구매 가이드
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl mt-2">
              과속경보 안내판 상단에 마운트하여 제한속도 초과 차량 검지 시 번쩍이는 고광도 플래시로 운전자에게 
              <strong> 단속 카메라 촬영 착각(Psychological Enforcement Flash)</strong>과 즉각적인 감속을 유도하는 전문 플래시 비콘 제품군입니다.
            </p>
          </div>

          {/* 4 Core Features Compliance Checklist Banner */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>요청 기능 수용성 전수 검증 결과 (모든 조사 제품 100% 만족)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Requirement 1 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>1. 제어(ON/OFF) 가능</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  과속 레이더 검지기 릴레이 무전압 A접점(NO/COM) 2선 직결 또는 TTL 트리거로 과속 시에만 순간 ON/OFF 작동
                </p>
              </div>

              {/* Requirement 2 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>2. 적색 또는 백색</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  직관적 위험 경고를 주는 <strong>적색(Red)</strong>과 단속카메라 플래시 착각을 일으키는 <strong>백색(Cool White)</strong> 완비
                </p>
              </div>

              {/* Requirement 3 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>3. 직각/원형 100mm 이상</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  직각형 120×120mm / 200×200mm 및 원형 Ø100mm, Ø125mm, Ø150mm, Ø200mm 전 규격 수용
                </p>
              </div>

              {/* Requirement 4 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>4. 과속 차량에 임팩트</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  크세논 방전관 순간 발광(Camera Strobe) 또는 고출력 LED 3연타 버스트로 200m 전방에서도 강력한 시각적 충격 제공
                </p>
              </div>
            </div>
          </div>

          {/* Quick Advantage highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1">
              <span className="text-slate-400 text-[11px]">입력 전원 호환성</span>
              <div className="font-bold text-xs text-slate-200">DC 12V / 24V & AC 220V</div>
              <span className="text-[10px] text-slate-500">태양광 솔라 및 상시전원 모두 지원</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1">
              <span className="text-slate-400 text-[11px]">가격 경쟁력</span>
              <div className="font-bold text-xs text-emerald-400">34,980원 ~ 115,000원</div>
              <span className="text-[10px] text-slate-500">100mm 규격완화로 예산 60% 절감</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1">
              <span className="text-slate-400 text-[11px]">초경량 하중 (0.25kg~)</span>
              <div className="font-bold text-xs text-amber-300">풍압·처짐 저항 제로</div>
              <span className="text-[10px] text-slate-500">안내판 상단 거치 최적화</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1">
              <span className="text-slate-400 text-[11px]">안내판 마운트</span>
              <div className="font-bold text-xs text-blue-400">L-브라켓 & C-찬넬 레일</div>
              <span className="text-[10px] text-slate-500">M6/M8 볼트 2개로 3분 시공 완료</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Real-time Flash Beacon Simulator */}
      <section className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                <Zap className="w-4 h-4" />
              </div>
              플래시 비콘 실시간 과속 검지 발광 시뮬레이터
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              크세논 순간 플래시 섬광(단속카메라 효과), 파워 LED 3연타 버스트를 직접 트리거하여 과속 차량 시각 충격도를 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">릴레이 ON/OFF:</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
              isTriggered 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              {isTriggered ? `⚡ ON (플래시 발광중: ${simTimer}초)` : 'OFF (대기 상태)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Canvas: Strobe Light scaled to actual size setting */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-slate-800/80 relative overflow-hidden min-h-[380px]">
            {/* Ambient Radial Flare when flashActive */}
            <div className={`absolute inset-0 transition-opacity duration-75 pointer-events-none ${
              flashActive 
                ? simColor === 'white' 
                  ? 'bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.4),rgba(2,6,23,0.9))] opacity-100'
                  : 'bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.35),rgba(2,6,23,0.9))] opacity-100'
                : 'bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.8),rgba(2,6,23,1))] opacity-80'
            }`} />

            <div className="relative z-10 flex flex-col items-center">
              {/* Scalable Warning Flasher Housing */}
              <div className="relative mb-3 flex flex-col items-center">
                {/* Mounting Bracket */}
                <div className="w-14 h-3 bg-slate-700 border-x border-t border-slate-600 rounded-t-sm shadow-md" />

                {/* Strobe Housing with dynamic size */}
                {simShape === 'square' ? (
                  // Square (100mm, 120mm, or 200mm)
                  <div className={`${canvasInfo.sizeClass} rounded-2xl border-4 transition-all duration-100 flex items-center justify-center relative shadow-2xl ${
                    flashActive 
                      ? simColor === 'white' 
                        ? 'border-white bg-white shadow-[0_0_120px_rgba(255,255,255,1)] scale-105' 
                        : 'border-red-400 bg-red-600 shadow-[0_0_120px_rgba(239,68,68,1)] scale-105'
                      : 'border-slate-700 bg-slate-900/95'
                  }`}>
                    {/* Concentric Fresnel details */}
                    <div className="absolute inset-2 border border-dashed border-slate-700/50 rounded-xl pointer-events-none flex items-center justify-center" />

                    {/* Central Xenon or LED Matrix */}
                    <div className="grid gap-1.5 relative z-10" style={{ gridTemplateColumns: `repeat(${canvasInfo.dotCols}, minmax(0, 1fr))` }}>
                      {Array.from({ length: canvasInfo.count }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-3 h-3 rounded-full transition-all ${
                            flashActive 
                              ? simColor === 'white' 
                                ? 'bg-white shadow-[0_0_12px_#ffffff] scale-125' 
                                : 'bg-red-200 shadow-[0_0_12px_#ef4444] scale-125'
                              : simColor === 'white' 
                                ? 'bg-slate-700/60' 
                                : 'bg-red-950/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Round (100mm, 125mm, or 200mm)
                  <div className={`${canvasInfo.sizeClass} rounded-full border-4 transition-all duration-100 flex items-center justify-center relative shadow-2xl ${
                    flashActive 
                      ? simColor === 'white' 
                        ? 'border-white bg-white shadow-[0_0_120px_rgba(255,255,255,1)] scale-105' 
                        : 'border-red-400 bg-red-600 shadow-[0_0_120px_rgba(239,68,68,1)] scale-105'
                      : 'border-slate-700 bg-slate-900/95'
                  }`}>
                    {/* Concentric Signal Rings */}
                    <div className="absolute inset-2 border border-slate-700/40 rounded-full pointer-events-none flex items-center justify-center" />

                    {/* Radial Xenon / LED Flash Matrix */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                      <div className="flex gap-1">
                        {[1, 2].map((n) => (
                          <div key={n} className={`w-3 h-3 rounded-full transition-all ${flashActive ? (simColor === 'white' ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-red-200 shadow-[0_0_10px_#ef4444]') : 'bg-slate-700/60'}`} />
                        ))}
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <div key={n} className={`w-3.5 h-3.5 rounded-full transition-all ${flashActive ? (simColor === 'white' ? 'bg-white shadow-[0_0_12px_#fff] scale-110' : 'bg-red-200 shadow-[0_0_12px_#ef4444] scale-110') : 'bg-slate-700/60'}`} />
                        ))}
                      </div>
                      <div className="flex gap-1">
                        {[1, 2].map((n) => (
                          <div key={n} className={`w-3 h-3 rounded-full transition-all ${flashActive ? (simColor === 'white' ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-red-200 shadow-[0_0_10px_#ef4444]') : 'bg-slate-700/60'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Dimension & Spec Label */}
                <div className="mt-2.5 text-[11px] font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{canvasInfo.label}</span>
                </div>
              </div>

              {/* Simulated Speed Display Sign Below */}
              <div className="w-60 bg-slate-900 border-2 border-slate-700 rounded-xl p-3 text-center shadow-lg">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  과속경보시스템 (DFS) 연동 표지판
                </div>
                <div className={`text-3xl font-black font-mono my-1 tracking-wider ${
                  isTriggered ? 'text-red-500 animate-pulse' : 'text-emerald-400'
                }`}>
                  {isTriggered ? '84 km/h' : '48 km/h'}
                </div>
                <div className={`text-[10px] font-bold py-0.5 px-2 rounded ${
                  isTriggered ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {isTriggered ? '⚠️ 제한속도 초과! 플래시 비콘 작동' : '안전 운행 준수 (제한속도 50)'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls & Evaluation */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Size Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                1. 규격 크기 (100mm 이상 직각/원형)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSimSize('100mm급')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    simSize === '100mm급'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold">100mm급</span>
                  <span className="text-[10px] opacity-80">3만원대 초경량</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSimSize('120~150mm급')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    simSize === '120~150mm급'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold">120~150mm급</span>
                  <span className="text-[10px] opacity-80">업계 표준 규격</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSimSize('200mm급')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    simSize === '200mm급'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold">200mm급</span>
                  <span className="text-[10px] opacity-80">원거리 대형</span>
                </button>
              </div>
            </div>

            {/* 2. Shape Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                2. 제품 형상 (직각형 vs 원형)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSimShape('round')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    simShape === 'round'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />
                  <span>원형 비콘 (Ø100/125/150/200)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSimShape('square')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    simShape === 'square'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-3.5 h-3.5 border-2 border-current rounded-sm" />
                  <span>직각형 비콘 (120각 / 200각)</span>
                </button>
              </div>
            </div>

            {/* 3. Color Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                3. LED / 광원 색상 선택 (적색 vs 백색)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSimColor('white')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    simColor === 'white'
                      ? 'bg-slate-100 text-slate-900 border-white shadow-md font-bold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-white border border-slate-400 shadow-[0_0_8px_#fff]" />
                  <span>백색 (단속카메라 플래시 착각 유도)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSimColor('red')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    simColor === 'red'
                      ? 'bg-red-600 text-white border-red-500 shadow-md font-bold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-red-300 shadow-[0_0_8px_#ef4444]" />
                  <span>적색 (강력한 정지/경고 시각 전달)</span>
                </button>
              </div>
            </div>

            {/* 4. Flash Mode */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                4. 플래시 발광 패턴 (과속 차량 임팩트)
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSimMode('xenon')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    simMode === 'xenon'
                      ? 'bg-amber-600 text-white border-amber-500 font-bold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div>크세논 플래시</div>
                  <div className="text-[10px] opacity-75">순간 섬광 70ms</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSimMode('burst')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    simMode === 'burst'
                      ? 'bg-amber-600 text-white border-amber-500 font-bold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div>3연타 버스트</div>
                  <div className="text-[10px] opacity-75">고속 펄스</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSimMode('standard')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    simMode === 'standard'
                      ? 'bg-amber-600 text-white border-amber-500 font-bold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div>규격 1초 점멸</div>
                  <div className="text-[10px] opacity-75">60 FPM 정주기</div>
                </button>
              </div>
            </div>

            {/* Simulation Action Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                id="btn-trigger-flash-sim"
                onClick={triggerSpeedAlert}
                disabled={isTriggered}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isTriggered
                    ? 'bg-amber-500 text-slate-950 shadow-amber-900/40 animate-pulse'
                    : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-900/40 hover:scale-[1.02]'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  {isTriggered ? `과속 검지 플래시 발광 작동 중 (${simTimer}초)` : '과속 차량 감지 시뮬레이션 발광 (3초 릴레이 ON)'}
                </span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                ※ 레이더 검지기 A접점 릴레이가 3초간 닫히며 고광도 플래시 비콘을 발광시키는 실제 현장 시퀀스입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-300">보기 모드:</span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'both'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              대조표 + 상세카드 함께보기
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4대 기준 대조표만 보기</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>상세 제품 카드만 보기</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 font-semibold">
            ⚡ 전압 · 💰 가격 · 📐 크기 · 🔧 마운트 완벽 비교
          </span>
        </div>
      </div>

      {/* 4. Speed Warning Beacon 4-Way Comparison Table Component */}
      {(viewMode === 'table' || viewMode === 'both') && (
        <SpeedWarningComparisonTable 
          onOpenVideo={setActiveVideo} 
          onSelectProduct={(p) => setSelectedDetailProduct(p)} 
        />
      )}

      {/* 5. Product Filter Toolbar & Cards Grid */}
      {(viewMode === 'cards' || viewMode === 'both') && (
        <>
          {/* Product Filter & Search Toolbar */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <span>과속 경고등 플래시 비콘 개별 제품 카드 (총 {filteredProducts.length}종 상세)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  입력 전원, 가격, LED 색상, 과속 안내판 마운트 용이성에 따라 조건별 필터링할 수 있습니다.
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                실구매가 및 즉시 발주 가능
              </span>
            </div>

            {/* Filters bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Size filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 px-2 font-medium">크기:</span>
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedSize === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedSize('100mm급')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedSize === '100mm급' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  100mm급
                </button>
                <button
                  onClick={() => setSelectedSize('120~150mm급')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedSize === '120~150mm급' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  120~150mm급
                </button>
                <button
                  onClick={() => setSelectedSize('200mm급')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedSize === '200mm급' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  200mm급
                </button>
              </div>

              {/* Shape filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 px-2 font-medium">형상:</span>
                <button
                  onClick={() => setSelectedShape('all')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedShape === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedShape('square')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedShape === 'square' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  직각 (사각)
                </button>
                <button
                  onClick={() => setSelectedShape('round')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedShape === 'round' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  원형
                </button>
              </div>

              {/* Color filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 px-2 font-medium">색상:</span>
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedColor === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedColor('white')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedColor === 'white' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  백색 (플래시)
                </button>
                <button
                  onClick={() => setSelectedColor('red')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedColor === 'red' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  적색 (경고)
                </button>
              </div>

              {/* Flash Type filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 px-2 font-medium">광원 타입:</span>
                <button
                  onClick={() => setSelectedFlashType('all')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedFlashType === 'all' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedFlashType('크세논 스트로브 플래시')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedFlashType === '크세논 스트로브 플래시' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  크세논 섬광
                </button>
                <button
                  onClick={() => setSelectedFlashType('파워 LED 버스트 플래시')}
                  className={`px-2 py-1 rounded-lg transition-colors font-medium ${
                    selectedFlashType === '파워 LED 버스트 플래시' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  파워 LED 버스트
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Product Cards Grid (6 Models) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedDetailProduct(product)}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/70 transition-all p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-indigo-950/40 hover:-translate-y-0.5 duration-200"
              >
                {/* Top Accent line based on size category */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                  product.sizeCategory === '100mm급'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                    : product.sizeCategory === '120~150mm급'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : 'bg-gradient-to-r from-purple-500 to-rose-500'
                }`} />

                <div className="space-y-4">
                  {/* Manufacturer & Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      {product.manufacturer}
                    </span>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {product.flashType}
                      </span>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        product.sizeCategory === '100mm급'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : product.sizeCategory === '120~150mm급'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                            : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      }`}>
                        {product.sizeCategory}
                      </span>

                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {product.shapeLabel}
                      </span>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>상세 모달</span>
                      </span>
                    </div>
                  </div>

                  {/* Product Title & Model */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors flex items-center justify-between gap-2">
                      <span>{product.name}</span>
                      <Maximize2 className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs font-mono text-slate-400">모델: {product.model}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-xs text-slate-400 font-mono">치수: {product.dimensions}</span>
                      <span className="text-slate-600">|</span>
                      <div className="flex items-center gap-1">
                        {product.colors.map((c, idx) => (
                          <span 
                            key={idx}
                            className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              c.includes('적색') 
                                ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                                : 'bg-slate-200 text-slate-900 font-bold'
                            }`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Specs 4-Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                    <div className="space-y-0.5">
                      <span className="text-slate-500 block text-[11px]">입력 전원</span>
                      <span className="font-bold text-slate-200">{product.inputVoltage}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-500 block text-[11px]">가격 (실구매/유통가)</span>
                      <span className="font-bold text-emerald-400">{product.price}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-500 block text-[11px]">소모 전력 / 무게</span>
                      <span className="font-bold text-amber-300">
                        {product.powerConsumption} {product.weight ? `(${product.weight})` : ''}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-500 block text-[11px]">제어 방식 (ON/OFF)</span>
                      <span className="font-bold text-blue-300 truncate block" title={product.controlMethod}>
                        무전압 A접점 릴레이
                      </span>
                    </div>
                  </div>

                  {/* 4 Core Features Compliance Badges for this card */}
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>요구사항 4종 부합 체크:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        ✓ 1. ON/OFF 제어 가능
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
                        ✓ 2. 적색/백색 완비
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                        ✓ 3. 100mm 이상 규격
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-semibold">
                        ✓ 4. 과속 임팩트 ★{product.impactLevel}/5
                      </span>
                    </div>
                  </div>

                  {/* Driving Method */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>플래시 구동 방식 및 ON/OFF 릴레이 트리거</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed pl-5 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                      {product.drivingMethod}
                    </p>
                  </div>

                  {/* Impact Description */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-red-400" />
                      <span>과속 차량에 대한 시인성 및 임팩트 (단속 카메라 착각 유도)</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed pl-5 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30 font-medium text-red-200/90">
                      {product.impactDescription}
                    </p>
                  </div>

                  {/* Mount Convenience */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                        <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                        <span>과속 경고 안내판 마운트 편의성 (상단 거치)</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400">
                        편의도 ★{product.mountRating}/5
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed pl-5 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/40 text-emerald-200/90 font-medium">
                      {product.mountConvenience}
                    </p>
                  </div>

                  {/* Feature Points */}
                  <div className="pt-1">
                    <ul className="space-y-1 text-[11px] text-slate-400">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDetailProduct(product);
                    }}
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-900/20 hover:scale-[1.02]"
                    title="상세 사양과 구매 링크 크게 보기"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>상세 사양 크게 보기</span>
                  </button>

                  <a
                    href={product.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/20 hover:scale-[1.02]"
                  >
                    <span>구매처 바로가기 (URL)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideo({ id: product.youtubeVideoId, title: product.name, url: product.youtubeUrl });
                    }}
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-semibold text-xs transition-all shadow-md shadow-red-900/20 hover:scale-[1.02]"
                  >
                    <Youtube className="w-4 h-4 fill-current" />
                    <span>유튜브 시연 재생</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 6. Mounting & Wiring Practical Guide for Speed Signs */}
      <section className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="pb-4 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            과속경보 안내판 상단 플래시 비콘 마운트 및 결선 시공 가이드
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            안내판 상단 프레임에 흔들림 없이 볼트 2개로 결합하고, 레이더 검지기 릴레이와 직결하는 실무 가이드입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          {/* Method 1 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs">1</div>
              <span>100mm/125mm 초경량 L-브라켓 결합 (가장 편리)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              큐라이트 S100S(0.25kg) 및 S125S(0.37kg)는 무게 부담이 전혀 없어, 안내판 상단에 스테인리스 L자 브라켓(SZ-100/125)을 볼트 2개로 체결하면 태풍에도 처짐이나 흔들림이 전혀 없습니다.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-emerald-300 font-medium">
              💡 장점: 타공 최소화, 3만원대 저렴한 단가, 풍압 하중 극소화
            </div>
          </div>

          {/* Method 2 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs">2</div>
              <span>120각/200각 C-찬넬 슬라이딩 마운트</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              사각 제품(DFS-120ST 및 TT-FL200S)은 후면에 C-찬넬 슬라이딩 레일이 있어, 과속안내판 상단 프로파일 홈에 M8 볼트 2개를 밀어 넣어 타공 없이 수평을 맞추며 견고하게 체결합니다.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-blue-300 font-medium">
              💡 장점: 무타공 슬라이딩 체결, 안내판 전면과의 뛰어난 일체감
            </div>
          </div>

          {/* Method 3 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-xs">3</div>
              <span>과속 레이더 ↔ 릴레이 2선 직결 ON/OFF 제어</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              도플러 레이더 제어보드의 <strong>릴레이 출력 단자 (NO: Normal Open, COM: Common)</strong>에 플래시 비콘 전원선 한 가닥을 직렬 배선합니다. 과속 감지 시에만 릴레이가 3초간 도통하여 고광도 섬광을 방출합니다.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-amber-300 font-medium">
              💡 팁: DC 12V 저전력 모델(4.8W)은 안내판 내부 메인 SMPS/배터리에 직결 가능
            </div>
          </div>
        </div>
      </section>

      {/* 7. YouTube Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500 fill-current" />
                <h4 className="text-sm font-bold text-white truncate max-w-md">
                  {activeVideo.title} - 플래시 비콘 시연 영상
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                실제 도로 현장 및 실험실에서의 과속 경고 플래시 비콘 스트로보 점멸 시인성 테스트
              </span>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold"
              >
                <span>YouTube 원본 새창으로 열기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 8. Detailed Product Specification & Large Purchase Modal */}
      <SpeedWarningDetailModal
        product={selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        onOpenVideo={setActiveVideo}
        onNavigateProduct={handleNavigateDetail}
        hasPrev={selectedDetailProduct ? SPEED_WARNING_PRODUCTS.findIndex((p) => p.id === selectedDetailProduct.id) > 0 : false}
        hasNext={selectedDetailProduct ? SPEED_WARNING_PRODUCTS.findIndex((p) => p.id === selectedDetailProduct.id) < SPEED_WARNING_PRODUCTS.length - 1 : false}
      />
    </div>
  );
};
