interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({
  message = "An unknown error occurred",
}: ErrorMessageProps) {
  return <div>Error: {message}</div>;
}

export default ErrorMessage;
