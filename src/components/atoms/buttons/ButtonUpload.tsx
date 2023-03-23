import { ROUTER } from "@/routers/routers";
import Link from "next/link";
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
      <Link
        href={ROUTER.UPLOAD}
        type={type}
        onClick={handleClick}
        className={`normal-button d-flex align-center ${className}`}
      >
        <IconAdd className="mr-5" />
        <div>{label}</div>
      </Link>
    </div>
  );
}

export default ButtonUpload;
