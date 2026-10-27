import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Zenith ErrorBoundary caught exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: '#071522',
            padding: '24px',
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '20px',
              padding: '36px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px',
                fontSize: '22px',
                fontWeight: 800,
              }}
            >
              ZG
            </div>
            <h2 style={{ fontSize: '20px', margin: '0 0 10px', color: '#0f172a' }}>
              Management Portal Session Notice
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 20px' }}>
              The management portal encountered a display refresh state. You can safely return to the main website or re-enter the administration gateway.
            </p>
            {this.state.error?.message && (
              <pre
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  textAlign: 'left',
                  overflowX: 'auto',
                  color: '#b91c1c',
                  marginBottom: '20px',
                  fontFamily: 'monospace',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  if (this.props.onReset) this.props.onReset();
                }}
                style={{
                  background: '#10243e',
                  color: '#ffffff',
                  border: 0,
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Return to Zenith Website
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
