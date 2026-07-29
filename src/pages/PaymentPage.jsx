import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import PaymentManagement from "../dashboard/pages/PaymentManagement";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import PageTransition from '../components/PageTransition';

export default function PaymentPage() {
  return (
    <>
    <PageTransition>
      <NavbarSecured />
      <GoogleAnalyticsTracker /> 
      <PaymentManagement />
      </PageTransition>
    </>
  );
}
