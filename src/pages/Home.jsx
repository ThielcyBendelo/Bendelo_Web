import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import ProcessSection from '../components/ProcessSection';


export default function Home() {
  return (
    <>
      <NavbarSecured />
      <div className="mt-24">
        <Hero />
        <ProcessSection />
        <FAQSection />
      </div>
      <Footer />
    </>
  );
}
