import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  error,
  helperText,
  placeholder,
  className = '',
  id,
  required,
  children,
  ...props
}) => {
  const selectId = id || `select-${props.name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${error ? 'form-select-error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helperText
            ? `${selectId}-help`
            : undefined
        }
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.length > 0 && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {children}
      </select>
      {helperText && !error && (
        <p id={`${selectId}-help`} className="form-help-text">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${selectId}-error`} className="form-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

