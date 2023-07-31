import Image from "next/image";
import React from "react";

export default function SideBarItem() {
  return (
    <div
      className="m-2 rounded-2xl py-4 space-x-3 flex w-full  hover:bg-gray-50 cursor-pointer "
      onClick={() => {}}
    >
      <div>
        <Image
          alt=""
          className=" rounded-[50%]"
          src="/DEAD.png"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col justify-start">
        <h1 className="font-semibold">Pratisthit Raj Baral</h1>
        <div className="flex space-x-1 text-sm  items-baseline">
          <h1>hello Bro</h1>
          <h1 className="text-gray-500 text-xs ">7m</h1>
        </div>
      </div>
      <div className="flex items-center">.</div>
    </div>
  );
}
