import React from "react";

interface Props {
  label?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  handleClick?: () => void;
}

function NormalButton({ label, type, className, handleClick }: Props) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`normal-button ${className}`}
    >
      {label}
    </button>
  );
}

export default NormalButton;
