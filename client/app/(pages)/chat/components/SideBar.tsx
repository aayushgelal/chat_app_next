import React, { useEffect } from "react";
import SideBarItem from "./SideBarItem";
import SearchBar from "../../../components/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { userState } from "@/app/types";

export default function SideBar() {
  const allusers: userState[] = useSelector(
    (state: RootState) => state.users.filtereduser
  );
  const me = useSelector((state: RootState) => state.auth);
  const otherusers: userState[] = allusers.filter(
    (user) => user.email != me.email
  );

  return (
    <div className="w-96  p-4 space-y-3 border-t-2  border-r-2 ">
      <h1 className="font-semibold text-2xl "> Chats</h1>
      <SearchBar />
      {otherusers
        ? otherusers.map((user: any) => {
            return <SideBarItem key={user.id} user={user}  />;
          })
        : null}
    </div>
  );
}
