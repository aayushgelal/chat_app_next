import React from "react";

export default function ReceivedMessageBox({
  message,
  timestamp,
}: {
  message: String;
  timestamp?: Date;
}) {
  const time = timestamp ? new Date(timestamp) : null;
  return (
    <div className="flex flex-col items-start w-fit ">
      <div className="px-4  py-1 mt-5 bg-sky-900 text-white rounded-lg ">
        {message}
      </div>
      <div className="mt-1 text-gray-700  text-xs ">
        {time?.getHours()}:{time?.getMinutes()}
      </div>
    </div>
  );
}
