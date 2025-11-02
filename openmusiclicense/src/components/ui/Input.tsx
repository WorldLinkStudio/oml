import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  required,
  type = 'text',
  ...props
}) => {
  const inputId = id || `input-${props.name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        className={`form-input ${error ? 'form-input-error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-help`
            : undefined
        }
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p id={`${inputId}-help`} className="form-help-text">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="form-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

