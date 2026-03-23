import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import PortfolioSection from '../components/PortfolioSection';
import ProcessSection from '../components/ProcessSection';
import OffersSection from '../components/OffersSection';

export default function Home() {
  return (
    <>
      <NavbarSecured />
      <div className="mt-24">
        <Hero />
        <PortfolioSection />
        <ProcessSection />
        <OffersSection />
        <FAQSection />
      </div>
      <Footer />
    </>
  );
}
