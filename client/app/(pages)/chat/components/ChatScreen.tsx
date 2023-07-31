import Image from "next/image";
import React, { MouseEventHandler, useState } from "react";
import {
  AiFillPlayCircle,
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiOutlineSend,
} from "react-icons/ai";
import { FcConferenceCall, FcVideoCall } from "react-icons/fc";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  };

  return (
    <div className="flex-1 px-2 flex flex-col">
      <div className=" items-center justify-between px-2 border-b-2 h-100 flex font-semibold font-xl space-x-2">
        <div className="flex items-center">
          {" "}
          <Image src="" alt="" width={50} height={50} />
          Pratishit Raj Baral
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