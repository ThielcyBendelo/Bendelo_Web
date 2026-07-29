import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Experience from "../components/Experience";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';

export default function ExperiencePage() {
  return (
    <>
    <PageTransition>
      <NavbarSecured />
      <Experience />
      </PageTransition>
    </>
  );
}
