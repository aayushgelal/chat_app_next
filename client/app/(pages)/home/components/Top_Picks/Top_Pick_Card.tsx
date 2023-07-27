"use client";
import React, { useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import "./Top_Pick.global.css";

const ProgressBar = ({ Progress_ref, audio_ref, duration }: any) => {
  const [timeProgress, setTimeProgress] = useState(0);

  const handleProgressChange = () => {
    audio_ref.current.currentTime = Progress_ref?.current.value;
    setTimeProgress(audio_ref.current.currentTime);
  };
  return (
    <div>
      <span className="time current">{timeProgress}</span>
      <input
        type="range"
        className="input"
        ref={Progress_ref}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className="time">{duration}</span>
    </div>
  );
};

export default function Top_Pick_Card() {
  const audio_ref: any = useRef();
  const [isplaying, setisPlaying] = useState(false);

  const handleClick = () => {
    if (isplaying) {
      audio_ref.current.pause();
    } else {
      audio_ref.current.play();
    }
    setisPlaying(!isplaying);
  };
  return (
    <div className="shadow-lg  mw-96  px-3 m-4 rounded-lg">
      <h1 className="heading3">Lofi Track 1</h1>
      <div>
        <button onClick={handleClick}>
          {isplaying ? (
            <AiFillPauseCircle className="" size={40} color="gray" />
          ) : (
            <AiFillPlayCircle className="" size={40} color="gray" />
          )}
        </button>
        <audio
          src="my_audio_file.ogg"
          ref={audio_ref}
          controlsList="nodownload"
        />
      </div>
    </div>
  );
}
