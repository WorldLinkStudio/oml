import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  required,
  ...props
}) => {
  const textareaId = id || `textarea-${props.name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`form-textarea ${error ? 'form-textarea-error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error
            ? `${textareaId}-error`
            : helperText
            ? `${textareaId}-help`
            : undefined
        }
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p id={`${textareaId}-help`} className="form-help-text">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${textareaId}-error`} className="form-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

