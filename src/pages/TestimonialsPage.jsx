 import NavbarSecured from "../components/NavbarSecured";
import TestimonialsSection from "../components/TestimonialsSection";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";

export default function TestimonialsPage() {
  return (
    <>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <TestimonialsSection />
      <Footer />
    </>
  );
}
