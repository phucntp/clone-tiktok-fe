/* eslint-disable no-unused-vars */
import { useVideo } from "react-use";

import React from "react";

type TProps = {
  src?: string;
  width?: string | number;
  height?: string | number;
};

function NormalVideo({ src = "", width = "100%", height = "100%" }: TProps) {
  const [video, state, controls] = useVideo(
    <video width={width} height={height} src={src} autoPlay />
  );

  return (
    <>
      {video}
      {/* <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.play}>Play</button>
      <br />
      <button onClick={controls.mute}>Mute</button>
      <button onClick={controls.unmute}>Un-mute</button>
      <br />
      <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button> */}
    </>
  );
}

export default NormalVideo;
