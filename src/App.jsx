import React, { Suspense, useState } from 'react';
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import GoogleAnalyticsTracker from "./components/Analytics"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blog from './pages/Blog.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage'; 
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import DashboardPage from './pages/DashboardPage';
import PaymentPage from './pages/PaymentPage';
import WorkPage from './pages/WorkPage';
import PrivateRoute from './components/PrivateRoute';
import ClientRegistrationPage from './pages/ClientRegistrationPage';
import ProfessionalSplashScreen from './components/ProfessionalSplashScreen';
import SecureLogin from './components/SecureLogin';
import SecureRegister from './components/SecureRegister';
import OffersPage from './pages/OffersPage';
import NavbarSecured from './components/NavbarSecured';
import Footer from './components/Footer';
import ClientDashboard from './pages/ClientDashboard';
import ScrollToTop from './components/ScrollToTop'; // <-- Ajoutez cet import


// Dashboard admin imports
import {
  AdminHome,
  Clients,
  Subscribers,
  PaymentManagement,
  InvoiceManagement,
  Analytics,
  Projects,
  Messaging,
  Profile,
} from './dashboard';
import FinanceDashboard from './dashboard/FinanceDashboard';
import AdminLayout from './dashboard/components/AdminLayout';

// LAYOUT VITRINE PUBLIC (Fond clair gris-azur, texte bleu de nuit)
const PublicLayout = () => {
  return (

    

    <div className="min-h-screen bg-[rgb(224,233,233)] text-[#0A1128] flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <NavbarSecured />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// COMPOSANT RACINE DE RENDU (Contient la logique interne d'affichage)
const AppContent = () => {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <ProfessionalSplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <Suspense fallback={
        <div className="min-h-screen bg-[rgb(224,233,233)] flex flex-col items-center justify-center font-mono text-xs text-[#0A1128]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span>[chargement_des_donnees_agence...]</span>
        </div>
      }>
        <GoogleAnalyticsTracker /> 

<ScrollToTop /> 

        <Routes>
          
          {/* --- ENVELOPPE DES ROUTES PUBLIQUES --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/blog" element={<Blog />} />
          </Route>

          {/* --- PORTAILS D'ACCÈS ISOLÉS --- */}
          <Route path="/paiement" element={<PaymentPage />} />
          <Route path="/clients" element={<ClientRegistrationPage />} />
          <Route path="/login" element={<SecureLogin />} />
          <Route path="/register" element={<SecureRegister />} />

          {/* --- ESPACE CLIENT SÉCURISÉ --- */}
          <Route 
            path="/client-dashboard" 
            element={
              <PrivateRoute>
                <ClientDashboard />
              </PrivateRoute>
            } 
          />

          {/* --- ROUTES DE L'ADMINISTRATION --- */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="clients" element={<Clients />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="invoices" element={<InvoiceManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="projects" element={<Projects />} />
            <Route path="messages" element={<Messaging />} />
            <Route path="profile" element={<Profile />} />
            <Route path="finance" element={<FinanceDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

// ENTRÉE DE L'APPLICATION ENVERS LES PROVIDERS GLOBAUX
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
