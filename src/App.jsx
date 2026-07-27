import React, { Suspense } from 'react';
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
import Hero from './components/Hero';
import Footer from './components/Footer';
import FAQSection from './components/FAQSection';
import ProcessSection from './components/ProcessSection';
import ClientDashboard from './pages/ClientDashboard';

// Dashboard admin imports
import {
  Login,
  AdminHome,
  Clients,
  Subscribers,
  PaymentManagement,
  InvoiceManagement,
  Analytics,
  Projects,
  Messaging,
  Profile,
  ProtectedRoute,
} from './dashboard';
import FinanceDashboard from './dashboard/FinanceDashboard';
import AdminLayout from './dashboard/components/AdminLayout';

// Layout pour injecter automatiquement l'en-tête et le pied de page sur les pages vitrines publiques
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <NavbarSecured />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  const [splashDone, setSplashDone] = React.useState(false);

  return (
    <ThemeProvider>
      {!splashDone && (
        <ProfessionalSplashScreen onComplete={() => setSplashDone(true)} />
      )}
      {splashDone && (
        <>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
          <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-xs text-slate-500">[loading_modules...]</div>}>
            <GoogleAnalyticsTracker /> 
            <Routes>
              
              {/* --- ENVELOPPE DES ROUTES PUBLIQUES (Avec Navbar & Footer) --- */}
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

              {/* --- PORTAILS D'ACCÈS ISOLÉS (Sans Navbar/Footer standard) --- */}
              <Route path="/paiement" element={<PaymentPage />} />
              <Route path="/clients" element={<ClientRegistrationPage />} />
              <Route path="/login" element={<SecureLogin />} />
              <Route path="/register" element={<SecureRegister />} />

              {/* --- ROUTE SÉCURISÉE DE L'ESPACE CLIENT REVISITÉ --- */}
              <Route 
                path="/client-dashboard" 
                element={
                  <PrivateRoute>
                    <ClientDashboard />
                  </PrivateRoute>
                } 
              />

              {/* --- ROUTES DE L'ADMINISTRATION AVEC LAYOUT ADMIN COMPLEXE --- */}
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

              {/* Route catch-all de sécurité pour rediriger les chemins inconnus */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
