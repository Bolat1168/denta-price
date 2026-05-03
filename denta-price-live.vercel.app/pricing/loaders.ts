export const loadAlmatyPrices = async (): Promise<any[]> => {
  const res = await fetch('/api/prices/almaty');
  if (!res.ok) throw new Error('Failed to load almaty prices');
  return res.json();
};

export const loadPromotionPrices = async (): Promise<Record<string, any>> => {
  const res = await fetch('/api/prices/promotion');
  if (!res.ok) throw new Error('Failed to load promotion prices');
  return res.json();
};
