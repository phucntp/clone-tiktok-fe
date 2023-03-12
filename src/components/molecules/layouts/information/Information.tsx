import NormalLink from "@/components/atoms/links/NormalLink";
import React from "react";

type TProps = {
  className?: string;
};

function Information({ className = "" }: TProps) {
  return (
    <div className={className}>
      <NormalLink />
      <NormalLink />
      <NormalLink />
    </div>
  );
}

export default Information;
