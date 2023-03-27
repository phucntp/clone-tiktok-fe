/* eslint-disable no-unused-vars */
"use client";

import { useVideo } from "react-use";
import styles from "./Video.module.scss";
import React, { useEffect, useMemo } from "react";
import IconPause from "../icons/IconPause";
import IconPlay from "../icons/IconPlay";
import IconUnMute from "../icons/IconUnMute";
import IconMute from "../icons/IconMute";
import Loading from "@/components/molecules/ui/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store";
import listNewsReducer from "@/reducers/listNews";
import LoadingBall from "@/components/molecules/ui/Loading/LoadingBall";

type TProps = {
  src?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  id?: string;
  loaded?: boolean;
  index?: Number;
  idUrl?: string;
};

function NormalVideo({
  src = "",
  width = "100%",
  height = "100%",
  className = "",
  id = "",
  index = 0,
  idUrl,
}: TProps) {
  const dispatch = useDispatch();
  const indexActive = useSelector(
    (state: AppState) => state.listNewsReducer.indexVideo
  );
  const [video, state, controls, waiting] = useVideo(
    <video
      className={styles.video}
      width={width}
      height={height}
      src={src}
      playsInline
      loop
      preload="metadata"
    ></video>
  );

  useEffect(() => {
    if (index === 0 && indexActive) {
      dispatch(listNewsReducer.actions.setIndexVideo(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.duration) {
      dispatch(listNewsReducer.actions.setLoadingId({ id, loaded: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, state.duration]);

  useEffect(() => {
    controls.pause();
    if (index === indexActive || (index === 0 && !indexActive)) {
      controls.play();
    }
    return () => {
      controls.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, indexActive]);

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
        {waiting.current?.duration ? displayVideo : <Loading loading />}
        {/* <br />
      <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button> */}
      </div>
    </>
  );
}

export default NormalVideo;
