import React from "react";
import IconAdd from "../icons/IconAdd";

interface Props {
  label?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  handleClick?: () => void;
}

function ButtonUpload({ label, type, className, handleClick }: Props) {
  return (
    <div>
      <a
        type={type}
        onClick={handleClick}
        className={`normal-button d-flex align-center ${className}`}
      >
        <IconAdd />
        <div>{label}</div>
      </a>
    </div>
  );
}

export default ButtonUpload;
