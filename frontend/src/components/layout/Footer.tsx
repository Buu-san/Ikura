'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '../../i18n/LanguageContext';
import { ShieldCheckIcon, FlameIcon, QualityGemIcon } from '../ui/Icons';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary-dark text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-primary-indigo">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-12 w-44">
              <Image
                src="/logo/ikura_logo.png"
                alt="Ikura Kitchen Appliances"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              <strong className="text-white">{t('common.brand_name')}</strong> — {t('footer.brand_desc')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-surface-indigo px-3 py-1.5 rounded-md text-white font-medium">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-accent-pink" />
                <span>{t('footer.badge_warranty')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-surface-indigo px-3 py-1.5 rounded-md text-white font-medium">
                <FlameIcon className="w-3.5 h-3.5 text-accent-pink" />
                <span>{t('footer.badge_ffd')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-surface-indigo px-3 py-1.5 rounded-md text-white font-medium">
                <QualityGemIcon className="w-3.5 h-3.5 text-accent-pink" />
                <span>{t('footer.badge_qcvn')}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Danh Mục Sản Phẩm */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm border-l-2 border-accent-pink pl-2.5">
              {t('footer.col_products')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#san-pham" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_built_in')}
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_infrared')}
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_tabletop')}
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_valve')}
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_accessories')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dịch Vụ & Bảo Hành */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm border-l-2 border-accent-pink pl-2.5">
              {t('footer.col_services')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#bao-hanh" className="hover:text-accent-pink transition-colors font-medium text-accent-cotton">
                  {t('footer.link_warranty_check')}
                </a>
              </li>
              <li>
                <a href="#bao-hanh" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_warranty_policy')}
                </a>
              </li>
              <li>
                <a href="#lien-he" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_installation')}
                </a>
              </li>
              <li>
                <a href="#dai-ly" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_service_centers')}
                </a>
              </li>
              <li>
                <a href="#dai-ly" className="hover:text-accent-pink transition-colors">
                  {t('footer.link_dealers_policy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Liên Hệ & Hotline */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm border-l-2 border-accent-pink pl-2.5">
              {t('footer.col_hotline')}
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">{t('footer.hotline_tech')}</span>
                <a
                  href={`tel:${t('common.hotline_number').replace(/\s+/g, '')}`}
                  className="text-lg font-bold text-accent-pink hover:underline"
                >
                  {t('common.hotline_number')}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{t('footer.hotline_sales')}</span>
                <a
                  href="tel:02839206868"
                  className="font-medium text-white hover:text-accent-pink"
                >
                  028 3920 6868
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{t('footer.email_label')}</span>
                <span className="text-slate-300">support@ikura.com.vn</span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-slate-400 block">{t('footer.hq_label')}</span>
                <span className="text-xs text-slate-300">
                  {t('contact.hq_address')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <a href="#gioi-thieu" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#gioi-thieu" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
            <a href="#dai-ly" className="hover:text-white transition-colors">
              {t('footer.partners')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
