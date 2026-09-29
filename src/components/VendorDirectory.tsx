import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  ShoppingCart, 
  Wrench, 
  ClipboardCheck, 
  Copy, 
  Check, 
  ArrowRight,
  Boxes,
  FileSpreadsheet
} from 'lucide-react';
import { VendorItem } from '../types';

export const VendorDirectory: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  
  // Procurement spec generator state
  const [voltage, setVoltage] = useState<string>('DC 12V/24V 겸용');
  const [housingMaterial, setHousingMaterial] = useState<string>('EGI 1.6T 강판 분체도장 (다크그레이)');
  const [poleDiameter, setPoleDiameter] = useState<string>('Ø 165mm (표준 카메라 지주)');
  const [controllerType, setControllerType] = useState<string>('내장형 마이크로프로세서 (3-3 교차점멸)');
  const [quantity, setQuantity] = useState<number>(4);

  const vendors: VendorItem[] = [
    {
      id: 'dhstyle',
      name: 'DH스타일',
      categoryBadge: '모듈 기성품',
      categoryColor: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      summary: '이미지 속 하우징 내부에 들어가는 발광체와 동일한 형태의 산업/차량 부착용 2구 적청 LED 경광등 단일 모듈입니다.',
      detailPoints: [
        '3×6 18구 고휘도 파워 LED 렌즈 어레이',
        'DC 12V / 24V 범용 입력 전원',
        '방수 실링 처리된 초슬림형 모듈 바디',
        '기존 함체 부품 교체 및 자작 조립용 최적'
      ],
      url: 'https://m.dhstyle.co.kr/product/detail.html?product_no=54409',
      buttonLabel: '제품 상세 보기',
      contactType: '부품 모듈',
      recommendedFor: '내부 램프 모듈 단독 교체 또는 자재 직접 조립 시'
    },
    {
      id: 'jeildeco',
      name: '제일전장',
      categoryBadge: '장방형 완제품',
      categoryColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
      summary: '표지판이나 도로 시설물 부착 규격에 맞춘 2구 장방형 경광등 세트입니다. 기본적인 외함이 포함되어 있습니다.',
      detailPoints: [
        '도로교통안전용 공공시설물 정격 규격 승인',
        '일체형 케이스 및 점멸 컨트롤러 내장',
        '스쿨존 및 횡단보도 지주대 브라켓 호환',
        '즉시 전원 연결 후 현장 가동 가능한 완제품'
      ],
      url: 'https://m.jeildeco.com/category/도로교통안전용/27/',
      buttonLabel: '도로용 제품 보기',
      contactType: '쇼핑몰 완제품',
      recommendedFor: '현장 즉시 시공용 상용 완제품 세트 구매 시'
    },
    {
      id: 'saekwang',
      name: '새광산업',
      categoryBadge: '맞춤 하우징 제작',
      categoryColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      summary: '사진과 같이 비가림막이 포함된 정확한 철제 하우징 형태가 설계 도면상 꼭 필요할 경우, 함체 제작을 의뢰할 수 있는 전문 제조사입니다.',
      detailPoints: [
        '도면 기반 EGI / SUS304 레이저 절곡 가공',
        '특수 경사각 차광 바이저(차광막) 일체형 용접',
        '원형 지주대 규격별(Ø114~216) U-볼트 주문제작',
        '지자체 납품용 시방서 규격 분체도장 및 검수'
      ],
      url: 'http://새광산업.com/bbs/content.php?co_id=product0902',
      buttonLabel: '제조사 문의하기',
      contactType: '함체 주문제작',
      recommendedFor: '도면 지정 관급 규격 외함 및 특수 브라켓 주문 시'
    }
  ];

  const handleCopySpec = () => {
    const specText = `[ITS 2구 적청 LED 경광등 제작/구매 견적 문의]
- 품명: ITS 2구 적청 사각 LED 경광등 (비가림막 일체형)
- 수량: ${quantity} 세트
- 전원 규격: ${voltage}
- 발광 소자: 좌측 청색(Blue) 18구 + 우측 적색(Red) 18구 (총 36구 파워 LED)
- 점멸 방식: ${controllerType}
- 하우징 재질: ${housingMaterial}
- 취부 방식: 후면 U-Bolt 브라켓 결속 (${poleDiameter})
- 비가림막: 상단 75mm 15° 차광 바이저 일체형
- 방수 규격: 옥외용 IP66/IP67 기준`;

    navigator.clipboard.writeText(specText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="vendor-directory" className="space-y-8">
      {/* Directory Title & Category Bar */}
      <div className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
                <Building2 className="w-5 h-5" />
              </div>
              유사 모듈 및 제작 의뢰 디렉토리
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              필요 목적(발광 모듈 단품, 상용 완제품 세트, 도면 맞춤 외함 가공)에 따른 검증 제조사 바로가기
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
              3개 전문 제조·유통사
            </span>
          </div>
        </div>

        {/* 3 Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div 
              key={vendor.id}
              className="bg-slate-950 rounded-xl border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-200 hover:shadow-xl group"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-800/80 bg-slate-900/40">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${vendor.categoryColor}`}>
                    {vendor.categoryBadge}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {vendor.contactType}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {vendor.name}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-grow space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {vendor.summary}
                </p>

                {/* Key Points */}
                <div className="space-y-1.5 pt-2 border-t border-slate-900">
                  {vendor.detailPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start text-xs text-slate-400">
                      <span className="text-blue-400 mr-2 font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended Tag */}
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-medium block mb-0.5">추천 대상:</span>
                  {vendor.recommendedFor}
                </div>
              </div>

              {/* Card Footer with Link */}
              <div className="p-4 bg-slate-900/60 border-t border-slate-800/80">
                <a
                  href={vendor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm text-white transition-all bg-blue-600 hover:bg-blue-500 shadow-sm hover:shadow-blue-600/30"
                >
                  <span>{vendor.buttonLabel}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Procurement Specification Generator Tool */}
      <div className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">현장 발주 및 제조사 견적 문의서 자동 생성기</h3>
              <p className="text-xs text-slate-400">각 제조사에 도면 첨부 문의 시 필요한 기술 파라미터 조합 텍스트 즉시 복사</p>
            </div>
          </div>
          <button
            onClick={handleCopySpec}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md ${
              copied 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>견적서 클립보드 복사됨!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>문의 양식 복사</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">입력 전원 규격</label>
            <select
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="DC 12V/24V 겸용 (태양광 및 상시전원용)">DC 12V/24V 겸용 (태양광용)</option>
              <option value="AC 220V 직결형 (내장 SMPS 파워서플라이)">AC 220V 직결형 (한전 전원용)</option>
              <option value="DC 12V 단독 (차량 및 이동식 전원)">DC 12V 단독 (이동식 카메라)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">하우징(외함) 재질</label>
            <select
              value={housingMaterial}
              onChange={(e) => setHousingMaterial(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="EGI 1.6T 강판 분체도장 (다크그레이 RAL 7016)">EGI 1.6T 강판 분체도장 (기본)</option>
              <option value="SUS 304 스테인리스 스틸 (염해지역 및 터널용)">SUS 304 스테인리스 (해안/터널)</option>
              <option value="알루미늄 압출재 분체도장 (경량형)">알루미늄 압출재 (초경량)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">지주대 결속 직경 (Pole)</label>
            <select
              value={poleDiameter}
              onChange={(e) => setPoleDiameter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Ø 165mm (표준 무인단속 캔틸레버 지주)">Ø 165mm (표준 단속 지주)</option>
              <option value="Ø 114mm (스쿨존 스마트표지판 지주)">Ø 114mm (스쿨존 지주)</option>
              <option value="Ø 216mm (대형 고속도로 문형식 지주)">Ø 216mm (대형 문형식 지주)</option>
              <option value="벽면/구조물 평면 앵커 직결 브라켓">벽면/구조물 평면 앵커 브라켓</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">발주 예정 수량</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value || '1', 10))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
              <span className="text-xs text-slate-400 font-medium">세트</span>
            </div>
          </div>
        </div>

        {/* Live Preview of Procurement Text */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-xs font-mono text-slate-300 relative">
          <div className="text-[10px] text-slate-500 mb-2 pb-1 border-b border-slate-800 flex justify-between">
            <span>생성된 제조사 견적 문의 텍스트 (클릭 시 자동 복사)</span>
            <span className="text-blue-400">규격 시방서 부합</span>
          </div>
          <p className="text-slate-400">
            [ITS 2구 적청 LED 경광등 제작/구매 견적 문의]<br />
            - 품명: ITS 2구 적청 사각 LED 경광등 (비가림막 일체형)<br />
            - 수량: <span className="text-amber-300 font-bold">{quantity} 세트</span><br />
            - 전원 규격: <span className="text-blue-300">{voltage}</span><br />
            - 발광 소자: 좌측 청색(Blue) 18구 + 우측 적색(Red) 18구 (총 36구 파워 LED)<br />
            - 점멸 방식: <span className="text-emerald-300">{controllerType}</span><br />
            - 하우징 재질: <span className="text-slate-200">{housingMaterial}</span><br />
            - 취부 방식: 후면 U-Bolt 브라켓 결속 ({poleDiameter})<br />
            - 비가림막: 상단 75mm 15° 차광 바이저 일체형 (우천 차수 및 역광 방지)<br />
            - 방수 규격: 옥외용 IP66/IP67 기준
          </p>
        </div>
      </div>
    </section>
  );
};
