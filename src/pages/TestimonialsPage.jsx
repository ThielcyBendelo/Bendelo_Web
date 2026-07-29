 import NavbarSecured from "../components/NavbarSecured";
import TestimonialsSection from "../components/TestimonialsSection";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";
import PageTransition from '../components/PageTransition';

export default function TestimonialsPage() {
  return (
    <>
     <PageTransition>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <TestimonialsSection />
      <Footer />
      </PageTransition>
    </>
  );
}
