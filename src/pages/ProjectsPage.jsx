import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import ProjetSimple from "../components/ProjetSimple";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";

export default function ProjectsPage() {
  return (
    <>
  <NavbarSecured />
  <GoogleAnalyticsTracker /> 
  <ProjetSimple />
  <Footer />
    </>
  );
}
