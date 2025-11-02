import React from "react";

const steps = [
  {
    number: 1,
    title: "Choose Your License",
    description:
      "Use our interactive selector to find the perfect license for your project. Answer a few simple questions about your use case.",
    icon: "🎯",
  },
  {
    number: 2,
    title: "Fill in Details",
    description:
      "Provide information about your project, expected revenue, and creator details. We'll customize your license accordingly.",
    icon: "✍️",
  },
  {
    number: 3,
    title: "Generate License",
    description:
      "We generate a customized license file with all your information filled in and ready to use.",
    icon: "⚡",
  },
  {
    number: 4,
    title: "Download & Use",
    description:
      "Download your license file and attribution template. Include them with your music assets and start sharing!",
    icon: "📥",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-description">
          Get your license in just a few simple steps.
        </p>

        <div className="how-it-works-steps">
          {steps.map((step) => (
            <div key={step.number} className="how-it-works-step">
              <div className="step-icon-wrapper">
                <span className="step-icon" aria-hidden="true">
                  {step.icon}
                </span>
              </div>
              <h3 className="step-title">
                {step.number}. {step.title}
              </h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
