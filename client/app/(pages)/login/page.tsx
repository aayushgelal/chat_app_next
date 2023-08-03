"use client";
import React, { useState, useEffect } from "react";
import "./login.global.css";
import NavItem from "../../components/NavItem";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseAuth } from "../../utils/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/app/reducers/authreducer";
import axios, { Axios, AxiosResponse } from "axios";
import { CHECK_USER_ROUTE } from "../../utils/ApiRoutes";
import { UsersState } from "@/app/types";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginwithgoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(FirebaseAuth, provider);
    await handlelogin(user);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      alert("Required Email :");
    } else {
      const { user } = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        Password
      );

      await handlelogin(user);
    }
  };
  const handlelogin = async (user: User) => {
    try {
      if (user.email) {
        const data: AxiosResponse = await axios.post(CHECK_USER_ROUTE, {
          email: user.email,
        });
        console.log(data);
        if (data.status == 200) {
          dispatch(
            setCredentials({
              email: user.email,
              accessToken: await user.getIdTokenResult(),
              name: data.data.name,
            })
          );
          router.push("/");
        }
      }
    } catch (e) {
      alert(e);
    }
  };
  // const handlelogin = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const { user } = await signInWithPopup(FirebaseAuth, provider);
  //   try {
  //     dispatch(
  //       setCredentials({
  //         email: user?.email,
  //         accessToken: user?.getIdToken(),
  //       })
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const validationEmail = (e: any) => {
    var emailValue = e.target.value;

    setEmail(emailValue);
  };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   if (!email) {
  //     alert("Required Email :");
  //   } else {
  //     try {
  //       const { user } = await signInWithEmailAndPassword(
  //         FirebaseAuth,
  //         email,
  //         Password
  //       );
  //       dispatch(
  //         setCredentials({
  //           email: user.email,
  //           accessToken: user.getIdToken(),
  //         })
  //       );

  //       router.push("/");
  //     } catch (e) {
  //       alert(e);
  //     }
  //   }
  // };

  // Email Validation

  return (
    <div className=" flex   p-10 flex-col items-center justify-center">
      <h1 className="text-2xl font-medium">Login</h1>
      <div className="px-10  pb-10 w-screen m-10 md:w-fit shadow-md rounded-lg">
        <div className=" flex flex-col items-center justify-center  space-y-10">
          <input
            placeholder="Username"
            value={email}
            onChange={validationEmail}
            className="logininput"
          />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="logininput"
          />
        </div>
        <br></br>
        <div className="relative right-0 w-full flex">
          <div className="customCheckbox">
            <span className="customCheckmark" />
            <input
              className=" opacity-0 cursor-pointer h-0 w-0"
              type="checkbox"
            />
          </div>
          Remember Me
        </div>

        <div className="flex items-center justify-center">
          <button onClick={handleSubmit}>
            <NavItem link={""} name={"Login"} size={"150px"} />
          </button>
        </div>
        <div className="flex justify-around ">
          <div className="underline cursor-pointer text-sky-600">
            Forgot Password?
          </div>
          <button onClick={() => router.push("/signup")}>
            <div className=" underline cursor-pointer text-sky-600">Signup</div>
          </button>
        </div>
        <br></br>
        <button className="w-full">
          {" "}
          <div
            className="bg-sky-600  text-center p-2 rounded-lg text-white flex items-center justify-center "
            onClick={loginwithgoogle}
          >
            <FcGoogle color="red" size={40} className="mr-5" /> Login With
            Google
          </div>
        </button>
      </div>
    </div>
  );
}
