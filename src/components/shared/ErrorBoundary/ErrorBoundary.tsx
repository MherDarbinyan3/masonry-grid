import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import {ErrorContext} from "../../../context/ErrorContext.ts";
import {ErrorContainer, ErrorDescription, ErrorTitle} from "./errorBoundary.style.ts";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    setHasError(true);
    setError(error);
  }, []);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      handleError(event.error);
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      handleError(new Error(`Unhandled promise rejection: ${event.reason}`));
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, [handleError]);

  const setCustomError = useCallback((customError: Error | string) => {
    handleError(customError instanceof Error ? customError : new Error(customError));
  }, [handleError]);

  if (hasError) {
    return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
          <ErrorDescription>{error && error.toString()}</ErrorDescription>
          <button onClick={() => window.location.reload()} >Reload</button>
        </ErrorContainer>
    );
  }

  return (
      <ErrorContext.Provider value={setCustomError}>
        {children}
      </ErrorContext.Provider>
  );
};

export default ErrorBoundary;