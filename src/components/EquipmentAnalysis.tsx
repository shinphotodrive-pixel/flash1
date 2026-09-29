import React, { useState } from 'react';
import { 
  Info, 
  Ruler, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Maximize, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const EquipmentAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'specs'>('overview');

  return (
    <section id="equipment-analysis" className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Accent Edge */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-600"></div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
              <Info className="w-5 h-5" />
            </div>
            제품 형상 및 규격 분석
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            관급 도로 인프라용 2구 적청 사각 LED 경광등 구조 역설계 및 기술 사양
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            기본 분석
          </button>
          <button
            onClick={() => setActiveTab('dimensions')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'dimensions'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            도면 및 치수 (CAD)
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'specs'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            상세 기술 규격서
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW (User prompt exact core content preserved and elevated) */}
      {activeTab === 'overview' && (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Visual Model Schematic Card */}
          <div className="w-full lg:w-5/12 flex-shrink-0">
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 shadow-inner flex flex-col items-center">
              {/* Illustrated Architectural Cutout */}
              <div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-b from-slate-800/80 to-slate-950 border border-slate-700/80 p-3 flex flex-col justify-between relative overflow-hidden group">
                {/* Sun Visor Hood Graphic */}
                <div className="w-full h-5 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-t border-t border-slate-400 flex items-center justify-between px-3 text-[9px] font-mono text-slate-300">
                  <span>차광막(비가림막) 15° 경사각</span>
                  <span>SUS 볼트 결속</span>
                </div>

                {/* Dual Module Box Preview */}
                <div className="grid grid-cols-2 gap-3 my-auto">
                  {/* Left: Blue 18-LED */}
                  <div className="bg-slate-900 border-2 border-blue-500/80 rounded p-2 text-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <div className="text-[11px] font-bold text-blue-400 font-mono">청색 18구 (3×6)</div>
                    <div className="grid grid-cols-6 gap-1 my-1.5 px-1">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-blue-500/60 mx-auto"></div>
                      ))}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">FRESNEL LENS</div>
                  </div>

                  {/* Right: Red 18-LED */}
                  <div className="bg-slate-900 border-2 border-red-500/80 rounded p-2 text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <div className="text-[11px] font-bold text-red-400 font-mono">적색 18구 (3×6)</div>
                    <div className="grid grid-cols-6 gap-1 my-1.5 px-1">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-red-500/60 mx-auto"></div>
                      ))}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">FRESNEL LENS</div>
                  </div>
                </div>

                {/* Pole Clamp Bracket label */}
                <div className="text-center text-[9px] text-slate-400 font-mono border-t border-slate-800 pt-1">
                  후면 지주대 결속 U-Bolt 브라켓 마운트 일체형
                </div>
              </div>

              {/* Status & Caption */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  비가림막(바이저) 포함 철제 하우징 일체형
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  옥외 방수 방진 IP67 / 내식성 분체도장 외함
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Text Content */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between">
            <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 text-slate-300 leading-relaxed mb-6">
              <p className="text-slate-200 font-medium mb-3 text-base">
                제공된 사진 형태의 기기는 일반 시중 쇼핑몰에서 쉽게 구매할 수 있는 단순 기성품 완제품이 아닙니다.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                주로 지자체(시·군·구청 교통행정과)나 <strong className="text-white">ITS(지능형 교통 시스템)</strong> 시공사의 
                도로 안내판 및 단속장비 설치 설계 도면에 맞춰 규격 가공·발주되는 
                <strong className="text-blue-400"> 관급 자재(교통 인프라용 전문 장비)</strong>의 성격을 띱니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>과속 단속 카메라 타워 상단 지주대</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>어린이보호구역(스쿨존) 스마트 표지판</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>급경사·급커브 사고다발구간 예경보</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>터널 입구 및 지하차도 진입차단 경고</span>
                </div>
              </div>
            </div>

            {/* Spec list pills */}
            <div className="space-y-3">
              <div className="flex items-start p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-slate-200 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_#3b82f6]"></span>
                <div>
                  <strong className="text-blue-300 font-semibold">좌측 (청색):</strong> 18구 (3×6 배열) 고휘도 LED 프레넬 렌즈 모듈
                  <span className="block text-xs text-slate-400 mt-0.5">광선 집중형 15° 확산 렌즈 내장, 방수 실링 몰딩 처리</span>
                </div>
              </div>

              <div className="flex items-start p-3 rounded-lg bg-red-950/30 border border-red-800/40 text-slate-200 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_#ef4444]"></span>
                <div>
                  <strong className="text-red-300 font-semibold">우측 (적색):</strong> 18구 (3×6 배열) 고휘도 LED 프레넬 렌즈 모듈
                  <span className="block text-xs text-slate-400 mt-0.5">고휘도 알가인(AlGaInP) 파워 칩 적용, 직사일광 하에서도 400m+ 시인</span>
                </div>
              </div>

              <div className="flex items-start p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-slate-200 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-1.5 mr-3 flex-shrink-0"></span>
                <div>
                  <strong className="text-white font-semibold">하우징(외함):</strong> 비가림막(바이저)이 포함된 맞춤형 철제 외함 조립
                  <span className="block text-xs text-slate-400 mt-0.5">태양광 역광 방지 차광 후드 75mm 돌출, EGI 1.6T 분체도장 마감</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIMENSIONS (CAD Blueprint View) */}
      {activeTab === 'dimensions' && (
        <div className="bg-slate-950 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-white">외형 치수 및 취부 구조도 (Standard 2-Head Housing)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">단위: mm (공차 ±2mm)</span>
          </div>

          {/* SVG CAD Blueprint Diagram */}
          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 800 360" className="w-full min-w-[640px] h-auto font-mono text-[11px] select-none">
              <defs>
                <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Background Blueprint Grid */}
              <rect width="800" height="360" fill="#090d16" />
              <rect width="800" height="360" fill="url(#cadGrid)" />

              {/* FRONT VIEW (정면도) */}
              <g transform="translate(40, 40)">
                <text x="210" y="20" fill="#94a3b8" textAnchor="middle" fontWeight="bold">정면도 (FRONT VIEW)</text>

                {/* Visor Sloped Top */}
                <polygon points="10,50 410,50 420,75 0,75" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                
                {/* Main Enclosure Box */}
                <rect x="0" y="75" width="420" height="180" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                {/* Left Blue Module Frame */}
                <rect x="25" y="100" width="165" height="130" rx="3" fill="#021c38" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="107" y="120" fill="#60a5fa" textAnchor="middle" fontSize="10">CH-1 청색 모듈 (3×6)</text>
                {/* Array dots */}
                {Array.from({ length: 18 }).map((_, i) => {
                  const col = i % 6;
                  const row = Math.floor(i / 6);
                  return (
                    <circle key={i} cx={45 + col * 25} cy={140 + row * 32} r="9" fill="#1e40af" stroke="#93c5fd" strokeWidth="1" />
                  );
                })}

                {/* Center partition */}
                <line x1="210" y1="80" x2="210" y2="250" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />

                {/* Right Red Module Frame */}
                <rect x="230" y="100" width="165" height="130" rx="3" fill="#2d0a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="312" y="120" fill="#f87171" textAnchor="middle" fontSize="10">CH-2 적색 모듈 (3×6)</text>
                {/* Array dots */}
                {Array.from({ length: 18 }).map((_, i) => {
                  const col = i % 6;
                  const row = Math.floor(i / 6);
                  return (
                    <circle key={i} cx={250 + col * 25} cy={140 + row * 32} r="9" fill="#991b1b" stroke="#fca5a5" strokeWidth="1" />
                  );
                })}

                {/* Dimension: Total Width 420mm */}
                <line x1="0" y1="280" x2="420" y2="280" stroke="#38bdf8" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <text x="210" y="295" fill="#38bdf8" textAnchor="middle">W: 420 mm</text>

                {/* Dimension: Total Height 180mm */}
                <line x1="440" y1="75" x2="440" y2="255" stroke="#38bdf8" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <text x="475" y="170" fill="#38bdf8" textAnchor="middle">H: 180 mm</text>
              </g>

              {/* SIDE VIEW (측면도) */}
              <g transform="translate(540, 40)">
                <text x="100" y="20" fill="#94a3b8" textAnchor="middle" fontWeight="bold">측면도 (SIDE VIEW)</text>

                {/* Visor protrusion profile */}
                <polygon points="30,50 140,50 160,75 105,75" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                
                {/* Housing Side Rect */}
                <rect x="30" y="75" width="100" height="180" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                {/* Rear Pole Mount U-Bolt Bracket */}
                <rect x="0" y="125" width="30" height="80" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
                <circle cx="15" cy="145" r="4" fill="#cbd5e1" />
                <circle cx="15" cy="185" r="4" fill="#cbd5e1" />
                <text x="-5" y="165" fill="#94a3b8" fontSize="9" textAnchor="end">지주대 결속</text>

                {/* Dimension: Depth 160mm */}
                <line x1="30" y1="280" x2="130" y2="280" stroke="#38bdf8" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <text x="80" y="295" fill="#38bdf8" textAnchor="middle">D: 160 mm</text>

                {/* Dimension: Visor overhang 75mm */}
                <line x1="105" y1="90" x2="160" y2="90" stroke="#f59e0b" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <text x="135" y="105" fill="#f59e0b" textAnchor="middle" fontSize="9">바이저: 75mm</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs text-slate-300">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-1">외형 규격 (W×H×D)</span>
              <strong className="text-white text-sm">420 × 180 × 160 mm</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-1">차광 바이저 돌출</span>
              <strong className="text-white text-sm">75 mm (15° 하향 차광각)</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-1">지주대 부착 직경 (Pole Ø)</span>
              <strong className="text-white text-sm">Ø 114 ~ 216 mm (U볼트 가변)</strong>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPECIFICATIONS TABLE */}
      {activeTab === 'specs' && (
        <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3 px-4">분류</th>
                <th className="py-3 px-4">항목</th>
                <th className="py-3 px-4">기술 사양 (Specification)</th>
                <th className="py-3 px-4">비고 / 표준 규격</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 font-semibold text-blue-400" rowSpan={3}>광학 사양</td>
                <td className="py-3 px-4 text-white">LED 발광 소자</td>
                <td className="py-3 px-4">고출력 파워 SMD LED 총 36구 (청색 18구 + 적색 18구)</td>
                <td className="py-3 px-4 text-slate-400">수명 50,000시간 이상 보증</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 text-white">집광 렌즈</td>
                <td className="py-3 px-4">내후성 PMMA 프레넬 집광 렌즈 (조사각 15° 집중형)</td>
                <td className="py-3 px-4 text-slate-400">원거리 집중 조사 특성</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 text-white">시인 거리</td>
                <td className="py-3 px-4">주간 400m 이상 / 야간 800m 이상 직사 시인</td>
                <td className="py-3 px-4 text-slate-400">경찰청 신호기 기준 충족</td>
              </tr>

              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 font-semibold text-emerald-400" rowSpan={3}>전기 사양</td>
                <td className="py-3 px-4 text-white">정격 전압</td>
                <td className="py-3 px-4">DC 12V / DC 24V 겸용 (옵션: AC 220V 한전 전원용 SMPS 내장)</td>
                <td className="py-3 px-4 text-slate-400">태양광 발전기 직결 가능</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 text-white">소비 전력</td>
                <td className="py-3 px-4">최대 36W (모듈당 18W 발광 시) / 점멸 시 평균 18W</td>
                <td className="py-3 px-4 text-slate-400">고효율 절전 드라이버</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 text-white">점멸 컨트롤러</td>
                <td className="py-3 px-4">마이크로프로세서 내장형 (3-3 교차 / 고속 / 연속 패턴 DIP 스위치 설정)</td>
                <td className="py-3 px-4 text-slate-400">외부 접점 제어 가능</td>
              </tr>

              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 font-semibold text-amber-400" rowSpan={3}>기구 및 환경</td>
                <td className="py-3 px-4 text-white">외함 재질</td>
                <td className="py-3 px-4">EGI 1.6T 전기아연도금강판 + 옥외용 정전분체도장 (RAL 7016 다크그레이)</td>
                <td className="py-3 px-4 text-slate-400">SUS304 스테인리스 옵션</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 text-white">방수·방진 등급</td>
                <td className="py-3 px-4">IP66 / IP67 완전 방수 실링 몰딩</td>
                <td className="py-3 px-4 text-slate-400">폭우·폭설 내환경성</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-4 text-white">동작 온도</td>
                <td className="py-3 px-4">-30°C ~ +70°C (결로 방지 방습 벤트 밸브 장착)</td>
                <td className="py-3 px-4 text-slate-400">극서·혹한기 보증</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
