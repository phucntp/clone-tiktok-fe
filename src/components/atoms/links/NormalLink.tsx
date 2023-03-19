import Link from "next/link";
import React from "react";

type TProps = {
  text?: string;
  url?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

function NormalLink({
  text = "NormalLink",
  url = "",
  target = "_self",
}: TProps) {
  return (
    <Link href={url} target={target} className="mt-5 mr-6 font-12">
      {text}
    </Link>
  );
}

export default NormalLink;
