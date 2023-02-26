import React from "react";

interface Props {
  label?: string;
}

function InputNormal({ label }: Props) {
  return (
    <div className="d-flex justify-center align-center">
      {label && <label className="font-20 w-100">{label}</label>}
      <div className="w-100">
        <input className="w-100 normal-input"/>
      </div>
    </div>
  );
}

export default InputNormal;
