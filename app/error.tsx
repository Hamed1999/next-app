"use client";

import { ReactNode } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  return (
    <>
      <h1>An unexpected error has occurred.</h1>
      <p>
        Error Message({error.name}): {error.message}
      </p>
      <button className="btn rounded-md" onClick={reset}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
