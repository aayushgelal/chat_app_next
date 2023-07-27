"use client";
import React, { useEffect, useRef } from "react";
import MusicGenre_Card from "./Music_Card";

export default function Music_Card_List() {
  const scroll_div_ref = useRef<HTMLDivElement | null>(null);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const array = [1, 32, 32432, 4, 324, 23, 423];

  useEffect(() => {
    const scroll_div = scroll_div_ref.current;
    if (scroll_div) {
      let animationFrameId: number;

      const autoScroll = () => {
        if (!isMouseOver) {
          scroll_div.scrollLeft += 1;

          // Adjust the scroll speed as needed

          // Check if the side of the container is reached

          if (
            scroll_div.scrollLeft +
              scroll_div.offsetWidth -
              scroll_div.scrollWidth ==
            0
          ) {
            scroll_div.scrollTo(10, 0);
          }
          animationFrameId = requestAnimationFrame(autoScroll);
        }
      };
      animationFrameId = requestAnimationFrame(autoScroll);

      // Clean up the animation frame on component unmount
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isMouseOver]);

  return (
    <div
      ref={scroll_div_ref}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="  flex p-4  space-x-10  overflow-x-auto scroll-hide "
    >
      {array.map((e, index) => (
        <MusicGenre_Card
          key={index}
          name={`${index}`}
          link={"/pop"}
          color="#ffe200"
        />
      ))}
    </div>
  );
}
