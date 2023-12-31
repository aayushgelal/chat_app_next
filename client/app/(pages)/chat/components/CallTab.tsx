import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FcEndCall, FcVideoCall } from "react-icons/fc";

export default function CallTab({
  name,
  from,
  signal,
}: {
  signal: any;
  name: string;
  from: string;
}) {
  console.log(signal);
  const router = useRouter();
  return (
    <div className="flex items-center justify-center inset-0 z-10 h-full w-full absolute  ">
      <div className=" flex flex-col items-center animate-pulse  justify-between rounded-lg  border-t-2 border-gray -50 shadow-lg h-64  w-96 p-4">
        <h1 className=" font-semibold">{name}</h1>

        <h2 className=" font-medium">{from}</h2>
        <div className="flex justify-around w-full">
          <div className=" rounded-full p-4 bg-green-50">
            <Link
              href={{
                pathname: "/call/true",
              }}
            >
              <FcVideoCall size={40} />
            </Link>
          </div>
          <div className=" rounded-full  p-4 bg-green-50">
            <FcEndCall size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
