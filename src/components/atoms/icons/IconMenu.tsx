import React from "react";

type TProps = {
  className?: string;
  color?: string;
  openSideMenu?: () => void;
};

function IconMenu({
  className = "",
  color = "white",
  openSideMenu = () => {},
}: TProps) {
  return (
    <div onClick={openSideMenu} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 40 40"
        width="100%"
        height="100%"
      >
        <path
          fill={color}
          fillOpacity="0.5"
          fillRule="evenodd"
          d="M8 10.5a.5.5 0 01.5-.5h23a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-23a.5.5 0 01-.5-.5v-1zm0 9a.5.5 0 01.5-.5h23a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-23a.5.5 0 01-.5-.5v-1zm.5 8.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h23a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-23z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}

export default IconMenu;
