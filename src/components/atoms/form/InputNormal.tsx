import React from "react";

interface Props {
  label: string;
}

function InputNormal({ label }: Props) {
  return (
    <div>
      <label>{label}</label>
      <input />
    </div>
  );
}

export default InputNormal;
