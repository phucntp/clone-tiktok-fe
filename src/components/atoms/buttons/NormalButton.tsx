'use client'
import { AppState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  label?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

function NormalButton({
  label,
  type = "button",
  className,
  handleClick = () => {},
  disabled = false,
}: Props) {
  const {isLoading} = useSelector((state: AppState) => state.uiReducers.loadingReducer)
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`normal-button ${className}`}
    >
      {label}
    </button>
  );
}

export default NormalButton;
