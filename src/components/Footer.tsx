import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-8 px-4 text-center mt-16">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span>ITS TRAFFIC INFRASTRUCTURE SPECIFICATION GUIDE</span>
        </div>
        
        <p className="text-sm text-slate-400 leading-relaxed">
          본 페이지는 제공된 이미지 분석 및 검색 데이터를 기반으로 생성된 정보입니다.<br />
          정확한 규격 및 납품 사항은 각 제조사에 도면과 함께 별도 문의하시기 바랍니다.
        </p>

        <div className="pt-4 border-t border-slate-900 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span>• 3x6 18구 적청 LED 스트로보 모듈</span>
          <span>• 비가림막(바이저) 일체형 철제 하우징</span>
          <span>• 관급 도로교통 안전시설 자재</span>
        </div>
      </div>
    </footer>
  );
};
