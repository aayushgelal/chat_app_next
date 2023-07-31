"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import dummy from "./DummyData";

export default function SearchBar() {
  const [searchbar, setsearchbar] = useState(false);
  const [searcedterm, setsearchedterm] = useState("");
  const filteredData = dummy.filter((el) => {
    //if no input the return the original
    if (searcedterm === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.text.toLowerCase().includes(searcedterm);
    }
  });

  return (
    <div className=" max-w-full flex items-center justify-between px-3 rounded-full outline outline-gray-200">
      <input
        onChange={(e) => setsearchedterm(e.target.value.toLowerCase())}
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
