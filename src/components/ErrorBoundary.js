import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleOnError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return <div onError={handleOnError}>{children}</div>;
};

export default ErrorBoundary;
