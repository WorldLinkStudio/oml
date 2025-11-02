import { Routes, Route } from "react-router-dom";
import { LicenseFormProvider } from "./context/LicenseFormContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ExecutionAgreementPage } from "./pages/ExecutionAgreementPage";
import { LicenseDisplayPage } from "./pages/LicenseDisplayPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <LicenseFormProvider>
        <div className="app">
          <Header />
          <main className="main-content" role="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/execution-agreement"
                element={<ExecutionAgreementPage />}
              />
              <Route
                path="/licenses/:licenseType"
                element={<LicenseDisplayPage />}
              />
              <Route path="/terms" element={<TermsOfUsePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LicenseFormProvider>
    </ErrorBoundary>
  );
}

export default App;
