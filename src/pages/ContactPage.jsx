
import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import Contact from "../components/Contact";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';

export default function ContactPage() {
  return (
    <>
     <PageTransition>
      <NavbarSecured />
        <Contact />
         </PageTransition>
    </>
  );
}
