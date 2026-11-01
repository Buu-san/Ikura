'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '../../i18n/LanguageContext';
import { GiftIcon } from '../ui/Icons';

export default function SafetyPopup() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'promo' | 'safety'>('promo');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-primary-indigo hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg border-2 border-accent-pink flex items-center gap-2.5 text-xs font-bold transition-colors cursor-pointer"
        aria-label="Mở thông báo ưu đãi Ikura"
      >
        <GiftIcon className="w-4 h-4 text-accent-pink" />
        <span className="hidden sm:inline">{t('popup.title')}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full bg-white rounded-lg border-2 border-primary-indigo overflow-hidden shadow-2xl">
      {/* Top Banner Header */}
      <div className="bg-primary-indigo text-white px-4 py-3 flex items-center justify-between border-b border-primary-dark">
        <div className="flex items-center gap-2">
          <GiftIcon className="w-4 h-4 text-accent-pink" />
          <span className="text-xs font-bold tracking-wide">
            {t('popup.title')}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white hover:bg-primary-dark w-6 h-6 rounded flex items-center justify-center text-xs transition-colors cursor-pointer"
          aria-label="Đóng thông báo"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-border text-xs font-bold">
        <button
          onClick={() => setActiveTab('promo')}
          className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
            activeTab === 'promo'
              ? 'text-primary-indigo border-b-2 border-accent-pink bg-neutral-bg'
              : 'text-text-muted hover:text-text-primary hover:bg-slate-50'
          }`}
        >
          {t('popup.tab_promo')}
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
            activeTab === 'safety'
              ? 'text-primary-indigo border-b-2 border-accent-pink bg-neutral-bg'
              : 'text-text-muted hover:text-text-primary hover:bg-slate-50'
          }`}
        >
          {t('popup.tab_safety')}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-xs">
        {activeTab === 'promo' ? (
          <div className="space-y-3">
            <div className="bg-neutral-bg border-l-4 border-accent-pink p-3 rounded-r-md font-bold text-accent-pink text-xs">
              {t('popup.promo_badge')}
            </div>
            <p className="text-text-muted leading-relaxed">
              {t('popup.promo_desc')}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <a
                href="#san-pham"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center bg-accent-pink hover:bg-accent-hover text-white py-2.5 px-4 rounded-md font-bold transition-colors cursor-pointer"
              >
                {t('popup.promo_btn')}
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 text-text-muted hover:text-text-primary hover:bg-neutral-bg rounded-md font-medium transition-colors cursor-pointer"
              >
                {t('popup.promo_dismiss')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-neutral-bg border-l-4 border-primary-indigo p-3 rounded-r-md font-bold text-primary-indigo text-xs">
              {t('popup.safety_badge')}
            </div>
            <p className="text-text-muted leading-relaxed">
              {t('popup.safety_desc')}
            </p>
            <div className="pt-2">
              <a
                href={`tel:${t('common.hotline_number').replace(/\s+/g, '')}`}
                className="block text-center bg-primary-indigo hover:bg-primary-dark text-white py-2.5 px-4 rounded-md font-bold transition-colors cursor-pointer"
              >
                {t('popup.safety_btn')}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
