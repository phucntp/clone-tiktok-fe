"use client";

import React from "react";
import styles from "./Loading.module.scss";

type TProps = {
  loading?: boolean;
  className?: string;
};

function LoadingBall({ loading = false, className = "" }: TProps) {
  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              display: "block",
              backgroundColor: "transparent",
              shapeRendering: "auto",
            }}
            className={className}
            width="40px"
            height="40px"
            preserveAspectRatio="xMidYMid"
          >
            <g transform="translate(55,50)">
              <g transform="rotate(0)">
                <circle cx="0" cy="0" r="8" fill="#ff0000" fillOpacity="1">
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.8571428571428571s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="-0.8571428571428571s"
                  ></animate>
                </circle>
              </g>
            </g>
            <g transform="translate(53.117449009293665,53.90915741234015)">
              <g transform="rotate(51.42857142857143)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#ff0000"
                  fillOpacity="0.8571428571428571"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.7142857142857143s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="-0.7142857142857143s"
                  ></animate>
                </circle>
              </g>
            </g>
            <g transform="translate(48.887395330218425,54.87463956090912)">
              <g transform="rotate(102.85714285714286)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#ff0000"
                  fillOpacity="0.7142857142857143"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.5714285714285714s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="-0.5714285714285714s"
                  ></animate>
                </circle>
              </g>
            </g>
            <g transform="translate(45.4951556604879,52.169418695587794)">
              <g transform="rotate(154.2857142857143)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#ff0000"
                  fillOpacity="0.5714285714285714"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.42857142857142855s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="-0.42857142857142855s"
                  ></animate>
                </circle>
              </g>
            </g>
            <g transform="translate(45.4951556604879,47.83058130441221)">
              <g transform="rotate(205.71428571428572)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#ff0000"
                  fillOpacity="0.42857142857142855"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.2857142857142857s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="-0.2857142857142857s"
                  ></animate>
                </circle>
              </g>
            </g>
            <g transform="translate(48.887395330218425,45.12536043909088)">
              <g transform="rotate(257.1428571428571)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#ff0000"
                  fillOpacity="0.2857142857142857"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.14285714285714285s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="-0.14285714285714285s"
                  ></animate>
                </circle>
              </g>
            </g>
            <g transform="translate(53.117449009293665,46.09084258765985)">
              <g transform="rotate(308.5714285714286)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#ff0000"
                  fillOpacity="0.14285714285714285"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="0s"
                    values="0.45 0.45;1 1"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="fill-opacity"
                    keyTimes="0;1"
                    dur="1s"
                    repeatCount="indefinite"
                    values="1;0"
                    begin="0s"
                  ></animate>
                </circle>
              </g>
            </g>
          </svg>
        </div>
      )}
    </>
  );
}

export default LoadingBall;
