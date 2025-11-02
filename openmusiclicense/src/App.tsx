import React from 'react';
import { LicenseFormProvider } from './context/LicenseFormContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { LicenseComparison } from './components/LicenseComparison';
import { LicenseSelector } from './components/LicenseSelector';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <LicenseFormProvider>
        <div className="app">
          <Header />
          <main className="main-content" role="main">
            <Hero />
            <HowItWorks />
            <LicenseComparison />
            <ErrorBoundary>
              <LicenseSelector />
            </ErrorBoundary>
            <FAQAccordion />
          </main>
          <Footer />
        </div>
      </LicenseFormProvider>
    </ErrorBoundary>
  );
}

export default App;
