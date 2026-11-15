interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({
  message = "An unknown error occurred",
}: ErrorMessageProps) {
  return <div className="status status-error">Error: {message}</div>;
}

export default ErrorMessage;
