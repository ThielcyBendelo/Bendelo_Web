import NavbarSecured from '../components/NavbarSecured';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import GoogleAnalyticsTracker from "../components/Analytics"; 
import FAQSection from '../components/FAQSection';
import ProcessSection from '../components/ProcessSection';
import PortfolioSection from '../components/PortfolioSection';
import TechnologiesSection from '../components/TechnologiesSection';
// import Testimonials from '../components/Testimonials';
// import TeamSection from '../components/TeamSection';




export default function Home() {
  return (
    <>
      <NavbarSecured />
        <GoogleAnalyticsTracker /> 
        <Hero />
        <PortfolioSection/>
        <TechnologiesSection/>
        <ProcessSection />
        {/* <TeamSection/> */}
        {/* <Testimonials/> */}
        <FAQSection />
    
      <Footer />
    </>
  );
}
