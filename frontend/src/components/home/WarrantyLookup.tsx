'use client';

import React, { useState } from 'react';
import { WarrantyRecord } from '../../types/ikura';
import { WARRANTY_DEMO_RECORDS } from '../../data/mockData';
import { useI18n } from '../../i18n/LanguageContext';
import { SearchIcon, CalendarIcon, AlertTriangleIcon, CheckIcon } from '../ui/Icons';

export default function WarrantyLookup() {
  const { t } = useI18n();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<WarrantyRecord | null | 'NOT_FOUND'>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    const found = WARRANTY_DEMO_RECORDS.find(
      (r) =>
        r.serialNumber.toUpperCase() === query ||
        r.phoneNumber.replace(/\s+/g, '') === query.replace(/\s+/g, '')
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult('NOT_FOUND');
    }
  };

  const handleQuickFill = (val: string) => {
    setSearchInput(val);
    const found = WARRANTY_DEMO_RECORDS.find(
      (r) => r.serialNumber === val || r.phoneNumber === val
    );
    if (found) {
      setSearchResult(found);
    }
  };

  const steps = [
    {
      step: '01',
      title: t('warranty.step1_title'),
      desc: t('warranty.step1_desc'),
    },
    {
      step: '02',
      title: t('warranty.step2_title'),
      desc: t('warranty.step2_desc'),
    },
    {
      step: '03',
      title: t('warranty.step3_title'),
      desc: t('warranty.step3_desc'),
    },
    {
      step: '04',
      title: t('warranty.step4_title'),
      desc: t('warranty.step4_desc'),
    },
  ];

  return (
    <section id="bao-hanh" className="py-20 bg-white border-t border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-3 py-1 rounded-full">
            {t('warranty.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-indigo tracking-tight">
            {t('warranty.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('warranty.subtitle')}
          </p>
        </div>

        {/* Search Box Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 sm:p-8 border border-neutral-border mb-16">
          <form onSubmit={handleSearch} className="space-y-4">
            <label
              htmlFor="warranty-search-input"
              className="block text-xs sm:text-sm font-semibold text-primary-indigo"
            >
              {t('warranty.search_label')}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="warranty-search-input"
                type="text"
                placeholder={t('warranty.search_placeholder')}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-white text-slate-800 text-sm px-4 py-3 rounded-lg border border-neutral-border focus:outline-none focus:border-accent-pink transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-primary-indigo hover:bg-primary-dark text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors shrink-0"
              >
                <SearchIcon className="w-4 h-4 text-white" />
                <span>{t('warranty.btn_search')}</span>
              </button>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-slate-500">
              <span>{t('warranty.quick_demo')}</span>
              <button
                type="button"
                onClick={() => handleQuickFill('IK2024-8899')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded border border-neutral-border transition-colors cursor-pointer"
              >
                Serial: IK2024-8899
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('0901234567')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded border border-neutral-border transition-colors cursor-pointer"
              >
                SĐT: 0901234567
              </button>
            </div>
          </form>

          {/* Search Result Display */}
          {searchResult && searchResult !== 'NOT_FOUND' && (
            <div className="mt-8 pt-6 border-t border-neutral-border">
              <div className="bg-primary-dark text-white p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-primary-indigo">
                  <div>
                    <span className="text-[11px] uppercase tracking-wide text-accent-cotton font-semibold block">
                      {t('warranty.cert_eyebrow')}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {searchResult.productModel}
                    </h3>
                    <span className="text-xs text-slate-300">
                      {t('warranty.serial_label')} <code className="text-accent-pink font-mono font-bold bg-surface-indigo px-1.5 py-0.5 rounded">{searchResult.serialNumber}</code>
                    </span>
                  </div>

                  <div>
                    {searchResult.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1.5 bg-primary-indigo text-white text-xs font-bold px-3 py-1 rounded">
                        <CheckIcon className="w-3.5 h-3.5 text-accent-pink" />
                        {t('warranty.status_active')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-accent-pink text-white text-xs font-bold px-3 py-1 rounded">
                        {t('warranty.status_expired')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">{t('warranty.customer')}</span>
                    <strong className="text-white text-sm">{searchResult.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t('warranty.phone')}</span>
                    <strong className="text-white text-sm">{searchResult.phoneNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t('warranty.purchase_date')}</span>
                    <strong className="text-white text-sm">{searchResult.purchaseDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t('warranty.expiry_date')}</span>
                    <strong className="text-accent-cotton text-sm">{searchResult.expiryDate}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-primary-indigo flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-300">
                    {t('warranty.dealer')} <strong className="text-white">{searchResult.dealerName} ({searchResult.city})</strong>
                  </span>

                  <button
                    onClick={() => setShowBookingForm(!showBookingForm)}
                    className="w-full sm:w-auto px-4 py-2 bg-accent-pink hover:bg-accent-hover text-white font-medium rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CalendarIcon className="w-4 h-4 text-white" />
                    <span>{t('warranty.btn_book_service')}</span>
                  </button>
                </div>
              </div>

              {/* Booking Appointment Sub-Form */}
              {showBookingForm && (
                <div className="mt-4 p-5 bg-white border border-neutral-border rounded-lg space-y-4">
                  <h4 className="text-sm font-bold text-primary-indigo">
                    {t('warranty.booking_title')}
                  </h4>
                  {bookingSuccess ? (
                    <div className="bg-neutral-bg border border-neutral-border text-slate-800 p-4 rounded-lg text-xs flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-primary-indigo" />
                      <div>
                        <strong>{t('warranty.booking_success_title')}</strong>
                        <p className="mt-0.5">{t('warranty.booking_success_desc')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-600 block mb-1">{t('warranty.booking_desc_label')}</label>
                          <input
                            type="text"
                            placeholder={t('warranty.booking_desc_placeholder')}
                            className="w-full bg-white px-3 py-2 border rounded-lg border-neutral-border focus:outline-none focus:border-accent-pink"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1">{t('warranty.booking_time_label')}</label>
                          <input
                            type="text"
                            placeholder={t('warranty.booking_time_placeholder')}
                            className="w-full bg-white px-3 py-2 border rounded-lg border-neutral-border focus:outline-none focus:border-accent-pink"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBookingSuccess(true)}
                        className="px-5 py-2.5 bg-primary-indigo text-white font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                      >
                        {t('warranty.booking_btn_confirm')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {searchResult === 'NOT_FOUND' && (
            <div className="mt-6 p-4 bg-neutral-bg border border-neutral-border rounded-lg text-slate-800 text-xs flex items-start gap-3">
              <AlertTriangleIcon className="w-5 h-5 text-accent-pink shrink-0 mt-0.5" />
              <div>
                <strong>{t('warranty.not_found_title')}</strong>
                <p className="mt-1 text-text-muted">
                  {t('warranty.not_found_desc')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4 Steps Timeline */}
        <div className="mt-12">
          <h3 className="text-center text-xl font-bold text-primary-indigo mb-10">
            {t('warranty.steps_title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-slate-50 p-6 rounded-lg border border-neutral-border relative group"
              >
                <span className="text-2xl font-bold text-primary-indigo/30 block mb-2 font-mono">
                  {st.step}
                </span>
                <h4 className="text-base font-bold text-primary-indigo mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
