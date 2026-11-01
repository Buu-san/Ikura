'use client';

import React, { createContext, useContext, useState } from 'react';
import viDict from './locales/vi.json';
import enDict from './locales/en.json';
import kmDict from './locales/km.json';

export type SupportedLanguage = 'vi' | 'en' | 'km';

const dictionaries: Record<SupportedLanguage, Record<string, unknown>> = {
  vi: viDict as Record<string, unknown>,
  en: enDict as Record<string, unknown>,
  km: kmDict as Record<string, unknown>,
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (keyPath: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  setLanguage: () => {},
  t: (keyPath: string) => keyPath,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ikura_lang') as SupportedLanguage;
        if (saved && (saved === 'vi' || saved === 'en' || saved === 'km')) {
          return saved;
        }
      } catch {
        // Fallback for private mode or server
      }
    }
    return 'vi';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ikura_lang', lang);
      } catch {
        // Fallback
      }
    }
  };

  const t = (keyPath: string, fallback?: string): string => {
    const dict = dictionaries[language] || dictionaries.vi;
    const parts = keyPath.split('.');
    let current: unknown = dict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        // Fallback to Vietnamese if key not found
        let viFallback: unknown = dictionaries.vi;
        for (const p of parts) {
          if (viFallback && typeof viFallback === 'object' && p in viFallback) {
            viFallback = (viFallback as Record<string, unknown>)[p];
          } else {
            viFallback = null;
            break;
          }
        }
        return typeof viFallback === 'string' ? viFallback : (fallback || keyPath);
      }
    }

    return typeof current === 'string' ? current : (fallback || keyPath);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}
