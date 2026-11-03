'use client';

import React, { useState } from 'react';
import { DEALERS_DATA } from '../../data/mockData';
import { useI18n } from '../../i18n/LanguageContext';
import { MapPinIcon, PhoneIcon, ClockIcon, CheckIcon, NavigationIcon } from '../ui/Icons';

export default function DealerLocator() {
  const { t } = useI18n();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const cities = ['all', 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'];

  const filteredDealers = DEALERS_DATA.filter((dealer) => {
    const matchCity = selectedCity === 'all' || dealer.city === selectedCity;
    const matchSearch =
      searchTerm.trim() === '' ||
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <section id="dai-ly" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-3 py-1 rounded-full">
            {t('dealers.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-indigo tracking-tight">
            {t('dealers.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('dealers.subtitle')}
          </p>

          {/* Filters Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            {/* City Dropdown */}
            <select
              id="dealer-city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full sm:w-56 bg-white border border-neutral-border text-slate-800 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-accent-pink transition-all font-medium"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'all' ? t('dealers.all_cities') : city}
                </option>
              ))}
            </select>

            {/* Keyword Search */}
            <div className="relative w-full flex-1">
              <input
                id="dealer-keyword-search"
                type="text"
                placeholder={t('dealers.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-neutral-border text-slate-800 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent-pink transition-all"
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <MapPinIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-lg p-6 border border-neutral-border hover:border-primary-indigo transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-accent-pink bg-accent-pink/10 px-2.5 py-1 rounded">
                    {dealer.city} • {dealer.district}
                  </span>
                  {dealer.hasWarrantyCenter && (
                    <span className="bg-primary-indigo/10 text-primary-indigo text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckIcon className="w-3 h-3 text-primary-indigo" />
                      <span>{t('dealers.warranty_station')}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-primary-indigo group-hover:text-accent-pink transition-colors leading-snug">
                  {dealer.name}
                </h3>

                <p className="text-xs text-text-muted flex items-start gap-2">
                  <MapPinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{dealer.address}</span>
                </p>

                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <ClockIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{dealer.workingHours}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-border flex items-center justify-between gap-3">
                <a
                  href={`tel:${dealer.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-indigo hover:text-accent-pink transition-colors"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span>{t('dealers.btn_call')}: {dealer.phone}</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(dealer.name + ' ' + dealer.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-primary-indigo bg-white px-3 py-1.5 rounded border border-neutral-border hover:border-primary-indigo transition-colors"
                >
                  <span>{t('dealers.btn_directions')}</span>
                  <NavigationIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm bg-slate-50 rounded-lg border border-dashed border-neutral-border">
            {t('dealers.empty')}
          </div>
        )}

        {/* Dealer Registration Banner */}
        <div className="mt-16 bg-primary-indigo rounded-lg p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-primary-indigo relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold text-accent-cotton">
              {t('dealers.partner_eyebrow')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('dealers.partner_title')}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t('dealers.partner_desc')}
            </p>
          </div>

          <a
            href="#lien-he"
            className="inline-flex items-center justify-center gap-2 bg-accent-pink hover:bg-accent-hover text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shrink-0 hover:translate-y-[-1px]"
          >
            <span>{t('dealers.partner_btn')}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

