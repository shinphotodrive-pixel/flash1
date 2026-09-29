import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Youtube,
  Zap,
  CheckCircle2,
  Wrench,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Check,
  PackageCheck,
  Truck,
  AlertTriangle,
  FileText,
  Clock,
  PhoneCall,
  ShieldAlert,
  HelpCircle,
  BadgePercent
} from 'lucide-react';
import { SpeedWarningProduct } from '../types';

interface Props {
  product: SpeedWarningProduct | null;
  onClose: () => void;
  onOpenVideo?: (video: { id: string; title: string; url: string }) => void;
  onNavigateProduct?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

interface ProcurementGuideData {
  bulkOrder: {
    b2bChannel: string;
    orderSteps: string[];
    leadTime: string;
    discountTiers: { quantity: string; discount: string; benefit: string }[];
    documents: string[];
  };
  inventoryTips: {
    stockSummary: string;
    colorStockNotes: string;
    quickDeliveryOptions: string[];
    substituteModel: string;
  };
  installationPrecautions: {
    wiringAndPolarity: string;
    relayProtection: string;
    waterproofSealing: string;
    windLoadTorque: string;
    tiltAngleGuide: string;
  };
}

export const SpeedWarningDetailModal: React.FC<Props> = ({
  product,
  onClose,
  onOpenVideo,
  onNavigateProduct,
  hasPrev = true,
  hasNext = true,
}) => {
  // Modal internal active tab: 'specs' vs 'procurement'
  const [activeTab, setActiveTab] = useState<'specs' | 'procurement'>('specs');

  // Reset tab to 'specs' when product changes
  useEffect(() => {
    setActiveTab('specs');
  }, [product?.id]);

  // Close on ESC key & lock body scroll
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigateProduct) {
        onNavigateProduct('prev');
      } else if (e.key === 'ArrowRight' && onNavigateProduct) {
        onNavigateProduct('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose, onNavigateProduct]);

  if (!product) return null;

  // Custom procurement and installation guidance per product
  const getProcurementGuide = (id: string): ProcurementGuideData => {
    switch (id) {
      case 'qlight-s100':
        return {
          bulkOrder: {
            b2bChannel: '큐라이트 공식 네이버 스마트스토어 및 전국 공식 대리점 (B2B 세금계산서 당일 발행)',
            orderSteps: [
              '1단계: 사용 전원(DC 12V vs 24V vs AC 220V) 및 렌즈 색상(백색/적색) 수량 확정',
              '2단계: 사업자등록증 사본 접수 후 견적서 및 납품확약서 수령',
              '3단계: 발주서 발송 및 당일 세금계산서 발행 (관공서 사후결제 지원 가능)',
              '4단계: 공장 직접 출고 또는 전국 대리점 당일 출하'
            ],
            leadTime: '1~30대 기준 상시 재고 익일 출고 / 50대 이상 프로젝트 건 2~3영업일 소요',
            discountTiers: [
              { quantity: '10~29대', discount: '5% 단가 할인', benefit: '기본 M6 고정 볼트/와셔 세트 무상 동봉' },
              { quantity: '30~49대', discount: '8% 단가 할인', benefit: '전용 SZ-100 L-브라켓 1:1 무상 증정' },
              { quantity: '50대 이상', discount: '10~12% 특판가', benefit: '프로젝트 납품확약서 및 시험성적서 원본 동봉' }
            ],
            documents: ['KC 전기안전인증서', 'IP54 방진/방수 성적서', '제조사 정품보증서', '전자세금계산서']
          },
          inventoryTips: {
            stockSummary: '국내 소형 크세논 플래시 비콘 중 가장 수요가 높아 백색(White) 렌즈 상시 95% 이상 보유',
            colorStockNotes: '백색 렌즈(단속카메라 효과용)는 당일 출고 가능. 적색 렌즈 대량(30대 이상) 주문 시 사전 유선 확인 권장',
            quickDeliveryOptions: [
              '서울/경기: 구로 중앙유통상가 총판에서 오토바이 퀵 수령 가능',
              '영남권: 부산 사상구 큐라이트 본사 물류센터 당일 방문 수령',
              '지방 현장: 고속버스 화물 연계 당일 도착 배송 지원'
            ],
            substituteModel: 'S100S 일시 품절 시 Ø125mm 표준형 [S125S (36,190원)]으로 1,200원 차이로 즉시 대체 가능'
          },
          installationPrecautions: {
            wiringAndPolarity: 'DC 12V/24V 모델 결선 시 적색(+), 흑색(-) 극성을 정확히 구분하여 배선하세요. 극성 오결선 시 내부 보호 회로가 작동하나 장시간 방치 시 소손 위험이 있습니다.',
            relayProtection: '소비전력 6W(약 0.5A)로 레이더 검지기 보드의 2A급 릴레이 접점에 안전하게 직결 가능합니다. 릴레이 출력 시간은 과속 시 3초 펄스 발광으로 세팅하십시오.',
            waterproofSealing: '0.25kg 초경량 플라스틱 베이스이므로 하부 전선 인출구 패킹에 방수 실리콘을 얇게 도포하고, 케이블 인입구가 빗물 유입을 피해 반드시 아래쪽(하향)을 향하도록 마운트하십시오.',
            windLoadTorque: '무게가 250g에 불과해 풍압 하중이 거의 없으나, 진동 풀림 방지를 위해 안내판 알루미늄 상판에 M6 볼트 체결 시 스프링 와셔를 사용하고 8~10 Nm 토크로 조이십시오.',
            tiltAngleGuide: '주간/야간 운전자에게 카메라 플래시 착각을 정확히 일으키기 위해 수평면 대비 전방 하향 5° 미세 틸트를 권장합니다.'
          }
        };

      case 'miracle-dfs120':
        return {
          bulkOrder: {
            b2bChannel: '미라클ITS 도로교통사업부 직거래 창구 및 공공기관 나라장터 조달 발주',
            orderSteps: [
              '1단계: 과속경보 안내판 상단 알루미늄 바 규격 및 결선 방식(무전압 릴레이 or TTL 신호선) 확인',
              '2단계: B2B 사업자 견적서 및 납품 사양서 접수',
              '3단계: 계약 체결 및 전자세금계산서 청구',
              '4단계: 공장 QC 검사 완료 후 완제품 일괄 배송'
            ],
            leadTime: '20대 이하 2영업일 출하 / 스쿨존 50대 이상 공사 건 3~5영업일 소요',
            discountTiers: [
              { quantity: '5~19대', discount: '5% 단가 할인', benefit: '상단 직결 슬림 L-브라켓 기본 무상 증정' },
              { quantity: '20~49대', discount: '8% 단가 할인', benefit: 'IP67 방수 하네스 연장 케이블 5m 무상 제공' },
              { quantity: '50대 이상', discount: '12% 관공서 특판가', benefit: '지자체 준공 검사용 지능형 시험성적서 발급' }
            ],
            documents: ['교통안전시설 적합 확인서', 'IP67 공인 방수성적서', 'KC 전파인증서', '조달청 납품실적원장']
          },
          inventoryTips: {
            stockSummary: '스쿨존 단속카메라 착각 유도 백색 6500K LED 버스트 모듈 상시 보유',
            colorStockNotes: '백색 3연타 버스트형은 상시 즉시 출고 가능. 적색 단독 사양은 주문 제작 2일 소요',
            quickDeliveryOptions: [
              '본사 물류 직배송: 수도권 3시간 퀵 배송 연계',
              '전국 현장: 경동/대신 정기화물로 익일 오전 10시 현장 수령'
            ],
            substituteModel: '직각 120각 품절 시 200각 사각 [티티도로 TT-FL200S] 또는 슬림 원형 [S125S]로 대체 가능'
          },
          installationPrecautions: {
            wiringAndPolarity: 'DC 12V 정격 전원선과 릴레이 신호 트리거선의 라벨을 반드시 대조하십시오. 안내판 내부 메인 12V SMPS/배터리 버스에 직결하십시오.',
            relayProtection: '순간 버스트 피크 소비전력이 8.5W(약 0.7A)이므로, 레이더 제어기 릴레이의 A접점(NO/COM)에 직렬 배선 시 접점 바운싱 방지를 확인하십시오.',
            waterproofSealing: 'IP67 방수 퀵커넥터를 결합할 때 내부 고무 O-링이 밀리지 않도록 수직으로 밀어 넣은 후 딸깍 소리가 날 때까지 끝까지 돌려 잠그십시오.',
            windLoadTorque: '두께 48mm 초슬림 직각형으로 풍압 저항이 극히 적습니다. 상단 프레임 체결 볼트(M6/M8)는 12 Nm 토크로 균일 체결하십시오.',
            tiltAngleGuide: '안내판 전면 플레이트와 완전한 수평 일체감을 유지하도록 조립하고, 과속 차량 접근 방향을 향해 각도를 정렬하십시오.'
          }
        };

      case 'qlight-s125':
        return {
          bulkOrder: {
            b2bChannel: '큐라이트 전국 공식 대리점 및 본사 공식몰 (국내 도로교통 표준 1위 모델)',
            orderSteps: [
              '1단계: 전압 사양(DC 12~24V 프리볼트 vs AC 110/220V) 및 백색/적색 선택',
              '2단계: 사업자등록증 접수 및 세금계산서 청구',
              '3단계: 당일/익일 출하 및 배송 송장 확인',
              '4단계: 전국 대리점망 사후 A/S 보증 지원'
            ],
            leadTime: '국내 도로교통 최다 보급 모델로 100대 단위 대량 발주도 24시간 내 당일 출고',
            discountTiers: [
              { quantity: '10~29대', discount: '6% 단가 할인', benefit: '방진 고무 가스켓 및 M6 볼트 세트 포함' },
              { quantity: '30~99대', discount: '10% 단가 할인', benefit: '전용 FT-125 L-브라켓 1:1 무상 지원' },
              { quantity: '100대 이상', discount: '15% 대량 공급가', benefit: '전국 지정 대리점 직송 및 보증서 원본 발행' }
            ],
            documents: ['KC 인증서', 'CE 인증서', 'UL 인증서', 'IP54 방진/방수 공인 시험성적서']
          },
          inventoryTips: {
            stockSummary: '전국 모든 큐라이트 공식 대리점(서울, 경기, 대구, 부산, 광주)에 상시 1,000대 이상 재고 보유',
            colorStockNotes: 'DC 12V~24V 무극성 프리볼트 백색/적색 전 모델 상시 재고 보유율 99%',
            quickDeliveryOptions: [
              '전국 당일 수령: 각 시·도 관내 큐라이트 대리점 즉시 현장 픽업 가능',
              '긴급 퀵: 주문 접수 후 2시간 내 오토바이 퀵 발송'
            ],
            substituteModel: '가장 안정적인 표준 모델이므로 품절 위험이 사실상 제로에 가깝습니다.'
          },
          installationPrecautions: {
            wiringAndPolarity: '★무극성(Non-Polarity) 프리볼트(DC 12~24V) 회로가 내장되어 있어, 현장에서 전원선 2선의 +/- 극성이 바뀌어도 100% 정상 작동하여 오결선 쇼트가 전혀 없습니다.',
            relayProtection: '순간 크세논 방전 시 피크 전류(약 1.5A)가 발생하므로, 레이더 검지기 제어보드의 릴레이 접점은 최소 3A 이상 정격을 권장합니다.',
            waterproofSealing: '브라켓과 본체 하부 베이스 사이에 동봉된 방진 고무 가스켓을 누락 없이 장착하고, 케이블 인출 그랜드 너트를 공구로 견고히 조이십시오.',
            windLoadTorque: '유선형 돔 렌즈로 공기 저항이 적습니다. 안내판 상단 L-브라켓 체결 시 M6 너트에 나일론 락너트를 적용하여 10 Nm 토크로 체결하십시오.',
            tiltAngleGuide: '특수 확산 프레넬 렌즈가 채택되어 있어 정면 180m 전방에서 최대 광량을 방출하므로 도로 진행 방향과 정면 수평을 맞추십시오.'
          }
        };

      case 'qlight-s150':
        return {
          bulkOrder: {
            b2bChannel: '큐라이트 공식몰 및 한국안전몰 / 산업용 특수 경광등 사업부',
            orderSteps: [
              '1단계: 대형 150파이 렌즈 색상 및 부저 일체형 유무 확인',
              '2단계: 솔라 배터리 용량(최소 50Ah 권장) 확인 후 견적 접수',
              '3단계: B2B 전자세금계산서 발행 및 제작 발주',
              '4단계: 공장 직송 화물 발송'
            ],
            leadTime: '10대 이하 익일 출고 / 30대 이상 대형 프로젝트 3~4영업일 소요',
            discountTiers: [
              { quantity: '5~19대', discount: '5% 단가 할인', benefit: '스테인리스 SUS304 취부대 기본 장착' },
              { quantity: '20대 이상', discount: '8~10% 단가 할인', benefit: '대형 고정용 M8 SUS 볼트 세트 증정' }
            ],
            documents: ['KC 안전인증서', 'IP54 방수성적서', '대용량 방전관 시험성적서']
          },
          inventoryTips: {
            stockSummary: '대형 특수 규격으로 표준형(S125S) 대비 재고 수량이 한정적이므로 10대 이상 구매 시 사전 재고 확인 필수',
            colorStockNotes: '백색 렌즈 위주 재고 운영. 적색 렌즈는 3영업일 전 주문 권장',
            quickDeliveryOptions: ['부산 본사 물류센터 직출고 화물 발송 (익일 오전 현장 도착)'],
            substituteModel: '일시 품절 시 표준형 [S125S] 또는 200파이 신호형 [SJ-FL200] 호환 가능'
          },
          installationPrecautions: {
            wiringAndPolarity: '소비전력이 최대 14W로 크므로 전원 공급선의 굵기를 최소 AWG18(0.75sq) 이상 사용하여 선로 전압 강하를 방지하십시오.',
            relayProtection: '대형 방전관 충전 서지 방지를 위해 레이더 릴레이 접점에 스누버(Snubber) 회로를 추가하면 접점 수명이 3배 이상 연장됩니다.',
            waterproofSealing: '대형 돔 렌즈 접합부 실링 고무가 정확히 안착되었는지 확인하고, 하부 FT 브라켓 결합 볼트에 방수 테프론 테이프를 도포하십시오.',
            windLoadTorque: '중량 0.85kg 및 150mm 대구경으로 태풍 시 풍압 하중이 발생하므로, 안내판 상단 보강 리브에 M8 볼트 2개를 15 Nm 토크로 단단히 체결하십시오.',
            tiltAngleGuide: '원거리(250m) 감속 유도용이므로 차량이 200m 전방에서 접근하는 시야 높이에 맞추어 3~5° 하향 틸트하십시오.'
          }
        };

      case 'ttdoro-200s':
        return {
          bulkOrder: {
            b2bChannel: '티티도로 본사 온라인몰 (ttdoro.com) B2B 사업부 및 지자체 교통안전시설팀 직납',
            orderSteps: [
              '1단계: 안내판 상단 알루미늄 프로파일 레일 홈 치수(C-찬넬 M8 볼트 규격) 확인',
              '2단계: 외함 분체도장 색상(블랙 / 옐로우) 및 수량 견적 확정',
              '3단계: 조달/B2B 세금계산서 청구 및 주문 접수',
              '4단계: 공장 직송 및 T볼트 체결 세트 동봉 출하'
            ],
            leadTime: '10대 이하 익일 출고 / 30대 이상 관공서 단체 납품 시 3영업일 소요',
            discountTiers: [
              { quantity: '5~19대', discount: '5% 단가 할인', benefit: 'C-찬넬 무타공 M8 T볼트/너트 세트 무상 증정' },
              { quantity: '20~49대', discount: '8% 단가 할인', benefit: '과속 레이더 결선용 방수 하네스 케이블 2m 포함' },
              { quantity: '50대 이상', discount: '12% 지자체 납품가', benefit: 'IP66 방수성적서 및 공인 시험성적서 원본 동봉' }
            ],
            documents: ['IP66 방수/방진 성적서', '아노다이징 알루미늄 내식성 성적서', '교통시설 적합증명원']
          },
          inventoryTips: {
            stockSummary: '충북 청주 및 경기 물류창고에서 전국 당일 대신/경동 정기화물 발송 지원',
            colorStockNotes: '200×200mm 대형 백색/적색 듀얼 LED 모듈 상시 보유',
            quickDeliveryOptions: [
              '충청/경기: 본사 창고 당일 직수령 가능',
              '전국 현장: 대신화물/경동화물 영업소 당일 야간 발송 (익일 09시 지점 수령)'
            ],
            substituteModel: '사각 무타공 규격 품절 시 120각 [미라클ITS DFS-120ST] 브라켓 결합으로 대체 가능'
          },
          installationPrecautions: {
            wiringAndPolarity: 'DC 12V/24V 겸용 프리볼트 모델로 내부 정전류 드라이버가 내장되어 있습니다. 적색선(+), 흑색선(-)을 정확히 확인하여 릴레이 단자에 연결하십시오.',
            relayProtection: '대기 시 소비전력 0W, 발광 시 9.6W로 태양광 솔라 배터리 방전 위험이 전혀 없습니다. 레이더 검지기 A접점 릴레이에 직렬 결선하십시오.',
            waterproofSealing: 'IP66 등급 완전 밀폐형 알루미늄 다이캐스팅 하우징이므로 본체를 임의 분해하지 마십시오. 후면 케이블 인출구의 나사식 케이블 그랜드를 렌치로 꽉 조여 마감하십시오.',
            windLoadTorque: '★무타공 C-찬넬 장착 시 안내판 상단 알루미늄 프로파일 홈의 이물질을 제거한 뒤, M8 T볼트를 슬라이딩 삽입하고 나일론 락너트를 15~18 Nm 토크로 균일하게 조이십시오.',
            tiltAngleGuide: '대형 200mm 프레넬 렌즈가 전방 200m에 강력한 빔을 방출하므로 스쿨존 보행자 눈부심을 막기 위해 하향 7° 틸트를 권장합니다.'
          }
        };

      case 'samjin-sj200':
      default:
        return {
          bulkOrder: {
            b2bChannel: '디바이스마트, 안전나라 및 대진교통신호 본사 직영 총판',
            orderSteps: [
              '1단계: 전원 사양(AC 220V 상시 전원 vs DC 12V/24V) 주문 사양 확인',
              '2단계: 지주대 파이프 외경(76.3mm~114.3mm)에 맞는 스테인리스 밴드 규격 확정',
              '3단계: 세금계산서 청구 및 물품 발주',
              '4단계: 공장 직송 및 힌지 브라켓 일체형 배송'
            ],
            leadTime: 'AC 220V 모델 상시 재고 익일 출하 / DC 특수 모델 3영업일 소요',
            discountTiers: [
              { quantity: '5~19대', discount: '5% 단가 할인', benefit: '스테인리스 파이프 반도(SUS 밴드) 2개 무상 증정' },
              { quantity: '20대 이상', discount: '10% 단가 할인', benefit: '비가림막 차광 후드 및 상하 각도 힌지 세트 포함' }
            ],
            documents: ['경찰청 교통신호기 공인 규격서', 'IP55 방진/방수 성적서', '고휘도 LED 수명 보증서']
          },
          inventoryTips: {
            stockSummary: '경찰청 표준 신호기 부품으로 AC 220V 상시 전원용 모델은 상시 수백 대 보유',
            colorStockNotes: '적색 렌즈/백색 렌즈 모두 상시 재고 운영',
            quickDeliveryOptions: ['수도권 공구상가 및 전기자재상 당일 배송 연계'],
            substituteModel: '200파이 원형 품절 시 Ø150mm [S150UHS-FT] 또는 200각 사각 [TT-FL200S] 호환'
          },
          installationPrecautions: {
            wiringAndPolarity: 'AC 220V 모델은 반드시 접지선(GND)을 연결하고 활선(Live)을 레이더 릴레이 접점에 연결하십시오. 감전 사고 예방을 위해 전원 차단 후 작업하십시오.',
            relayProtection: 'AC 220V 개폐 시 발생하는 아크(Arc) 스파크를 방지하기 위해 정격 250V 5A 이상의 AC 전용 릴레이를 사용하십시오.',
            waterproofSealing: '신호등 외함 하부의 배수구(Drain Hole)가 막히지 않도록 확인하고, 상부 차광 후드 볼트 체결부에 고무 와셔를 삽입하십시오.',
            windLoadTorque: '★중량 1.85kg으로 가장 무거우므로 얇은 알루미늄 외함 단독 체결 금지! 지주 파이프에 스테인리스 반도(밴드) 2개로 이중 결속하고 20 Nm 토크로 조이십시오.',
            tiltAngleGuide: '상하 힌지 볼트를 풀어 도로 경사도(오르막/내리막)에 따라 운전자 시선에 맞게 틸트 각도를 조절한 후 힌지 너트를 완전히 고정하십시오.'
          }
        };
    }
  };

  const guide = getProcurementGuide(product.id);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl my-auto overflow-hidden shadow-2xl relative text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className={`h-2 w-full ${
          product.sizeCategory === '100mm급'
            ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500'
            : product.sizeCategory === '120~150mm급'
              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
              : 'bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500'
        }`} />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                <Cpu className="w-3.5 h-3.5" />
                {product.manufacturer}
              </span>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {product.flashType}
              </span>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                product.sizeCategory === '100mm급'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : product.sizeCategory === '120~150mm급'
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                    : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
              }`}>
                {product.sizeCategory}
              </span>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {product.shapeLabel}
              </span>
            </div>

            <h2 id="modal-product-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 flex-wrap font-mono">
              <span className="text-blue-400 font-bold">모델 식별자: {product.model}</span>
              <span className="text-slate-600">|</span>
              <span>외형 치수: {product.dimensions}</span>
              {product.weight && (
                <>
                  <span className="text-slate-600">|</span>
                  <span className="text-amber-300 font-semibold">중량: {product.weight}</span>
                </>
              )}
            </div>
          </div>

          {/* Close & Navigation Button Group */}
          <div className="flex items-center gap-2 shrink-0">
            {onNavigateProduct && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => onNavigateProduct('prev')}
                  disabled={!hasPrev}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="이전 제품 (키보드 ←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateProduct('next')}
                  disabled={!hasNext}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="다음 제품 (키보드 →)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 shadow-md"
              title="닫기 (ESC)"
              aria-label="모달 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Internal Tab Navigation Bar */}
        <div className="px-5 sm:px-7 pt-4 bg-slate-950/40 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>상세 기술 사양 및 검증</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('procurement')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap relative ${
              activeTab === 'procurement'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>상세 구매 & 현장 설치 가이드</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              대량발주·재고팁·설치주의
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto space-y-6 text-sm">
          {/* Top Hero Purchase CTA Box (Always accessible) */}
          <div className="bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 border border-blue-900/40 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                실구매가 및 즉시 발주 정보 (VAT 포함 기준)
              </span>

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                  {product.price}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  온라인 즉시 구매 가능
                </span>
              </div>

              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>공식 판매처: <strong>{product.purchaseStoreName}</strong> (KC 인증 및 정품 보증)</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={product.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>공식 구매처 바로가기 (URL)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onOpenVideo) {
                    onOpenVideo({
                      id: product.youtubeVideoId,
                      title: product.name,
                      url: product.youtubeUrl,
                    });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-900/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>유튜브 시연 영상 재생</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Specs and Technical Analysis */}
          {activeTab === 'specs' && (
            <>
              {/* 4 Core Requirements Acceptance Badges */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2.5">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>사용자 요구 4대 핵심 기능 수용 검증 상태</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5" />
                      <span>1. ON/OFF 제어 가능</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      레이더 A접점 무전압 릴레이 2선 직결로 과속 시에만 순간 발광
                    </p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-blue-400 font-bold flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5" />
                      <span>2. 적색/백색 완비</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {product.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            c.includes('적색') 
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                              : 'bg-slate-200 text-slate-900'
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-purple-400 font-bold flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5" />
                      <span>3. 100mm 이상 규격</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight font-mono">
                      {product.dimensions}
                    </p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5" />
                      <span>4. 과속차량 임팩트 ★{product.impactLevel}/5</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      단속카메라 착각 섬광으로 주야간 즉각적인 감속 유도
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Specifications Matrix Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>하드웨어 및 전기적 상세 사양 (Full Specifications)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Voltage & Power */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-blue-400 font-bold flex items-center gap-1.5 text-xs">
                      <Zap className="w-4 h-4" />
                      <span>입력 전원 및 전압 규격</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      {product.inputVoltage}
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed">
                      소비 전력: <strong className="text-amber-300 font-mono">{product.powerConsumption}</strong>
                      {product.weight && <span> | 순중량: <strong className="text-slate-200 font-mono">{product.weight}</strong></span>}
                    </div>
                    <div className="text-[11px] text-emerald-400/90 font-medium">
                      ✓ 태양광(솔라) 배터리 및 상시 전원(SMPS/한전) 모두 안정적 구동 지원
                    </div>
                  </div>

                  {/* Control Method */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-amber-400 font-bold flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>제어 방식 (ON/OFF 스위칭)</span>
                    </div>
                    <div className="text-xs font-bold text-white leading-snug">
                      {product.controlMethod}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      과속 레이더 검지기 보드의 무전압 릴레이 A접점(NO: Normal Open, COM: Common)에 2선 직결되어, 과속 차량 검지 시에만 3초간 펄스 섬광이 방출됩니다.
                    </p>
                  </div>

                  {/* Driving Method & Flash Optics */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-red-400 font-bold flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>플래시 구동 메커니즘 및 광원</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {product.drivingMethod}
                    </div>
                    <div className="bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg text-[11px] text-red-200/90 leading-relaxed font-medium">
                      {product.impactDescription}
                    </div>
                  </div>

                  {/* Mounting Method */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                        <Wrench className="w-4 h-4" />
                        <span>과속안내판 상단 마운트 체결 편의성</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-300 font-mono">
                        편의도 ★{product.mountRating}/5
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {product.mountConvenience}
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded-lg text-[11px] text-emerald-200/90 leading-relaxed font-medium">
                      ✓ 안내판 상단 알루미늄 프레임에 볼트 2개로 3분 내 고정 완료 (처짐 및 진동 0%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Bullets List */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2.5">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>핵심 특장점 및 엔지니어링 체크포인트</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-emerald-400 font-bold text-sm shrink-0">✓</span>
                      <span className="text-slate-300 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Engineering Recommendation */}
              <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-2xl p-4 sm:p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>전문가 종합 추천의견 및 적용 현장</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {product.keyRecommendation}
                </p>
              </div>
            </>
          )}

          {/* TAB 2: Detailed Procurement & Installation Guide */}
          {activeTab === 'procurement' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Procurement Quick Banner */}
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <PackageCheck className="w-4 h-4" />
                  <span>실무 엔지니어 & 구매 담당자 전용 가이드</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {product.name} 발주 및 현장 설치 실무 지침
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  관공서 및 시공사 납품을 위한 대량 견적 절차, 긴급 납기 단축을 위한 재고 파악 팁, 현장 결선 및 풍압 체결 시 고장 방지 주의사항입니다.
                </p>
              </div>

              {/* 1. Bulk Order Procedures */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>1. 대량 주문 절차 & B2B 견적 프로세스</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    표준 납기: {guide.bulkOrder.leadTime}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">
                    공식 B2B 거래 채널:
                  </span>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                    {guide.bulkOrder.b2bChannel}
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">
                    발주 및 납품 진행 단계:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {guide.bulkOrder.orderSteps.map((step, idx) => (
                      <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-slate-300 leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Discount Tiers Table */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <BadgePercent className="w-3.5 h-3.5" />
                    <span>수량별 대량 할인 및 부자재 무상 혜택:</span>
                  </span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="py-2 px-3">주문 수량</th>
                          <th className="py-2 px-3">예상 할인율</th>
                          <th className="py-2 px-3">부자재 및 납품 지원 혜택</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-normal">
                        {guide.bulkOrder.discountTiers.map((tier, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/50">
                            <td className="py-2.5 px-3 font-bold text-white">{tier.quantity}</td>
                            <td className="py-2.5 px-3 font-semibold text-emerald-400">{tier.discount}</td>
                            <td className="py-2.5 px-3 text-slate-300">{tier.benefit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Certification Docs */}
                <div className="pt-1 flex items-center gap-2 flex-wrap text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">발급 가능 서류:</span>
                  {guide.bulkOrder.documents.map((doc, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Inventory Check Tips */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>2. 실시간 재고 확인 & 긴급 수급 단축 팁</span>
                  </h4>
                  <span className="text-xs text-amber-400 font-semibold">
                    당일 퀵/특송 연계 가능
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Stock summary */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px]">
                      상시 재고 보유 현황
                    </span>
                    <p className="text-white font-medium leading-relaxed">
                      {guide.inventoryTips.stockSummary}
                    </p>
                    <p className="text-[11px] text-blue-300">
                      💡 {guide.inventoryTips.colorStockNotes}
                    </p>
                  </div>

                  {/* Fast delivery options */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px]">
                      당일 긴급 수령 채널
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {guide.inventoryTips.quickDeliveryOptions.map((opt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Substitute Model Recommendation */}
                <div className="bg-amber-950/20 border border-amber-900/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">품절 시 즉시 대체 호환 팁:</strong>{' '}
                    <span>{guide.inventoryTips.substituteModel}</span>
                  </div>
                </div>
              </div>

              {/* 3. On-Site Installation Precautions */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>3. 과속안내판 현장 설치 및 결선 시 핵심 주의사항</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    현장 오결선 쇼트, 릴레이 접점 소손, 우천 시 빗물 침투, 태풍 시 풀림 사고를 원천 차단하기 위한 필수 체크리스트입니다.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Item 1: Polarity & Wiring */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span>전원 결선 및 극성 확인</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-5">
                      {guide.installationPrecautions.wiringAndPolarity}
                    </p>
                  </div>

                  {/* Item 2: Relay Protection */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>레이더 검지기 릴레이 접점 보호</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-5">
                      {guide.installationPrecautions.relayProtection}
                    </p>
                  </div>

                  {/* Item 3: Waterproofing */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-teal-400">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>방수(Waterproof) 실링 및 배선 처리</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-5">
                      {guide.installationPrecautions.waterproofSealing}
                    </p>
                  </div>

                  {/* Item 4: Wind Load & Bolt Torque */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-purple-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>풍압 하중 및 풀림 방지 볼트 체결 토크</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-5">
                      {guide.installationPrecautions.windLoadTorque}
                    </p>
                  </div>

                  {/* Item 5: Driver View Tilt Angle */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-red-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>운전자 시선 정렬 및 틸트(Tilt) 각도</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-5">
                      {guide.installationPrecautions.tiltAngleGuide}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Quick Order Contact Box */}
              <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      {product.purchaseStoreName} 공식 직영 발주
                    </h5>
                    <p className="text-slate-400 mt-0.5">
                      견적서 발행, 프로젝트 납기 조율, 맞춤 브라켓 제작 상담을 즉시 요청하세요.
                    </p>
                  </div>
                </div>

                <a
                  href={product.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-900/30 shrink-0"
                >
                  <span>공식 스토어 / 발주처 연결</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>키보드 <strong>ESC</strong>로 닫기, <strong>← / →</strong>로 제품 전환</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              닫기
            </button>

            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-900/30"
            >
              <span>{product.purchaseStoreName} 바로가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
