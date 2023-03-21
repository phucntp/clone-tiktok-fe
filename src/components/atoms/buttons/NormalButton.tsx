import React from "react";

interface Props {
  label?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

function NormalButton({
  label,
  type = "button",
  className,
  handleClick = () => {},
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`normal-button ${className}`}
    >
      {label}
    </button>
  );
}

export default NormalButton;
