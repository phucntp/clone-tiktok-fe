import React from "react";

type TProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

function IconPlay({ color = "#fff", width = 20, height = 20 }: TProps) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
          fill={color}
        />
      </svg>
    </>
  );
}

export default IconPlay;
