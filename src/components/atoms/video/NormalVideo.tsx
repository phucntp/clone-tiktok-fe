/* eslint-disable no-unused-vars */
"use client";

import { useVideo } from "react-use";
import styles from "./Video.module.scss";
import React, { useEffect } from "react";
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
  index?: Number;
};

function NormalVideo({
  src = "",
  width = "100%",
  height = "100%",
  className = "",
  id = "",
  index = 0,
}: TProps) {
  const dispatch = useDispatch();
  const indexActive = useSelector(
    (state: AppState) => state.newsReducer.indexVideo
  );
  const [video, state, controls, waiting] = useVideo(
    <video
      className={styles.video}
      width={width}
      height={height}
      src={src ?? ""}
      autoPlay={index === 0 && indexActive === null}
      playsInline
      loop
    ></video>
  );

  useEffect(() => {
    if (index === 0 && indexActive) {
      dispatch(newsReducer.actions.setIndexVideo(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.duration) {
      dispatch(newsReducer.actions.setLoadingId({ id, loaded: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, state.duration]);

  useEffect(() => {
    if (index === indexActive) {
      controls.play();
    } else {
      controls.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, indexActive]);

  return (
    <div className={`${styles.containerVideo} ${className}`}>
      {video}
      {waiting.current?.duration ? (
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
      ) : (
        <Loading loading />
      )}
    </div>
  );
}

export default NormalVideo;
