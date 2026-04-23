import React from "react"; 
import NavbarSecured from "../components/NavbarSecured";
import Work from "../components/Work";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";

export default function WorkPage() {
  return (
    <>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <Work />
      <Footer />
    </>
  );
}
