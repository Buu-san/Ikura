'use client';

import React from 'react';
import Image from 'next/image';
import { NEWS_DATA } from '../../data/mockData';
import { useI18n } from '../../i18n/LanguageContext';
import { AlertTriangleIcon, CalendarIcon, ClockIcon } from '../ui/Icons';

export default function NewsAndTips() {
  const { t } = useI18n();

  const safetyRules = [
    { title: t('news.rule1_title'), desc: t('news.rule1_desc') },
    { title: t('news.rule2_title'), desc: t('news.rule2_desc') },
    { title: t('news.rule3_title'), desc: t('news.rule3_desc') },
    { title: t('news.rule4_title'), desc: t('news.rule4_desc') },
  ];

  return (
    <section id="tin-tuc" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-3 py-1 rounded-full">
            {t('news.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-indigo tracking-tight">
            {t('news.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('news.subtitle')}
          </p>
        </div>

        {/* Safety Callout Box: 4 Urgent Safety Rules */}
        <div className="mb-14 bg-white border border-neutral-border rounded-lg p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-1.5 rounded-md bg-accent-pink/15 text-accent-pink">
              <AlertTriangleIcon className="w-5 h-5 shrink-0" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary-indigo">
              {t('news.safety_box_title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {safetyRules.map((rule, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-neutral-border">
                <span className="text-xs font-bold text-accent-pink block mb-1">
                  0{idx + 1}
                </span>
                <strong className="text-xs sm:text-sm text-primary-indigo block mb-1">
                  {rule.title}
                </strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-lg overflow-hidden border border-neutral-border hover:border-primary-indigo transition-colors flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary-indigo text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  {news.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{news.date}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>{news.readTime}</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-primary-indigo group-hover:text-accent-pink transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {news.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent-pink group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t('news.read_more')}
                    <span>→</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
