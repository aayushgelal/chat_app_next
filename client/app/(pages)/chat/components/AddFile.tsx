import { addImage } from "@/app/reducers/imagereducer";
import React, {
  FormEvent,
  useRef,
  useState,
} from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";

export default function AddFile() {
  const dispatch = useDispatch();
  const [selectedimage, setselectedimage] = useState<String | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      dispatch(addImage({ imageUrl: imageUrl, image: imageFile }));
    }
  };
  const inputref = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = (event: FormEvent) => {
    event.preventDefault(); // Prevent the form from submitting

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
