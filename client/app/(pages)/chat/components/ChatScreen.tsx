import { RootState } from "@/app/store";
import { MessageType } from "@/app/types";
import {
  ADD_IMAGE_ROUTE,
  GET_MESSAGE_ROUTE,
  Host,
} from "@/app/utils/ApiRoutes";
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
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import SentMessageBox from "./SentMessageBox";
import ReceivedMessageBox from "./ReceivedMessageBox";
import { BsEmojiLaughing } from "react-icons/bs";
import AddFile from "./AddFile";
import { removeImage } from "@/app/reducers/imagereducer";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import CallTab from "./CallTab";
import { addSignal } from "@/app/reducers/signalreducer";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [incomingCall, setIncomingCall] = useState({
    isCalling: false,
    from: "",
    name: "",
    signal: null,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const currentuser = useSelector((state: RootState) => state.current_user);
  const fromuser = useSelector((state: RootState) => state.auth);
  const [isRecipientOnline, setRecipientOnline] = useState(false);
  const selectedimage = useSelector((state: RootState) => state.selected_image);
  const [emojipicker, setemojipicker] = useState(false);
  const socket = useRef(io("localhost:4000"));
  socket.current.emit("join", fromuser.email);
  useEffect(() => {
    // ... your existing code ...
    console.log(messageContainerRef.current?.scrollHeight);
    console.log(messageContainerRef.current?.scrollTop);
    // Scroll down to the latest message when messageList updates
    if (messageContainerRef.current) {
      messageContainerRef.current.scroll({
        behavior: "smooth",
        top: messageContainerRef.current.scrollHeight,
      });

      // messageContainerRef.current.scrollTop =
      //   messageContainerRef.current.scrollHeight;
      //   messageContainerRef.current.animate()

      // console.log(messageContainerRef.current?.scrollHeight);
      // console.log(messageContainerRef.current?.scrollTop);
    }

    // ... your existing code ...
  }, [currentuser, messageList]);

  useEffect(() => {
    const handleIncomingMessage = (messageItem: any) => {
      const newMessage: MessageType = {
        message: messageItem.message,
        from: messageItem.from,
        to: messageItem.to,
        timestamp: messageItem.timestamp,
        imageurl: `${Host}${messageItem.imageurl}`,
        status: isRecipientOnline ? "delivered" : "sent", // Set the status based on recipient's online status
      };
      console.log(newMessage.imageurl);
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleIncomingCall = ({
      signal,
      from,
      name,
    }: {
      signal: any;
      from: string;
      name: string;
    }) => {
      console.log(from, name, signal);
      dispatch(addSignal({ signal, from, name }));
      setIncomingCall({
        isCalling: true,
        signal: signal,
        from: from,
        name: name,
      });
    };
    const updateOnlineUsers = (users: any) => {
      const isRecipientNowOnline = users.includes(currentuser.email);
      setRecipientOnline(isRecipientNowOnline);
      if (isRecipientNowOnline) {
        // Iterate through the existing messages and update their status to 'delivered'
        const updatedMessageList = messageList.map((m) => {
          if (m.to === currentuser.email && m.status === "sent") {
            return { ...m, status: "delivered" };
          }
          return m;
        });
        setMessageList(updatedMessageList);
      }
    };

    socket.current.on("receive-message", handleIncomingMessage);
    socket.current.on("received-image", handleIncomingMessage);
    socket.current.on("callUser", handleIncomingCall);
    socket.current.on("updateOnlineUsers", updateOnlineUsers);

    return () => {
      socket.current.emit("disconnected");
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((message && selectedimage.image) || selectedimage.image) {
      const formData = new FormData();
      formData.append("image", selectedimage.image);
      formData.append("message", message);
      fromuser.email && formData.append("from", fromuser.email);
      currentuser.email && formData.append("to", currentuser.email);

      axios.post(ADD_IMAGE_ROUTE, formData);

      dispatch(removeImage({}));
    } else if (message) {
      socket.current.emit(
        "add-message",
        message,
        fromuser.email,
        currentuser.email
      );
    }
    setMessage("");
  };

  useEffect(() => {
    const nomessage: MessageType[] = [];
    setMessageList(nomessage);
    const get_prev_message = async () => {
      if (currentuser.email) {
        const { messages } = await axios
          .get(GET_MESSAGE_ROUTE, {
            params: {
              from: fromuser?.email,
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
              imageurl: `${Host}${messageItem.file}`,
            })
          );
          setMessageList(destructuredmessages);
        }
      }
    };
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

  return (
    <div className="  w-full px-2 flex flex-col">
      {incomingCall.isCalling ? (
        <CallTab
          signal={incomingCall.signal}
          name={incomingCall.name}
          from={incomingCall.from}
        />
      ) : null}
      {currentuser.email ? (
        <div
          className={`blur-overlay ${incomingCall.isCalling ? "blur" : ""} `}
        >
          <div className="items-center justify-between py-4 px-2 border-b-2  h-20 flex font-semibold font-xl space-x-2">
            <div className="flex  items-center">
              <img
                alt=""
                style={{
                  borderRadius: "50%",
                  height: 60,
                  width: 60,
                  marginRight: 10,
                  objectFit: "cover",
                }}
                src={`avatars/${currentuser.avatar}.png`}
              />
              {currentuser.name}
            </div>
            <div>
              <FcVideoCall
                onClick={() => {
                  router.push(`/call/${false}`);
                }}
              />
            </div>
          </div>

          <div
            ref={messageContainerRef}
            className="  h-[calc(100vh-180px)] overflow-scroll "
          >
            {messageList &&
              messageList.map((m, index) =>
                m.from === fromuser.email ? (
                  <SentMessageBox
                    message={m.message}
                    timestamp={m.timestamp}
                    key={index}
                    image={m.imageurl}
                    status={m.status}
                  />
                ) : (
                  <ReceivedMessageBox
                    message={m.message}
                    timestamp={m.timestamp}
                    key={index}
                    image={m.imageurl}
                  />
                )
              )}
          </div>

          <form onSubmit={(e) => sendMessage(e)}>
            <div className="  w-9/12  right-auto fixed bottom-0  h-fit ">
              <div className=" relative  flex items-center space-x-5 p-2">
                <AddFile />
                <div className="flex items-center bg-white space-x-1 flex-1 py-1 px-3 h-7 text-left  text-sm  w-fit rounded-full outline outline-gray-200">
                  {selectedimage.imageUrl && (
                    <Image
                      className="absolute bottom-full"
                      src={selectedimage.imageUrl}
                      alt=""
                      height={60}
                      width={60}
                    />
                  )}
                  <textarea
                    onKeyDown={(e) =>
                      e.key == "Enter" ? sendMessage(e) : null
                    }
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
                  <AiOutlineSend
                    color="red"
                    size={20}
                    className="cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
