import React from "react"; 
import NavbarSecured from "../components/NavbarSecured";
import Work from "../components/Work";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';

export default function WorkPage() {
  return (
    <>
    <PageTransition>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <Work />
      </PageTransition>
    </>
  );
}
