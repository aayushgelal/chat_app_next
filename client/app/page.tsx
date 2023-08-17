"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LoginPage from "./(pages)/login/page";
import ChatPage from "./(pages)/chat/page";

export default function Home() {
  const router = useRouter();

  const [isloggedin, setisloggedin] = useState(false);
  const token = useSelector((state: any) => state.auth.token);

  return isloggedin ? <LoginPage /> : <ChatPage />;
}
