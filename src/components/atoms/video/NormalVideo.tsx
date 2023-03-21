/* eslint-disable no-unused-vars */
"use client";

import { useVideo } from "react-use";
import styles from "./Video.module.scss";
import React, { Suspense, useState } from "react";
import IconPause from "../icons/IconPause";
import IconPlay from "../icons/IconPlay";
import IconUnMute from "../icons/IconUnMute";
import IconMute from "../icons/IconMute";
import Loading from "@/components/molecules/ui/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store";
import newsReducer from "@/reducers/news";

type TProps = {
  src?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  id?: string;
  loaded?: boolean;
};

function NormalVideo({
  src = "",
  width = "100%",
  height = "100%",
  className = "",
  id = "",
  loaded = false,
}: TProps) {
  const dispatch = useDispatch();
  const [video, state, controls] = useVideo(
    <video
      className={styles.video}
      width={width}
      height={height}
      src={src ?? ""}
      onLoadedData={() =>
        dispatch(newsReducer.actions.setLoadingId({ id, loaded: true }))
      }
    ></video>
  );

  return (
    <>
      <div className={`${styles.containerVideo} ${className}`}>
        {video}
        {loaded && (
          <Suspense fallback={<Loading loading />}>
            <div className={styles.controlVideo}>
              {state.playing ? (
                <button onClick={controls.pause}>
                  <IconPause />
                </button>
              ) : (
                <button onClick={controls.play}>
                  <IconPlay />
                </button>
              )}
              {state.muted ? (
                <button onClick={controls.unmute}>
                  <IconMute />
                </button>
              ) : (
                <button onClick={controls.mute}>
                  <IconUnMute />
                </button>
              )}

              {/* <br />
      <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button> */}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
}

export default NormalVideo;
