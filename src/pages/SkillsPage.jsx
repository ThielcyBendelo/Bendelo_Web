import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Skills from "../components/Skills";
import GoogleAnalyticsTracker from "../components/Analytics";
import PageTransition from '../components/PageTransition';

export default function SkillsPage() {
  return (
    <>
    <PageTransition>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <Skills />
      </PageTransition>
    </>
  );
}
