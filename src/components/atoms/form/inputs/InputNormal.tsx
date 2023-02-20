import React from "react";

interface Props {
  label: string;
}

function InputNormal({ label }: Props) {
  return (
    <div className="d-flex justify-center align-center">
      <label className="font-20 w-100">{label}</label>
      <div className="p-20 w-500-px">
        <input />
      </div>
    </div>
  );
}

export default InputNormal;
