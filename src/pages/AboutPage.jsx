import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
        <About />
      <Footer />
    </>
  );
}
