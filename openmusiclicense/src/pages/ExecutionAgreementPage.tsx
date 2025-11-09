import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Button } from "../components/ui/Button";
import "./ExecutionAgreementPage.css";

interface PaymentScheduleItem {
  paymentNumber: number;
  dueDate: string;
  amount: number;
}

export const ExecutionAgreementPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    licenseType: "",
    creator: "",
    licensee: "",
    workTitle: "",
    creatorArtistName: "",
    workDescription: "",
    duration: "",
    paymentOption: "",
    royaltyRate: "",
    flatFeeAmount: "",
    flatFeeScope: "",
    flatFeeTerm: "perpetual",
    flatFeeTermYears: "",
    flatFeeTermOther: "",
    hybridUpfront: "",
    hybridRoyalty: "",
    paymentPlanEnabled: false,
    paymentPlanTotalAmount: "",
    paymentPlanPerPayment: "",
    paymentPlanFrequency: "",
    paymentPlanStartDate: "",
    paymentMethod: "",
    paymentMethodDetails: "",
    paymentName: "",
    paymentAddress: "",
    paymentEmail: "",
    paymentPhone: "",
    taxId: "",
    intendedUse: "",
    territory: "worldwide",
    territoryCustom: "",
    media: "all",
    mediaCustom: "",
    specialTerms: "",
    creatorSignature: "",
    creatorDate: "",
    creatorPrintedName: "",
    licenseeSignature: "",
    licenseeDate: "",
    licenseePrintedName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Calculate payment schedule
  const calculatePaymentSchedule = (): PaymentScheduleItem[] => {
    if (!formData.paymentPlanEnabled || 
        !formData.paymentPlanTotalAmount || 
        !formData.paymentPlanPerPayment || 
        !formData.paymentPlanFrequency ||
        !formData.paymentPlanStartDate) {
      return [];
    }

    const totalAmount = parseFloat(formData.paymentPlanTotalAmount);
    const perPayment = parseFloat(formData.paymentPlanPerPayment);
    
    if (isNaN(totalAmount) || isNaN(perPayment) || totalAmount <= 0 || perPayment <= 0) {
      return [];
    }

    const numPayments = Math.ceil(totalAmount / perPayment);
    const schedule: PaymentScheduleItem[] = [];
    const startDate = new Date(formData.paymentPlanStartDate);

    // Helper function to add time based on frequency
    const addTimeToDate = (date: Date, paymentNum: number): Date => {
      const newDate = new Date(date);
      switch (formData.paymentPlanFrequency) {
        case "Weekly":
          newDate.setDate(newDate.getDate() + (paymentNum * 7));
          break;
        case "Bi-Weekly":
          newDate.setDate(newDate.getDate() + (paymentNum * 14));
          break;
        case "Monthly":
          newDate.setMonth(newDate.getMonth() + paymentNum);
          break;
        case "Quarterly":
          newDate.setMonth(newDate.getMonth() + (paymentNum * 3));
          break;
        case "Semi-Annually":
          newDate.setMonth(newDate.getMonth() + (paymentNum * 6));
          break;
        case "Annually":
          newDate.setFullYear(newDate.getFullYear() + paymentNum);
          break;
        case "One-Time":
          // One-time payment, no date addition
          break;
      }
      return newDate;
    };

    let remainingAmount = totalAmount;
    
    for (let i = 0; i < numPayments; i++) {
      const isLastPayment = i === numPayments - 1;
      const paymentAmount = isLastPayment 
        ? Math.round(remainingAmount * 100) / 100  // Round to nearest cent
        : Math.round(perPayment * 100) / 100;
      
      const dueDate = addTimeToDate(startDate, i);
      
      schedule.push({
        paymentNumber: i + 1,
        dueDate: dueDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        amount: paymentAmount,
      });
      
      remainingAmount -= paymentAmount;
    }

    return schedule;
  };

  const paymentSchedule = calculatePaymentSchedule();

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const lineHeight = 7;
    let yPos = margin;

    // Helper function to add text with wrapping
    const addText = (text: string, fontSize = 11, isBold = false) => {
      doc.setFontSize(fontSize);
      if (isBold) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }

      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      lines.forEach((line: string) => {
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });
    };

    const addSection = (title: string) => {
      yPos += 3;
      doc.setDrawColor(0);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
      addText(title, 12, true);
      yPos += 2;
    };

    const addField = (label: string, value: string) => {
      if (value) {
        addText(`${label}: ${value}`);
      } else {
        addText(`${label}: _______________________________`);
      }
    };

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("LICENSE EXECUTION AGREEMENT", pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 10;
    
    // License Type
    if (formData.licenseType) {
      doc.setFontSize(12);
      doc.text(`License Type: ${formData.licenseType}`, pageWidth / 2, yPos, {
        align: "center",
      });
      yPos += 10;
    } else {
      yPos += 5;
    }

    // Parties
    addText("This agreement is executed between:", 11, true);
    yPos += 2;
    addField("CREATOR", formData.creator);
    addField("LICENSEE", formData.licensee);
    yPos += 3;
    addText("For the Work described below:", 11, true);

    // Work Information
    addSection("WORK INFORMATION");
    addField("Title", formData.workTitle);
    addField("Creator/Artist Name", formData.creatorArtistName);
    addField("Description", formData.workDescription);
    addField("Duration", formData.duration);

    // Payment Structure
    addSection("PAYMENT STRUCTURE SELECTED");

    if (formData.paymentOption === "percentage") {
      addText("[X] OPTION A: Percentage-Based Royalty", 11, true);
      yPos += 2;
      addField(
        "  Royalty Rate",
        formData.royaltyRate ? `${formData.royaltyRate}% of Net Revenue` : ""
      );
      addText("  Reporting: Quarterly");
      addText("  Minimum threshold: $50 per quarter");
    } else {
      addText("[ ] OPTION A: Percentage-Based Royalty");
    }
    yPos += 2;

    if (formData.paymentOption === "flat-fee") {
      addText("[X] OPTION B: Flat Fee", 11, true);
      yPos += 2;
      addField(
        "  Amount",
        formData.flatFeeAmount ? `$${formData.flatFeeAmount} USD` : ""
      );
      addField("  Scope", formData.flatFeeScope);

      let termText = "  Term: ";
      if (formData.flatFeeTerm === "perpetual") {
        termText += "[X] Perpetual [ ] Years [ ] Other";
      } else if (formData.flatFeeTerm === "years") {
        termText += `[ ] Perpetual [X] ${
          formData.flatFeeTermYears || "___"
        } years [ ] Other`;
      } else if (formData.flatFeeTerm === "other") {
        termText += `[ ] Perpetual [ ] Years [X] Other: ${
          formData.flatFeeTermOther || "___"
        }`;
      }
      addText(termText);
    } else {
      addText("[ ] OPTION B: Flat Fee");
    }
    yPos += 2;

    if (formData.paymentOption === "hybrid") {
      addText("[X] OPTION C: Hybrid", 11, true);
      yPos += 2;
      addField(
        "  Upfront Fee",
        formData.hybridUpfront ? `$${formData.hybridUpfront} USD` : ""
      );
      addField(
        "  Plus Royalty",
        formData.hybridRoyalty
          ? `${formData.hybridRoyalty}% of Net Revenue`
          : ""
      );
      addText("  Reporting: Quarterly");
    } else {
      addText("[ ] OPTION C: Hybrid");
    }

    // Payment Plan
    if (formData.paymentPlanEnabled && paymentSchedule.length > 0) {
      addSection("PAYMENT PLAN");
      addField(
        "Total Amount",
        formData.paymentPlanTotalAmount ? `$${formData.paymentPlanTotalAmount} USD` : ""
      );
      addField(
        "Payment per Period",
        formData.paymentPlanPerPayment ? `$${formData.paymentPlanPerPayment} USD` : ""
      );
      addField("Payment Frequency", formData.paymentPlanFrequency);
      addField("Start Date", formData.paymentPlanStartDate);
      yPos += 3;

      // Payment Schedule Table
      addText("Payment Schedule:", 11, true);
      yPos += 2;

      // Table header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      const colX1 = margin + 10;
      const colX2 = margin + 50;
      const colX3 = margin + 130;
      doc.text("Payment #", colX1, yPos);
      doc.text("Due Date", colX2, yPos);
      doc.text("Amount", colX3, yPos);
      yPos += 5;

      // Table rows
      doc.setFont("helvetica", "normal");
      paymentSchedule.forEach((payment) => {
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(payment.paymentNumber.toString(), colX1, yPos);
        doc.text(payment.dueDate, colX2, yPos);
        doc.text(`$${payment.amount.toFixed(2)}`, colX3, yPos);
        yPos += 6;
      });

      yPos += 3;
    }

    // Payment Details
    addSection("PAYMENT DETAILS");
    addText("Payment Method:", 11, true);
    yPos += 2;

    const methods = [
      { value: "bank-transfer", label: "Bank Transfer" },
      { value: "paypal", label: "PayPal" },
      { value: "check", label: "Check" },
      { value: "other", label: "Other" },
    ];

    methods.forEach((method) => {
      const checked = formData.paymentMethod === method.value ? "[X]" : "[ ]";
      const details =
        formData.paymentMethod === method.value
          ? formData.paymentMethodDetails || "___"
          : "";
      addText(`${checked} ${method.label}${details ? `: ${details}` : ""}`);
    });

    yPos += 3;
    addText("Creator's Payment Information:", 11, true);
    yPos += 2;
    addField("Name", formData.paymentName);
    addField("Address", formData.paymentAddress);
    addField("Email", formData.paymentEmail);
    addField("Phone", formData.paymentPhone);
    addField("Tax ID (if applicable)", formData.taxId);

    // Scope of Use
    addSection("SCOPE OF USE");
    addField("Intended Use", formData.intendedUse);

    const territoryText =
      formData.territory === "worldwide"
        ? "[X] Worldwide"
        : formData.territory === "custom"
        ? `[ ] Worldwide [X] ${formData.territoryCustom || "___"}`
        : "[ ] Worldwide [ ] ___";
    addText(`Territory: ${territoryText}`);

    const mediaText =
      formData.media === "all"
        ? "[X] All Media"
        : formData.media === "custom"
        ? `[ ] All Media [X] ${formData.mediaCustom || "___"}`
        : "[ ] All Media [ ] ___";
    addText(`Media/Platforms: ${mediaText}`);

    addField("Special Terms or Restrictions", formData.specialTerms);

    // Additional Terms
    addSection("ADDITIONAL TERMS");
    addText("Any special provisions, restrictions, or custom terms:");
    if (formData.specialTerms) {
      yPos += 2;
      addText(formData.specialTerms);
    } else {
      addText("_____________________________________________");
    }

    // Signatures
    addSection("SIGNATURES");
    addText(
      "By signing below, both parties agree to all terms of this License and the"
    );
    addText("License Execution Agreement.");
    yPos += 5;

    addText("CREATOR:", 11, true);
    yPos += 2;
    addField("Signature", formData.creatorSignature);
    addField("Date", formData.creatorDate);
    addField("Printed Name", formData.creatorPrintedName);
    yPos += 5;

    addText("LICENSEE:", 11, true);
    yPos += 2;
    addField("Signature", formData.licenseeSignature);
    addField("Date", formData.licenseeDate);
    addField("Printed Name", formData.licenseePrintedName);

    // Footer
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = margin;
    }
    yPos += 10;
    doc.setDrawColor(0);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const footerText =
      "This license enables fair commercial exploitation while ensuring creators receive appropriate compensation for their work. It's designed for the modern music industry where creators use various tools and samples, and licensees need clear, enforceable commercial rights.";
    const footerLines = doc.splitTextToSize(footerText, pageWidth - 2 * margin);
    footerLines.forEach((line: string) => {
      doc.text(line, margin, yPos);
      yPos += 5;
    });

    // Save the PDF
    const fileName = `License-Execution-Agreement-${
      formData.creator || "Form"
    }.pdf`;
    doc.save(fileName);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="execution-agreement-page">
      <div className="agreement-container no-print">
        <div className="agreement-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>License Execution Agreement Form</h1>
          <p className="agreement-subtitle">
            Fill out the form below and download as PDF
          </p>
        </div>
        <div className="agreement-actions">
          <Button variant="primary" onClick={generatePDF}>
            📥 Download as PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            🖨️ Print
          </Button>
        </div>
      </div>

      <div className="agreement-form">
        <div className="form-header">
          <h1>LICENSE EXECUTION AGREEMENT</h1>
        </div>

        <div className="form-section">
          <h2>LICENSE TYPE</h2>
          <div className="form-field">
            <label>
              <strong>Select Open Music License Type:</strong>
            </label>
            <select
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              className="text-input"
            >
              <option value="">-- Select License Type --</option>
              <option value="OML-P">OML-P (Personal - Free for personal projects under $1,000/year)</option>
              <option value="OML-C">OML-C (Commercial - Paid licensing for professional use)</option>
              <option value="OML-S">OML-S (Sync - Special licensing for film, TV, video)</option>
              <option value="OML-F">OML-F (Full Rights - Complete ownership transfer)</option>
            </select>
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <p className="section-intro">
            <strong>This agreement is executed between:</strong>
          </p>

          <div className="form-field">
            <label>
              <strong>CREATOR:</strong>
            </label>
            <input
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              className="text-input"
              placeholder="Enter creator name"
            />
          </div>

          <div className="form-field">
            <label>
              <strong>LICENSEE:</strong>
            </label>
            <input
              type="text"
              name="licensee"
              value={formData.licensee}
              onChange={handleChange}
              className="text-input"
              placeholder="Enter licensee name"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>WORK INFORMATION</h2>

          <div className="form-field">
            <label>
              <strong>Title:</strong>
            </label>
            <input
              type="text"
              name="workTitle"
              value={formData.workTitle}
              onChange={handleChange}
              className="text-input"
              placeholder="Enter work title"
            />
          </div>

          <div className="form-field">
            <label>
              <strong>Creator/Artist Name:</strong>
            </label>
            <input
              type="text"
              name="creatorArtistName"
              value={formData.creatorArtistName}
              onChange={handleChange}
              className="text-input"
              placeholder="Enter creator/artist name"
            />
          </div>

          <div className="form-field">
            <label>
              <strong>Description:</strong>
            </label>
            <textarea
              name="workDescription"
              value={formData.workDescription}
              onChange={handleChange}
              className="text-input textarea"
              rows={2}
              placeholder="Enter work description"
            />
          </div>

          <div className="form-field">
            <label>
              <strong>Duration:</strong>
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="text-input"
              placeholder="e.g., 3:45"
            />
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <h2>PAYMENT STRUCTURE SELECTED</h2>

          <div className="payment-options">
            <div className="payment-option">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentOption"
                  value="percentage"
                  checked={formData.paymentOption === "percentage"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                <strong>OPTION A: Percentage-Based Royalty</strong>
              </label>

              {formData.paymentOption === "percentage" && (
                <div className="option-details">
                  <div className="form-field inline-field">
                    <label>Royalty Rate:</label>
                    <input
                      type="text"
                      name="royaltyRate"
                      value={formData.royaltyRate}
                      onChange={handleChange}
                      className="text-input short"
                      placeholder="e.g., 10"
                    />
                    <span>% of Net Revenue</span>
                  </div>
                  <div className="form-field">
                    <p>Reporting: Quarterly</p>
                  </div>
                  <div className="form-field">
                    <p>Minimum threshold: $50 per quarter</p>
                  </div>
                </div>
              )}
            </div>

            <div className="payment-option">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentOption"
                  value="flat-fee"
                  checked={formData.paymentOption === "flat-fee"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                <strong>OPTION B: Flat Fee</strong>
              </label>

              {formData.paymentOption === "flat-fee" && (
                <div className="option-details">
                  <div className="form-field inline-field">
                    <label>Amount:</label>
                    <span>$</span>
                    <input
                      type="text"
                      name="flatFeeAmount"
                      value={formData.flatFeeAmount}
                      onChange={handleChange}
                      className="text-input short"
                      placeholder="e.g., 5000"
                    />
                    <span>USD</span>
                  </div>
                  <div className="form-field">
                    <label>Scope:</label>
                    <input
                      type="text"
                      name="flatFeeScope"
                      value={formData.flatFeeScope}
                      onChange={handleChange}
                      className="text-input"
                      placeholder="Describe what the flat fee covers"
                    />
                  </div>
                  <div className="form-field inline-field">
                    <label>Term:</label>
                    <label className="inline-checkbox">
                      <input
                        type="radio"
                        name="flatFeeTerm"
                        value="perpetual"
                        checked={formData.flatFeeTerm === "perpetual"}
                        onChange={handleChange}
                      />
                      <span className="checkbox-box"></span>
                      Perpetual
                    </label>
                    <label className="inline-checkbox">
                      <input
                        type="radio"
                        name="flatFeeTerm"
                        value="years"
                        checked={formData.flatFeeTerm === "years"}
                        onChange={handleChange}
                      />
                      <span className="checkbox-box"></span>
                      <input
                        type="text"
                        name="flatFeeTermYears"
                        value={formData.flatFeeTermYears}
                        onChange={handleChange}
                        className="text-input tiny"
                        placeholder="#"
                        disabled={formData.flatFeeTerm !== "years"}
                      />
                      years
                    </label>
                    <label className="inline-checkbox">
                      <input
                        type="radio"
                        name="flatFeeTerm"
                        value="other"
                        checked={formData.flatFeeTerm === "other"}
                        onChange={handleChange}
                      />
                      <span className="checkbox-box"></span>
                      Other:
                      <input
                        type="text"
                        name="flatFeeTermOther"
                        value={formData.flatFeeTermOther}
                        onChange={handleChange}
                        className="text-input short"
                        placeholder="Specify"
                        disabled={formData.flatFeeTerm !== "other"}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="payment-option">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentOption"
                  value="hybrid"
                  checked={formData.paymentOption === "hybrid"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                <strong>OPTION C: Hybrid</strong>
              </label>

              {formData.paymentOption === "hybrid" && (
                <div className="option-details">
                  <div className="form-field inline-field">
                    <label>Upfront Fee:</label>
                    <span>$</span>
                    <input
                      type="text"
                      name="hybridUpfront"
                      value={formData.hybridUpfront}
                      onChange={handleChange}
                      className="text-input short"
                      placeholder="e.g., 2000"
                    />
                    <span>USD</span>
                  </div>
                  <div className="form-field inline-field">
                    <label>Plus Royalty:</label>
                    <input
                      type="text"
                      name="hybridRoyalty"
                      value={formData.hybridRoyalty}
                      onChange={handleChange}
                      className="text-input short"
                      placeholder="e.g., 5"
                    />
                    <span>% of Net Revenue</span>
                  </div>
                  <div className="form-field">
                    <p>Reporting: Quarterly</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <h2>PAYMENT PLAN (Optional)</h2>
          
          <div className="form-field">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="paymentPlanEnabled"
                checked={formData.paymentPlanEnabled}
                onChange={handleChange}
                style={{ width: 'auto', accentColor: '#000' }}
              />
              <strong>Enable Payment Plan</strong>
            </label>
          </div>

          {formData.paymentPlanEnabled && (
            <div className="option-details">
              <div className="form-field inline-field">
                <label style={{ color: '#000', fontWeight: 'bold' }}>Total Amount:</label>
                <span style={{ color: '#000' }}>$</span>
                <input
                  type="number"
                  name="paymentPlanTotalAmount"
                  value={formData.paymentPlanTotalAmount}
                  onChange={handleChange}
                  className="text-input short"
                  placeholder="e.g., 5000"
                  step="0.01"
                  min="0"
                  style={{ color: '#000' }}
                />
                <span style={{ color: '#000' }}>USD</span>
              </div>
              <div className="form-field inline-field">
                <label style={{ color: '#000', fontWeight: 'bold' }}>Payment per Period:</label>
                <span style={{ color: '#000' }}>$</span>
                <input
                  type="number"
                  name="paymentPlanPerPayment"
                  value={formData.paymentPlanPerPayment}
                  onChange={handleChange}
                  className="text-input short"
                  placeholder="e.g., 1000"
                  step="0.01"
                  min="0"
                  style={{ color: '#000' }}
                />
                <span style={{ color: '#000' }}>USD</span>
              </div>
              <div className="form-field">
                <label style={{ color: '#000', fontWeight: 'bold' }}>Payment Frequency:</label>
                <select
                  name="paymentPlanFrequency"
                  value={formData.paymentPlanFrequency}
                  onChange={handleChange}
                  className="text-input"
                  style={{ color: '#000' }}
                >
                  <option value="">-- Select Frequency --</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                  <option value="One-Time">One-Time Payment</option>
                </select>
              </div>
              <div className="form-field">
                <label style={{ color: '#000', fontWeight: 'bold' }}>Start Date:</label>
                <input
                  type="date"
                  name="paymentPlanStartDate"
                  value={formData.paymentPlanStartDate}
                  onChange={handleChange}
                  className="text-input"
                  style={{ color: '#000' }}
                />
              </div>

              {paymentSchedule.length > 0 && (
                <div className="form-field" style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#000' }}>
                    Payment Schedule
                  </h3>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    border: '1px solid #ddd'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ 
                          padding: '0.75rem', 
                          textAlign: 'left',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 'bold',
                          color: '#000'
                        }}>
                          Payment #
                        </th>
                        <th style={{ 
                          padding: '0.75rem', 
                          textAlign: 'left',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 'bold',
                          color: '#000'
                        }}>
                          Due Date
                        </th>
                        <th style={{ 
                          padding: '0.75rem', 
                          textAlign: 'right',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 'bold',
                          color: '#000'
                        }}>
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentSchedule.map((payment, index) => (
                        <tr key={index} style={{ 
                          backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
                        }}>
                          <td style={{ 
                            padding: '0.75rem', 
                            borderBottom: '1px solid #ddd',
                            color: '#000'
                          }}>
                            {payment.paymentNumber}
                          </td>
                          <td style={{ 
                            padding: '0.75rem', 
                            borderBottom: '1px solid #ddd',
                            color: '#000'
                          }}>
                            {payment.dueDate}
                          </td>
                          <td style={{ 
                            padding: '0.75rem', 
                            textAlign: 'right',
                            borderBottom: '1px solid #ddd',
                            fontWeight: '500',
                            color: '#000'
                          }}>
                            ${payment.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                        <td colSpan={2} style={{ 
                          padding: '0.75rem',
                          textAlign: 'right',
                          borderTop: '2px solid #ddd',
                          color: '#000'
                        }}>
                          Total:
                        </td>
                        <td style={{ 
                          padding: '0.75rem', 
                          textAlign: 'right',
                          borderTop: '2px solid #ddd',
                          color: '#000'
                        }}>
                          ${paymentSchedule.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <h2>PAYMENT DETAILS</h2>

          <div className="form-field">
            <label>
              <strong>Payment Method:</strong>
            </label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={formData.paymentMethod === "bank-transfer"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                Bank Transfer (Details:
                <input
                  type="text"
                  name="paymentMethodDetails"
                  value={
                    formData.paymentMethod === "bank-transfer"
                      ? formData.paymentMethodDetails
                      : ""
                  }
                  onChange={handleChange}
                  className="text-input inline"
                  placeholder="Account details"
                  disabled={formData.paymentMethod !== "bank-transfer"}
                />
                )
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                PayPal (Email:
                <input
                  type="text"
                  name="paymentMethodDetails"
                  value={
                    formData.paymentMethod === "paypal"
                      ? formData.paymentMethodDetails
                      : ""
                  }
                  onChange={handleChange}
                  className="text-input inline"
                  placeholder="PayPal email"
                  disabled={formData.paymentMethod !== "paypal"}
                />
                )
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="check"
                  checked={formData.paymentMethod === "check"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                Check (Payable to:
                <input
                  type="text"
                  name="paymentMethodDetails"
                  value={
                    formData.paymentMethod === "check"
                      ? formData.paymentMethodDetails
                      : ""
                  }
                  onChange={handleChange}
                  className="text-input inline"
                  placeholder="Name"
                  disabled={formData.paymentMethod !== "check"}
                />
                )
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="other"
                  checked={formData.paymentMethod === "other"}
                  onChange={handleChange}
                />
                <span className="checkbox-box"></span>
                Other:
                <input
                  type="text"
                  name="paymentMethodDetails"
                  value={
                    formData.paymentMethod === "other"
                      ? formData.paymentMethodDetails
                      : ""
                  }
                  onChange={handleChange}
                  className="text-input inline"
                  placeholder="Specify"
                  disabled={formData.paymentMethod !== "other"}
                />
              </label>
            </div>
          </div>

          <div className="form-subsection">
            <p>
              <strong>Creator's Payment Information:</strong>
            </p>
            <div className="form-field">
              <label>Name:</label>
              <input
                type="text"
                name="paymentName"
                value={formData.paymentName}
                onChange={handleChange}
                className="text-input"
                placeholder="Name for payment"
              />
            </div>
            <div className="form-field">
              <label>Address:</label>
              <textarea
                name="paymentAddress"
                value={formData.paymentAddress}
                onChange={handleChange}
                className="text-input textarea"
                rows={2}
                placeholder="Full mailing address"
              />
            </div>
            <div className="form-field">
              <label>Email:</label>
              <input
                type="email"
                name="paymentEmail"
                value={formData.paymentEmail}
                onChange={handleChange}
                className="text-input"
                placeholder="Email address"
              />
            </div>
            <div className="form-field">
              <label>Phone:</label>
              <input
                type="tel"
                name="paymentPhone"
                value={formData.paymentPhone}
                onChange={handleChange}
                className="text-input"
                placeholder="Phone number"
              />
            </div>
            <div className="form-field">
              <label>Tax ID (if applicable):</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="text-input"
                placeholder="EIN or SSN"
              />
            </div>
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <h2>SCOPE OF USE</h2>

          <div className="form-field">
            <label>
              <strong>Intended Use:</strong>
            </label>
            <textarea
              name="intendedUse"
              value={formData.intendedUse}
              onChange={handleChange}
              className="text-input textarea"
              rows={2}
              placeholder="Describe how the work will be used"
            />
          </div>

          <div className="form-field inline-field">
            <label>
              <strong>Territory:</strong>
            </label>
            <label className="inline-checkbox">
              <input
                type="radio"
                name="territory"
                value="worldwide"
                checked={formData.territory === "worldwide"}
                onChange={handleChange}
              />
              <span className="checkbox-box"></span>
              Worldwide
            </label>
            <label className="inline-checkbox">
              <input
                type="radio"
                name="territory"
                value="custom"
                checked={formData.territory === "custom"}
                onChange={handleChange}
              />
              <span className="checkbox-box"></span>
              <input
                type="text"
                name="territoryCustom"
                value={formData.territoryCustom}
                onChange={handleChange}
                className="text-input"
                placeholder="Specify region"
                disabled={formData.territory !== "custom"}
              />
            </label>
          </div>

          <div className="form-field inline-field">
            <label>
              <strong>Media/Platforms:</strong>
            </label>
            <label className="inline-checkbox">
              <input
                type="radio"
                name="media"
                value="all"
                checked={formData.media === "all"}
                onChange={handleChange}
              />
              <span className="checkbox-box"></span>
              All Media
            </label>
            <label className="inline-checkbox">
              <input
                type="radio"
                name="media"
                value="custom"
                checked={formData.media === "custom"}
                onChange={handleChange}
              />
              <span className="checkbox-box"></span>
              <input
                type="text"
                name="mediaCustom"
                value={formData.mediaCustom}
                onChange={handleChange}
                className="text-input"
                placeholder="Specify platforms"
                disabled={formData.media !== "custom"}
              />
            </label>
          </div>

          <div className="form-field">
            <label>
              <strong>Special Terms or Restrictions:</strong>
            </label>
            <textarea
              name="specialTerms"
              value={formData.specialTerms}
              onChange={handleChange}
              className="text-input textarea"
              rows={2}
              placeholder="Any special provisions or restrictions"
            />
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <h2>ADDITIONAL TERMS</h2>

          <div className="form-field">
            <label>
              <strong>
                Any special provisions, restrictions, or custom terms:
              </strong>
            </label>
            <textarea
              name="specialTerms"
              value={formData.specialTerms}
              onChange={handleChange}
              className="text-input textarea"
              rows={3}
              placeholder="Enter any additional terms"
            />
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-section">
          <h2>SIGNATURES</h2>

          <p className="section-intro">
            By signing below, both parties agree to all terms of this License
            and the License Execution Agreement.
          </p>

          <div className="signature-block">
            <p>
              <strong>CREATOR:</strong>
            </p>
            <div className="signature-fields">
              <div className="form-field inline-field">
                <label>Signature:</label>
                <input
                  type="text"
                  name="creatorSignature"
                  value={formData.creatorSignature}
                  onChange={handleChange}
                  className="text-input signature"
                  placeholder="Sign here"
                />
                <label style={{ marginLeft: "2rem" }}>Date:</label>
                <input
                  type="date"
                  name="creatorDate"
                  value={formData.creatorDate}
                  onChange={handleChange}
                  className="text-input date"
                />
              </div>
              <div className="form-field">
                <label>Printed Name:</label>
                <input
                  type="text"
                  name="creatorPrintedName"
                  value={formData.creatorPrintedName}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Enter full name"
                />
              </div>
            </div>
          </div>

          <div className="signature-block">
            <p>
              <strong>LICENSEE:</strong>
            </p>
            <div className="signature-fields">
              <div className="form-field inline-field">
                <label>Signature:</label>
                <input
                  type="text"
                  name="licenseeSignature"
                  value={formData.licenseeSignature}
                  onChange={handleChange}
                  className="text-input signature"
                  placeholder="Sign here"
                />
                <label style={{ marginLeft: "2rem" }}>Date:</label>
                <input
                  type="date"
                  name="licenseeDate"
                  value={formData.licenseeDate}
                  onChange={handleChange}
                  className="text-input date"
                />
              </div>
              <div className="form-field">
                <label>Printed Name:</label>
                <input
                  type="text"
                  name="licenseePrintedName"
                  value={formData.licenseePrintedName}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Enter full name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-separator" />

        <div className="form-footer">
          <p>
            This license enables fair commercial exploitation while ensuring
            creators receive appropriate compensation for their work. It's
            designed for the modern music industry where creators use various
            tools and samples, and licensees need clear, enforceable commercial
            rights.
          </p>
        </div>
      </div>

      <div
        className="agreement-container no-print"
        style={{ marginTop: "2rem" }}
      >
        <div className="agreement-actions">
          <Button variant="primary" onClick={generatePDF}>
            📥 Download as PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            🖨️ Print
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back to License
          </Button>
        </div>
      </div>
    </div>
  );
};
