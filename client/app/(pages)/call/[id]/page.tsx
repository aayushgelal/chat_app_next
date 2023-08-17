"use client";
import React, { Ref, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import VideoPlayer from "../components/VideoPlayer";
import Options from "../components/Options";
import Peer from "simple-peer";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store";

interface CallData {
  signal?: any;
  isReceivingCall?: boolean;
  from?: string | null;
  name?: string;
}

const VideoCall = ({ params }: { params: any }) => {
  const router = useRouter();
  const from = useSelector((state: RootState) => state.auth.email);
  const to = useSelector((state: RootState) => state.current_user.email);
  const socket = useRef(io("localhost:4000"));
  socket.current.emit("join", from);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState("");
  const [call, setCall] = useState<CallData>({});
  const [me, setMe] = useState("");
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }

        setStream(currentStream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    if (params.id == "false") {
      socket.current.on(
        "callUser",
        ({
          from: from,
          name: name,
          signal: signal,
        }: {
          from: string;
          name: string;
          signal: any;
        }) => {
          setCall({
            isReceivingCall: true,
            from: from,
            name: name,
            signal: signal,
          });
        }
      );
      //check if the user is calling or receiving false=calling
      callUser(to);
    } else {
      answerCall();
    }
  }, [callAccepted, callEnded, call.signal]);
  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    if (stream) {
      const tracks = stream.getTracks();

      // Stop video tracks (camera)
      const videoTracks = tracks.filter((track) => track.kind === "video");
      videoTracks.forEach((track) => {
        track.stop();
      });
      setStream(undefined);
    }

    router.back();
  };
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    socket.current.on(
      "callUser",
      ({ signal, from, name }: { signal: any; from: string; name: string }) => {
        if (signal) {
          peer.signal(signal);
        }
        setCall({
          isReceivingCall: true,
          from: from,
          name: name,
          signal: signal,
        });
      }
    );
    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      console.log(currentStream);
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
    if (call.signal) peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: from,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      console.log(currentStream);
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    socket.current.on("callAccepted", (signal) => {
      console.log("call accepted");
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  return (
    <div>
      <video ref={userVideo} autoPlay={true} />
      <video ref={myVideo} autoPlay={true} muted={true} />
      <Options />
      <button onClick={leaveCall} placeholder="sadasd">
        ass
      </button>
    </div>
  );
};

export default VideoCall;
