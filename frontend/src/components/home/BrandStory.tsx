'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '../../i18n/LanguageContext';
import { QualityGemIcon, ShieldCheckIcon, HandshakeIcon, LightbulbIcon } from '../ui/Icons';

export default function BrandStory() {
  const { t } = useI18n();

  const coreValues = [
    {
      icon: <QualityGemIcon className="w-5 h-5 text-primary-indigo" />,
      title: t('story.val1_title'),
      description: t('story.val1_desc'),
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-accent-pink" />,
      title: t('story.val2_title'),
      description: t('story.val2_desc'),
    },
    {
      icon: <HandshakeIcon className="w-5 h-5 text-primary-indigo" />,
      title: t('story.val3_title'),
      description: t('story.val3_desc'),
    },
    {
      icon: <LightbulbIcon className="w-5 h-5 text-accent-pink" />,
      title: t('story.val4_title'),
      description: t('story.val4_desc'),
    },
  ];

  return (
    <section id="gioi-thieu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-3 py-1 rounded-full">
            {t('story.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-indigo tracking-tight">
            {t('story.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('story.subtitle')}
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl font-bold text-primary-indigo leading-snug">
              {t('story.journey_title')}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('story.p1')}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('story.p2')}
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div className="border-l-3 border-accent-pink pl-4">
                <span className="text-2xl font-bold text-primary-indigo block">
                  {t('story.stat_years')}
                </span>
                <span className="text-xs text-slate-500">
                  {t('story.stat_years_label')}
                </span>
              </div>
              <div className="border-l-3 border-primary-indigo pl-4">
                <span className="text-2xl font-bold text-primary-indigo block">
                  {t('story.stat_provinces')}
                </span>
                <span className="text-xs text-slate-500">
                  {t('story.stat_provinces_label')}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-lg overflow-hidden border border-neutral-border">
              <Image
                src="/images/hero-kitchen.jpg"
                alt="Không gian bếp Ikura an toàn hiện đại"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-primary-dark/95 rounded-lg">
                <p className="text-sm font-medium italic">
                  &quot;{t('story.quote')}&quot;
                </p>
                <span className="text-xs text-accent-cotton mt-1 block">
                  {t('story.quote_author')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 rounded-lg border border-neutral-border hover:border-primary-indigo transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-neutral-border flex items-center justify-center mb-4">
                {val.icon}
              </div>
              <h4 className="text-base font-bold text-primary-indigo mb-2 group-hover:text-accent-pink transition-colors">
                {val.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
