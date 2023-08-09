import React, { LegacyRef, useRef } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFileArrowUp } from "react-icons/bs";

export default function AddFile() {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      console.log(imageFile, imageUrl);
    }
  };
  const inputref = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    inputref.current?.click();
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={inputref}
      />
      <button onClick={handleButtonClick}>
        <AiFillPlusCircle size={24} />
      </button>
    </div>
  );
}
