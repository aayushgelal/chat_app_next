import { RootState } from "@/app/store";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  AiFillPlayCircle,
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiOutlineSend,
} from "react-icons/ai";
import { FcConferenceCall, FcVideoCall } from "react-icons/fc";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const currentuser = useSelector((state: RootState) => state.current_user);
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  };
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    console.log("done");

    let socket = io("localhost:4000");
    socket.emit("message", "hi");
  };

  return (
    <div className="flex-1 px-2 flex flex-col">
      <div className=" items-center justify-between px-2 border-b-2 h-100 flex font-semibold font-xl space-x-2">
        <div className="flex items-center">
          <Image src="/vercel.svg" alt="" width={50} height={50} />
          {currentuser.name}
        </div>
        <div>
          <FcVideoCall />
        </div>
      </div>
      <div className="flex-1 overflow-scroll">{message}</div>
      <form onSubmit={(e) => sendMessage(e)}>
        <div className="flex items-center space-x-1 p-2 ">
          <AiFillPlusCircle size={30} />

          <textarea
            onKeyDown={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
            placeholder="Aa"
            title="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" py-1 resize-none text-left px-3 text-sm w-full h-8 rounded-full outline outline-gray-200"
          ></textarea>
          <button type="submit">
            <AiOutlineSend color="red" size={30} className="cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
}
