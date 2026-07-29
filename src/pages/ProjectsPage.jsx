import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import ProjetSimple from "../components/ProjetSimple";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';

export default function ProjectsPage() {
  return (
    <>
    <PageTransition>
  <NavbarSecured />
  <GoogleAnalyticsTracker /> 
  <ProjetSimple />
  </PageTransition>
    </>
  );
}
