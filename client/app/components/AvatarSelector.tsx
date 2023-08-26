import React, { useContext, useState } from "react";
import { AvatarContext } from "./AvatarContext";

export default function AvatarSelector() {
  const context = useContext(AvatarContext);
  const avatars = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];
  const handleAvatarChange = (avatar: string) => {
    if (avatar == null) {
      avatar = "avatar1";
      context?.setselectedavatar ? context.setselectedavatar(avatar) : null;
    } else {
      context?.setselectedavatar ? context.setselectedavatar(avatar) : null;
    }
  };
  return (
    <div>
      <li className="flex">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="cursor-pointer relative  p-0"
            onClick={() => handleAvatarChange(avatar)}
          >
            <img
              className=" h-20  rounded-full"
              src={`/avatars/${avatar}.png`}
            />
            {context?.selectedavatar == avatar ? (
              <div className="absolute  top-11  h-full right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-sky-600 animate-pulse"
                  viewBox="0 0 30 30"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </li>
    </div>
  );
}
