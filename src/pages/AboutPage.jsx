import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';
import About from "../components/About";

export default function AboutPage() {
  return (
    <>
     <PageTransition>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
        <About />
            </PageTransition>

    </>
  );
}
