import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Optionally reload the page or reset form
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-container" style={{ padding: '2rem' }}>
          <Card padding="large">
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: 'var(--color-error, #dc2626)', marginBottom: '1rem' }}>
                ⚠️ Something went wrong
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                We encountered an unexpected error. This has been logged and we'll look into it.
              </p>
              
              {import.meta.env.DEV && this.state.error && (
                <details style={{ 
                  textAlign: 'left', 
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'var(--color-background-secondary, #f5f5f5)',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border, #e5e5e5)'
                }}>
                  <summary style={{ 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Error Details (Development Mode)
                  </summary>
                  <pre style={{ 
                    fontSize: '0.875rem',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    <strong>Error:</strong> {this.state.error.toString()}
                    {'\n\n'}
                    <strong>Component Stack:</strong>
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Button variant="primary" onClick={this.handleReset}>
                  Reload Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    this.setState({ hasError: false, error: null, errorInfo: null });
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

