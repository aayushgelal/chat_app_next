import React from "react";
import MusicGenre_Card from "./components/MusicCard/Music_Card";
import { MusicGenreProps } from "../../types";
import "./home.global.css";
import Music_Card_List from "@/app/(pages)/home/components/MusicCard/Music_Card_List";
import Top_Pick_Card from "./components/Top_Picks/Top_Pick_Card";

export default function Home() {
  return (
    <div>
      <h1 className="text-center md:text-left font-semibold text-3xl p-4">
        Discover
      </h1>
      <Music_Card_List />
      <h1 className=" text-center md:text-left font-semibold text-3xl p-4">
        Top Picks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3">
        <Top_Pick_Card />
        <Top_Pick_Card />
        <Top_Pick_Card />
        <Top_Pick_Card />
        <Top_Pick_Card />
      </div>
    </div>
  );
}
