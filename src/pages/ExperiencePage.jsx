import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Experience from "../components/Experience";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";

export default function ExperiencePage() {
  return (
    <>
      <NavbarSecured />
      <Experience />
      <Footer />
    </>
  );
}
