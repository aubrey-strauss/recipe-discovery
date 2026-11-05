interface SpinnerProps {
  message?: string;
}

function Spinner({ message = "Loading..." }: SpinnerProps) {
  return <div>{message}</div>;
}

export default Spinner;
