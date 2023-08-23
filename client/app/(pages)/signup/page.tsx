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
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/reducers/authreducer";
import axios from "axios";
import { SIGNUP_USER_ROUTE } from "@/app/utils/ApiRoutes";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignupPage() {
  const router = useRouter();

  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: "", password: "", name: " " },
    onSubmit: () => {
      handleSubmit();
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required(""),
      name: Yup.string().required(""),
    }),
  });
  const loginwithgoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(FirebaseAuth, provider);
    await handlelogin(user);
  };
  const handleSubmit = async () => {
    const { user } = await createUserWithEmailAndPassword(
      FirebaseAuth,
      formik.values.email,
      formik.values.password
    );

    await handlelogin(user);
  };
  const handlelogin = async (user: User) => {
    try {
      if (user.email) {
        const data = await axios.post(SIGNUP_USER_ROUTE, {
          email: user.email,
          name: user.displayName ? user.displayName : name,
          userId: user.uid,
        });
        console.log(data);
        if (data.status == 200) {
          dispatch(
            setCredentials({
              email: user.email,
              accessToken: await user.getIdTokenResult(),
            })
          );
          router.push("/");
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className=" flex   p-10 flex-col items-center justify-center">
      <h1 className="text-2xl font-medium">SignUp</h1>

      <div className="px-10  pb-10 w-screen m-10 md:w-fit shadow-md rounded-lg">
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-col items-center justify-center  space-y-10">
            <div>
              <input
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="logininput"
              />
              <p className="text-red-500">{formik.errors.name}</p>
            </div>
            <div>
              <input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="logininput"
              />

              <p className=" text-red-500">{formik.errors.email}</p>
            </div>
            <div>
              <input
                name="password"
                placeholder="Password"
                className="logininput"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <p className=" text-red-500">{formik.errors.password}</p>
            </div>
          </div>
          <br></br>

          <div className="flex items-center justify-center">
            <button type="submit">
              <NavItem link={""} name={"Signup"} size={"150px"} />
            </button>
          </div>
          <div className="flex justify-around ">
            <h1 className=" text-gray-500 font-extralight">
              Already Have an Account?{" "}
            </h1>
            <div className=" underline cursor-pointer text-sky-600 mx-2">
              <Link href={"/login"}>Sign In</Link>
            </div>
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
        </form>
      </div>
    </div>
  );
}
