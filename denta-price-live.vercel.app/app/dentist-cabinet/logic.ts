import type { AlmatyServicePrice, SegmentConfig } from '../../pricing/types';
import { SEGMENTS_CONFIG } from '../../pricing/fallback';

export const getSegmentConfigWithRealRanges = (almatyPrice?: AlmatyServicePrice): SegmentConfig[] => {
  const entries = Object.entries(SEGMENTS_CONFIG as any);

  if (!almatyPrice) {
    return entries.map(([key, cfg]: any) => ({
      key,
      ...cfg,
      min: Number.NaN,
      max: Number.NaN,
    })) as SegmentConfig[];
  }

  const economMax = Number((almatyPrice as any).econom);
  const comfortMax = Number((almatyPrice as any).comfort);
  const optimumMax = Number((almatyPrice as any).optimum);
  const premiumMax = Number((almatyPrice as any).premium);
  const luxuryMax = Number((almatyPrice as any).luxury);

  return entries.map(([key, cfg]: any) => {
    let min = Number.NaN;
    let max = Number.NaN;

    if (!Number.isFinite(economMax) || !Number.isFinite(comfortMax) || !Number.isFinite(optimumMax) || !Number.isFinite(premiumMax) || !Number.isFinite(luxuryMax)) {
      return { key, ...cfg, min, max };
    }

    if (key === 'econom') { min = 0; max = economMax; }
    if (key === 'comfort') { min = economMax + 1; max = comfortMax; }
    if (key === 'optimum') { min = comfortMax + 1; max = optimumMax; }
    if (key === 'premium') { min = optimumMax + 1; max = premiumMax; }
    if (key === 'luxury') { min = premiumMax + 1; max = luxuryMax; }

    return { key, ...cfg, min, max };
  }) as SegmentConfig[];
};
