import React, { useState } from 'react';
import { 
  Zap, 
  ExternalLink, 
  Youtube, 
  CheckCircle2, 
  Wrench, 
  ArrowUpDown, 
  Layers, 
  ShieldCheck, 
  Maximize2, 
  Feather, 
  Sparkles, 
  Info,
  Check,
  Flame,
  BatteryCharging
} from 'lucide-react';
import { SPEED_WARNING_PRODUCTS } from '../data/speedWarningProducts';
import { SpeedWarningProduct } from '../types';

export interface ComparisonItem {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  shape: 'round' | 'square';
  shapeLabel: string;
  // 1. 전압 (Voltage)
  voltageCategory: 'DC 12V/24V' | 'DC 12V 전용' | 'DC 프리볼트' | 'AC/DC 선택';
  voltageDetail: string;
  voltageBadge: string;
  powerSupplyNote: string;
  solarFriendly: boolean;
  // 2. 가격 (Price)
  priceMin: number;
  priceMax: number;
  priceDisplay: string;
  priceRankTag: string;
  priceSavingRate: string;
  // 3. 크기 및 중량 (Size & Weight)
  sizeCategory: '100mm급' | '120~150mm급' | '200mm급';
  sizeDimension: string;
  sizeDiameterOrWidth: number; // in mm for sorting
  weightKg: number;
  weightDisplay: string;
  windLoadRating: string;
  // 4. 마운트 방식 (Mounting Method)
  mountCategory: '무타공 C-찬넬' | '전용 L-브라켓' | 'FT 일체형' | '힌지/반도';
  mountHardware: string;
  mountNoDrill: boolean;
  mountTimeEstimate: string;
  mountRating: number;
  mountConvenienceSummary: string;
  // Flash & Impact
  flashType: string;
  impactDescription: string;
  impactStars: number;
  bestFitScenario: string;
  purchaseUrl: string;
  purchaseStoreName: string;
  youtubeUrl: string;
  youtubeVideoId: string;
}

