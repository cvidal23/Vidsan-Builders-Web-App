import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.state.error?.message.includes('Firebase configuration')) {
        return (
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
              <h1 className="mb-4 text-xl font-bold text-red-600">
                Configuration Error
              </h1>
              <p className="mb-4 text-gray-600">
                The application is not properly configured. Please make sure all
                required environment variables are set.
              </p>
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">
                  {this.state.error.message}
                </p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-4 text-xl font-bold text-red-600">
              Something went wrong
            </h1>
            <p className="text-gray-600">
              An error occurred while loading the application. Please try refreshing
              the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}