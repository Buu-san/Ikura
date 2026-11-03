import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroBanner from '../components/home/HeroBanner';
import BrandStory from '../components/home/BrandStory';
import ProductCatalog from '../components/home/ProductCatalog';
import WarrantyLookup from '../components/home/WarrantyLookup';
import DealerLocator from '../components/home/DealerLocator';
import NewsAndTips from '../components/home/NewsAndTips';
import QuickContact from '../components/home/QuickContact';
import SafetyPopup from '../components/home/SafetyPopup';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Sticky Header with Smart Search & Multilingual Nav */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Kitchen scene and 36M Warranty highlight */}
        <HeroBanner />

        {/* Brand Mission & 4 Core Values */}
        <BrandStory />

        {/* Product Catalog & Full Specification Modals */}
        <ProductCatalog />

        {/* Interactive Electronic Warranty Lookup */}
        <WarrantyLookup />

        {/* Nationwide Dealer Network & Showroom Locator */}
        <DealerLocator />

        {/* Kitchen Gas Safety Tips & News */}
        <NewsAndTips />

        {/* Contact, Booking & Dealer Inquiry Form */}
        <QuickContact />
      </main>

      {/* Floating Promotion & Safety Alert Popup */}
      <SafetyPopup />

      {/* Comprehensive Official Footer */}
      <Footer />
    </div>
  );
}
