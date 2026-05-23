import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            background: 'var(--canvas-soft)',
            color: 'var(--ink)',
          }}
        >
          <div style={{ maxWidth: 480, textAlign: 'center' }}>
            <h1 style={{ fontSize: 22, marginBottom: 12 }}>Something went wrong</h1>
            <p style={{ color: 'var(--ink-mute)', marginBottom: 20 }}>
              The app hit an error. Try refreshing the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-teal"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
