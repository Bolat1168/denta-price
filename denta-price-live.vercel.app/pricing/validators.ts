import { z } from 'zod';
import type { ServicePriceMap, PromotionPriceMap, AlmatyServicePrice } from './types';

const servicePriceSchema = z.object({
  serviceId: z.string(),
  serviceNameRU: z.string().optional(),
  econom: z.number().nullable(),
  comfort: z.number().nullable(),
  optimum: z.number().nullable(),
  premium: z.number().nullable(),
  luxury: z.number().nullable(),
});

const promotionPriceMapSchema = z.record(
  z.string(),
  z.record(z.string(), z.number())
);

export function validateServicePrices(data: unknown): ServicePriceMap {
  const parsed = z.array(servicePriceSchema).safeParse(data);
  if (!parsed.success) throw new Error('Invalid service prices');
  const map: ServicePriceMap = {};
  parsed.data.forEach(item => { if (item.serviceId) map[item.serviceId] = item; });
  return map;
}

export function validatePromotionPrices(data: unknown): PromotionPriceMap {
  const parsed = promotionPriceMapSchema.safeParse(data);
  if (!parsed.success) throw new Error('Invalid promotion prices');
  return parsed.data;
}
