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
import axios, { AxiosResponse } from "axios";
import { CHECK_USER_ROUTE } from "../../utils/ApiRoutes";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: () => {
      console.log(formik.values.email, formik.values.password);
      handleSubmit();
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required(""),
    }),
  });

  const loginwithgoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(FirebaseAuth, provider);
    await handlelogin(user);
  };
  const handleSubmit = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        FirebaseAuth,
        formik.values.email,
        formik.values.password
      );
      await handlelogin(user);
    } catch (e: any) {
      alert(e);
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
    } catch (e: any) {
      formik.errors.password = e;
      formik.errors.email = e;
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
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-col items-center justify-center  space-y-10">
            <div>
              <input
                placeholder="Username"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                className="logininput"
              />
              <p className=" text-red-500">{formik.errors.email}</p>
            </div>
            <div>
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="logininput"
              />
              <p className=" text-red-500">{formik.errors.password}</p>
            </div>
          </div>
          <br></br>

          <div className="flex items-center justify-center">
            <button type="submit">
              <NavItem link={""} name={"Login"} size={"150px"} />
            </button>
          </div>
          </form>

          <div className="flex justify-around ">
            <div className="underline cursor-pointer text-gray-700">
              Don't Have an Account ?
            </div>
            <button onClick={() => router.push("/signup")}>
              <div className=" underline cursor-pointer text-sky-600">
                Signup
              </div>
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
