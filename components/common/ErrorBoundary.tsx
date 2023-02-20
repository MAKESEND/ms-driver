import React from 'react';

class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: object) {
    super(props);

    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: check if error shall be logged
    console.log({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      // TODO: custom error handling
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type='button'
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
