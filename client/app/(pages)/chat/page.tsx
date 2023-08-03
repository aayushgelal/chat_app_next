"use client";

import SideBar from "@/app/(pages)/chat/components/SideBar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatScreen from "./components/ChatScreen";
import { addUsers } from "@/app/reducers/usersreducer";
import { GET_USER_ROUTE } from "@/app/utils/ApiRoutes";
import axios from "axios";

export default function page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isloggedin, setisloggedin] = useState(false);
  const getUserData = async () => {
    const { data: users } = await axios.get(GET_USER_ROUTE);
    dispatch(addUsers(users));
  };
  useEffect(() => {
    getUserData();
  }, []);

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
