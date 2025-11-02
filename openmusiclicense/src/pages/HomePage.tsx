import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { LicenseComparison } from '../components/LicenseComparison';
import { LicenseSelector } from '../components/LicenseSelector';
import { FAQAccordion } from '../components/FAQAccordion';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <LicenseComparison />
      <ErrorBoundary>
        <LicenseSelector />
      </ErrorBoundary>
      <FAQAccordion />
    </>
  );
};

