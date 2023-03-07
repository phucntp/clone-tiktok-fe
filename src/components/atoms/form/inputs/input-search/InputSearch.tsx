/* eslint-disable no-unused-vars */

import React, { useState, useCallback } from "react";

type TProps = {
  styles?: any;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onEnterPressed?: (value: any) => void;
  autoFocus?: boolean;
  hasError?: boolean;
  maxLength?: number;
  inputType?: string;
  isNoCommma?: boolean;
  className?: string;
  name?: string;
};

function InputSearch({
  disabled = false,
  placeholder = "",
  value = "",
  readOnly = false,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  inputType = "text",
  hasError = false,
  className = "",
  name = "",
}: TProps) {
  const [state, setState] = useState(value);
  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      setState(event.target.value);
    },
    [onChange]
  );

  const listClass = hasError ? "border-error" + className : className;
  return (
    <input
      name={name}
      onBlur={onBlur}
      type={inputType}
      disabled={disabled}
      placeholder={placeholder}
      value={state}
      readOnly={readOnly}
      onChange={onChangeValue}
      className={`${listClass} w-100 normal-input`}
    />
  );
}

export default InputSearch;