export const COMPARISON_PRODUCTS: ComparisonItem[] = [
  {
    id: 'qlight-s100',
    name: '큐라이트 Ø100mm 콤팩트 크세논 플래시 비콘',
    model: 'S100S / S100LR',
    manufacturer: '(주)큐라이트 (Qlight)',
    shape: 'round',
    shapeLabel: '원형 (Ø100mm)',
    voltageCategory: 'DC 12V/24V',
    voltageDetail: 'DC 12V, DC 24V, AC 110V/220V 선택',
    voltageBadge: 'DC 12V/24V & AC 선택',
    powerSupplyNote: '소비전력 4.8W~6W 초절전 설계 (태양광 배터리 방전 우려 제로)',
    solarFriendly: true,
    priceMin: 34980,
    priceMax: 37800,
    priceDisplay: '34,980원 ~ 37,800원',
    priceRankTag: '가성비 1위 (최저가)',
    priceSavingRate: '200mm 대비 65% 절감',
    sizeCategory: '100mm급',
    sizeDimension: 'Ø100mm × 높이 145mm',
    sizeDiameterOrWidth: 100,
    weightKg: 0.25,
    weightDisplay: '0.25kg (초경량 1위)',
    windLoadRating: '처짐·풍압 영향 0% (안내판 상단 휨 없음)',
    mountCategory: '전용 L-브라켓',
    mountHardware: '전용 슬림 L-브라켓(SZ-100) M6 볼트 2점 또는 하부 PCD 3점',
    mountNoDrill: false,
    mountTimeEstimate: '약 3분 소요',
    mountRating: 5,
    mountConvenienceSummary: '안내판 상단 프레임에 L-브라켓을 M6 볼트 2개로 체결. 하중이 250g에 불과해 태풍에도 지지대 처짐이 전혀 없음.',
    flashType: '크세논 스트로브 플래시 (순간 방전 섬광)',
    impactDescription: '순간 크세논 방전관 특유의 번개 같은 번쩍임으로 주간 150m 전방 과속 운전자에게 단속카메라 플래시 착각 즉각 유도',
    impactStars: 5,
    bestFitScenario: '가성비 최우선, 태양광(솔라) 배터리 전원, 초경량 마운트가 필수인 스쿨존 과속안내판',
    purchaseUrl: 'https://smartstore.naver.com/qlight',
    purchaseStoreName: '큐라이트 공식 네이버 스마트스토어',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrOS3LEkynI',
    youtubeVideoId: 'wrOS3LEkynI'
  },
  {
    id: 'miracle-dfs120',
    name: '미라클ITS 120각 슬림 사각 단속카메라형 플래시 비콘',
    model: 'DFS-120ST',
    manufacturer: '미라클ITS / 산도로텍',
    shape: 'square',
    shapeLabel: '직각형 (120×120mm)',
    voltageCategory: 'DC 12V 전용',
    voltageDetail: 'DC 12V (과속안내판 내부 12V 버스 전원 직결)',
    voltageBadge: 'DC 12V 전용',
    powerSupplyNote: '과속 레이더 제어기 내부 12V 파워 버스 직결 (피크 8.5W, 대기 0.2W)',
    solarFriendly: true,
    priceMin: 68000,
    priceMax: 89000,
    priceDisplay: '68,000원 ~ 89,000원',
    priceRankTag: '사각 플래시 1위',
    priceSavingRate: '200mm 대비 35% 절감',
    sizeCategory: '120~150mm급',
    sizeDimension: '120×120mm 정방형 × 두께 48mm',
    sizeDiameterOrWidth: 120,
    weightKg: 0.65,
    weightDisplay: '0.65kg (슬림 경량)',
    windLoadRating: '두께 48mm 초슬림 케이스로 풍압 저항 최소화',
    mountCategory: '전용 L-브라켓',
    mountHardware: '안내판 상단 프레임 직결용 전용 브라켓 + IP67 방수 퀵커넥터',
    mountNoDrill: false,
    mountTimeEstimate: '약 3~4분 소요',
    mountRating: 5,
    mountConvenienceSummary: '과속안내판 상단 알루미늄 바에 L-브라켓으로 수평 결합. 전면 돌출이 없고 방수 잭 결선으로 현장 조립이 극히 간편.',
    flashType: '파워 LED 버스트 플래시 (3연타 고속 펄스)',
    impactDescription: '경찰 무인단속 카메라 플래시와 100% 동일한 6500K 쿨화이트 3연타 버스트 발광으로 실제 속도위반 단속 촬영 착각 유발',
    impactStars: 5,
    bestFitScenario: '직각형 과속안내판 디자인 일체감, 야간 과속차량에 무인단속카메라 촬영 착각을 통한 감속 유도',
    purchaseUrl: 'http://miracleits.co.kr',
    purchaseStoreName: '미라클ITS 도로교통사업부',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrOS3LEkynI',
    youtubeVideoId: 'wrOS3LEkynI'
  },
  {
    id: 'qlight-s125',
    name: '큐라이트 Ø125mm 표준 크세논 스트로브 플래시 비콘',
    model: 'S125S / Q125FL',
    manufacturer: '(주)큐라이트 (Qlight)',
    shape: 'round',
    shapeLabel: '원형 (Ø125mm)',
    voltageCategory: 'DC 프리볼트',
    voltageDetail: 'DC 12V~24V 프리볼트 (무극성), AC 110V/220V 선택',
    voltageBadge: 'DC 12~24V 프리볼트',
    powerSupplyNote: '무극성 결선 지원으로 현장 오배선 방지, 솔라 배터리 전압 강하(10.5V)에도 정상 발광',
    solarFriendly: true,
    priceMin: 36190,
    priceMax: 39100,
    priceDisplay: '36,190원 ~ 39,100원',
    priceRankTag: '국내 표준 1위 (최다 납품)',
    priceSavingRate: '200mm 대비 62% 절감',
    sizeCategory: '120~150mm급',
    sizeDimension: 'Ø125mm × 높이 168mm',
    sizeDiameterOrWidth: 125,
    weightKg: 0.37,
    weightDisplay: '0.37kg (표준 경량)',
    windLoadRating: '유선형 돔 렌즈로 바람 저항 완화',
    mountCategory: '전용 L-브라켓',
    mountHardware: '전용 L자 브라켓(SZ-125 / FT-125) M6 볼트 2점 체결',
    mountNoDrill: false,
    mountTimeEstimate: '약 3분 소요',
    mountRating: 5,
    mountConvenienceSummary: '국내 과속안내판 및 ITS 지주대에 가장 널리 쓰이는 표준 마운트. 전국 대리점에서 브라켓 및 소모품 당일 조달 가능.',
    flashType: '크세논 스트로브 플래시 (60~80 FPM)',
    impactDescription: '직경 125mm 대형 돔 렌즈와 내부 확산 프레넬 컷으로 한낮 역광에서도 180m 전방에서 확연하게 번쩍이는 섬광 인지',
    impactStars: 5,
    bestFitScenario: '국내 지자체 도로교통 표준 규격 준수, 부품 수급 및 사후 A/S가 가장 중요한 현장',
    purchaseUrl: 'https://smartstore.naver.com/qlight',
    purchaseStoreName: '큐라이트 공식 네이버 스마트스토어',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrOS3LEkynI',
    youtubeVideoId: 'wrOS3LEkynI'
  },
  {
    id: 'qlight-s150',
    name: '큐라이트 Ø150mm 대형 광시인성 크세논 스트로브 비콘',
    model: 'S150UHS-FT / S150UL',
    manufacturer: '(주)큐라이트 (Qlight)',
    shape: 'round',
    shapeLabel: '원형 (Ø150mm)',
    voltageCategory: 'DC 12V/24V',
    voltageDetail: 'DC 12V / 24V, AC 110V/220V',
    voltageBadge: 'DC 12V/24V & AC',
    powerSupplyNote: '소비전력 8W~14W (대용량 태양광 솔라 배터리 또는 상시 SMPS 권장)',
    solarFriendly: true,
    priceMin: 59000,
    priceMax: 82000,
    priceDisplay: '59,000원 ~ 82,000원',
    priceRankTag: '원거리 고광량',
    priceSavingRate: '200mm 대비 30% 절감',
    sizeCategory: '120~150mm급',
    sizeDimension: 'Ø150mm × 높이 198mm 대구경',
    sizeDiameterOrWidth: 150,
    weightKg: 0.85,
    weightDisplay: '0.85kg',
    windLoadRating: '대형 돔 렌즈 (스테인리스 지지대 장착)',
    mountCategory: 'FT 일체형',
    mountHardware: '스테인리스 스틸(SUS) FT 취부대 일체형 브라켓 M8 볼트 체결',
    mountNoDrill: false,
    mountTimeEstimate: '약 5분 소요',
    mountRating: 4,
    mountConvenienceSummary: '스테인리스 재질 취부대가 하부에 기본 조립되어 출고되어, 안내판 상단 또는 후면 보강 찬넬에 M8 볼트 2개로 견고히 직결.',
    flashType: '크세논 스트로브 플래시 (대용량 방전관)',
    impactDescription: 'Ø150mm 대구경 렌즈로 시야각이 넓고 광량이 풍부하여 커브길이나 국도 진입로 과속 차량에 250m 전방부터 감속 경고 표출',
    impactStars: 5,
    bestFitScenario: '고속국도 진입 램프, 급커브길, 안개 다발 구간 등 원거리 시인성이 절대적인 과속 위험 지점',
    purchaseUrl: 'https://www.qlight.com/kr/products/view.php?idx=146',
    purchaseStoreName: '큐라이트 공식몰 / 한국안전몰',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrOS3LEkynI',
    youtubeVideoId: 'wrOS3LEkynI'
  },
  {
    id: 'ttdoro-200s',
    name: '티티도로 ITS 200각 사각 파워 플래시 비콘 (C-찬넬 무타공)',
    model: 'TT-FL200S',
    manufacturer: '티티도로 (교통안전시설 전문)',
    shape: 'square',
    shapeLabel: '직각형 (200×200mm)',
    voltageCategory: 'DC 프리볼트',
    voltageDetail: 'DC 12V / 24V 겸용 프리볼트 (태양광 솔라/SMPS 지원)',
    voltageBadge: 'DC 12~24V 프리볼트',
    powerSupplyNote: '정전류 LED 드라이버 내장, 작동 시 9.6W (대기전력 0W로 배터리 절약)',
    solarFriendly: true,
    priceMin: 95000,
    priceMax: 115000,
    priceDisplay: '95,000원 ~ 115,000원',
    priceRankTag: '무타공 마운트 1위',
    priceSavingRate: '200각 정방형 대형 플래그십',
    sizeCategory: '200mm급',
    sizeDimension: '200×200mm 정방형 × 두께 65mm',
    sizeDiameterOrWidth: 200,
    weightKg: 1.45,
    weightDisplay: '1.45kg (대형 알루미늄)',
    windLoadRating: '아노다이징 알루미늄 하우징으로 태풍 내구성 최고',
    mountCategory: '무타공 C-찬넬',
    mountHardware: '후면 일체형 C형 알루미늄 슬라이딩 찬넬 레일 + M8 볼트 2개',
    mountNoDrill: true,
    mountTimeEstimate: '약 2~3분 (무타공 슬라이딩)',
    mountRating: 5,
    mountConvenienceSummary: '★무타공 시공 최고: 안내판 상단 알루미늄 프로파일 레일 홈에 M8 볼트 2개를 밀어 넣고 너트만 조이면 수평 정렬 및 견고 체결 완료.',
    flashType: '파워 LED 버스트 플래시 (90~120 FPM 고휘도)',
    impactDescription: '200×200mm 대형 광학 프레넬 렌즈를 채택하여 정오의 강한 역광 직사광선 조건에서도 200m 전방에서 압도적 시각 충격감 제공',
    impactStars: 5,
    bestFitScenario: '대형 과속경고 안내판 상단에 타공 없이 볼트 2개로 가장 빠르고 견고하게 일체형으로 마운트할 때',
    purchaseUrl: 'http://www.ttdoro.com/shop/item.php?it_id=1569485732',
    purchaseStoreName: '티티도로 공식 온라인몰',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrOS3LEkynI',
    youtubeVideoId: 'wrOS3LEkynI'
  },
  {
    id: 'samjin-sj200',
    name: '삼진·대진 200파이 표준 도로 신호등형 1구 LED 점멸 비콘',
    model: 'SJ-FL200',
    manufacturer: '삼진안전 / 대진교통신호',
    shape: 'round',
    shapeLabel: '원형 (Ø200mm)',
    voltageCategory: 'AC/DC 선택',
    voltageDetail: 'AC 220V 상시 전원 또는 DC 12V/24V (주문 선택)',
    voltageBadge: 'AC 220V 또는 DC 선택',
    powerSupplyNote: '상시 한전 전원(AC 220V) 인입 지주대에 최적화 (소비전력 8W~12W)',
    solarFriendly: false,
    priceMin: 85000,
    priceMax: 108000,
    priceDisplay: '85,000원 ~ 108,000원',
    priceRankTag: '경찰청 표준 신호형',
    priceSavingRate: '공인 신호등 신뢰 심리',
    sizeCategory: '200mm급',
    sizeDimension: '렌즈 지름 Ø200mm (외함 260×260mm)',
    sizeDiameterOrWidth: 200,
    weightKg: 1.85,
    weightDisplay: '1.85kg (중량형)',
    windLoadRating: '차광 후드 장착형 (지주대 견고한 밴드 체결 요망)',
    mountCategory: '힌지/반도',
    mountHardware: '상·하부 2점 각도 조절 힌지 브라켓 / 스테인리스 파이프 반도(밴드)',
    mountNoDrill: false,
    mountTimeEstimate: '약 5~7분 소요',
    mountRating: 4,
    mountConvenienceSummary: '힌지 브라켓으로 상하 틸트(각도 조절) 가능. 안내판 측면 프레임이나 지주 파이프에 스테인리스 밴드 또는 볼트로 고정.',
    flashType: '규격형 1구 점멸 플래시 (60 FPM 정주기)',
    impactDescription: '경찰청 공인 표준 신호등과 동일한 200파이 외경으로 운전자에게 실제 신호등과 동등한 감속 및 정지 법적 준수 심리 유도',
    impactStars: 5,
    bestFitScenario: '지주 파이프 부착, 상하 조사 각도 틸트 조절이 필요하거나 AC 220V 상시 전원이 공급되는 현장',
    purchaseUrl: 'https://www.devicemart.co.kr',
    purchaseStoreName: '디바이스마트 / 안전나라',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrOS3LEkynI',
    youtubeVideoId: 'wrOS3LEkynI'
  }
];

