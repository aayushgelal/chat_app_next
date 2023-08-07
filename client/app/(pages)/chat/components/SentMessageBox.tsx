import React from "react";

export default function SentMessageBox({ message }: { message: String }) {
  return (
    <div className="px-4 py-1 mt-5 bg-sky-500 rounded-lg ml-auto mr-2 w-fit">
      {message}
    </div>
  );
}
