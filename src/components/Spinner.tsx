interface SpinnerProps {
  message?: string;
}

function Spinner({ message = "Loading..." }: SpinnerProps) {
  return <div className="status">{message}</div>;
}

export default Spinner;
