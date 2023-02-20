import React from "react";

interface Props {
  label?: string;
}

function InputPassword({ label }: Props) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input type="password" className="w-100 normal-input"/>
    </div>
  );
}

export default InputPassword;
