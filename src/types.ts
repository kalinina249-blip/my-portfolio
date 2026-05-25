/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  platform: 'Wildberries' | 'Ozon' | 'Yandex.Market';
  turnover: string;
  growth: string;
  ctrIncrease: string;
  description: string;
  aiInfographicsUrl: string;
  beforePhotoUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  iconName: string;
}

export interface VideoStreamOption {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface AIStudioResponse {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  aiPhotoPrompts: {
    hero: string;
    details: string;
    lifestyle: string;
  };
  strategicAdvice: string[];
}
