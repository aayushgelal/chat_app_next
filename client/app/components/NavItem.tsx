import Link from "next/link";
import React from "react";
import { NavItemProps } from "../types";
import { AiFillLock, AiOutlineLock, AiTwotoneLock } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function NavItem({
  name,
  link,
  icon,
  size,
  onClick,
}: NavItemProps) {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        router.push(`${link}`);
        onClick ? onClick(e) : null;
      }}
      style={{ width: size }}
      className={`m-3 cursor-pointer bg-sky-600 flex items-center justify-center text-center rounded-lg px-3 py-2 text-white `}
    >
      <AiTwotoneLock className="mr-2" />
      {name}
    </div>
  );
}
