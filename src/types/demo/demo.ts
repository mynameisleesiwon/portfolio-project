import type { JSX } from 'react';

// 데모 카드 타입 정의
export interface DemoCardType {
  id: string;
  title: string;
  description: string;
  detailDescription: string;
  icon: JSX.Element;
  status: 'active' | 'coming-soon';
  techStack: string[];
  features: string[];
  route: string;
}
