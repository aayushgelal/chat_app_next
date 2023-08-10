import Image from "next/image";
import React from "react";

export default function SentMessageBox({
  message,
  timestamp,
  image
}: {
  message: String;
  timestamp?: Date;
  image?:string
}) {
  const time = timestamp ? new Date(timestamp) : null;

  return (
    <div className="flex flex-col  items-end">
      <div className="px-4 py-1 mt-5   bg-sky-500 rounded-lg ml-auto mr-2 w-fit">
        {message}
        {image&&<Image src={image} height={200} width={200} alt="" />}
      </div>
      <div className="mt-1 text-gray-700  text-xs ">
        {time?.getHours()}:{time?.getMinutes()}
      </div>
    </div>
  );
}
