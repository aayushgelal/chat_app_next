import Link from "next/link";
import React from "react";
import { NavItemProps } from "../types";
import { AiFillLock, AiOutlineLock, AiTwotoneLock } from "react-icons/ai";

export default function NavItem({ name, link, icon, size }: NavItemProps) {
  return (
    <div
      style={{ width: size }}
      className={`m-3 cursor-pointer bg-sky-600 flex items-center justify-center text-center rounded-lg px-3 py-2 text-white `}
    >
      <Link
        href={`${link}`}
        className=" flex flex-row   items-center justify-center"
      >
        <AiTwotoneLock className="mr-2" />
        {name}{" "}
      </Link>
    </div>
  );
}
