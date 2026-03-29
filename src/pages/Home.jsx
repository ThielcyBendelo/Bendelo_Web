import NavbarSecured from '../components/NavbarSecured';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import ProcessSection from '../components/ProcessSection';
// import PortfolioSection from '../components/PortfolioSection';
import TechnologiesSection from '../components/TechnologiesSection';
// import Testimonials from '../components/Testimonials';
// import TeamSection from '../components/TeamSection';




export default function Home() {
  return (
    <>
      <NavbarSecured />
      <div className="mt-5">
        <Hero />
        {/* <PortfolioSection/> */}
        <TechnologiesSection/>
        <ProcessSection />
        {/* <TeamSection/> */}
        {/* <Testimonials/> */}
        <FAQSection />
      </div>
      <Footer />
    </>
  );
}
