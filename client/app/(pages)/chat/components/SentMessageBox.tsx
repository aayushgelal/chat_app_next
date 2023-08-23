import { Host } from "@/app/utils/ApiRoutes";
import Image from "next/image";
import React, { useState } from "react";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

export default function SentMessageBox({
  message,
  timestamp,
  image,
  status,
}: {
  message: String;
  timestamp?: Date;
  image?: string;
  status?: string;
}) {
  const time = timestamp ? new Date(timestamp) : null;
  const [showtime, setshowtime] = useState(false);
  var yesimage = true;
  if (image == `${Host}null` || image == `${Host}undefined`) {
    yesimage = false;
    console.log(image);
  }

  return (
    <div className="flex flex-col m-4  items-end">
      <div
        onClick={() => setshowtime(!showtime)}
        className="mt-5 shadow-md rounded-lg ml-auto mr-2 w-fit"
      >
        <div className="mx-4 my-1 flex items-center  justify-end space-x-3">
          {message}
          {status == "sent" ? (
            <BsCheckCircle size={12} className=" ml-5  text-gray-200" />
          ) : (
            <BsCheckCircleFill size={12} className=" ml-5  text-gray-200" />
          )}
        </div>
        {yesimage ? (
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
      {showtime && (
        <div className="mt-1 text-gray-700  text-xs ">
          {time?.getHours()}:{time?.getMinutes()}
        </div>
      )}
    </div>
  );
}
