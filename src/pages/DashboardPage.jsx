import React from "react";
import NavbarSecured from "../components/NavbarSecured";
import AdminLayout from "../dashboard/components/AdminLayout";
import GoogleAnalyticsTracker from "../components/Analytics"; 
import Footer from "../components/Footer";
import PageTransition from '../components/PageTransition';

export default function DashboardPage() {
  return (
    <>
    <PageTransition>
      <NavbarSecured />
      <AdminLayout />
      <Footer />
      </PageTransition>
    </>
  );
}
