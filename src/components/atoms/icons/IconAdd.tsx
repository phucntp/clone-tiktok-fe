import React from "react";

type TProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

function IconAdd({
  color = "currentColor",
  width = "1em",
  height = "1em",
}: TProps) {
  return (
    <>
      <svg
        className="css-qeydvm-StyledPlusIcon e18d3d944"
        width={width}
        data-e2e=""
        height={height}
        viewBox="0 0 16 16"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"
        ></path>
      </svg>
    </>
  );
}

export default IconAdd;
