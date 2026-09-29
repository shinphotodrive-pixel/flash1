export type StrobePattern = 
  | 'triple-alternate' // 3-flash Blue, 3-flash Red (Standard Korean ITS camera strobe)
  | 'double-alternate' // 2-flash Blue, 2-flash Red
  | 'rapid-strobe'     // Rapid 1-1 alternate
  | 'quad-pulse'       // 4 rapid pulses
  | 'simultaneous'     // Both flash together
  | 'steady-on';       // Continuous inspection light

export type EnvironmentMode = 'night' | 'day' | 'cad';

export interface VendorItem {
  id: string;
  name: string;
  categoryBadge: string;
  categoryColor: string;
  summary: string;
  detailPoints: string[];
  url: string;
  buttonLabel: string;
  contactType: '쇼핑몰 완제품' | '부품 모듈' | '함체 주문제작';
  recommendedFor: string;
}

export interface SpecificationItem {
  category: string;
  item: string;
  value: string;
  note: string;
}

export interface SpeedWarningProduct {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  flashType: '크세논 스트로브 플래시' | '파워 LED 버스트 플래시' | '규격형 1구 점멸 플래시';
  shape: 'square' | 'round';
  shapeLabel: string;
  dimensions: string;
  sizeCategory: '100mm급' | '120~150mm급' | '200mm급';
  colors: ('적색 (Red)' | '백색 (White)')[];
  controlMethod: string;
  inputVoltage: string;
  price: string;
  powerConsumption: string;
  weight?: string;
  drivingMethod: string;
  impactLevel: number;
  impactDescription: string;
  mountConvenience: string;
  mountRating: number;
  purchaseUrl: string;
  purchaseStoreName: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  features: string[];
  keyRecommendation: string;
}
