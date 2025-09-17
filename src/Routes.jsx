import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import HealthDashboard from './pages/health-dashboard';
import MedicalReportAnalysis from './pages/medical-report-analysis';
import UserRegistration from './pages/user-registration';
import SymptomChecker from './pages/symptom-checker';
import EmergencyResponse from './pages/emergency-response';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmergencyResponse />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/health-dashboard" element={<HealthDashboard />} />
        <Route path="/medical-report-analysis" element={<MedicalReportAnalysis />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/emergency-response" element={<EmergencyResponse />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
