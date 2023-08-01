"use client";
import Link from "next/link";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { URL } from "url";
import { url } from "inspector";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import {
  AiFillProfile,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AuthSlice, logOut, setCredentials } from "../reducers/authreducer";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dataselector = useSelector((state: any) => state.auth.token);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isloggedin, setisloggedin] = useState(false);
  const [logout_div, setlogout_div] = useState(false);

  const showLogoutDiv = () => {
    if (buttonRef.current) {
      buttonRef.current.style.display = "block";
      setlogout_div(true);
    }
  };

  const hideLogoutDiv = () => {
    if (buttonRef.current) {
      buttonRef.current.style.display = "none";
      setlogout_div(false);
    }
  };
  useEffect(() => {
    dataselector ? setisloggedin(true) : setisloggedin(false);
  }, [dataselector]);
  return (
    <div
      id="navbar-main"
      className=" sticky  flex items-center justify-between shadow-sm p-4"
    >
      <div className="flex items-center">
        <Image src="/vercel.svg" width={150} height={150} alt="" />
        {/* <a className="btn btn-ghost normal-case text-xl">My Website</a> */}
      </div>

      <div className="flex justify-between items-center space-x-6 ">
        <SearchBar />
        {isloggedin ? (
          <div className="flex items-center space-x-3">
            <BsPersonCircle
              className="cursor-pointer"
              onClick={() => {
                logout_div ? hideLogoutDiv() : showLogoutDiv();
              }}
            />
            <button
              ref={buttonRef}
              className="  text-white bg-sky-500 px-2 py-2 rounded-lg"
              onClick={() => {
                dispatch(logOut({}));
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : null}
        <button>
          <AiOutlineShoppingCart size={30} color="gray" />
        </button>
      </div>
    </div>
  );
}
