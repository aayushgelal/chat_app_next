import { MutableRefObject, Ref } from "react";

const VideoPlayer = ({
  myVideo,
}: {
  myVideo: MutableRefObject<HTMLVideoElement | null>;
}) => {
  return <video ref={myVideo} width={200} height={200} />;
};
export default VideoPlayer;
