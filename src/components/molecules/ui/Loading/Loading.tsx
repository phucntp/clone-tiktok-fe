"use client";

import { AppState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

type TProps = {
  loading?: boolean;
}

function Loading({loading = false}: TProps) {
  const isLoading = useSelector(
    (state: AppState) => state.uiReducers.loadingReducer.isLoading
  );
  return (
    <>
      {isLoading || loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "auto",
            display: "block",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            shapeRendering: "auto",
            position: "fixed",
            zIndex: 2000,
          }}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle cx="45" cy="50" fill="#e90c59" r="1">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="45;55;45"
              begin="-0.5s"
            ></animate>
          </circle>
          <circle cx="55" cy="50" fill="#46dff0" r="1">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="45;55;45"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="45" cy="50" fill="#e90c59" r="1">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="45;55;45"
              begin="-0.5s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              values="0;0;1;1"
              calcMode="discrete"
              keyTimes="0;0.499;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animate>
          </circle>
        </svg>
      )}
    </>
  );
}

export default Loading;
