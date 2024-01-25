"use client";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { MdOutlineArrowOutward } from "react-icons/md";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main
      className={
        "w-full flex flex-col space-y-7 h-[calc(100dvh-4rem)] items-center justify-center"
      }
    >
      <h1 className={"text-2xl"}>Showcase Me</h1>
      <form
        onSubmit={handleSubmit}
        className={
          "w-full flex space-y-5 flex-col items-center justify-start p-7 h-full sm:bg-neutral-900 sm:w-80 sm:h-fit"
        }
      >
        <div className={"w-full mb-5 h-fit justify-between items-center flex"}>
          <h2 className={"text-2xl"}>Sign In</h2>
          <div className={"flex space-x-1 text-sm"}>
            <p>or</p>
            <Link
              href={"/account/register"}
              className={"text-blue-400 flex items-center"}
            >
              {" "}
              register
              <MdOutlineArrowOutward />
            </Link>
          </div>
        </div>

        <div className={"w-full flex flex-col space-y-4"}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"email"}
            label={"Email"}
          />
          {/*<Input placeholder={"username"} label={"Username"} />*/}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"password"}
            label={"Password"}
          />
        </div>

        <div className={"w-full flex justify-end"}>
          <Link
            href={"/account/forgot"}
            className={"text-sm flex items-center text-blue-400"}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type={"submit"}
          className={
            "border border-white w-full p-2 rounded hover:bg-white hover:text-black duration-150"
          }
        >
          Sign In
        </button>
      </form>
    </main>
  );
};

export default SignIn;
