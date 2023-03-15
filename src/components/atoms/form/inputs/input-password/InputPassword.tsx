/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import styles from "./InputPassword.module.scss";

type TProps = {
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
  isNoCommma?: boolean;
  className?: string;
  name?: string;
  autoComplete?: string;
};

function InputPassword({
  disabled = false,
  placeholder = "",
  value = "",
  readOnly = false,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  hasError = false,
  className = "",
  name = "",
  autoComplete = "off",
}: TProps) {
  const [state, setState] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      setState(event.target.value);
    },
    [onChange]
  );

  const listClass = hasError ? "border-error" + className : className;
  return (
    <>
      <div className={styles.passwordInput}>
        <input
          name={name}
          onBlur={onBlur}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          placeholder={placeholder}
          value={state}
          readOnly={readOnly}
          onChange={onChangeValue}
          className={`${listClass} w-100 normal-input`}
          autoComplete={autoComplete}
        />
        <div
          className={styles.passwordIcon}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              width="1.25em"
              height="1.25em"
            >
              <g
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                opacity="0.5"
              >
                <path d="M9.8 4.8c3 0 5.3 1.7 7 5-1.7 3.3-4 5-7 5s-5.3-1.7-7-5c1.6-3.4 4-5 7-5z"></path>
                <path d="M9.8 11.8a2 2 0 100-4 2 2 0 000 4z"></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              width="1.25rem"
              height="1.25em"
            >
              <g
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                opacity="0.5"
              >
                <path d="M2.8 7.8c2.1 1 4.5 1.6 7 1.6s4.9-.6 7-1.6M9.8 9.8v3M5.1 9.2l-1.5 2.6M14.6 9.2l1.5 2.6"></path>
              </g>
            </svg>
          )}
        </div>
      </div>
    </>
  );
}

export default InputPassword;