interface Props {
  onOpenVideo?: (video: { id: string; title: string; url: string }) => void;
  onSelectProduct?: (product: SpeedWarningProduct) => void;
}

export const SpeedWarningComparisonTable: React.FC<Props> = ({ onOpenVideo, onSelectProduct }) => {
  // Sort and filter states
  const [voltageFilter, setVoltageFilter] = useState<'all' | 'dc' | 'ac'>('all');
  const [sizeFilter, setSizeFilter] = useState<'all' | '100mm급' | '120~150mm급' | '200mm급'>('all');
  const [mountFilter, setMountFilter] = useState<'all' | 'nodrill' | 'lbracket' | 'hinge'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'size-asc' | 'weight-asc' | 'mount-desc'>('price-asc');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = COMPARISON_PRODUCTS.filter((item) => {
    if (voltageFilter === 'dc' && !item.solarFriendly && item.voltageCategory === 'AC/DC 선택') {
      return false;
    }
    if (voltageFilter === 'ac' && !item.voltageDetail.includes('AC')) {
      return false;
    }
    if (sizeFilter !== 'all' && item.sizeCategory !== sizeFilter) {
      return false;
    }
    if (mountFilter === 'nodrill' && !item.mountNoDrill) {
      return false;
    }
    if (mountFilter === 'lbracket' && item.mountCategory !== '전용 L-브라켓') {
      return false;
    }
    if (mountFilter === 'hinge' && item.mountCategory !== '힌지/반도' && item.mountCategory !== 'FT 일체형') {
      return false;
    }
    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceMin - b.priceMin;
    if (sortBy === 'price-desc') return b.priceMin - a.priceMin;
    if (sortBy === 'size-asc') return a.sizeDiameterOrWidth - b.sizeDiameterOrWidth;
    if (sortBy === 'weight-asc') return a.weightKg - b.weightKg;
    if (sortBy === 'mount-desc') return b.mountRating - a.mountRating;
    return 0;
  });

  return (
    <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-7 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>4대 핵심 기준 종합 대조표 (Comparison Matrix)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            과속 경고용 플래시 비콘 전압 · 가격 · 크기 · 마운트별 비교 대조표
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-4xl">
            과속안내판 상단 거치용 플래시 비콘 6개 모델을 <strong>입력 전압(DC/AC 호환)</strong>, <strong>구매 가격(가성비)</strong>, 
            <strong>외형 크기 및 무게</strong>, <strong>안내판 마운트 체결 편의성</strong>의 4대 기준별로 한눈에 대조할 수 있습니다.
          </p>
        </div>

        {/* Quick KPI Count */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">비교 대상</span>
            <span className="text-sm font-black text-amber-400">총 6개 모델 완비</span>
          </div>
          <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">최저가</span>
            <span className="text-sm font-black text-emerald-400">34,980원~</span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
        {/* Pillar 1: Voltage */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-blue-900/40 hover:border-blue-700/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              1. 전압 (Voltage)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono">
              DC 12V/24V & AC
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            태양광 솔라 배터리 및 안내판 내부 <strong>DC 12V/24V 직결</strong> 모델(6종 전수 지원)과 상시 한전 전원 <strong>AC 220V</strong> 호환성을 확인하세요.
          </p>
          <div className="pt-1 flex items-center gap-1 text-[10px] text-blue-300 font-medium">
            <Check className="w-3 h-3 text-blue-400" />
            <span>솔라 배터리 방전 방지 초절전(4.8W~)</span>
          </div>
        </div>

        {/* Pillar 2: Price */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-emerald-900/40 hover:border-emerald-700/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-emerald-400" />
              2. 가격 (Price)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
              34,980원 ~ 115,000원
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            100mm 규격 완화로 <strong>3만원대(큐라이트 S100)</strong> 최저가 구축 가능. 200mm 규격 대비 <strong>최대 65% 예산 절감</strong> 실현.
          </p>
          <div className="pt-1 flex items-center gap-1 text-[10px] text-emerald-300 font-medium">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>전 모델 네이버 스마트스토어/공식몰 발주</span>
          </div>
        </div>

        {/* Pillar 3: Size & Weight */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-purple-900/40 hover:border-purple-700/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-purple-400" />
              3. 크기 및 무게 (Size)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
              Ø100mm ~ 200각
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            <strong>0.25kg 초경량(100mm)</strong>부터 <strong>120각 슬림 사각</strong>, <strong>200×200mm 대형</strong>까지 안내판 지주대 풍압 하중에 맞춘 최적 크기 비교.
          </p>
          <div className="pt-1 flex items-center gap-1 text-[10px] text-purple-300 font-medium">
            <Check className="w-3 h-3 text-purple-400" />
            <span>안내판 상단 휨·처짐·진동 영향 최소화</span>
          </div>
        </div>

        {/* Pillar 4: Mounting Method */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-amber-900/40 hover:border-amber-700/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-400" />
              4. 마운트 방식 (Mount)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
              무타공 C-찬넬 / L-브라켓
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            <strong>후면 C-찬넬 슬라이딩 무타공(티티도로 1위)</strong> 체결 및 <strong>전용 L-브라켓 볼트 2점 체결(큐라이트/미라클ITS)</strong>로 3분 내 시공 완료.
          </p>
          <div className="pt-1 flex items-center gap-1 text-[10px] text-amber-300 font-medium">
            <Check className="w-3 h-3 text-amber-400" />
            <span>과속 레이더 릴레이 2선 직결 ON/OFF</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Toolbar (Filters & Sorter) */}
      <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
              대조표 정렬 기준:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setSortBy('price-asc')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  sortBy === 'price-asc'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                가격 낮은순 (가성비순)
              </button>

              <button
                type="button"
                onClick={() => setSortBy('size-asc')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  sortBy === 'size-asc'
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                크기순 (100mm → 200mm)
              </button>

              <button
                type="button"
                onClick={() => setSortBy('weight-asc')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  sortBy === 'weight-asc'
                    ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                무게 가벼운순 (초경량순)
              </button>

              <button
                type="button"
                onClick={() => setSortBy('mount-desc')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  sortBy === 'mount-desc'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                마운트 편의도순 (★5점순)
              </button>
            </div>
          </div>

          <span className="text-[11px] text-slate-400">
            표시 중: <strong className="text-white font-mono">{sortedItems.length}</strong>개 모델
          </span>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          {/* Voltage filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 px-1.5 font-medium">전압:</span>
            <button
              type="button"
              onClick={() => setVoltageFilter('all')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                voltageFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setVoltageFilter('dc')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                voltageFilter === 'dc' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              DC 12V/24V (솔라/배터리)
            </button>
            <button
              type="button"
              onClick={() => setVoltageFilter('ac')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                voltageFilter === 'ac' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              AC 220V (상시)
            </button>
          </div>

          {/* Mount filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 px-1.5 font-medium">마운트:</span>
            <button
              type="button"
              onClick={() => setMountFilter('all')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                mountFilter === 'all' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setMountFilter('nodrill')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                mountFilter === 'nodrill' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              C-찬넬 무타공 (1위)
            </button>
            <button
              type="button"
              onClick={() => setMountFilter('lbracket')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                mountFilter === 'lbracket' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              전용 L-브라켓
            </button>
          </div>

          {/* Size filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 px-1.5 font-medium">크기:</span>
            <button
              type="button"
              onClick={() => setSizeFilter('all')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                sizeFilter === 'all' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setSizeFilter('100mm급')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                sizeFilter === '100mm급' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              100mm급
            </button>
            <button
              type="button"
              onClick={() => setSizeFilter('120~150mm급')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                sizeFilter === '120~150mm급' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              120~150mm급
            </button>
            <button
              type="button"
              onClick={() => setSizeFilter('200mm급')}
              className={`px-2 py-0.5 rounded-lg text-[11px] ${
                sizeFilter === '200mm급' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              200mm급
            </button>
          </div>
        </div>
      </div>

      {/* The 4-Pillar Comprehensive Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl bg-slate-950/60">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-slate-950 text-slate-300 text-xs font-bold border-b border-slate-800 tracking-wider">
              <th className="py-4 px-4 min-w-[200px] sticky left-0 z-20 bg-slate-950 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                제품명 / 모델 (제조사)
              </th>
              {/* Pillar 1 */}
              <th className="py-4 px-3 min-w-[170px] bg-blue-950/30 border-l border-blue-900/30 text-blue-300">
                <div className="flex items-center gap-1.5 font-bold">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>① 입력 전압 (Voltage)</span>
                </div>
                <div className="text-[10px] text-blue-400/80 font-normal mt-0.5">DC12V/24V 솔라 & AC</div>
              </th>
              {/* Pillar 2 */}
              <th className="py-4 px-3 min-w-[160px] bg-emerald-950/30 border-l border-emerald-900/30 text-emerald-300">
                <div className="flex items-center gap-1.5 font-bold">
                  <Flame className="w-3.5 h-3.5 text-emerald-400" />
                  <span>② 가격 (Price)</span>
                </div>
                <div className="text-[10px] text-emerald-400/80 font-normal mt-0.5">실구매가 & 예산절감율</div>
              </th>
              {/* Pillar 3 */}
              <th className="py-4 px-3 min-w-[170px] bg-purple-950/30 border-l border-purple-900/30 text-purple-300">
                <div className="flex items-center gap-1.5 font-bold">
                  <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>③ 크기 및 무게 (Size)</span>
                </div>
                <div className="text-[10px] text-purple-400/80 font-normal mt-0.5">치수 / 중량 / 풍압영향</div>
              </th>
              {/* Pillar 4 */}
              <th className="py-4 px-3 min-w-[220px] bg-amber-950/30 border-l border-amber-900/30 text-amber-300">
                <div className="flex items-center gap-1.5 font-bold">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>④ 마운트 방식 (Mounting)</span>
                </div>
                <div className="text-[10px] text-amber-400/80 font-normal mt-0.5">체결 브라켓 & 타공 여부</div>
              </th>
              {/* Flash Impact & Scenario */}
              <th className="py-4 px-3 min-w-[170px] border-l border-slate-800 text-slate-300">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span>과속 임팩트 & 추천 용도</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">단속카메라 착각 섬광</div>
              </th>
              {/* Action */}
              <th className="py-4 px-3 min-w-[120px] text-center border-l border-slate-800 text-slate-300">
                <span>구매 / 영상</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs">
            {sortedItems.map((prod) => {
              const isSelected = highlightedId === prod.id;
              return (
                <tr 
                  key={prod.id}
                  onClick={() => {
                    setHighlightedId(isSelected ? null : prod.id);
                    if (onSelectProduct) {
                      const fullProd = SPEED_WARNING_PRODUCTS.find(p => p.id === prod.id);
                      if (fullProd) onSelectProduct(fullProd);
                    }
                  }}
                  className={`cursor-pointer transition-colors duration-150 ${
                    isSelected 
                      ? 'bg-blue-900/25 ring-1 ring-blue-500/50' 
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  {/* Model & Name */}
                  <td className="py-4 px-4 sticky left-0 z-10 bg-slate-900/95 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          prod.shape === 'square' 
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                            : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}>
                          {prod.shapeLabel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {prod.manufacturer}
                        </span>
                      </div>
                      <div className="font-bold text-white text-sm hover:text-blue-300 transition-colors leading-snug flex items-center gap-1 group/title">
                        <span>{prod.name}</span>
                        <Maximize2 className="w-3.5 h-3.5 text-slate-500 group-hover/title:text-blue-400 opacity-60 group-hover/title:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <div className="text-[11px] font-mono text-blue-400 font-medium">
                        {prod.model}
                      </div>
                    </div>
                  </td>

                  {/* 1. 전압 (Voltage) */}
                  <td className="py-4 px-3 bg-blue-950/15 border-l border-blue-900/20 space-y-1.5 align-top">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                        {prod.voltageBadge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      {prod.voltageDetail}
                    </div>
                    <div className="text-[10px] text-blue-300/90 leading-tight">
                      {prod.powerSupplyNote}
                    </div>
                    {prod.solarFriendly && (
                      <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                        <Check className="w-3 h-3" />
                        <span>태양광 솔라 배터리 직결 최적</span>
                      </div>
                    )}
                  </td>

                  {/* 2. 가격 (Price) */}
                  <td className="py-4 px-3 bg-emerald-950/15 border-l border-emerald-900/20 space-y-1.5 align-top">
                    <div className="text-sm font-black text-emerald-400 font-mono">
                      {prod.priceDisplay}
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {prod.priceRankTag}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {prod.priceSavingRate}
                    </div>
                  </td>

                  {/* 3. 크기 및 무게 (Size & Weight) */}
                  <td className="py-4 px-3 bg-purple-950/15 border-l border-purple-900/20 space-y-1.5 align-top">
                    <div className="font-bold text-slate-200 text-xs">
                      {prod.sizeDimension}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {prod.sizeCategory}
                      </span>
                      <span className="text-[11px] font-mono text-amber-300 font-semibold">
                        {prod.weightDisplay}
                      </span>
                    </div>
                    <div className="text-[10px] text-purple-300/80 leading-tight">
                      {prod.windLoadRating}
                    </div>
                  </td>

                  {/* 4. 마운트 방식 (Mounting Method) */}
                  <td className="py-4 px-3 bg-amber-950/15 border-l border-amber-900/20 space-y-1.5 align-top">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                        prod.mountNoDrill
                          ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {prod.mountCategory}
                      </span>

                      <span className="text-[11px] font-bold text-amber-300 font-mono">
                        편의도 ★{prod.mountRating}/5
                      </span>
                    </div>

                    {prod.mountNoDrill ? (
                      <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>타공 불필요 (무타공 C-찬넬 1위)</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-300 font-medium">
                        {prod.mountHardware}
                      </div>
                    )}

                    <p className="text-[10px] text-slate-400 leading-tight">
                      {prod.mountConvenienceSummary}
                    </p>

                    <div className="text-[10px] text-slate-500 font-mono">
                      체결 소요: {prod.mountTimeEstimate}
                    </div>
                  </td>

                  {/* 과속 임팩트 & 추천 용도 */}
                  <td className="py-4 px-3 border-l border-slate-800 space-y-1.5 align-top">
                    <div className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      <span>{prod.flashType}</span>
                    </div>
                    <div className="text-[10px] text-slate-300 leading-relaxed line-clamp-3" title={prod.impactDescription}>
                      {prod.impactDescription}
                    </div>
                    <div className="text-[10px] text-indigo-300 font-medium bg-slate-900/90 p-1.5 rounded border border-slate-800">
                      💡 {prod.bestFitScenario}
                    </div>
                  </td>

                  {/* Action Buttons */}
                  {/* Action Buttons */}
                  <td className="py-4 px-3 border-l border-slate-800 align-middle text-center">
                    <div className="flex flex-col gap-1.5 justify-center items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProduct) {
                            const fullProd = SPEED_WARNING_PRODUCTS.find(p => p.id === prod.id);
                            if (fullProd) onSelectProduct(fullProd);
                          }
                        }}
                        className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all shadow-sm shadow-indigo-900/20"
                        title="상세 사양 및 구매정보 크게 보기"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>상세 모달</span>
                      </button>

                      <a
                        href={prod.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all shadow-sm"
                        title={prod.purchaseStoreName}
                      >
                        <span>구매 URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenVideo) {
                            onOpenVideo({
                              id: prod.youtubeVideoId,
                              title: prod.name,
                              url: prod.youtubeUrl
                            });
                          }
                        }}
                        className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-white font-bold text-[11px] transition-all shadow-sm"
                      >
                        <Youtube className="w-3.5 h-3.5 fill-current" />
                        <span>유튜브</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Decision-Making Best Choice Guide */}
      <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800 space-y-3 relative z-10">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>현장 조건별 플래시 비콘 최적 모델 선정 가이드 (Best Decision Guide)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Choice 1 */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
              가성비 & 태양광 초경량 최우선
            </span>
            <div className="font-bold text-white text-xs">큐라이트 S100S (Ø100mm)</div>
            <div className="text-[11px] text-slate-300 font-mono text-emerald-300">34,980원 / 0.25kg</div>
            <p className="text-[10px] text-slate-400 leading-normal">
              100mm 규격 완화로 예산 65% 절감. 무게 250g으로 안내판 상단 처짐이 전혀 없으며 솔라 배터리 방전 위험 제로.
            </p>
          </div>

          {/* Choice 2 */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">
              무타공 C-찬넬 체결 최우선
            </span>
            <div className="font-bold text-white text-xs">티티도로 TT-FL200S (200각)</div>
            <div className="text-[11px] text-slate-300 font-mono text-blue-300">95,000원 / 무타공 3분</div>
            <p className="text-[10px] text-slate-400 leading-normal">
              본체 후면 C-찬넬 레일로 안내판 상단 프로파일 홈에 M8 볼트 2개만 밀어 넣어 체결 완료. 대형 200mm 압도적 시인성.
            </p>
          </div>

          {/* Choice 3 */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">
              사각 일체감 & 단속카메라 착각
            </span>
            <div className="font-bold text-white text-xs">미라클ITS DFS-120ST (120각)</div>
            <div className="text-[11px] text-slate-300 font-mono text-indigo-300">68,000원 / DC 12V 직결</div>
            <p className="text-[10px] text-slate-400 leading-normal">
              두께 48mm 슬림 사각 하우징. 경찰 단속카메라와 동일한 6500K 3연타 백색 버스트 플래시로 즉각 급감속 유발.
            </p>
          </div>

          {/* Choice 4 */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">
              국내 표준 도로교통 최다 보급
            </span>
            <div className="font-bold text-white text-xs">큐라이트 S125S (Ø125mm)</div>
            <div className="text-[11px] text-slate-300 font-mono text-purple-300">36,190원 / 프리볼트</div>
            <p className="text-[10px] text-slate-400 leading-normal">
              전국 과속안내판 최다 납품 표준 규격. DC12~24V 무극성 결선 지원 및 전국 대리점 당일 구매/유지보수 가능.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
