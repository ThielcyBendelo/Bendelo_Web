import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Skills from "../components/Skills";
import GoogleAnalyticsTracker from "../components/Analytics";

export default function SkillsPage() {
  return (
    <>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <Skills />
    </>
  );
}
