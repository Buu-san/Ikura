'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n, SupportedLanguage } from '../../i18n/LanguageContext';
import { SearchIcon, ShieldCheckIcon, MapPinIcon, ChevronDownIcon } from '../ui/Icons';

interface NavbarProps {
  onOpenWarrantyModal?: () => void;
}

const SEARCH_SUGGESTIONS = [
  'Bếp ga âm ngắt ga tự động',
  'Bếp ga hồng ngoại IK-990',
  'Bếp ga đôi mặt kính IK-880',
  'Kích thước khoét đá chuẩn',
  'Tra cứu số Serial bảo hành',
  'Đầu đốt đồng thau nguyên khối',
  'Bình ga an toàn & Van điều áp'
];

export default function Navbar({ onOpenWarrantyModal }: NavbarProps) {
  const { language, setLanguage, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_SUGGESTIONS.slice(0, 4);

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'km', label: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-primary-dark text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-pink"></span>
              </span>
              <span>{t('common.hotline_label')}</span>
              <a
                href={`tel:${t('common.hotline_number').replace(/\s+/g, '')}`}
                className="font-bold text-accent-pink hover:underline tracking-wider"
              >
                {t('common.hotline_number')}
              </a>
              <span className="text-[10px] text-accent-cotton bg-surface-indigo px-1.5 py-0.5 rounded font-semibold">
                {t('common.toll_free')}
              </span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/70">
              {t('common.warranty_commitment')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="#dai-ly"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <MapPinIcon className="w-3.5 h-3.5 text-accent-pink" />
              <span>{t('common.dealers_network')}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="#tuyen-dung"
              className="hover:text-white transition-colors"
            >
              {t('common.recruitment')}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-primary-indigo shadow-md py-2.5'
            : 'bg-primary-indigo py-3.5'
        } border-b border-primary-dark`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-10 w-36 sm:h-11 sm:w-40">
              <Image
                src="/logo/ikura_logo.png"
                alt="Ikura Kitchen Appliances"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Smart Search Bar */}
          <div
            ref={searchRef}
            className="relative hidden lg:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                id="header-smart-search"
                type="text"
                placeholder={t('nav.search_placeholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-surface-indigo text-white placeholder-slate-300 text-sm rounded-md pl-9 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-accent-pink transition-colors"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-300" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Auto-suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-primary-dark border border-primary-indigo rounded-lg shadow-2xl p-3 z-50 text-xs">
                <div className="text-slate-400 font-semibold mb-2 px-2 flex items-center justify-between">
                  <span>{t('nav.search_suggestions_title')}</span>
                  <span className="text-[10px] text-accent-cotton">{t('nav.search_engine_name')}</span>
                </div>
                <div className="space-y-1">
                  {filteredSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 hover:text-accent-pink transition-colors flex items-center gap-2"
                    >
                      <SearchIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-200">
            <a
              href="#san-pham"
              className="hover:text-accent-pink transition-colors"
            >
              {t('nav.products')}
            </a>
            <a
              href="#gioi-thieu"
              className="hover:text-accent-pink transition-colors"
            >
              {t('nav.about')}
            </a>
            <a
              href="#bao-hanh"
              className="hover:text-accent-pink transition-colors flex items-center gap-1.5"
            >
              <span>{t('nav.warranty')}</span>
              <span className="text-[10px] bg-accent-pink text-white px-1.5 py-0.2 rounded font-bold">
                {t('nav.warranty_badge')}
              </span>
            </a>
            <a
              href="#dai-ly"
              className="hover:text-accent-pink transition-colors"
            >
              {t('nav.dealers')}
            </a>
            <a
              href="#tin-tuc"
              className="hover:text-accent-pink transition-colors"
            >
              {t('nav.news')}
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                id="lang-selector-button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-surface-indigo hover:bg-primary-dark text-white text-xs px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                <span>
                  {languages.find((l) => l.code === language)?.flag}
                </span>
                <span className="font-semibold uppercase">{language}</span>
                <ChevronDownIcon className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-primary-dark border border-primary-indigo rounded-lg shadow-2xl py-1 z-50 text-xs">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors ${
                        language === lang.code
                          ? 'text-accent-pink font-bold bg-white/5'
                          : 'text-slate-200'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action: Tra Cứu Bảo Hành */}
            <a
              href="#bao-hanh"
              onClick={onOpenWarrantyModal}
              className="hidden sm:inline-flex items-center gap-2 bg-accent-pink hover:bg-accent-hover text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
            >
              <ShieldCheckIcon className="w-4 h-4 text-white" />
              <span>{t('nav.warranty_cta')}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-primary-dark border-t border-primary-indigo px-4 py-4 space-y-3 text-sm text-slate-200">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder={t('nav.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-indigo text-white placeholder-slate-400 text-xs rounded-md pl-9 pr-3 py-2 focus:outline-none"
              />
              <SearchIcon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>
            <a
              href="#san-pham"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-accent-pink border-b border-primary-indigo"
            >
              {t('nav.products')}
            </a>
            <a
              href="#gioi-thieu"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-accent-pink border-b border-primary-indigo"
            >
              {t('nav.about')}
            </a>
            <a
              href="#bao-hanh"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-accent-pink border-b border-primary-indigo flex items-center justify-between"
            >
              <span>{t('nav.warranty')}</span>
              <span className="bg-accent-pink text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {t('nav.warranty_badge')}
              </span>
            </a>
            <a
              href="#dai-ly"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-accent-pink border-b border-primary-indigo"
            >
              {t('nav.dealers')}
            </a>
            <a
              href="#tin-tuc"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-accent-pink border-b border-primary-indigo"
            >
              {t('nav.news')}
            </a>
            <a
              href="#lien-he"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-accent-pink"
            >
              {t('common.consultation')}
            </a>

            <div className="pt-2">
              <a
                href="#bao-hanh"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWarrantyModal?.();
                }}
                className="w-full flex items-center justify-center gap-2 bg-accent-pink text-white py-2.5 rounded-lg font-medium text-xs"
              >
                <ShieldCheckIcon className="w-4 h-4 text-white" />
                <span>{t('nav.warranty_cta')}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
