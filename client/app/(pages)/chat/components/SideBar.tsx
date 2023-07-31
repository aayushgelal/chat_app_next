import React from "react";
import SideBarItem from "./SideBarItem";
import SearchBar from "../../../components/SearchBar";

export default function SideBar() {
  return (
    <div className="w-96  p-4 space-y-3 border-t-2  border-r-2 ">
      <h1 className="font-semibold text-2xl "> Chats</h1>
      <SearchBar />
      <SideBarItem />
      <SideBarItem />
      <SideBarItem />
      <SideBarItem /> <SideBarItem />
      <SideBarItem />
    </div>
  );
}
