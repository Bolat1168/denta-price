'use client';
import React from 'react';
import { segments as importedSegments } from '../data/segments';
import type { AlmatyServicePrice } from '../../pricing/types';

interface RightSidebarDesktopProps {
  selectedSegment: string;
  setSelectedSegment: (segment: string) => void;
  nearbyOnly: boolean;
  setNearbyOnly: (nearby: boolean) => void;
  almatyPrices: AlmatyServicePrice[];
  selectedService: string;
}

const fallbackSegments = ['econom', 'comfort', 'optimum', 'premium', 'luxury'];
const segmentsList = Array.isArray(importedSegments) ? importedSegments : fallbackSegments;
const reversedSegments = [...segmentsList].reverse();

const segmentColors: Record<string, string> = {
  luxury: '#9333ea',
  premium: '#3b82f6',
  optimum: '#22c55e',
  comfort: '#eab308',
  econom: '#6b7280',
};

const formatPrice = (val: number | null | undefined): string => {
  if (val === null || val === undefined) return '';
  return val.toLocaleString('ru-RU');
};

const getDisplayRange = (
  segmentKey: string,
  serviceId: string,
  prices: AlmatyServicePrice[],
  isServiceSelected: boolean
): string => {
  if (segmentKey === 'luxury') {
    if (!isServiceSelected) return 'ТЕНГЕ / ОТ';
    const priceData = prices.find(p => p?.serviceId === serviceId);
    if (!priceData || priceData.luxury === null) return 'ТЕНГЕ / ОТ';
    return `ТЕНГЕ / ОТ ${formatPrice(priceData.luxury)}`;
  }

  if (!isServiceSelected) return 'ТЕНГЕ / ДО';
  if (!serviceId || !Array.isArray(prices) || prices.length === 0) return '';

  const priceData = prices.find(p => p?.serviceId === serviceId);
  if (!priceData) return '';

  const getVal = (v: number | null | undefined) => v ?? 0;

  switch (segmentKey) {
    case 'premium':
      return `ТЕНГЕ / ОТ ${formatPrice(getVal(priceData.optimum) + 1)} ДО ${formatPrice(priceData.premium)}`;
    case 'optimum':
      return `ТЕНГЕ / ОТ ${formatPrice(getVal(priceData.comfort) + 1)} ДО ${formatPrice(priceData.optimum)}`;
    case 'comfort':
      return `ТЕНГЕ / ОТ ${formatPrice(getVal(priceData.econom) + 1)} ДО ${formatPrice(priceData.comfort)}`;
    case 'econom':
      return `ТЕНГЕ / ДО ${formatPrice(priceData.econom)}`;
    default:
      return '';
  }
};

export default function RightSidebarDesktop({
  selectedSegment,
  setSelectedSegment,
  nearbyOnly,
  setNearbyOnly,
  almatyPrices,
  selectedService,
}: RightSidebarDesktopProps) {
  const isServiceSelected = !!(selectedService && selectedService !== 'all');

  return (
    <aside className="w-[20vw] h-full p-4 lg:p-[1.5vw] border-t lg:border-l lg:border-t-0 border-gray-200 bg-white flex flex-col overflow-hidden text-black">
      <h4 className="text-[10px] font-black mb-4 border-b border-gray-200 pb-1 uppercase tracking-wider text-gray-400">
        СЕГМЕНТТЕР / СЕГМЕНТЫ
      </h4>

      <div className="flex-1 flex flex-col justify-around overflow-y-auto pr-1 lg:pr-2 custom-scrollbar min-h-0">
        {reversedSegments.map(seg => {
          const range = getDisplayRange(seg, selectedService, almatyPrices, isServiceSelected);
          const isActive = selectedSegment === seg;
          return (
            <div key={seg} className="flex flex-col items-center">
              <button
                onClick={() => setSelectedSegment(seg)}
                className={`w-full py-3 lg:py-[1vw] px-4 rounded-none border-2 border-gray-300 text-[14px] lg:text-[1.1vw] font-black uppercase transition-all hover:bg-black hover:text-white flex flex-col items-center ${
                  isActive ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                <span className="font-black uppercase">{seg}</span>
                {!isActive && (
                  <div
                    className="w-full h-0.5 mt-1"
                    style={{ backgroundColor: segmentColors[seg] }}
                  />
                )}
              </button>
              {range && (
                <div className="text-[10px] font-normal mt-1 text-gray-700 text-center">
                  {range}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setNearbyOnly(!nearbyOnly)}
        className="mt-4 w-full py-2 border border-gray-300 text-sm font-black uppercase bg-gray-200 text-black"
      >
        {nearbyOnly ? '✓ ' : ''}Жақында / Рядом
      </button>
    </aside>
  );
}
