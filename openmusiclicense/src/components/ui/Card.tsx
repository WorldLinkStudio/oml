import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'medium',
}) => {
  const paddingClass = `card-padding-${padding}`;
  const classes = `card ${paddingClass} ${className}`.trim();

  return <div className={classes}>{children}</div>;
};

