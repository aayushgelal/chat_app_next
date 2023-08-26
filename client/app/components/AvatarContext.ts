import React, { useState, createContext, SetStateAction } from "react";

export const AvatarContext = createContext<
  | {
      selectedavatar: string;
      setselectedavatar: React.Dispatch<React.SetStateAction<string>> | null;
    }
  | undefined
>({ selectedavatar: "", setselectedavatar: null });
