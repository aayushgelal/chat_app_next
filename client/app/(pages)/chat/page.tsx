"use client";

import SideBar from "@/app/(pages)/chat/components/SideBar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatScreen from "./components/ChatScreen";

export default function page() {
  const router = useRouter();

  const [isloggedin, setisloggedin] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
 
  // useEffect(() => {
  //   token ? setisloggedin(true) : setisloggedin(false);
  // }, [token]);
  // if (!token) {
  //   router.push("/login");
  // } else {
  //   router.push("/chat");
  // }
  return (
    <div className="flex flex-1">
      <SideBar />
      <ChatScreen />
    </div>
  );
}
