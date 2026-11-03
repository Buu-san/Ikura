'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../types/ikura';
import { PRODUCTS_DATA } from '../../data/mockData';
import { useI18n } from '../../i18n/LanguageContext';
import { CheckIcon, ShieldCheckIcon } from '../ui/Icons';

export default function ProductCatalog() {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: t('products.cat_all') },
    { id: 'bep-ga-am', label: t('products.cat_built_in') },
    { id: 'bep-hong-ngoai', label: t('products.cat_infrared') },
    { id: 'bep-ga-duong', label: t('products.cat_tabletop') },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  const formatCurrency = (val: number) => {
    const locale = language === 'en' ? 'en-US' : language === 'km' ? 'km-KH' : 'vi-VN';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: language === 'en' ? 'USD' : 'VND',
      maximumFractionDigits: language === 'en' ? 0 : 0,
    }).format(language === 'en' ? Math.round(val / 25400) : val);
  };

  return (
    <section id="san-pham" className="py-20 bg-neutral-bg border-t border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-3 py-1 rounded-full">
            {t('products.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-indigo tracking-tight">
            {t('products.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('products.subtitle')}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-primary-indigo text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-neutral-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-neutral-border hover:border-primary-indigo transition-colors flex flex-col justify-between group"
            >
              {/* Product Image & Badges */}
              <div className="relative h-56 w-full bg-slate-100 p-4 overflow-hidden border-b border-neutral-border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <span className="bg-primary-indigo text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {t('products.warranty_label')} {product.specs.warrantyMonths} {t('products.warranty_suffix')}
                  </span>
                  {product.isBestseller && (
                    <span className="bg-accent-pink text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {t('products.bestseller')}
                    </span>
                  )}
                </div>

                {product.specs.safetyCutoff && (
                  <div className="absolute bottom-3 right-3 bg-primary-indigo text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheckIcon className="w-3 h-3 text-accent-cotton" />
                    <span>{t('products.auto_cutoff')}</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">
                    {product.categoryLabel} • {product.sku}
                  </span>
                  <h3 className="text-base font-bold text-primary-indigo mt-1 line-clamp-2 group-hover:text-accent-pink transition-colors">
                    {product.name}
                  </h3>

                  {/* Quick Specs Pills */}
                  <div className="mt-3 space-y-1.5 text-xs text-text-muted bg-slate-50 p-3 rounded-lg border border-neutral-border">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('products.burners')}</span>
                      <strong className="text-slate-800">{product.specs.burnersCount}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('products.burner_head')}</span>
                      <strong className="text-slate-800 truncate max-w-[140px] text-right" title={product.specs.burnerMaterial}>
                        {product.specs.burnerMaterial}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('products.cutout')}</span>
                      <strong className="text-accent-pink font-semibold">{product.specs.cutoutDimension}</strong>
                    </div>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-2 border-t border-neutral-border space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold text-accent-pink">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full text-center py-2 px-3 text-xs font-medium text-primary-indigo bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                    >
                      {t('products.btn_spec')}
                    </button>
                    <a
                      href="#lien-he"
                      className="w-full text-center py-2 px-3 text-xs font-semibold text-white bg-accent-pink hover:bg-accent-hover rounded transition-colors"
                    >
                      {t('products.btn_order')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Bảng Thông Số Kỹ Thuật Chi Tiết */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] relative border-2 border-primary-indigo">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-primary-indigo hover:bg-slate-100 h-8 w-8 rounded flex items-center justify-center transition-colors cursor-pointer"
                aria-label={t('common.close')}
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-neutral-border">
                <div className="relative h-32 w-32 sm:h-40 sm:w-40 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-neutral-border">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-accent-pink">
                    {t('products.modal_eyebrow')}
                  </span>
                  <h3 className="text-xl font-bold text-primary-indigo mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t('products.modal_sku')} <strong>{selectedProduct.sku}</strong>
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              {/* Specification Table */}
              <div className="py-4 space-y-3">
                <h4 className="text-sm font-bold text-primary-indigo">
                  {t('products.modal_spec_title')}
                </h4>
                <div className="border border-neutral-border rounded-lg overflow-hidden text-xs">
                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-2 p-3 bg-slate-50">
                      <span className="text-slate-600 font-medium">{t('products.spec_glass_dim')}</span>
                      <strong className="text-slate-800">{selectedProduct.specs.glassDimension}</strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-white">
                      <span className="text-slate-600 font-medium">{t('products.spec_cutout_dim')}</span>
                      <strong className="text-accent-pink font-bold">{selectedProduct.specs.cutoutDimension}</strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-slate-50">
                      <span className="text-slate-600 font-medium">{t('products.spec_burners_count')}</span>
                      <strong className="text-slate-800">{selectedProduct.specs.burnersCount}</strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-white">
                      <span className="text-slate-600 font-medium">{t('products.spec_burner_material')}</span>
                      <strong className="text-slate-800">{selectedProduct.specs.burnerMaterial}</strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-slate-50">
                      <span className="text-slate-600 font-medium">{t('products.spec_ignition')}</span>
                      <strong className="text-slate-800">{selectedProduct.specs.ignitionSystem}</strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-white">
                      <span className="text-slate-600 font-medium">{t('products.spec_safety')}</span>
                      <strong className={selectedProduct.specs.safetyCutoff ? 'text-primary-indigo font-bold' : 'text-slate-600'}>
                        {selectedProduct.specs.safetyCutoff ? `✓ ${t('products.auto_cutoff')}` : 'No'}
                      </strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-slate-50">
                      <span className="text-slate-600 font-medium">{t('products.spec_glass_material')}</span>
                      <strong className="text-slate-800">{selectedProduct.specs.glassMaterial}</strong>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-white">
                      <span className="text-slate-600 font-medium">{t('products.spec_warranty')}</span>
                      <strong className="text-primary-indigo font-bold">
                        {selectedProduct.specs.warrantyMonths} {t('products.warranty_suffix')}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Features */}
              <div className="pt-2 pb-6">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">
                  {t('products.features_title')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProduct.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg border border-neutral-border">
                      <CheckIcon className="w-3.5 h-3.5 text-primary-indigo" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-border">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded cursor-pointer transition-colors"
                >
                  {t('common.close')}
                </button>
                <a
                  href="#lien-he"
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-accent-pink hover:bg-accent-hover rounded transition-colors cursor-pointer"
                >
                  {t('products.btn_consult_order')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
