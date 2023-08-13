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
      <div className="mt-5 shadow-md rounded-lg ml-auto mr-2 w-fit">
        <div className="mx-4 my-1">{message}</div>
        {image != `${Host}null` ? (
          <div>
            <img
              src={image}
              alt=""
              className=" h-52 w-52 align-middle"
              style={{
                objectFit: "cover",

                overflow: "hidden",
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="mt-1 text-gray-700  text-xs ">
        {time?.getHours()}:{time?.getMinutes()}
      </div>
    </div>
  );
}
