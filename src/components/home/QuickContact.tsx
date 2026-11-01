'use client';

import React, { useState } from 'react';
import { useI18n } from '../../i18n/LanguageContext';
import { PhoneIcon, BuildingIcon, MailIcon, CheckIcon, SendIcon } from '../ui/Icons';

export default function QuickContact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    requestType: 'tu-van',
    address: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <section id="lien-he" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-3 py-1 rounded-full">
              {t('contact.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-indigo tracking-tight">
              {t('contact.title')}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-neutral-border">
                <div className="p-2.5 rounded-lg bg-accent-pink/10 text-accent-pink shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-sm text-primary-indigo block">{t('contact.hotline_title')}</strong>
                  <a href={`tel:${t('common.hotline_number').replace(/\s+/g, '')}`} className="text-lg font-bold text-accent-pink hover:underline">
                    {t('common.hotline_number')}
                  </a>
                  <span className="text-xs text-slate-500 block">{t('contact.hotline_desc')}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-neutral-border">
                <div className="p-2.5 rounded-lg bg-primary-indigo/10 text-primary-indigo shrink-0">
                  <BuildingIcon className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-sm text-primary-indigo block">{t('contact.hq_title')}</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {t('contact.hq_address')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-neutral-border">
                <div className="p-2.5 rounded-lg bg-primary-indigo/10 text-primary-indigo shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-sm text-primary-indigo block">{t('contact.email_title')}</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    contact@ikura.com.vn • kinhdoanh@ikura.com.vn
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg p-8 sm:p-10 border border-neutral-border">
              <h3 className="text-xl font-bold text-primary-indigo mb-2">
                {t('contact.form_title')}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {t('contact.form_subtitle')}
              </p>

              {isSubmitted ? (
                <div className="bg-neutral-bg border border-neutral-border text-primary-indigo p-8 rounded-lg text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary-indigo text-white flex items-center justify-center mx-auto mb-2">
                    <CheckIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-primary-indigo">
                    {t('contact.success_title')}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                    {t('contact.success_desc')} ({formData.fullName} - {formData.phone}).
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', phone: '', requestType: 'tu-van', address: '', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 bg-primary-indigo text-white rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors"
                  >
                    {t('contact.btn_another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {t('contact.form_name')} <span className="text-accent-pink">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A..."
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-lg border border-neutral-border focus:outline-none focus:border-accent-pink transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {t('contact.form_phone')} <span className="text-accent-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-lg border border-neutral-border focus:outline-none focus:border-accent-pink transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {t('contact.form_type')}
                      </label>
                      <select
                        value={formData.requestType}
                        onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-lg border border-neutral-border focus:outline-none focus:border-accent-pink transition-all text-sm font-medium"
                      >
                        <option value="tu-van">{t('contact.type_consult')}</option>
                        <option value="bao-hanh">{t('contact.type_warranty')}</option>
                        <option value="dai-ly">{t('contact.type_dealer')}</option>
                        <option value="lap-dat">{t('contact.type_install')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {t('contact.form_area')}
                      </label>
                      <input
                        type="text"
                        placeholder="TP.HCM, Hà Nội, Đà Nẵng..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-lg border border-neutral-border focus:outline-none focus:border-accent-pink transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      {t('contact.form_message')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder="..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white px-4 py-3 rounded-lg border border-neutral-border focus:outline-none focus:border-accent-pink transition-all text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent-pink hover:bg-accent-hover text-white font-bold py-3.5 px-6 rounded-md transition-colors text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('contact.form_submit')}</span>
                    <SendIcon className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
