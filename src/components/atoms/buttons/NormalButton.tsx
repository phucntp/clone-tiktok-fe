import React from "react";

interface Props {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

function NormalButton({ label, type, className }: Props) {
  return <button type={type} className={`normal-button ${className}`} >{label}</button>;
}

export default NormalButton;
