"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Head from "next/head";
import HomePage from "./(pages)/home/page";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [isloggedin, setisloggedin] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
  useEffect(() => {
    token ? setisloggedin(true) : setisloggedin(false);
  }, [token]);
  if (!token) {
    router.push("/login");
  } else {
    router.push("/chat");
  }
  return (
    <>
      <head>
        <title>Chat App</title>
      </head>
    </>
  );
}
