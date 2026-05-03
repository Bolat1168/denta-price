'use client';
import React from 'react';
import { services } from '../data/services';
import type { Service } from '../data/types';

interface MobileServicesPanelProps {
  isMobileMenuOpen: boolean;
  selectedService: string;
  setSelectedService: (id: string) => void;
  onClose: () => void;
  setNearbyOnly: (val: boolean) => void;
}

export default function MobileServicesPanel({
  isMobileMenuOpen,
  selectedService,
  setSelectedService,
  onClose,
  setNearbyOnly,
}: MobileServicesPanelProps) {
  if (!isMobileMenuOpen) return null;

  // Группировка услуг по категориям
  const grouped = services.reduce<Record<string, Service[]>>((acc, service) => {
    const cat = service.category || 'Общие';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    onClose(); // закрываем панель после выбора
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-black uppercase">ҚЫЗМЕТТЕР / УСЛУГИ</h2>
        <button onClick={onClose} className="text-2xl leading-none">&times;</button>
      </div>

      {/* Список услуг с прокруткой */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-black uppercase text-gray-400 mb-2 border-b border-gray-200 pb-1">
              {category}
            </h3>
            {items.map((service) => {
              const isActive = selectedService === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className={`w-full text-left p-3 mb-1 border-2 transition-all rounded-none ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  {/* КАЗАХСКИЙ - ЖИРНЫЙ */}
                  <span className="text-sm font-black block">{service.nameKZ}</span>
                  {/* РУССКИЙ - КУРСИВ */}
                  <span className="text-xs block text-gray-500 italic">{service.nameRU}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Блок закрытия */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full bg-black py-4 text-white font-black rounded-none uppercase active:scale-95 transition-transform"
        >
          ЗАКРЫТЬ
        </button>
      </div>
    </div>
  );
}
