import { RootState } from "@/app/store";
import { MessageType } from "@/app/types";
import { GET_MESSAGE_ROUTE } from "@/app/utils/ApiRoutes";
import axios from "axios";
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
import MessageBox from "./SentMessageBox";
import SentMessageBox from "./SentMessageBox";
import ReceivedMessageBox from "./ReceivedMessageBox";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const currentuser = useSelector((state: RootState) => state.current_user);
  const fromuser = useSelector((state: RootState) => state.auth);

  let socket = io("localhost:4000");
  socket.emit("join", currentuser);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", message, fromuser.email, currentuser.email);
    setMessage("");
  };
  const get_prev_message = async () => {
    console.log(currentuser, fromuser);
    if (currentuser.email) {
      const { messages } = await axios
        .get(GET_MESSAGE_ROUTE, {
          params: {
            from: fromuser.email ? fromuser.email : "aayushgelal4@gmail.com",
            to: currentuser?.email,
          },
        })
        .then((response) => response.data);
      if (messages != null) {
        const destructuredmessages: MessageType[] = messages?.map(
          (messageItem: any) => ({
            message: messageItem.messageText,
            from: messageItem.senderEmail,
            to: messageItem.receiverEmail,
          })
        );
        setMessageList(destructuredmessages);
      }
    }
  };
  useEffect(() => {
    get_prev_message();
  }, [currentuser]);
  useEffect(() => {
    socket.on("message", (nm) => {
      const newMessage: MessageType = {
        message: nm.message,
        from: nm.from,
        to: nm.to,
      };
      console.log(newMessage);
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);
  return currentuser.email ? (
    <div className="flex-1 bg-red-50 px-2 flex flex-col">
      <div className=" items-center justify-between px-2 border-b-2 h-100 flex font-semibold font-xl space-x-2">
        <div className="flex items-center">
          <Image src="/vercel.svg" alt="" width={50} height={50} />
          {currentuser.name}
        </div>
        <div>
          <FcVideoCall />
        </div>
      </div>
      <div className=" flex flex-col overflow-hidden ">
        <div className="overflow-auto">
          {messageList &&
            messageList.map((m, index) =>
              m.from === fromuser.email ? (
                <SentMessageBox message={m.message} key={index} />
              ) : (
                <ReceivedMessageBox message={m.message} key={index} />
              )
            )}
        </div>
      </div>
      <form onSubmit={(e) => sendMessage(e)}>
        <div className=" bg-white w-full flex-1  z-10 flex fixed   bottom-0 items-center space-x-1 p-2">
          <AiFillPlusCircle size={30} />

          <textarea
            onKeyDown={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
            placeholder="Aa"
            title="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" py-1 resize-none text-left px-3 text-sm flex-1 h-8 rounded-full outline outline-gray-200"
          ></textarea>
          <button type="submit">
            <AiOutlineSend color="red" size={30} className="cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  ) : null;
}
