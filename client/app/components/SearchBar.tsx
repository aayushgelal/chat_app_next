"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import dummy from "./DummyData";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../types";
import { RootState } from "../store";
import { filteredUsers } from "../reducers/usersreducer";

export default function SearchBar() {
  const [searchbar, setsearchbar] = useState(false);
  const dispatch = useDispatch();
  const users: userState[] = useSelector(
    (state: RootState) => state.users.users
  );

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      dispatch(filteredUsers(users));
    } else {
      const filteredData = users.filter((el) => {
        //if no input the return the original

        return el.name.toLowerCase().includes(e.target.value);
      });
      dispatch(filteredUsers(filteredData));
    }
  };

  return (
    <div className=" max-w-full flex items-center justify-between px-3 rounded-full outline outline-gray-200">
      <input
        onChange={(e) => onchange(e)}
        placeholder="Search your Chats"
        className=" focus:outline-none p-2 "
      />

      <AiOutlineSearch
        size={20}
        color="gray"
        onClick={() => {
          setsearchbar(!searchbar);
        }}
        onClickCapture={() => {}}
      />
    </div>
  );
}
