import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Services from "../components/Services";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";

export default function ServicesPage() {
  return (
    <>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <Services />
      <Footer />
    </>
  );
}
