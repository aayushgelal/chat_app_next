import React, { useEffect } from "react";
import SideBarItem from "./SideBarItem";
import SearchBar from "../../../components/SearchBar";
import { useSelector } from "react-redux";
import { UsersState } from "@/app/types";
import { RootState } from "@/app/store";

export default function SideBar() {
  const users: UsersState[] = useSelector((state: RootState) => state.users);

  return (
    <div className="w-96  p-4 space-y-3 border-t-2  border-r-2 ">
      <h1 className="font-semibold text-2xl "> Chats</h1>
      <SearchBar />
      {users
        ? Object.entries(users).map(([initialLetter, userList]) => {
            return userList.map((user: any) => {
              return <SideBarItem key={user.id} user={user} />;
            });
          })
        : null}
    </div>
  );
}
