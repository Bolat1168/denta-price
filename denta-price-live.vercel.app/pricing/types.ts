import { Doctor } from '../app/data/types';

export interface AlmatyServicePrice {
  serviceId: string;
  econom: number | null;
  comfort: number | null;
  optimum: number | null;
  premium: number | null;
  luxury: number | null;
}

export type ServicePriceMap = Record<string, AlmatyServicePrice>;

export interface SegmentConfig {
  id: string;
  nameKz: string;
  nameRu: string;
  color: string;
}

export interface PromotionPriceMap {
  [key: string]: Record<string, number>;
}

export type { Doctor };
