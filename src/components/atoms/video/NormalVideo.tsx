/* eslint-disable no-unused-vars */
import { useVideo } from "react-use";
import styles from "./Video.module.scss";
import React, { useEffect, useState } from "react";
import IconPause from "../icons/IconPause";
import IconPlay from "../icons/IconPlay";
import IconUnMute from "../icons/IconUnMute";
import IconMute from "../icons/IconMute";

type TProps = {
  src?: string;
  width?: string | number;
  height?: string | number;
};

function NormalVideo({ src = "", width = "100%", height = "100%" }: TProps) {
  const [url, setUrl] = useState(src);
  const [video, state, controls] = useVideo(
    <video
      className={styles.video}
      width={width}
      height={height}
      src={src}
      autoPlay
    ></video>
  );

  // useEffect(() => {
  //   console.log(src);
  //   const blob = new Blob([src], {
  //     type: "video/mp4",
  //   }); // create a blob of buffer
  //   setUrl(URL.createObjectURL(blob));
  // }, [src]);

  return (
    <div className={styles.containerVideo}>
      {video}
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
    </div>
  );
}

export default NormalVideo;
