import { RootState } from "@/app/store";
import { MessageType } from "@/app/types";
import { GET_MESSAGE_ROUTE } from "@/app/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { BsEmojiLaughing } from "react-icons/bs";
import AddFile from "./AddFile";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const currentuser = useSelector((state: RootState) => state.current_user);
  const fromuser = useSelector((state: RootState) => state.auth);
  const [emojipicker, setemojipicker] = useState(false);
  const socket = useRef(io("localhost:4000"));
  socket.current.emit("join", fromuser.email);

  useEffect(() => {
    const handleIncomingMessage = (nm: any) => {
      const newMessage: MessageType = {
        message: nm.message,
        from: nm.from,
        to: nm.to,
        timestamp: nm.timestamp,
      };
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.current.on("receive-message", handleIncomingMessage);
  }, [socket.current]);
  useEffect(() => {
    get_prev_message();
  }, [currentuser]);

  // useEffect(() => {
  //   socket.on("message", (nm) => {
  //     const newMessage: MessageType = {
  //       message: nm.message,
  //       from: nm.from,
  //       to: nm.to,
  //     };
  //     console.log(newMessage);
  //     setMessageList((prevMessages) => [...prevMessages, newMessage]);
  //   });
  //   return () => {
  //     // Clean-up logic here
  //     socket.off("message");
  //   };
  // }, [socket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.current.emit(
      "add-message",
      message,
      fromuser.email,
      currentuser.email
    );
    setMessage("");
  };

  const get_prev_message = async () => {
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
            timestamp: messageItem.createdAt,
          })
        );
        setMessageList(destructuredmessages);
      }
    }
  };

  return currentuser.email ? (
    <div className="  w-full bg-red-50 px-2 flex flex-col">
      <div className=" items-center justify-between px-2 border-b-2 h-100 flex font-semibold font-xl space-x-2">
        <div className="flex items-center">
          <Image src="/vercel.svg" alt="" width={50} height={50} />
          {currentuser.name}
        </div>
        <div>
          <FcVideoCall />
        </div>
      </div>
      <div className="  h-sc  overflow-scroll ">
        {messageList &&
          messageList.map((m, index) =>
            m.from === fromuser.email ? (
              <SentMessageBox
                message={m.message}
                timestamp={m.timestamp}
                key={index}
              />
            ) : (
              <ReceivedMessageBox
                message={m.message}
                timestamp={m.timestamp}
                key={index}
              />
            )
          )}
      </div>

      <form onSubmit={(e) => sendMessage(e)}>
        <div className="  w-9/12  right-auto fixed bottom-0  h-fit p-4">
          <div className=" relative  flex items-center space-x-5 p-2">
            <AddFile />
            <div className="flex items-center bg-white space-x-1 flex-1 py-1 px-3 h-7 text-left  text-sm  w-fit rounded-full outline outline-gray-200">
              <textarea
                onKeyDown={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
                placeholder="Aa"
                title="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="outline-none w-full h-full resize-none "
              ></textarea>
              <div className="absolute right-0 bottom-full">
                {emojipicker && (
                  <EmojiPicker
                    onEmojiClick={(e, data) => {
                      setMessage((prevmessage) => prevmessage + data.emoji);
                    }}
                  />
                )}
              </div>
              <BsEmojiLaughing
                color="gray"
                size={20}
                onClick={() => setemojipicker(!emojipicker)}
              />
            </div>

            <button type="submit">
              <AiOutlineSend color="red" size={20} className="cursor-pointer" />
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
}
