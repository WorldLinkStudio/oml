import React from "react";
import { useNavigate } from "react-router-dom";
import "./LegalPage.css";

export const TermsOfUsePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button onClick={() => navigate("/")} className="back-button">
          ← Back to Home
        </button>

        <h1>Terms of Use</h1>
        <p className="last-updated">Last Updated: October 2025</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Open Music License website and services
            ("Service"), you accept and agree to be bound by these Terms of Use.
            If you do not agree to these terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            The Open Music License provides a framework of open-source licenses
            for music production assets, including:
          </p>
          <ul>
            <li>License generation and customization tools</li>
            <li>License text and templates</li>
            <li>Documentation and guidance</li>
            <li>Execution agreement forms</li>
          </ul>
          <p>
            World Link Studio maintains and operates this Service to support
            fair and transparent music licensing.
          </p>
        </section>

        <section>
          <h2>3. License Framework</h2>
          <p>
            The Open Music License framework includes four license types: OML-P
            (Personal), OML-C (Commercial), OML-F (Free/Open Source), and OML-S
            (Sync). Each license is a legally binding agreement between the
            creator and user of musical works.
          </p>
          <p>
            These licenses are provided "as is" for use by music creators and
            users. While we strive for legal accuracy, these licenses do not
            constitute legal advice.
          </p>
        </section>

        <section>
          <h2>4. User Responsibilities</h2>
          <p>When using our Service, you agree to:</p>
          <ul>
            <li>Provide accurate information when generating licenses</li>
            <li>Use the licenses in accordance with their intended purpose</li>
            <li>
              Not misrepresent yourself or your rights to any musical work
            </li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the intellectual property rights of others</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            The Open Music License framework, website design, documentation, and
            related materials are the property of World Link Studio. The license
            templates themselves are provided as open-source tools for public
            use.
          </p>
          <p>
            Musical works licensed under OML remain the property of their
            respective creators, subject to the terms of the applicable license.
          </p>
        </section>

        <section>
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
            EXPRESS OR IMPLIED. We do not warrant that:
          </p>
          <ul>
            <li>The Service will be uninterrupted or error-free</li>
            <li>The licenses will meet all your specific requirements</li>
            <li>The licenses will be enforceable in all jurisdictions</li>
            <li>The Service will be free from viruses or harmful components</li>
          </ul>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, World Link Studio shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses resulting from:
          </p>
          <ul>
            <li>Your use or inability to use the Service</li>
            <li>Any licensing disputes arising from use of OML licenses</li>
            <li>
              Unauthorized access to or alteration of your transmissions or data
            </li>
            <li>Any other matter relating to the Service</li>
          </ul>
        </section>

        <section>
          <h2>8. Not Legal Advice</h2>
          <p>
            The information and licenses provided through this Service do not
            constitute legal advice. For specific legal questions or concerns,
            please consult with a qualified entertainment attorney in your
            jurisdiction.
          </p>
        </section>

        <section>
          <h2>9. Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service
            at any time without notice. We may also update these Terms of Use
            periodically. Continued use of the Service after changes constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with the laws of the United States, without regard to its conflict
            of law provisions.
          </p>
        </section>

        <section>
          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms of Use or the Service, please
            contact:
          </p>
          <p>
            <strong>World Link Studio</strong>
            <br />
            Email:{" "}
            <a href="mailto:support@worldlinkstudio.com">
              support@worldlinkstudio.com
            </a>
          </p>
        </section>

        <section>
          <h2>12. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary, and the remaining provisions shall remain
            in full force and effect.
          </p>
        </section>

        <div className="legal-footer">
          <p>
            By using the Open Music License Service, you acknowledge that you
            have read, understood, and agree to be bound by these Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
};
