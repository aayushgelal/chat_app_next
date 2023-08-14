"use client";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import VideoPlayer from "../components/VideoPlayer";
import Options from "../components/Options";
import Peer from "simple-peer";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const VideoCall = ({ params }: { params: { id: string } }) => {
  const socket = useRef(io("localhost:4000"));

  socket.current.emit("join", params.id);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      });
    socket.current.on(
      "callUser",
      ({
        from,
        name: callerName,
        signal,
      }: {
        from: string;
        name: string;
        signal: any;
      }) => {
        setCall({
          isReceivingCall: true,
          from: params.id,
          name: callerName,
          signal: signal,
        });
      }
    );
  }, []);
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream: stream });
    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: params.id });
    });
  };
  return (
    <div>
      <VideoPlayer />
      <Options />
    </div>
  );
};

export default VideoCall;
