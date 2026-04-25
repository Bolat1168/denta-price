'use client';
import React, { useState, useMemo } from 'react';
import { services as importedServices } from '../data/services';
import type { Service } from '../data/types';

interface LeftSidebarDesktopProps {
  selectedService: string;
  setSelectedService: (id: string) => void;
}

const services = Array.isArray(importedServices) ? importedServices : [];

export default function LeftSidebarDesktop({ selectedService, setSelectedService }: LeftSidebarDesktopProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const grouped = useMemo(() => {
    const g: Record<string, Service[]> = {};
    if (!services.length) return g;
    services.forEach(s => {
      if (!s) return;
      const c = s.category || 'Общие';
      if (!g[c]) g[c] = [];
      g[c].push(s);
    });
    return g;
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return grouped;
    const res: Record<string, Service[]> = {};
    Object.keys(grouped).forEach(cat => {
      const match = grouped[cat].filter(s => 
        (s?.nameRU || '').toLowerCase().includes(term) || 
        (s?.nameKZ || '').toLowerCase().includes(term)
      );
      if (match.length) res[cat] = match;
    });
    return res;
  }, [searchTerm, grouped]);

  return (
    <nav className="w-[22vw] min-w-[300px] h-full p-6 border-r border-gray-200 bg-white overflow-y-auto">
      <input 
        className="w-full p-4 mb-6 border-2 border-black rounded-none font-bold uppercase"
        placeholder="ИЗДЕУ / ПОИСК..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {Object.entries(filtered).map(([cat, list]) => (
        <div key={cat} className="mb-6">
          <h4 className="text-[10px] font-bold mb-2 border-b uppercase text-gray-400">{cat}</h4>
          {list.map((s) => (
            <button 
              key={s.id} 
              onClick={() => setSelectedService(s.id)}
              className={`w-full text-left p-3 mb-1 border-2 transition-all rounded-none ${
                selectedService === s.id 
                  ? 'bg-black text-white border-black' 
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              {/* КАЗАХСКИЙ - ПРИОРИТЕТ (Шрифт стал чище) */}
              <span className="block text-sm font-medium leading-tight">
                {s.nameKZ || s.nameRU}
              </span>
              
              {/* РУССКИЙ - КУРСИВ (скрывается, если совпадает с КЗ) */}
              {s.nameKZ !== s.nameRU && (
                <span className={`block text-[11px] italic mt-1 ${
                  selectedService === s.id ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {s.nameRU}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}
