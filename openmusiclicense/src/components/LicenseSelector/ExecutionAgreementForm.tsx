import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import type { ExecutionAgreementData, LicenseType } from '../../types/license';

interface ExecutionAgreementFormProps {
  formData: ExecutionAgreementData;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
  licenseType?: LicenseType;
}

export const ExecutionAgreementForm: React.FC<ExecutionAgreementFormProps> = ({
  formData,
  onChange,
  errors = {},
  licenseType = 'OML-C',
}) => {
  const paymentOption = formData.paymentOption || '';
  const isSyncLicense = licenseType === 'OML-S';
  
  return (
    <div className="license-selector-step">
      <Card padding="large">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            License Execution Agreement
          </h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            This information will be included in your license agreement to establish clear terms.
          </p>
        </div>

        {/* Licensee Information */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Licensee Information</h4>
          <Input
            label="Licensee Name/Company"
            placeholder="Enter licensee name or company"
            value={formData.licenseeInfo || ''}
            onChange={(e) => onChange('licenseeInfo', e.target.value)}
            error={errors.licenseeInfo}
            helperText="The person or entity receiving the license"
          />
          {isSyncLicense && (
            <>
              <div style={{ marginTop: '1rem' }}>
                <Input
                  label="Production Company"
                  placeholder="Production company name"
                  value={formData.productionCompany || ''}
                  onChange={(e) => onChange('productionCompany', e.target.value)}
                  error={errors.productionCompany}
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Select
                  label="Project Type"
                  value={formData.projectType || ''}
                  onChange={(e) => onChange('projectType', e.target.value)}
                  error={errors.projectType}
                >
                  <option value="">Select project type...</option>
                  <option value="Film">Film</option>
                  <option value="TV">TV</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Video Game">Video Game</option>
                  <option value="Web Series">Web Series</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Music Video">Music Video</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
            </>
          )}
        </div>

        {/* Payment Structure - Different for Sync vs Commercial */}
        {isSyncLicense ? (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payment Terms</h4>
            
            <Input
              label="License Fee (USD)"
              type="number"
              placeholder="e.g., 5000"
              value={formData.licenseFee || ''}
              onChange={(e) => onChange('licenseFee', e.target.value)}
              error={errors.licenseFee}
              helperText="Total license fee for this synchronization"
            />

            <div style={{ marginTop: '1rem' }}>
              <Select
                label="Payment Schedule"
                value={formData.paymentSchedule || ''}
                onChange={(e) => onChange('paymentSchedule', e.target.value)}
                error={errors.paymentSchedule}
              >
                <option value="">Select payment schedule...</option>
                <option value="full">Full payment upon execution</option>
                <option value="50-50">50% upon execution, 50% before first use</option>
                <option value="custom">Custom schedule</option>
              </Select>
            </div>

            {formData.paymentSchedule === 'custom' && (
              <div style={{ marginTop: '1rem' }}>
                <Input
                  label="Custom Payment Schedule"
                  placeholder="Describe payment schedule"
                  value={formData.paymentScheduleCustom || ''}
                  onChange={(e) => onChange('paymentScheduleCustom', e.target.value)}
                  error={errors.paymentScheduleCustom}
                />
              </div>
            )}

            <div style={{ marginTop: '1rem' }}>
              <Input
                label="Rush Fee (Optional)"
                type="number"
                placeholder="e.g., 500"
                value={formData.rushFee || ''}
                onChange={(e) => onChange('rushFee', e.target.value)}
                error={errors.rushFee}
                helperText="Additional fee for rush delivery if applicable"
              />
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payment Structure</h4>
          
          <Select
            label="Payment Option"
            value={paymentOption}
            onChange={(e) => onChange('paymentOption', e.target.value)}
            error={errors.paymentOption}
          >
            <option value="">Select payment structure...</option>
            <option value="percentage">Option A: Percentage-Based Royalty</option>
            <option value="flat-fee">Option B: Flat Fee</option>
            <option value="hybrid">Option C: Hybrid (Upfront + Royalty)</option>
          </Select>

          {paymentOption === 'percentage' && (
            <div style={{ marginTop: '1rem' }}>
              <Input
                label="Royalty Rate (%)"
                type="number"
                placeholder="e.g., 10"
                value={formData.royaltyRate || ''}
                onChange={(e) => onChange('royaltyRate', e.target.value)}
                error={errors.royaltyRate}
                helperText="Percentage of Net Revenue"
              />
            </div>
          )}

          {paymentOption === 'flat-fee' && (
            <>
              <div style={{ marginTop: '1rem' }}>
                <Input
                  label="Flat Fee Amount (USD)"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.flatFeeAmount || ''}
                  onChange={(e) => onChange('flatFeeAmount', e.target.value)}
                  error={errors.flatFeeAmount}
                  helperText="One-time payment amount"
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Input
                  label="Scope of Flat Fee"
                  placeholder="Describe what the flat fee covers"
                  value={formData.scope || ''}
                  onChange={(e) => onChange('scope', e.target.value)}
                  error={errors.scope}
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Select
                  label="Term"
                  value={formData.term || ''}
                  onChange={(e) => onChange('term', e.target.value)}
                  error={errors.term}
                >
                  <option value="">Select term...</option>
                  <option value="perpetual">Perpetual</option>
                  <option value="years">Fixed Years</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              {formData.term === 'years' && (
                <div style={{ marginTop: '1rem' }}>
                  <Input
                    label="Number of Years"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.termYears || ''}
                    onChange={(e) => onChange('termYears', e.target.value)}
                    error={errors.termYears}
                  />
                </div>
              )}
            </>
          )}

          {paymentOption === 'hybrid' && (
            <>
              <div style={{ marginTop: '1rem' }}>
                <Input
                  label="Upfront Fee (USD)"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.hybridUpfront || ''}
                  onChange={(e) => onChange('hybridUpfront', e.target.value)}
                  error={errors.hybridUpfront}
                  helperText="Initial payment"
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Input
                  label="Royalty Rate (%)"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.hybridRoyalty || ''}
                  onChange={(e) => onChange('hybridRoyalty', e.target.value)}
                  error={errors.hybridRoyalty}
                  helperText="Plus percentage of Net Revenue"
                />
              </div>
            </>
          )}
        </div>
        )}

        {/* Payment Details */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payment Details</h4>
          
          <Select
            label="Payment Method"
            value={formData.paymentMethod || ''}
            onChange={(e) => onChange('paymentMethod', e.target.value)}
            error={errors.paymentMethod}
          >
            <option value="">Select payment method...</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="check">Check</option>
            <option value="other">Other</option>
          </Select>

          {formData.paymentMethod && formData.paymentMethod !== '' && (
            <div style={{ marginTop: '1rem' }}>
              <Input
                label="Payment Details"
                placeholder="Account number, email, address, etc."
                value={formData.paymentDetails || ''}
                onChange={(e) => onChange('paymentDetails', e.target.value)}
                error={errors.paymentDetails}
                helperText="Where to send payment"
              />
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <Input
              label="Payee Name"
              placeholder="Name for payment"
              value={formData.paymentName || ''}
              onChange={(e) => onChange('paymentName', e.target.value)}
              error={errors.paymentName}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Textarea
              label="Payment Address"
              placeholder="Full mailing address"
              value={formData.paymentAddress || ''}
              onChange={(e) => onChange('paymentAddress', e.target.value)}
              error={errors.paymentAddress}
              rows={3}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.paymentPhone || ''}
              onChange={(e) => onChange('paymentPhone', e.target.value)}
              error={errors.paymentPhone}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Input
              label="Tax ID (Optional)"
              placeholder="EIN or SSN"
              value={formData.taxId || ''}
              onChange={(e) => onChange('taxId', e.target.value)}
              error={errors.taxId}
              helperText="For tax reporting purposes"
            />
          </div>
        </div>

        {/* Scope of Use */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Scope of Use</h4>
          
          <Textarea
            label="Intended Use"
            placeholder="Describe how the work will be used"
            value={formData.intendedUse || ''}
            onChange={(e) => onChange('intendedUse', e.target.value)}
            error={errors.intendedUse}
            rows={3}
          />

          <div style={{ marginTop: '1rem' }}>
            <Select
              label="Territory"
              value={formData.territory || ''}
              onChange={(e) => onChange('territory', e.target.value)}
              error={errors.territory}
            >
              <option value="">Select territory...</option>
              <option value="worldwide">Worldwide</option>
              <option value="custom">Specific Region</option>
            </Select>
          </div>

          {formData.territory === 'custom' && (
            <div style={{ marginTop: '1rem' }}>
              <Input
                label="Specify Territory"
                placeholder="e.g., North America, EU, etc."
                value={formData.territoryCustom || ''}
                onChange={(e) => onChange('territoryCustom', e.target.value)}
                error={errors.territoryCustom}
              />
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <Select
              label="Media/Platforms"
              value={formData.media || ''}
              onChange={(e) => onChange('media', e.target.value)}
              error={errors.media}
            >
              <option value="">Select media...</option>
              <option value="all">All Media</option>
              <option value="custom">Specific Platforms</option>
            </Select>
          </div>

          {formData.media === 'custom' && (
            <div style={{ marginTop: '1rem' }}>
              <Input
                label="Specify Platforms"
                placeholder="e.g., Spotify, YouTube, etc."
                value={formData.mediaCustom || ''}
                onChange={(e) => onChange('mediaCustom', e.target.value)}
                error={errors.mediaCustom}
              />
            </div>
          )}
        </div>

        {/* Additional Terms */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Additional Terms</h4>
          
          <Textarea
            label="Special Provisions or Restrictions (Optional)"
            placeholder="Any custom terms, restrictions, or special provisions"
            value={formData.specialTerms || ''}
            onChange={(e) => onChange('specialTerms', e.target.value)}
            error={errors.specialTerms}
            rows={4}
          />
        </div>
      </Card>
    </div>
  );
};

