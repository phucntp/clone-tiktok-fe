import React from "react";

interface Props {
  label: string;
}

function InputPassword({ label }: Props) {
  return (
    <div>
      <label>{label}</label>
      <input type="password" />
    </div>
  );
}

export default InputPassword;
