import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: October 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            World Link Studio ("we," "our," or "us") operates the Open Music License website 
            and services. This Privacy Policy explains how we collect, use, disclose, and 
            safeguard your information when you use our Service.
          </p>
          <p>
            We are committed to protecting your privacy and handling your data transparently 
            and responsibly.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>Information You Provide</h3>
          <p>When you use our license generation tools, you may provide:</p>
          <ul>
            <li>Name and contact information (for license documents)</li>
            <li>Musical work details (titles, descriptions)</li>
            <li>Project information</li>
            <li>Payment information (for commercial licenses)</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent</li>
            <li>Referring website addresses</li>
          </ul>

          <h3>Local Storage</h3>
          <p>
            Our license generation tool stores your form data locally in your browser to 
            preserve your work. This data remains on your device and is not transmitted to 
            our servers unless you explicitly choose to generate and download a license.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Generate and customize license documents</li>
            <li>Provide, maintain, and improve our Service</li>
            <li>Respond to your requests and support needs</li>
            <li>Send you updates about the OML framework (with your consent)</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share information in the following circumstances:</p>
          
          <h3>With Your Consent</h3>
          <p>We may share information when you explicitly consent to such sharing.</p>

          <h3>Service Providers</h3>
          <p>
            We may share information with third-party service providers who perform services 
            on our behalf, such as hosting, analytics, and payment processing. These providers 
            are bound by confidentiality agreements.
          </p>

          <h3>Legal Requirements</h3>
          <p>
            We may disclose information if required by law or in response to valid legal 
            requests from government authorities.
          </p>

          <h3>Business Transfers</h3>
          <p>
            If we are involved in a merger, acquisition, or asset sale, your information may 
            be transferred as part of that transaction.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect 
            your information against unauthorized access, alteration, disclosure, or destruction. 
            However, no method of transmission over the Internet or electronic storage is 100% 
            secure.
          </p>
        </section>

        <section>
          <h2>6. Data Retention</h2>
          <p>
            We retain your information only for as long as necessary to fulfill the purposes 
            outlined in this Privacy Policy, unless a longer retention period is required or 
            permitted by law.
          </p>
          <p>
            Information stored locally in your browser remains until you clear your browser 
            storage or delete it manually.
          </p>
        </section>

        <section>
          <h2>7. Your Rights and Choices</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your information</li>
            <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
            <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
          </ul>
          <p>
            To exercise these rights, contact us at{' '}
            <a href="mailto:support@worldlinkstudio.com">support@worldlinkstudio.com</a>
          </p>
        </section>

        <section>
          <h2>8. Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to enhance your experience. 
            Cookies are small data files stored on your device. You can configure your browser 
            to refuse cookies, but this may limit some features of our Service.
          </p>
          <p>Types of cookies we may use:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the Service to function</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Service</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
        </section>

        <section>
          <h2>9. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We are not responsible for 
            the privacy practices of these external sites. We encourage you to review their 
            privacy policies.
          </p>
        </section>

        <section>
          <h2>10. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If you believe we have collected 
            information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your 
            country of residence. We ensure appropriate safeguards are in place to protect your 
            information in accordance with this Privacy Policy.
          </p>
        </section>

        <section>
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            material changes by posting the new policy on this page and updating the "Last 
            Updated" date. Your continued use of the Service after changes constitutes acceptance 
            of the updated policy.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, 
            please contact:
          </p>
          <p>
            <strong>World Link Studio</strong><br />
            Email: <a href="mailto:support@worldlinkstudio.com">support@worldlinkstudio.com</a>
          </p>
        </section>

        <div className="legal-footer">
          <p>
            By using the Open Music License Service, you acknowledge that you have read and 
            understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

