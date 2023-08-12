import { Host } from "@/app/utils/ApiRoutes";
import Image from "next/image";
import React from "react";

export default function ReceivedMessageBox({
  message,
  timestamp,
  image,
}: {
  message: String;
  timestamp?: Date;
  image?: string;
}) {
  const time = timestamp ? new Date(timestamp) : null;
  return (
    <div className="flex flex-col items-start w-fit ">
      <div className="px-4  py-1 mt-5 bg-sky-900 text-white rounded-lg ">
        {message}
        {image != `${Host}null` ? (
          <img src={image} alt="" className=" h-48 w-48" />
        ) : null}
      </div>
      <div className="mt-1 text-gray-700  text-xs ">
        {time?.getHours()}:{time?.getMinutes()}
      </div>
    </div>
  );
}
