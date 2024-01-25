"use client";
import React, { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";

const Errors = {
  InvalidCredentials: "Invalid Credentials",
};
const SignIn = () => {
  const [responseStatus, setResponseStatus] = useState(200);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sign = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (sign!.status === 200) router.replace("/");

      if (sign!.status === 401) {
        setError(Errors.InvalidCredentials);
      }
    } catch (err) {
      console.log(responseStatus);
    }
  };

  if (sessionStatus == "authenticated") router.replace("/");

  if (sessionStatus == "unauthenticated")
    return (
      <main
        className={
          "w-full flex flex-col space-y-7 h-[calc(100dvh-4rem)] items-center justify-center"
        }
      >
        {/*<h1 className={"text-2xl"}>Showcase Me</h1>*/}
        <form
          onSubmit={handleSubmit}
          className={
            "w-full flex space-y-5 flex-col items-center justify-start p-7 h-full sm:bg-neutral-900 sm:w-80 sm:h-fit"
          }
        >
          <div
            className={"w-full mb-5 h-fit justify-between items-center flex"}
          >
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

          <div
            className={`${!error && "hidden"} text-sm bg-red-950/50 w-full px-4 border border-red-600 p-2 rounded`}
          >
            {error && error}
          </div>

          <div className={"w-full flex flex-col space-y-4"}>
            <Input
              required
              type={"email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
                setLoading(false);
              }}
              placeholder={"email"}
              label={"Email"}
            />
            {/*<Input placeholder={"username"} label={"Username"} />*/}
            <Input
              required
              type={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
                setLoading(false);
              }}
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
            disabled={loading}
            type={"submit"}
            className={
              "border disabled:border-neutral-700 disabled:hover:bg-transparent disabled:text-white/50 border-white w-full p-2 rounded hover:bg-white hover:text-black duration-150"
            }
          >
            Sign In
          </button>
        </form>
      </main>
    );
};

export default SignIn;
