import { add_current_user } from "@/app/reducers/currentusereducer";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function SideBarItem({ user }: any) {
  const dispatch = useDispatch();

  return (
    <div
      className="m-2 rounded-2xl py-4 space-x-3 flex w-full  hover:bg-gray-50 cursor-pointer "
      onClick={() => {
        dispatch(add_current_user(user));
      }}
    >
      <img
        alt=""
        style={{
          borderRadius: "50%",
          height: 60,
          width: 60,
          objectFit: "cover",
        }}
        src="/DEAD.png"
      />
      <div className="flex flex-col justify-start">
        <h1 className="font-semibold">{user.name}</h1>
        <div className="flex space-x-1 text-sm  items-baseline">
          <h1>hello Bro</h1>
          <h1 className="text-gray-500 text-xs ">7m</h1>
        </div>
      </div>
      <div className="flex items-center">.</div>
    </div>
  );
}
