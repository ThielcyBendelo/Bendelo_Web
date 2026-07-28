import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import PaymentManagement from "../dashboard/pages/PaymentManagement";
import GoogleAnalyticsTracker from "../components/Analytics"; 

export default function PaymentPage() {
  return (
    <>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <PaymentManagement />
    </>
  );
}
