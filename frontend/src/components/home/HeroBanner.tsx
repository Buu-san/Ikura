'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '../../i18n/LanguageContext';
import { FlameIcon, BoltIcon, ShieldCheckIcon, SearchIcon, ArrowRightIcon } from '../ui/Icons';

interface HeroBannerProps {
  onOpenWarrantyModal?: () => void;
}

export default function HeroBanner({ onOpenWarrantyModal }: HeroBannerProps) {
  const { t } = useI18n();

  return (
    <section className="relative w-full bg-primary-dark overflow-hidden text-white min-h-[560px] lg:min-h-[620px] flex items-center border-b border-primary-indigo">
      {/* Background Hero Image with Solid Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-kitchen.jpg"
          alt="Căn bếp hiện đại Ikura"
          fill
          priority
          className="object-cover object-center opacity-30 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-surface-indigo px-3.5 py-1.5 rounded-md text-xs text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-pink"></span>
            <span className="font-semibold text-white">
              {t('hero.eyebrow')}
            </span>
          </div>

          {/* Main Headline: Solid, High-Contrast Typography without cheesy accents */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {t('hero.title_part1')}{t('hero.title_highlight')}{t('hero.title_part2')}
          </h1>

          {/* Subtitle */}
          <p className="text-base text-slate-300 leading-relaxed max-w-xl">
            {t('hero.subtitle')}
          </p>

          {/* Key Feature Bullets with SVG Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-3 bg-surface-indigo p-3.5 rounded-lg">
              <div className="p-1.5 rounded bg-accent-pink/20 text-accent-pink">
                <ShieldCheckIcon className="w-4 h-4 text-accent-pink" />
              </div>
              <div>
                <strong className="block text-white font-semibold">{t('hero.badge_ffd')}</strong>
                <span className="text-slate-400 text-[11px]">{t('hero.badge_ffd_desc')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-surface-indigo p-3.5 rounded-lg">
              <div className="p-1.5 rounded bg-accent-cotton/20 text-accent-cotton">
                <FlameIcon className="w-4 h-4 text-accent-cotton" />
              </div>
              <div>
                <strong className="block text-white font-semibold">{t('hero.badge_flame')}</strong>
                <span className="text-slate-400 text-[11px]">{t('hero.badge_flame_desc')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-surface-indigo p-3.5 rounded-lg">
              <div className="p-1.5 rounded bg-white/10 text-white">
                <BoltIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <strong className="block text-white font-semibold">{t('hero.badge_warranty')}</strong>
                <span className="text-slate-400 text-[11px]">{t('hero.badge_warranty_desc')}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <a
              href="#san-pham"
              className="inline-flex items-center justify-center gap-2 bg-accent-pink hover:bg-accent-hover text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors cursor-pointer"
            >
              <span>{t('hero.cta_products')}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>

            <a
              href="#bao-hanh"
              onClick={onOpenWarrantyModal}
              className="inline-flex items-center justify-center gap-2 bg-surface-indigo hover:bg-primary-indigo text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors cursor-pointer"
            >
              <SearchIcon className="w-4 h-4 text-slate-300" />
              <span>{t('hero.cta_warranty')}</span>
            </a>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 pt-8 border-t border-primary-indigo grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-accent-pink">
              {t('hero.stat_families')}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t('hero.stat_families_label')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {t('hero.stat_dealers')}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t('hero.stat_dealers_label')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-accent-cotton">
              {t('hero.stat_warranty_time')}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t('hero.stat_warranty_label')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {t('hero.stat_safety')}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t('hero.stat_safety_label')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
