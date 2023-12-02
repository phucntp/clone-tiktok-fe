/* eslint-disable no-unused-vars */
"use client";

import { useVideo } from "react-use";
import styles from "./Video.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import IconPause from "../icons/IconPause";
import IconPlay from "../icons/IconPlay";
import IconUnMute from "../icons/IconUnMute";
import IconMute from "../icons/IconMute";
import Loading from "@/components/molecules/ui/Loading/Loading";
import LoadingBall from "@/components/molecules/ui/Loading/LoadingBall";

type TProps = {
  src?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  id?: string;
  index?: number;
  idUrl?: string;
  currentIndex?: number;
};

function NormalVideo({
  src = "",
  width = "100%",
  height = "100%",
  className = "",
  index = 0,
  currentIndex = 0,
}: TProps) {
  const [playing] = useState(true);
  const [video, state, controls, ref] = useVideo(
    <video
      key={index}
      id={`${index}`}
      className={styles.video}
      width={width}
      height={height}
      src={src}
      playsInline
      loop
      preload="auto"
    ></video>
  );

  useEffect(() => {
    if (ref.current) {
      if (state.duration && ref.current.id === String(currentIndex)) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [currentIndex, ref, state.duration]);

  // useEffect(() => {
  //   if (playing && state.duration && currentIndex === 0) {
  //     controls.play();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [playing, state.duration, currentIndex, index]);

  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.detail === 1) {
      if (state.playing) {
        controls.pause();
      } else {
        controls.play();
      }
      // eslint-disable-next-line no-empty
    } else if (event.detail === 2) {
    }
  };

  const handleChangeProgress = useCallback(
    (e: any) => {
      controls.seek(e.target.value);
    },
    [controls]
  );

  const displayVideo = useMemo(() => {
    if ((!state.playing && !state.paused) || (state.playing && !state.time)) {
      return <LoadingBall loading />;
    }
    return (
      <div className={styles.controlVideo}>
        {state.paused ? (
          <button onClick={controls.play}>
            <IconPlay />
          </button>
        ) : (
          <button onClick={controls.pause}>
            <IconPause />
          </button>
        )}
        <input
          type="range"
          className="styled-slider slider-progress"
          max={state.duration}
          value={state.time}
          onChange={handleChangeProgress}
        />
        {state.muted ? (
          <button onClick={controls.unmute}>
            <IconMute />
          </button>
        ) : (
          <button onClick={controls.mute}>
            <IconUnMute />
          </button>
        )}
      </div>
    );
  }, [
    controls.mute,
    controls.pause,
    controls.play,
    controls.unmute,
    state.muted,
    state.paused,
    state.playing,
    state.time,
  ]);

  return (
    <>
      <div
        onClick={onClickHandler}
        className={`${styles.containerVideo} cursor-pointer ${className}`}
      >
        {video}
        {ref.current?.duration ? displayVideo : <Loading loading />}
        {/* <button onClick={() => controls.volume(0.1)}>Volume: 10%</button> */}
        {/* <button onClick={() => controls.volume(0.5)}>Volume: 50%</button> */}
        {/* <button onClick={() => controls.volume(1)}>Volume: 100%</button> */}
      </div>
    </>
  );
}

export default NormalVideo;
