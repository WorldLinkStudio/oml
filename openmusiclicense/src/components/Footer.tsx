import { type FC } from "react";
import { Link } from "react-router-dom";
import { useBotDetectionContext } from "../context/BotDetectionContext";

export const Footer: FC = () => {
  const { isBot, botKind, isLoading } = useBotDetectionContext();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Open Music License</h3>
          <p>
            A fair, transparent, and enforceable open-source license framework
            for music production assets.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#aaa" }}>
            Created by{" "}
            <a
              href="https://worldlinkstudio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              World Link Studio
            </a>
          </p>
          {!isLoading && (
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#666" }}>
              {isBot ? `🤖 Bot detected: ${botKind || 'unknown'}` : '👤 Human visitor'}
            </p>
          )}
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/WorldLinkStudio/oml"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("faq")}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: 0,
                  font: "inherit",
                }}
              >
                FAQ
              </button>
            </li>
            <li>
              <a
                href="https://github.com/WorldLinkStudio/oml"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>License Types</h4>
          <ul className="footer-links">
            <li>
              <Link to="/licenses/oml-p">OML-P (Personal)</Link>
            </li>
            <li>
              <Link to="/licenses/oml-c">OML-C (Commercial)</Link>
            </li>
            <li>
              <Link to="/licenses/oml-s">OML-S (Sync)</Link>
            </li>
            <li>
              <Link to="/licenses/oml-f">OML-F (Free/Open Source)</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li>
              <Link to="/execution-agreement">
                License Execution Agreement Form
              </Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <a href="mailto:support@worldlinkstudio.com">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Open Music License.</p>
      </div>
    </footer>
  );
};
