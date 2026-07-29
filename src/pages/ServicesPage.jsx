import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Services from "../components/Services";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';

export default function ServicesPage() {
  return (
    <>
    <PageTransition>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <Services />
      </PageTransition>
    </>
  );
}
