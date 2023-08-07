import React from "react";

export default function ReceivedMessageBox({ message }: { message: String }) {
  return (
    <div className="px-4 py-1 mt-5 bg-sky-900 text-white rounded-lg relative w-fit">
      {message}
    </div>
  );
}
